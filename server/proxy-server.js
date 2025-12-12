import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Manejadores de errores globales para prevenir cierre inesperado
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;
if (!API_KEY) {
  console.warn('Warning: GEMINI API key not found in environment. Set VITE_GEMINI_API_KEY or GEMINI_API_KEY in .env');
}

let client = null;
if (API_KEY) {
  try {
    client = new GoogleGenerativeAI(API_KEY);
    console.log('GoogleGenerativeAI client initialized');
  } catch (e) {
    console.error('Failed to init GoogleGenerativeAI:', e);
  }
}

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client
  });
});

// Endpoint de salud bajo /api para el proxy de Vite
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    missingApiKey: !API_KEY,
    clientReady: !!client
  });
});

app.post('/api/generate', async (req, res) => {
  if (!client) {
    return res.status(500).send('GoogleGenerativeAI client not initialized.');
  }

  try {
    const prompt = (req.body && req.body.prompt) ? req.body.prompt : '';
    if (!API_KEY) return res.status(500).send('Gemini API key not configured on server.');

    const model = client.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: 'Eres un asistente de IA para el proyecto MERS-IASi. Responde de forma clara y concisa.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('generated text length:', (text || '').length);
    res.json({ text });
  } catch (err) {
    console.error('Error calling Gemini:', err);
    res.status(500).send(err.message || 'Error interno');
  }
});

// Alias para compatibilidad con el frontend: Chatbot usa "/api/chat"
app.post('/api/chat', async (req, res) => {
  if (!client) {
    return res.status(500).send('GoogleGenerativeAI client not initialized.');
  }

  try {
    const prompt = (req.body && req.body.prompt) ? req.body.prompt : '';
    if (!API_KEY) return res.status(500).send('Gemini API key not configured on server.');

    const model = client.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: 'Eres un asistente de IA para el proyecto MERS-IASi. Responde de forma clara y concisa.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('generated text length (chat):', (text || '').length);
    res.json({ text });
  } catch (err) {
    console.error('Error calling Gemini (chat):', err);
    res.status(500).send(err.message || 'Error interno');
  }
});

const PORT = process.env.PROXY_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
});
