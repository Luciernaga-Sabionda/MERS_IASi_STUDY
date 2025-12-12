# 🚀 Guía de Inicio Rápido - MERS IASi Study

## ⚡ Configuración en 5 Minutos

### Paso 1: Instalar Dependencias
```bash
npm install
```

### Paso 2: Obtener API Key de Google Gemini

1. **Visita** [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Inicia sesión** con tu cuenta de Google
3. **Crea una API Key**:
   - Haz clic en "Create API Key"
   - Selecciona un proyecto o crea uno nuevo
   - Copia la clave generada (comienza con `AIza...`)

### Paso 3: Configurar la API Key

#### Opción A: Usando el archivo .env (Recomendado)
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env y reemplazar:
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Con tu clave real:
VITE_GEMINI_API_KEY=AIzaSyC-Tu_Clave_Real_Aqui
```

#### Opción B: Crear .env desde cero
```bash
# Crear archivo .env en la raíz del proyecto
echo "VITE_GEMINI_API_KEY=AIzaSyC-Tu_Clave_Real_Aqui" > .env
```

### Paso 4: Iniciar la Aplicación
```bash
npm start
```

La aplicación se abrirá automáticamente en:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3002

---

## ✅ Verificar que Todo Funciona

### 1. Verificar Servidor Backend
Deberías ver en la consola:
```
✅ GoogleGenerativeAI client initialized
🚀 Proxy server listening on port 3002
✅ Raindrop MCP Server conectado exitosamente
```

### 2. Probar el Chatbot
1. Haz clic en el botón morado flotante (abajo derecha)
2. Escribe: "¿Qué es MERS?"
3. Deberías recibir una respuesta de la IA

### 3. Probar Análisis de Imágenes
1. Ve a la sección "AI Capabilities"
2. Sube una imagen en "Image Analyzer"
3. Haz clic en "Analizar Imagen"
4. Deberías ver un análisis detallado

---

## ⚠️ Solución de Problemas

### "API Key ausente" o "missingApiKey: true"

**Causas comunes:**
- El archivo `.env` no existe
- El archivo `.env` está en el lugar incorrecto
- La variable no se llama `VITE_GEMINI_API_KEY`
- No reiniciaste el servidor después de crear `.env`

**Solución:**
```bash
# 1. Verifica que el archivo existe
ls -la .env

# 2. Verifica el contenido
cat .env

# 3. Debe contener:
VITE_GEMINI_API_KEY=AIzaSy...

# 4. Reinicia el servidor
# Presiona Ctrl+C para detener
npm start
```

### "Invalid API Key" o Error 400

**Causas comunes:**
- La API Key está mal copiada
- Hay espacios antes/después de la clave
- La clave fue revocada o eliminada

**Solución:**
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Genera una nueva API Key
3. Cópiala completa (sin espacios)
4. Actualiza tu archivo `.env`

### Estilos no se cargan (página en blanco)

**Solución:**
```bash
npm install @tailwindcss/vite
npm start
```

### Puerto 5173 ya en uso

**Solución:**
```bash
# Opción 1: Matar el proceso
# Windows:
netstat -ano | findstr :5173
taskkill /PID <número_PID> /F

# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Opción 2: Usar otro puerto
# Editar vite.config.ts y cambiar el puerto
```

---

## 📚 Próximos Pasos

Una vez que todo funcione, explora:

1. **Chatbot Inteligente** - Pregunta sobre arquitectura MERS
2. **Image Analyzer** - Sube imágenes y obtén análisis detallados
3. **SmartInference** - Prueba el ValidadorCriterio
4. **SmartMemory** - Explora el REC (Repositorio de Experiencias)
5. **Raindrop Demo** - Interactúa con las 18 herramientas MCP
6. **Diagramas Interactivos** - Visualiza la arquitectura cognitiva

---

## 🆘 ¿Necesitas Ayuda?

- **Documentación completa:** Ver [README.md](./README.md)
- **Issues:** [GitHub Issues](https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY/issues)
- **Email:** contacto@mers-iasi.com

---

## 🎯 Para el Hackathon

Si estás evaluando este proyecto para **The AI Championship 2025**:

1. ✅ Todas las funcionalidades están operativas
2. ✅ Backend conectado a Google Gemini
3. ✅ Integración Raindrop MCP activa (18 herramientas)
4. ✅ Arquitectura cognitiva hemisférica implementada
5. ✅ SmartComponents funcionales

**Tiempo estimado de setup:** 5 minutos
**Dificultad:** Muy fácil (solo necesitas una API Key gratuita)

¡Disfruta explorando MERS! 🚀
