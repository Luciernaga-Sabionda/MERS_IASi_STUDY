// Utilidad para manejar la configuración de la API de Google Gemini
// Actualizado para The AI Championship 2025 - MERS Hackathon
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getGeminiClient = (): GoogleGenerativeAI | null => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === 'pendiente_configurar') {
    console.warn('⚠️ API Key de Gemini no configurada o requiere OAuth2');
    return null;
  }
  
  try {
    // Intentar crear cliente con la API Key
    const client = new GoogleGenerativeAI(apiKey);
    console.log('✅ Google Gemini client inicializado para hackathon');
    return client;
  } catch (error) {
    console.error('❌ Error inicializando Gemini client:', error);
    return null;
  }
};

export const isApiKeyConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return !!(apiKey && apiKey !== 'your_gemini_api_key_here');
};

export const getApiKeyMessage = (): string => {
  return `🏆 MERS Hackathon - Configuración Google API:

STATUS: Tu API Key requiere OAuth2 (cuenta de servicio vinculada)

SOLUCIÓN RÁPIDA para hackathon:
1. Ve a: https://makersuite.google.com/app/apikey  
2. Crea nueva API Key SIN cuenta de servicio
3. Actualiza .env con la nueva key
4. Reinicia servidor

ALTERNATIVA: El sistema funcionará en modo simulado para demo`;
};