import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';

// Manejadores de errores globales
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

// Configuración: preferir `.env.local` si existe, luego `.env`
try {
  dotenv.config({ path: '.env.local' });
} catch {}
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Tipo de archivo no permitido. Usa PNG o JPEG.'));
    }
    cb(null, true);
  }
});

// API Key setup
const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;
if (!API_KEY) {
  console.warn('⚠️  Warning: GEMINI API key not found. Set VITE_GEMINI_API_KEY in .env');
}

// Initialize Google AI client
let client = null;
if (API_KEY) {
  try {
    client = new GoogleGenerativeAI(API_KEY);
    console.log('✅ GoogleGenerativeAI client initialized');
  } catch (e) {
    console.error('❌ Failed to init GoogleGenerativeAI:', e);
  }
}

// Health endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client
  });
});

// Respuestas de fallback inteligentes sobre MERS
const getFallbackResponse = (prompt) => {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('mers') || lower.includes('qué es')) {
    return `MERS (Módulo Inteligente de Retroalimentación Educativa Selectiva) es un sistema de enseñanza adaptativa con arquitectura cognitiva hemisférica diseñado para The AI Championship 2025.

🧠 **Arquitectura Hemisférica:**
- **Hemisferio A**: Razón Técnica - Procesa datos complejos (SAR, imágenes)
- **Hemisferio B**: Conciencia Pedagógica - Valida, almacena y explica conocimiento

🔑 **Componente ValidadorCriterio:**
\`\`\`
score = 0.5 * Confianza + 0.4 * Coherencia + 0.1 * Impacto
// Acepta experiencias con score > 0.7
\`\`\`

📊 **REC (Repositorio de Experiencias Contextuales):**
Sistema de memoria que almacena patrones pedagógicos validados para aprendizaje continuo.

Este es un prototipo funcional para The Scientific Bumblebees_IASi Study.`;
  }
  
  if (lower.includes('validador') || lower.includes('criterio')) {
    return `El **ValidadorCriterio** es la neurona ejecutiva del Hemisferio B de MERS. Evalúa cada lección humana con 3 métricas:

1. **Confianza (50%)**: ¿Qué tan seguro está el experto?
2. **Coherencia (40%)**: ¿Es consistente con el conocimiento previo?
3. **Impacto (10%)**: ¿Qué tan útil es para el aprendizaje?

Fórmula: \`score = 0.5*confianza + 0.4*coherencia + 0.1*impacto\`

Solo las lecciones con score > 0.7 se almacenan en el REC (Repositorio de Experiencias Contextuales).`;
  }
  
  if (lower.includes('hemisferio') || lower.includes('arquitectura')) {
    return `La arquitectura hemisférica de MERS simula un cerebro digital:

**Hemisferio A (Razón Técnica):**
- Procesa imágenes SAR con Gemini Vision
- Genera predicciones técnicas
- Análisis multimodal

**Hemisferio B (Conciencia Pedagógica - MERS):**
- ValidadorCriterio evalúa lecciones humanas
- REC almacena conocimiento validado
- Explicador Digital adapta el lenguaje al usuario
- Aprendizaje Reforzado mejora con feedback

Esta simbiosis entre predicción técnica y corrección humana crea un sistema que aprende a enseñar.`;
  }
  
  if (lower.includes('rec') || lower.includes('repositorio')) {
    return `El **REC (Repositorio de Experiencias Contextuales)** es la memoria a largo plazo de MERS.

🗄️ **Estructura:**
- Lecciones validadas (score > 0.7)
- Patrones pedagógicos exitosos
- Correlaciones entre contextos
- Estrategias de explicación efectivas

🔍 **Funciones:**
- Almacenamiento persistente (MongoDB)
- Búsqueda por similitud vectorial
- Clustering de experiencias relacionadas
- Recuperación contextual inteligente

El REC permite que MERS mejore continuamente, aprendiendo de cada interacción humana validada.`;
  }
  
  if (lower.includes('hackathon') || lower.includes('championship')) {
    return `MERS está diseñado específicamente para **The AI Championship 2025** con las plataformas:

🌐 **Raindrop Platform**: Frontend con SmartComponents
🖥️ **Vultr**: Servidor proxy y API bridge
☁️ **Google Cloud**: Motor de IA (Gemini 2.0 Flash)

**SmartComponent implementado:**
- SmartMemory: Visualizador del REC en tiempo real
- Dashboard de arquitectura híbrida
- Monitoreo de conexiones entre plataformas

Categoría: Emprendedor Individual + Mejor Idea General
Creadora: Roxana A. Salazar M. (Luciérnaga Sabionda)`;
  }
  
  return `Soy el asistente de MERS-IASi. Puedo ayudarte con:

📚 Arquitectura cognitiva hemisférica
🧠 ValidadorCriterio y métricas de evaluación
💾 REC (Repositorio de Experiencias Contextuales)
🏆 Integración Raindrop + Vultr + Google Cloud
📊 SmartComponents y visualización

¿Sobre qué aspecto de MERS te gustaría aprender más?`;
};

