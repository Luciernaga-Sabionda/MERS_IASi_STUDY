// Vultr Proxy Server - Puente híbrido para MERS_IASi_Study
// Conecta Raindrop Platform → Vultr → Google Cloud MERS
// Para The AI Championship 2025

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS para permitir requests desde Raindrop y desarrollo local
app.use(cors({
  origin: [
    'https://your-raindrop-app.com',
    'https://api.raindrop.ai', 
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.RAINDROP_FRONTEND_URL || 'https://mers-demo.raindrop.ai'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Raindrop-Key', 'X-Vultr-Proxy']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para debugging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Origin: ${req.get('Origin')}`);
  if (req.headers['x-raindrop-key']) {
    console.log(`  🔑 Raindrop Key: ${req.headers['x-raindrop-key'].substring(0, 8)}...`);
  }
  next();
});

// Health check endpoint - Para verificación del hackathon
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'MERS-Vultr-Proxy-IASi-Study',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0-hackathon',
    hackathon: 'The AI Championship 2025',
    platform: 'The Scientific Bumblebees_IASi Study',
    connections: {
      googleCloud: 'active',
      raindrop: 'ready',
      vultr: 'operational'
    },
    endpoints: {
      rec: '/api/rec',
      chat: '/api/chat', 
      vision: '/api/vision',
      smartmemory: '/api/smartmemory'
    },
    architecture: 'Raindrop → Vultr → Google Cloud'
  });
});

// Endpoint específico para demo del hackathon
app.get('/api/demo/status', (req, res) => {
  res.json({
    message: '🏆 MERS funcionando para The AI Championship 2025',
    creator: 'Roxana A. Salazar M. (Luciérnaga Sabionda)',
    project: 'MERS - Módulo Educativo de Retroalimentación Selectiva',
    integration: 'The Scientific Bumblebees_IASi Study',
    architecture: 'Arquitectura Cognitiva Hemisférica',
    smartComponents: ['SmartMemory', 'SmartSQL', 'SmartInference'],
    demo_ready: true
  });
});

// Endpoint específico para SmartMemory (REC) - Hackathon demo
app.get('/api/smartmemory', (req, res) => {
  // Simulación de datos para demo del hackathon
  const mockSmartMemoryData = {
    status: 'active',
    type: 'RaindropSmartMemory',
    bucket_id: 'mers-iasi-study-hackathon',
    experiences: [
      {
        id: 'exp-001',
        area: 'SAR_Analysis',
        pattern: 'Detección de cambios en vegetación usando polarización VV',
        confidence: 0.94,
        impact: 0.87,
        source: 'human',
        timestamp: new Date().toISOString(),
        raindrop_bucket: 'scientific-bumblebees-sar'
      },
      {
        id: 'exp-002',
        area: 'Hackathon_Integration',
        pattern: 'Arquitectura híbrida Raindrop → Vultr → Google Cloud',
        confidence: 0.96,
        impact: 0.92,
        source: 'ia',
        timestamp: new Date().toISOString(),
        raindrop_bucket: 'mers-hackathon-demo'
      }
    ],
    stats: {
      total: 127,
      human_lessons: 78,
      ai_predictions: 49,
      avg_confidence: 0.89,
      last_update: new Date().toISOString()
    },
    architecture: {
      raindrop: 'connected',
      vultr: 'active',
      google_cloud: 'processing'
    }
  };
  
  res.json(mockSmartMemoryData);
});

// Proxy para el REC (Repositorio de Experiencias Contextuales)
app.use('/api/rec', createProxyMiddleware({
  target: process.env.GOOGLE_CLOUD_MERS_URL || 'https://your-google-cloud-mers.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/rec': '/mers/rec' // Reescribe la ruta si es necesario
  },
  onProxyReq: (proxyReq, req, res) => {
    // Agregar headers de autenticación si es necesario
    proxyReq.setHeader('Authorization', `Bearer ${process.env.MERS_API_TOKEN || 'demo-token'}`);
    proxyReq.setHeader('X-Proxy-Source', 'vultr-bridge-hackathon');
    proxyReq.setHeader('X-Hackathon', 'AI-Championship-2025');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log para debugging y demo
    console.log(`🔄 [${new Date().toISOString()}] REC Proxy: ${req.method} ${req.originalUrl} -> ${proxyRes.statusCode}`);
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