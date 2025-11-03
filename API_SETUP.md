# 🔧 Configuración de API Keys para MERS-IASi Study

## 📋 Requisitos Previos

Para que todas las funciones de IA funcionen correctamente, necesitas configurar tu API Key de Google Gemini.

## 🔑 Configuración de Google Gemini API

### Paso 1: Obtener la API Key
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea un nuevo proyecto (si es necesario)
4. Genera una nueva API Key
5. Copia la clave generada

### Paso 2: Configurar en el proyecto
1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza `your_gemini_api_key_here` con tu clave real:
   ```
   VITE_GEMINI_API_KEY=tu_clave_real_aqui
   ```
3. Guarda el archivo

### Paso 3: Reiniciar el servidor
```bash
npm run dev
```

## ✅ Funciones habilitadas con la API Key

Con la API Key configurada correctamente, tendrás acceso a:

- **🤖 Chatbot inteligente**: Asistente conversacional sobre la arquitectura MERS
- **🖼️ Análisis de imágenes**: Descripción automática de imágenes con Gemini Vision
- **💬 Explicaciones contextuales**: Respuestas adaptativas según el nivel del usuario

## ⚠️ Funciones en desarrollo

Las siguientes funciones están preparadas pero requieren configuración adicional:
- **🎨 Generación de imágenes**: Requiere integración con DALL-E o APIs similares
- **🎬 Generación de video**: Requiere integración con Veo u otras APIs de video

## 🔒 Seguridad

- Nunca compartas tu API Key públicamente
- El archivo `.env` está incluido en `.gitignore` para proteger tus credenciales
- Las API Keys solo se usan en el cliente (aplicación web)

## 🆘 Solución de problemas

Si encuentras errores:

1. **"La propiedad 'env' no existe en el tipo 'ImportMeta'"**
   - Asegúrate de que existe el archivo `src/vite-env.d.ts`
   - Reinicia el servidor de desarrollo

2. **"No se ha configurado la clave de API"**
   - Verifica que la clave en `.env` no sea `your_gemini_api_key_here`
   - Revisa que no haya espacios extra en la configuración

3. **Errores de red o API**
   - Verifica que tu API Key sea válida
   - Comprueba tu conexión a internet
   - Revisa los límites de uso de tu API Key

## 📧 Contacto

Para soporte técnico del proyecto MERS-IASi Study, contacta a:
**Roxana A. Salazar M. (Luciérnaga Sabionda)**