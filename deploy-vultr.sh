#!/bin/bash
set -e

# Instalar Node.js y dependencias
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clonar repositorio
cd /root
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git
cd MERS_IASi_STUDY

# Instalar dependencias
npm install

# Crear .env.local con las variables
cat > .env.local << 'EOF'
VITE_GEMINI_API_KEY=AIzaSyDwhcdqcEs9HlK3MJPVAmKyTUCvDociNV4
RAINDROP_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
RAINDROP_TEST_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
PORT=3002
EOF

# Instalar PM2 para mantener el servidor corriendo
sudo npm install -g pm2

# Iniciar servidor
pm2 start server/proxy-server-fixed.js --name mers-backend
pm2 save
pm2 startup

echo "✅ Servidor desplegado en http://207.148.31.144:3002"
