#!/bin/bash
# Script de configuración rápida MERS
set -e

echo "🚀 INICIANDO CONFIGURACIÓN MERS-IASi..."

# Actualizar sistema
apt update -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Instalar PM2
npm install -g pm2

# Crear directorio
mkdir -p /opt/mers
cd /opt/mers

# Crear servidor
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MERS Hackathon Proxy',
    timestamp: new Date().toISOString()
  });
});

app.listen(3001, '0.0.0.0', () => {
  console.log('🎯 MERS Server running on port 3001');
});
EOF

# Crear package.json
npm init -y
npm install express cors

# Iniciar con PM2
pm2 start server.js --name mers-proxy
pm2 save
pm2 startup

echo "✅ SERVIDOR CONFIGURADO: http://155.138.224.137:3001"