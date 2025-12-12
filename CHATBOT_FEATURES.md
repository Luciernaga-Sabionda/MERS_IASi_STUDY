# 🤖 Prototipo de Chatbot MERS-IASi

## ✨ Características Implementadas

### 🎨 Interfaz Mejorada
- **Diseño moderno**: Degradados violeta/púrpura con animaciones suaves
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Indicador de estado**: Muestra si el servidor está conectado (🟢/🔴)
- **Timestamps**: Cada mensaje muestra la hora de envío

### 💬 Funcionalidades del Chat
1. **Mensajes en tiempo real**: Comunicación fluida con el backend
2. **Indicador de escritura**: Puntos animados mientras el bot procesa
3. **Auto-scroll**: Se desplaza automáticamente a los mensajes nuevos
4. **Enfoque automático**: El input recibe foco al abrir el chat
5. **Historial persistente**: Los mensajes se mantienen durante la sesión

### 🎯 Experiencia de Usuario
- **Botón flotante**: Fácil acceso desde cualquier parte de la app
- **Animaciones**: Transiciones suaves y feedback visual
- **Estados visuales**: 
  - Botón pulsante cuando está cerrado
  - Cambia a X cuando está abierto
  - Degradados en mensajes del usuario
  - Bordes especiales en respuestas del bot

### 🔧 Funcionalidades Técnicas
- **Verificación de salud**: Comprueba la conexión del servidor cada 10s
- **Manejo de errores**: Muestra mensajes amigables si algo falla
- **Detección de tópicos**: Corrige respuestas off-topic sobre MERS
- **API Key validation**: Alerta si falta la clave de API

## 🚀 Cómo Usar

### Iniciar el Sistema
```bash
# Terminal 1: Iniciar el backend
node server/start-server.js

# Terminal 2: Iniciar el frontend
npm run dev
```

### Acceder al Chatbot
1. Abre la aplicación en el navegador (normalmente `http://localhost:5173`)
2. Busca el botón flotante violeta en la esquina inferior derecha
3. Haz clic para abrir el chatbot
4. Escribe tu mensaje y presiona Enter o el botón de enviar

## 💡 Ejemplos de Preguntas

Puedes preguntarle al chatbot sobre:
- ¿Qué es MERS-IASi?
- ¿Cómo funciona la arquitectura?
- Explícame el análisis satelital SAR
- ¿Qué tecnologías usan?
- ¿Cómo se integra con Vultr?
- Información sobre Raindrop y Google Cloud

## 🎨 Personalización

### Cambiar Colores
En el archivo `Chatbot.tsx`, busca las clases de Tailwind:
```tsx
// Botón flotante
from-violet-600 to-purple-600

// Mensajes del usuario
from-violet-600 to-purple-600

// Mensajes del bot
bg-gray-700
```

### Ajustar Tamaño
```tsx
// Ventana del chat
w-96 h-[32rem]  // Ancho y alto
```

### Modificar Mensaje de Bienvenida
```tsx
// En useEffect cuando isOpen === true
text: '👋 Tu mensaje personalizado aquí'
```

## 🔮 Próximas Mejoras Sugeridas

1. **Persistencia**: Guardar historial en localStorage
2. **Exportar conversación**: Botón para descargar el chat
3. **Comandos rápidos**: Sugerencias de preguntas frecuentes
4. **Modo oscuro/claro**: Toggle para cambiar tema
5. **Adjuntar imágenes**: Soporte para análisis visual
6. **Voz**: Text-to-speech y speech-to-text
7. **Multi-idioma**: Soporte para varios idiomas
8. **Notificaciones**: Alertas cuando llega una respuesta

## 📊 Estado del Prototipo

- ✅ Interfaz completa
- ✅ Conexión backend/frontend
- ✅ Manejo de errores
- ✅ Animaciones
- ✅ Responsive
- ✅ Timestamps
- ✅ Indicadores de estado
- 🔄 Mejoras futuras planificadas

## 🐛 Troubleshooting

### El chatbot no se conecta
1. Verifica que el backend esté corriendo: `node server/start-server.js`
2. Comprueba que tengas el archivo `.env` con `GEMINI_API_KEY`
3. Revisa la consola del navegador (F12) para ver errores

### Las respuestas son lentas
- Es normal un pequeño delay mientras Gemini procesa la consulta
- El indicador de "escribiendo" te muestra que está procesando

### Error de API Key
- Asegúrate de tener una key válida de Google AI Studio
- Verifica que esté correctamente en el archivo `.env`

## 📝 Notas Técnicas

- **Backend**: Node.js + Express + Google Generative AI
- **Frontend**: React + TypeScript + Tailwind CSS
- **Estado**: React Hooks (useState, useEffect, useRef)
- **Comunicación**: Fetch API con proxy en Vite

---

**Desarrollado para MERS-IASi - The AI Championship 2025** 🛰️✨
