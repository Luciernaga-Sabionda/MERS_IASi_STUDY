# 🚨 SOLUCIÓN RÁPIDA - Google API Key para Hackathon

## PROBLEMA ENCONTRADO:
Tu API Key está vinculada a cuenta de servicio y requiere OAuth2, no API Key directa.

## SOLUCIÓN A: API Key Directa (RECOMENDADA PARA HACKATHON)

### Crear nueva API Key SIN cuenta de servicio:

1. Ve a: https://console.cloud.google.com/apis/credentials
2. Click "Crear credenciales" → "Clave de API"  
3. **IMPORTANTE**: NO selecciones "Autenticar las llamadas a la API a través de una cuenta de servicio"
4. **Restricciones de aplicaciones**: Ninguno (por ahora)
5. **Restricciones de API**: No restringir clave (por ahora)
6. Click "CREAR"

### URLs de Google AI Studio (Alternativa más fácil):
- Ve a: https://makersuite.google.com/app/apikey
- Click "Create API key"
- Select your project
- Copy the key

## SOLUCIÓN B: Usar OAuth2 (Más complejo, para después del hackathon)

Si quieres mantener la cuenta de servicio, necesitaremos:
1. Archivo JSON de credenciales de la cuenta de servicio
2. Configurar OAuth2 flow
3. Obtener access tokens dinámicamente

## RECOMENDACIÓN INMEDIATA:

**Para el hackathon, crea una API Key simple sin cuenta de servicio:**

1. Google AI Studio: https://makersuite.google.com/app/apikey
2. O Google Cloud Console sin vincular cuenta de servicio
3. Úsala directamente en el código

¿Quieres que creemos la API Key simple ahora, o prefieres configurar OAuth2?