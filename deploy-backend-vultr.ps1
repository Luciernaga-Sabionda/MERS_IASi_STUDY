# Script de despliegue MERS a Vultr - PowerShell

$SERVER_IP = "207.148.31.144"
$SERVER_USER = "root"
$SERVER_PASS = "P%6gjRE!p[cjXj,W"

Write-Host "Desplegando MERS backend a Vultr..." -ForegroundColor Green

# Crear script de configuración del servidor
$setupScript = @'
#!/bin/bash
set -e

# Actualizar sistema
echo "Actualizando sistema..."
apt-get update -y
apt-get install -y curl git

# Instalar Node.js 20
echo "Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Instalar PM2
echo "Instalando PM2..."
npm install -g pm2

# Crear directorio
mkdir -p /var/www/mers

echo "Configuracion inicial completada"
'@

# Guardar script temporalmente
$setupScript | Out-File -FilePath "setup-server.sh" -Encoding UTF8

Write-Host "
MANUAL DEPLOYMENT STEPS:
========================

1. Conecta por SSH al servidor:
   IP: $SERVER_IP
   User: $SERVER_USER
   Pass: $SERVER_PASS

2. Ejecuta en el servidor:

# Instalar Node.js y PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

# Crear directorio
mkdir -p /var/www/mers

3. Copia archivos desde tu PC:

# Comprime el proyecto
tar -czf mers-backend.tar.gz server package.json

# Transfiere al servidor (usa WinSCP, FileZilla o scp)
# O usa el siguiente comando si tienes SSH configurado:
# scp mers-backend.tar.gz ${SERVER_USER}@${SERVER_IP}:/var/www/mers/

4. En el servidor, descomprime e instala:

cd /var/www/mers
tar -xzf mers-backend.tar.gz
npm install --production

# Crear .env
cat > .env << EOF
VITE_GEMINI_API_KEY=AIzaSyDwhcdqcEs9HlK3MJPVAmKyTUCvDociNV4
RAINDROP_TEST_TOKEN=TU_RAINDROP_TOKEN
PORT=3002
NODE_ENV=production
EOF

# Arrancar backend
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup

# Firewall
ufw allow 22
ufw allow 3002
ufw --force enable

Backend estará en: http://207.148.31.144:3002
" -ForegroundColor Cyan

Write-Host "
ALTERNATIVA RÁPIDA: Deploy con GitHub
======================================

1. Sube tu código a GitHub (sin .env.local)
2. En el servidor:

cd /var/www/mers
git clone https://github.com/TU_USUARIO/MERS_IASi_Study.git .
npm install --production

# Crear .env con tus claves
nano .env

# Arrancar
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save

" -ForegroundColor Yellow

Write-Host "¿Quieres que comprima los archivos ahora para transferir? (S/N): " -NoNewline
