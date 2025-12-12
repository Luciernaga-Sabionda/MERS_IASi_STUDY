// Script para listar modelos disponibles en Google Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('❌ API Key no encontrada');
  process.exit(1);
}

console.log('🔍 Listando modelos disponibles...\n');

const genAI = new GoogleGenerativeAI(API_KEY);

// Intentar con diferentes modelos comunes
const modelsToTest = [
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro',
  'gemini-pro-vision'
];

for (const modelName of modelsToTest) {
  try {
    console.log(`Probando modelo: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Hola');
    const response = await result.response;
    console.log(`✅ ${modelName} - FUNCIONA`);
  } catch (error) {
    console.log(`❌ ${modelName} - ${error.message.split('\n')[0]}`);
  }
}

console.log('\n✨ Prueba completada');
