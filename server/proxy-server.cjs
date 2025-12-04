// proxy-server.cjs (CommonJS build to work with package.json type:module)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;

if (!API_KEY) {
  console.warn('Warning: GEMINI API key not found in environment. Set GEMINI_API_KEY or VITE_GEMINI_API_KEY in .env');
}

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/generate', async (req, res) => {
  try {
    const prompt = (req.body && req.body.prompt) ? req.body.prompt : '';
    if (!API_KEY) return res.status(500).send('Gemini API key not configured on server.');

    const client = new GoogleGenerativeAI(API_KEY);
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'Eres un asistente de IA para el proyecto MERS-IASi. Responde de forma clara y concisa.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (err) {
    console.error('Error calling Gemini:', err);
    res.status(500).send(err.message || 'Error interno');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
});
