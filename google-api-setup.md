# 🔧 CONFIGURACIÓN INMEDIATA - Google API Key

# Una vez tengas tu Google API Key, ejecuta esto:

# 1. Crear archivo .env local (REEMPLAZA con tu key real)
echo "REACT_APP_GOOGLE_API_KEY=AIza..." > .env.local
echo "GOOGLE_API_KEY=AIza..." >> .env.local

# 2. Test inmediato de la API
curl -X POST \
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=TU_API_KEY_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hola, soy MERS para The AI Championship 2025"
      }]
    }]
  }'

# 3. Actualizar el código de MERS
# (Lo haré automáticamente cuando me pases la key)