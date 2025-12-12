import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { initRaindropMCP, callRaindropTool, getRaindropStatus, closeRaindropMCP } from './raindrop-mcp-client.js';

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
  const raindropStatus = getRaindropStatus();
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client,
    raindropMCP: raindropStatus
  });
});

app.get('/api/health', (req, res) => {
  const raindropStatus = getRaindropStatus();
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client,
    raindropMCP: raindropStatus
  });
});

// Respuestas de fallback inteligentes sobre MERS
const getFallbackResponse = (prompt) => {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('mers') || lower.includes('what is')) {
    return `MERS (Selective Educational Feedback Intelligence Module) is an adaptive teaching system with hemispheric cognitive architecture designed for The AI Championship 2025.

🧠 **Hemispheric Architecture:**
- **Hemisphere A**: Technical Reason - Processes complex data (SAR, images)
- **Hemisphere B**: Pedagogical Consciousness - Validates, stores and explains knowledge

🔑 **CriteriaValidator Component:**
\`\`\`
score = 0.5 * Confidence + 0.4 * Coherence + 0.1 * Impact
// Accepts experiences with score > 0.7
\`\`\`

📊 **CER (Contextual Experience Repository):**
Memory system that stores validated pedagogical patterns for continuous learning.

This is a functional prototype for The Scientific Bumblebees_IASi Study.`;
  }
  
  if (lower.includes('validador') || lower.includes('criterio') || lower.includes('validator') || lower.includes('criteria')) {
    return `The **CriteriaValidator** is the executive neuron of MERS' Hemisphere B. It evaluates each human lesson with 3 metrics:

1. **Confidence (50%)**: How sure is the expert?
2. **Coherence (40%)**: Is it consistent with prior knowledge?
3. **Impact (10%)**: How useful is it for learning?

Formula: \`score = 0.5*confidence + 0.4*coherence + 0.1*impact\`

Only lessons with score > 0.7 are stored in the CER (Contextual Experience Repository).`;
  }
  
  if (lower.includes('hemisferio') || lower.includes('arquitectura') || lower.includes('hemisphere') || lower.includes('architecture')) {
    return `MERS's hemispheric architecture simulates a digital brain:

**Hemisphere A (Technical Reason):**
- Processes SAR images with Gemini Vision
- Generates technical predictions
- Multimodal analysis

**Hemisphere B (Pedagogical Consciousness - MERS):**
- CriteriaValidator evaluates human lessons
- CER stores validated knowledge
- Digital Explainer adapts language to user
- Reinforcement Learning improves with feedback

This symbiosis between technical prediction and human correction creates a system that learns to teach.`;
  }
  
  if (lower.includes('rec') || lower.includes('repositorio') || lower.includes('cer') || lower.includes('repository')) {
    return `The **CER (Contextual Experience Repository)** is MERS's long-term memory.

🗄️ **Structure:**
- Validated lessons (score > 0.7)
- Successful pedagogical patterns
- Correlations between contexts
- Effective explanation strategies

🔍 **Functions:**
- Persistent storage (MongoDB)
- Vector similarity search
- Clustering of related experiences
- Intelligent contextual retrieval

The CER allows MERS to continuously improve, learning from each validated human interaction.`;
  }
  
  if (lower.includes('hackathon') || lower.includes('championship')) {
    return `MERS is specifically designed for **The AI Championship 2025** with these platforms:

🌐 **Raindrop Platform**: Frontend with SmartComponents
🖥️ **Vultr**: Proxy server and API bridge
☁️ **Google Cloud**: AI engine (Gemini 2.0 Flash)

**Implemented SmartComponent:**
- SmartMemory: Real-time CER visualizer
- Hybrid architecture dashboard
- Cross-platform connection monitoring

Category: Individual Entrepreneur + Best Overall Idea
Creator: Roxana A. Salazar M. (The Smart Firefly)`;
  }
  
  return `I'm the MERS-IASi assistant. I can help you with:

📚 Hemispheric cognitive architecture
🧠 CriteriaValidator and evaluation metrics
💾 CER (Contextual Experience Repository)
🏆 Raindrop + Vultr + Google Cloud integration
📊 SmartComponents and visualization

Which aspect of MERS would you like to learn more about?`;
};

