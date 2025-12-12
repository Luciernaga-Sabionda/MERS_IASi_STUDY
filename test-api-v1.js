// Prueba directa con fetch para verificar la API key
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

console.log('🔑 Verificando API Key...\n');

// Probar con la API v1 directamente
const testWithV1 = async () => {
  const modelsToTry = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash-002',
    'gemini-1.5-pro-002'
  ];
  
  for (const modelName of modelsToTry) {
    console.log(`\n🧪 Probando: ${modelName}`);
    const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${API_KEY}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: '¿Qué es MERS-IASi?' }]
          }]
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${modelName} - FUNCIONA!`);
        console.log('📝 Respuesta:', data.candidates[0].content.parts[0].text.substring(0, 100) + '...');
        return modelName;
      } else {
        console.log(`❌ ${modelName} - Error: ${data.error.message.split('\n')[0]}`);
      }
    } catch (error) {
      console.error(`❌ ${modelName} - ${error.message}`);
    }
  }
  return null;
};

testWithV1();
