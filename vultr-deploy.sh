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
