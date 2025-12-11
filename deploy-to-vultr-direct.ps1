# Deploy directo a Vultr usando cloud-init script

$SERVER_IP = "207.148.31.144"

Write-Host "🚀 Desplegando MERS a Vultr..." -ForegroundColor Green

# Script que se ejecutará en el servidor
$deployScript = @'
#!/bin/bash
set -e

# Actualizar sistema
apt-get update -y
apt-get install -y curl git

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

# Clonar repositorio
cd /var/www || mkdir -p /var/www && cd /var/www
rm -rf mers
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git mers
cd mers
npm install --production

# Crear .env (NOTA: Configurar con tus claves reales)
cat > .env << 'ENVEOF'
VITE_GEMINI_API_KEY=REPLACE_WITH_YOUR_GEMINI_KEY
RAINDROP_TEST_TOKEN=REPLACE_WITH_YOUR_RAINDROP_TOKEN
RAINDROP_TOKEN=REPLACE_WITH_YOUR_RAINDROP_TOKEN
PORT=3002
NODE_ENV=production
ENVEOF

# Configurar firewall
ufw --force enable
ufw allow 22
ufw allow 3002

# Arrancar con PM2
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 | bash

echo "Deployment completado"
'@

# Guardar script
$deployScript | Out-File -FilePath "vultr-deploy.sh" -Encoding UTF8

Write-Host @"

📋 PASOS PARA DEPLOYMENT MANUAL:

1. Conecta por SSH al servidor:
   ssh root@$SERVER_IP
   Contraseña: P%6gjRE!p[cjXj,W

2. Ejecuta estos comandos:

# Instalar Node.js y herramientas
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
npm install -g pm2

# Clonar y configurar proyecto
mkdir -p /var/www && cd /var/www
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git mers
cd mers
npm install --production

# Configurar variables de entorno (IMPORTANTE: Usa tus claves reales)
cat > .env << 'EOF'
VITE_GEMINI_API_KEY=TU_CLAVE_GEMINI
RAINDROP_TEST_TOKEN=TU_TOKEN_RAINDROP
RAINDROP_TOKEN=TU_TOKEN_RAINDROP
PORT=3002
NODE_ENV=production
EOF

# Configurar firewall y arrancar
ufw --force enable && ufw allow 22 && ufw allow 3002
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup

3. Verifica que funciona:
   curl http://localhost:3002/health

4. Tu backend estará disponible en:
   http://$SERVER_IP:3002

"@ -ForegroundColor Cyan

Write-Host "`n💡 TIP: También puedes usar PuTTY o cualquier cliente SSH para conectar" -ForegroundColor Yellow
