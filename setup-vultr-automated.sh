#!/bin/bash
# Script de configuración automática del servidor Vultr para MERS

set -e

echo "🚀 Configurando servidor Vultr para MERS Backend..."

# 1. Actualizar sistema
echo "📦 Actualizando sistema..."
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y

# 2. Instalar Node.js 20
echo "📦 Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalación
node --version
npm --version

# 3. Instalar PM2
echo "📦 Instalando PM2..."
npm install -g pm2

# 4. Clonar repositorio
echo "📂 Clonando repositorio MERS..."
mkdir -p /var/www
cd /var/www
rm -rf mers
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git mers
cd mers

# 5. Instalar dependencias
echo "📦 Instalando dependencias npm..."
npm install --production

# 6. Crear archivo .env
echo "🔐 Configurando variables de entorno..."
cat > .env << 'EOF'
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
RAINDROP_TEST_TOKEN=YOUR_RAINDROP_TOKEN_HERE
RAINDROP_TOKEN=YOUR_RAINDROP_TOKEN_HERE
VULTR_API_TOKEN=YOUR_VULTR_TOKEN_HERE
PORT=3002
NODE_ENV=production
EOF

# 7. Configurar firewall
echo "🔥 Configurando firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 3002/tcp
ufw status

# 8. Iniciar aplicación con PM2
echo "🚀 Iniciando backend con PM2..."
pm2 stop mers-backend 2>/dev/null || true
pm2 delete mers-backend 2>/dev/null || true
pm2 start server/proxy-server-fixed.js --name mers-backend --time
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 | bash

# 9. Verificar estado
echo "✅ Verificando deployment..."
sleep 5
pm2 status
pm2 logs mers-backend --lines 20 --nostream

echo ""
echo "🎉 ¡Deployment completado!"
echo "📍 Backend disponible en: http://$(curl -s ifconfig.me):3002"
echo "🔧 Para ver logs: pm2 logs mers-backend"
echo "🔄 Para reiniciar: pm2 restart mers-backend"
