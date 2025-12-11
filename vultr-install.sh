#!/bin/bash
# Deployment script - ejecutar en servidor Vultr

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
npm install -g pm2

# Clonar proyecto
mkdir -p /var/www && cd /var/www
rm -rf mers
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git mers
cd mers
npm install --production

# Configurar .env
cat > .env << 'EOF'
VITE_GEMINI_API_KEY=AIzaSyDwhcdqcEs9HlK3MJPVAmKyTUCvDociNV4
RAINDROP_TEST_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
RAINDROP_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
PORT=3002
NODE_ENV=production
EOF

# Firewall
ufw --force enable
ufw allow 22
ufw allow 3002

# Arrancar backend
pm2 stop mers-backend || true
pm2 delete mers-backend || true
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 | bash

echo "✅ Deployment completado"
echo "Backend: http://207.148.31.144:3002"