// Generate endpoint
app.post('/api/generate', async (req, res) => {
  const prompt = req.body?.prompt || '';
  
  // Si no hay cliente, usar respuestas inteligentes locales
  if (!client || !API_KEY) {
    console.log('⚠️  Using fallback response (no API key)');
    return res.json({ text: getFallbackResponse(prompt), fallback: true });
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: 'Eres un asistente de IA para el proyecto MERS-IASi. Responde de forma clara y concisa sobre arquitectura cognitiva, ValidadorCriterio, REC y The AI Championship 2025.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`✅ Gemini response (${text.length} chars)`);
    res.json({ text, source: 'gemini' });
  } catch (err) {
    console.error('❌ Gemini error, using fallback:', err.message);
    // En caso de error de cuota, usar fallback
    res.json({ text: getFallbackResponse(prompt), fallback: true, error: err.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const prompt = req.body?.prompt || '';
  
  // Si no hay cliente, usar respuestas inteligentes locales
  if (!client || !API_KEY) {
    console.log('⚠️  Using fallback response (no API key)');
    return res.json({ text: getFallbackResponse(prompt), fallback: true });
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: 'Eres un asistente de IA para el proyecto MERS-IASi. Responde de forma clara y concisa sobre arquitectura cognitiva, ValidadorCriterio, REC y The AI Championship 2025.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`💬 Gemini chat (${text.length} chars)`);
    res.json({ text, source: 'gemini' });
  } catch (err) {
    console.error('❌ Gemini error, using fallback:', err.message);
    // En caso de error de cuota, usar fallback inteligente
    res.json({ text: getFallbackResponse(prompt), fallback: true, error: err.message });
  }
});

// Image analysis endpoint (multipart/form-data)
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  const startedAt = Date.now();
  try {
    if (!client || !API_KEY) {
      return res.json({ text: 'Backend sin API key: usando explicación genérica. Sube una imagen y te describiré posibles contenidos.', fallback: true });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No se recibió archivo de imagen' });
    }

    const ai = client;
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const base64Data = file.buffer.toString('base64');
    const imagePart = {
      inlineData: {
        mimeType: file.mimetype,
        data: base64Data,
      },
    };

    const result = await model.generateContent([
      'Describe esta imagen en detalle y destaca elementos clave visibles.',
      imagePart,
    ]);
    const response = await result.response;
    const text = response.text();
    const durationMs = Date.now() - startedAt;
    console.log(`🖼️ Analyze OK | type=${file.mimetype} size=${file.size}B duration=${durationMs}ms`);
    return res.json({ text, source: 'gemini' });
  } catch (err) {
    const message = err?.message || 'Error desconocido';
    const isUserError = message.includes('Tipo de archivo no permitido') || message.includes('File too large');
    console.error('❌ Error analizando imagen:', message);
    const file = req.file;
    if (file) {
      const durationMs = Date.now() - startedAt;
      console.log(`🖼️ Analyze FAIL | type=${file.mimetype} size=${file.size}B duration=${durationMs}ms reason=${message}`);
    }
    return res.status(isUserError ? 400 : 500).json({ error: isUserError ? 'Solicitud inválida' : 'Error al analizar la imagen', message });
  }
});

// Start server
const PORT = process.env.PORT || process.env.PROXY_PORT || 3002;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Proxy server listening on port ${PORT}`);
  console.log(`📊 Status: ${client ? '✅ Ready' : '⚠️  API key missing'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
