// Utilidad para manejar la configuración de la API de Google Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getGeminiClient = (): GoogleGenerativeAI | null => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('API Key de Gemini no configurada');
    return null;
  }
  
  return new GoogleGenerativeAI(apiKey);
};

export const isApiKeyConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return !!(apiKey && apiKey !== 'your_gemini_api_key_here');
};

export const getApiKeyMessage = (): string => {
  return 'Para usar las funciones de IA, configura tu API Key de Google Gemini en el archivo .env:\n\n1. Obtén tu API Key en: https://makersuite.google.com/app/apikey\n2. Reemplaza "your_gemini_api_key_here" en el archivo .env con tu clave real\n3. Reinicia el servidor de desarrollo';
};