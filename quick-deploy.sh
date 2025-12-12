#!/bin/bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
npm install -g pm2
mkdir -p /var/www && cd /var/www
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git mers 2>/dev/null || (cd mers && git pull)
cd mers
npm install --production
echo "VITE_GEMINI_API_KEY=AIzaSyDwhcdqcEs9HlK3MJPVAmKyTUCvDociNV4" > .env
echo "RAINDROP_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f" >> .env
echo "PORT=3002" >> .env
ufw allow 3002 2>/dev/null || true
pm2 delete mers 2>/dev/null || true
pm2 start server/proxy-server-fixed.js --name mers
pm2 save
echo "Backend en http://$(curl -s ifconfig.me):3002"
