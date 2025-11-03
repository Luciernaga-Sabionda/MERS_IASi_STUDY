# ⚠️ IMPORTANTE: Configuración para la Demo

Para que el prototipo funcione completamente en la presentación, necesitas:

## 1. Configurar API Key de Gemini

Edita el archivo `.env`:
```
VITE_GEMINI_API_KEY=tu_api_key_real_aqui
```

## 2. Obtener la API Key

1. Ve a: https://makersuite.google.com/app/apikey
2. Crea una nueva API Key
3. Cópiala al archivo .env
4. Reinicia el servidor: `npm run dev`

## 3. Verificar que funciona

✅ El chatbot debe responder (no mostrar error de API)
✅ El análisis de imágenes debe funcionar
✅ SmartMemory debe mostrar datos

## 4. Para la demo sin internet

Si no tienes internet estable durante la presentación, he configurado datos mock en SmartMemory que funcionarán sin conexión.

## 5. URL para los jueces

Tu prototipo estará corriendo en: http://localhost:3002/

¡Listo para impresionar a los jueces! 🚀