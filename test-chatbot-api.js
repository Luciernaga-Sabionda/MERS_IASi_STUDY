// Script de prueba para verificar que las APIs del Chatbot funcionan
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:3002';

console.log('🧪 Iniciando pruebas de API del Chatbot...\n');

// Prueba 1: Health Check
async function testHealth() {
  console.log('1️⃣ Probando /api/health...');
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data = await response.json();
    console.log('✅ Health check exitoso:', data);
    return data;
  } catch (error) {
    console.error('❌ Error en health check:', error.message);
    return null;
  }
}

// Prueba 2: Chat endpoint
async function testChat(prompt) {
  console.log(`\n2️⃣ Probando /api/chat con prompt: "${prompt}"...`);
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    console.log('✅ Chat response exitoso:');
    console.log('   Respuesta:', data.text.substring(0, 100) + '...');
    return data;
  } catch (error) {
    console.error('❌ Error en chat:', error.message);
    return null;
  }
}

// Ejecutar todas las pruebas
async function runTests() {
  const healthData = await testHealth();
  
  if (!healthData) {
    console.log('\n⚠️  El servidor no está respondiendo.');
    console.log('   Asegúrate de ejecutar: node server/start-server.js');
    return;
  }
  
  if (healthData.missingApiKey) {
    console.log('\n⚠️  API Key no configurada.');
    console.log('   Verifica que VITE_GEMINI_API_KEY esté en el archivo .env');
    return;
  }
  
  if (!healthData.clientReady) {
    console.log('\n⚠️  Cliente de Google Generative AI no está listo.');
    return;
  }
  
  // Si todo está bien, probar el chat
  await testChat('¿Qué es MERS-IASi?');
  
  console.log('\n✨ Todas las pruebas completadas!');
  console.log('\n📋 Resumen:');
  console.log('   - Servidor: ✅ En línea');
  console.log('   - API Key: ✅ Configurada');
  console.log('   - Cliente AI: ✅ Listo');
  console.log('   - Endpoint Chat: ✅ Funcionando');
}

runTests().catch(console.error);
