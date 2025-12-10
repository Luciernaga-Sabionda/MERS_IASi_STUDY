#!/bin/bash

# 🚀 MERS Hackathon - Configuración Automática del Servidor Vultr
# Ejecutar: ssh root@TU_IP_VULTR "bash -s" < configure-vultr-server.sh

echo "🔥 INICIANDO CONFIGURACIÓN DEL SERVIDOR MERS..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# Instalar Node.js 20
echo "⚡ Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Instalar PM2 globalmente
echo "🔧 Instalando PM2..."
npm install -g pm2

# Instalar Git
echo "📁 Instalando Git..."
apt install -y git

# Crear directorio de trabajo
echo "📂 Configurando directorio..."
mkdir -p /opt/mers-hackathon
cd /opt/mers-hackathon

# Crear archivo de configuración del proxy
echo "⚙️ Creando servidor proxy..."
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS para todas las rutas
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Middleware para JSON
app.use(express.json());

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MERS Hackathon Proxy Server',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Proxy a Google Gemini API
app.use('/api/gemini', createProxyMiddleware({
  target: 'https://generativelanguage.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/gemini': '/v1beta/models'
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🚀 Proxy request: ${req.method} ${req.originalUrl}`);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}));

// Proxy genérico para otras APIs
app.use('/api/proxy', createProxyMiddleware({
  target: 'https://api.raindrop.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': ''
  }
}));

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 MERS Proxy Server running on port ${PORT}`);
  console.log(`🌐 Access: http://YOUR_VULTR_IP:${PORT}`);
  console.log(`❤️ Health check: http://YOUR_VULTR_IP:${PORT}/health`);
});
EOF

# Crear package.json
echo "📋 Configurando dependencies..."
cat > package.json << 'EOF'
{
  "name": "mers-hackathon-proxy",
  "version": "1.0.0",
  "description": "MERS Hackathon Proxy Server for Raindrop + Vultr + Google Cloud",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "http-proxy-middleware": "^2.0.6"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm install

# Crear archivo de configuración de PM2
echo "⚡ Configurando PM2..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'mers-hackathon-proxy',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
EOF

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 22    # SSH
ufw allow 3001  # Nuestro servidor
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw --force enable

# Iniciar con PM2
echo "🚀 Iniciando servidor con PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo ""
echo "🎉 ¡CONFIGURACIÓN COMPLETADA!"
echo "🌐 Tu servidor está corriendo en: http://$(curl -s ifconfig.me):3001"
echo "❤️ Health check: http://$(curl -s ifconfig.me):3001/health"
echo ""
echo "📋 COMANDOS ÚTILES:"
echo "   pm2 status           - Ver estado del servidor"
echo "   pm2 logs             - Ver logs en tiempo real"
echo "   pm2 restart all      - Reiniciar servidor"
echo "   pm2 stop all         - Parar servidor"
echo ""
echo "🎯 ¡Listo para conectar con Raindrop Platform!"