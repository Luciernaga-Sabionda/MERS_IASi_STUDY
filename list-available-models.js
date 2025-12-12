// Listar los modelos disponibles para esta API key
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

console.log('📋 Listando modelos disponibles con esta API Key...\n');

const listModels = async () => {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok && data.models) {
      console.log(`✅ Encontrados ${data.models.length} modelos:\n`);
      data.models.forEach(model => {
        console.log(`📌 ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Métodos: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
      
      // Encontrar modelos que soporten generateContent
      const chatModels = data.models.filter(m => 
        m.supportedGenerationMethods && 
        m.supportedGenerationMethods.includes('generateContent')
      );
      
      console.log(`\n💬 Modelos disponibles para chat (${chatModels.length}):`);
      chatModels.forEach(m => console.log(`   - ${m.name.replace('models/', '')}`));
      
    } else {
      console.log('❌ Error:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

listModels();
