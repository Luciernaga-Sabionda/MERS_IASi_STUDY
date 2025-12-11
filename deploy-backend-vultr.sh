#!/bin/bash
# Script de despliegue automático de MERS backend a Vultr

SERVER_IP="207.148.31.144"
SERVER_USER="root"

echo "Desplegando MERS backend a Vultr..."

# 1. Instalar Node.js y dependencias en el servidor
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
# Actualizar sistema
apt-get update
apt-get install -y curl git

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalación
node --version
npm --version

# Instalar PM2 para gestión de procesos
npm install -g pm2

# Crear directorio de aplicación
mkdir -p /var/www/mers
ENDSSH

echo "✅ Node.js y PM2 instalados"

# 2. Copiar archivos del backend
echo "Copiando archivos..."
scp -r server package.json ${SERVER_USER}@${SERVER_IP}:/var/www/mers/

# 3. Instalar dependencias y arrancar
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
cd /var/www/mers
npm install --production

# Crear archivo .env con variables de entorno
cat > .env << 'EOF'
VITE_GEMINI_API_KEY=TU_GEMINI_API_KEY_AQUI
RAINDROP_TEST_TOKEN=TU_RAINDROP_TOKEN_AQUI
PORT=3002
NODE_ENV=production
EOF

# Arrancar con PM2
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup

# Configurar firewall
ufw allow 22
ufw allow 3002
ufw --force enable

echo "✅ Backend desplegado y ejecutándose en puerto 3002"
ENDSSH

echo "
🎉 Despliegue completado!
📍 Backend disponible en: http://${SERVER_IP}:3002
🔧 Para gestionar: ssh ${SERVER_USER}@${SERVER_IP} 'pm2 status'
"
