// Vultr Proxy Server - Puente mínimo entre Raindrop y Google Cloud
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS para permitir requests desde Raindrop
app.use(cors({
  origin: [
    'https://your-raindrop-app.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'MERS-Vultr-Proxy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    connections: {
      googleCloud: 'active',
      raindrop: 'ready'
    }
  });
});

// Proxy para el REC (Repositorio de Experiencias Contextuales)
app.use('/api/rec', createProxyMiddleware({
  target: 'https://your-google-cloud-mers.com', // Tu URL real de Google Cloud
  changeOrigin: true,
  pathRewrite: {
    '^/api/rec': '/mers/rec' // Reescribe la ruta si es necesario
  },
  onProxyReq: (proxyReq, req, res) => {
    // Agregar headers de autenticación si es necesario
    proxyReq.setHeader('Authorization', `Bearer ${process.env.MERS_API_TOKEN}`);
    proxyReq.setHeader('X-Proxy-Source', 'vultr-bridge');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log para debugging
    console.log(`[${new Date().toISOString()}] REC Proxy: ${req.method} ${req.originalUrl} -> ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({
      error: 'Proxy connection failed',
      message: 'No se pudo conectar con el sistema MERS principal',
      fallback: true
    });
  }
}));

// Proxy para el Chatbot/Gemini
app.use('/api/chat', createProxyMiddleware({
  target: 'https://your-google-cloud-mers.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/chat': '/mers/chat'
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', `Bearer ${process.env.MERS_API_TOKEN}`);
    proxyReq.setHeader('X-Proxy-Source', 'vultr-bridge');
  }
}));

// Proxy para análisis de imágenes
app.use('/api/vision', createProxyMiddleware({
  target: 'https://your-google-cloud-mers.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/vision': '/mers/vision'
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', `Bearer ${process.env.MERS_API_TOKEN}`);
    proxyReq.setHeader('X-Proxy-Source', 'vultr-bridge');
  }
}));

// Endpoint de fallback para datos mock (cuando el sistema real no esté disponible)
app.get('/api/rec/mock', (req, res) => {
  res.json({
    experiences: [
      {
        id: '1',
        area: 'SAR_Analysis',
        pattern: 'Detección de cambios en vegetación usando polarización VV',
        confidence: 0.92,
        impact: 0.85,
        timestamp: new Date().toISOString(),
        source: 'human'
      },
      {
        id: '2',
        area: 'Image_Processing', 
        pattern: 'Segmentación de nubes en imágenes multiespectrales',
        confidence: 0.78,
        impact: 0.73,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        source: 'ia'
      }
    ],
    metadata: {
      total: 2,
      source: 'mock-data',
      note: 'Datos de demostración para El Campeonato de IA'
    }
  });
});

// Middleware de error global
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Error en el proxy de MERS',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de información del sistema
app.get('/api/info', (req, res) => {
  res.json({
    name: 'MERS-Vultr-Proxy',
    version: '1.0.0',
    purpose: 'Puente para El Campeonato de IA - Ambiente. Código. Navegue.',
    architecture: {
      frontend: 'Raindrop (demo)',
      proxy: 'Vultr (bridge)',
      backend: 'Google Cloud (MERS core)'
    },
    creator: 'Roxana A. Salazar M. (Luciérnaga Sabionda)',
    competition: 'The AI Championship 2025'
  });
});

app.listen(PORT, () => {
  console.log(`🌉 MERS Vultr Proxy Server running on port ${PORT}`);
  console.log(`📡 Ready to bridge Raindrop ↔ Google Cloud`);
  console.log(`🏆 Configured for El Campeonato de IA`);
});

module.exports = app;