// Generate endpoint
app.post('/api/generate', async (req, res) => {
  const prompt = req.body?.prompt || '';
  
  // If no client, use smart local responses
  if (!client || !API_KEY) {
    console.log('⚠️  Using fallback response (no API key)');
    return res.json({ text: getFallbackResponse(prompt), fallback: true });
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: 'You are an AI assistant for the MERS-IASi project. Respond clearly and concisely about cognitive architecture, CriteriaValidator, CER, and The AI Championship 2025.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`✅ Gemini response (${text.length} chars)`);
    res.json({ text, source: 'gemini' });
  } catch (err) {
    console.error('❌ Gemini error, using fallback:', err.message);
    // In case of quota error, use fallback
    res.json({ text: getFallbackResponse(prompt), fallback: true, error: err.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const prompt = req.body?.prompt || '';
  
  // If no client, use smart local responses
  if (!client || !API_KEY) {
    console.log('⚠️  Using fallback response (no API key)');
    return res.json({ text: getFallbackResponse(prompt), fallback: true });
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: 'You are an AI assistant for the MERS-IASi project. Respond clearly and concisely about cognitive architecture, CriteriaValidator, CER, and The AI Championship 2025.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`💬 Gemini chat (${text.length} chars)`);
    res.json({ text, source: 'gemini' });
  } catch (err) {
    console.error('❌ Gemini error, using fallback:', err.message);
    // In case of quota error, use smart fallback
    res.json({ text: getFallbackResponse(prompt), fallback: true, error: err.message });
  }
});

// Image analysis endpoint (multipart/form-data)
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  const startedAt = Date.now();
  try {
    if (!client || !API_KEY) {
      return res.json({ text: 'Backend without API key: using generic explanation. Upload an image and I will describe possible contents.', fallback: true });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No image file received' });
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
      'Describe this image in detail and highlight key visible elements.',
      imagePart,
    ]);
    const response = await result.response;
    const text = response.text();
    const durationMs = Date.now() - startedAt;
    console.log(`🖼️ Analyze OK | type=${file.mimetype} size=${file.size}B duration=${durationMs}ms`);
    return res.json({ text, source: 'gemini' });
  } catch (err) {
    const message = err?.message || 'Unknown error';
    const isUserError = message.includes('File type not allowed') || message.includes('File too large');
    console.error('❌ Error analyzing image:', message);
    const file = req.file;
    if (file) {
      const durationMs = Date.now() - startedAt;
      console.log(`🖼️ Analyze FAIL | type=${file.mimetype} size=${file.size}B duration=${durationMs}ms reason=${message}`);
    }
    return res.status(isUserError ? 400 : 500).json({ error: isUserError ? 'Invalid request' : 'Error analyzing image', message });
  }
});

// Raindrop MCP SmartComponents endpoint
app.post('/api/raindrop/tool', async (req, res) => {
  const { toolName, args } = req.body;
  
  if (!toolName) {
    return res.status(400).json({ error: 'toolName required' });
  }

  try {
    const raindropStatus = getRaindropStatus();
    if (!raindropStatus.connected) {
      return res.status(503).json({ 
        error: 'Raindrop MCP not connected', 
        message: 'Raindrop MCP server is not available'
      });
    }

    const result = await callRaindropTool(toolName, args || {});
    res.json({ 
      success: true, 
      toolName, 
      result,
      source: 'raindrop-mcp'
    });
  } catch (err) {
    console.error('❌ Error calling Raindrop tool:', err);
    res.status(500).json({ 
      error: 'Error executing SmartComponent', 
      message: err.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || process.env.PROXY_PORT || 3002;
const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Proxy server listening on port ${PORT}`);
  console.log(`📊 Status: ${client ? '✅ Ready' : '⚠️  API key missing'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize Raindrop MCP
  try {
    await initRaindropMCP();
    console.log('🌧️ Raindrop MCP integrated successfully');
  } catch (error) {
    console.warn('⚠️  Raindrop MCP not available (continuing without it):', error.message);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received, closing server...');
  await closeRaindropMCP();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n👋 SIGINT received, closing server...');
  await closeRaindropMCP();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
