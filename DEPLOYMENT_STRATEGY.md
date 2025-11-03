# Configuración para El Campeonato de IA - Raindrop Deploy

## 🏆 Estrategia de Implementación

### Arquitectura Híbrida MERS
```
[Raindrop Demo] ←→ [Vultr Proxy] ←→ [Google Cloud MERS Core]
```

## 📦 Archivos para Raindrop

### 1. Componentes Principales (Subir a Raindrop):
- `App.tsx` - Aplicación principal con SmartMemory
- `components/SmartMemory.tsx` - SmartComponent requerido
- `components/` - Todos los componentes de visualización
- `package.json` - Dependencias de React

### 2. Configuración de Endpoints:
```typescript
// En SmartMemory.tsx, cambiar:
apiEndpoint: 'https://your-vultr-server.vultr.app/api/rec'

// En Chatbot.tsx, agregar fallback:
const PROXY_ENDPOINT = 'https://your-vultr-server.vultr.app/api/chat'
```

## 🌉 Configuración Vultr Proxy

### 1. Instalar en Vultr:
```bash
# En tu instancia Vultr
git clone [tu-repo]
cd vultr-proxy
npm install
npm start
```

### 2. Variables de Entorno:
```env
PORT=3001
MERS_API_TOKEN=your_google_cloud_token
GOOGLE_CLOUD_ENDPOINT=https://your-mers-system.com
```

### 3. Nginx Config (opcional):
```nginx
server {
    listen 80;
    server_name your-vultr-server.vultr.app;
    
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🎭 Demo Flow para Jueces

### 1. **Juez accede a Raindrop URL**
   - Ve la interfaz MERS completa
   - SmartMemory muestra datos en tiempo real
   - Chatbot responde sobre arquitectura

### 2. **SmartMemory demuestra conexión**
   - Botón "Actualizar" conecta a Vultr
   - Datos del REC real se muestran
   - Stats en tiempo real

### 3. **Proxy transparente**
   - Vultr reenvía requests a Google Cloud
   - Latencia mínima
   - Fallback a datos mock si falla

## 🔧 Comandos de Deploy

### Para Raindrop:
```bash
# Build para producción
npm run build

# Archivos a subir:
# - dist/ (todo el contenido)
# - package.json
# - README.md
```

### Para Vultr:
```bash
# Deploy del proxy
cd vultr-proxy
npm install --production
pm2 start server.js --name "mers-proxy"
```

## 📊 Métricas para Demostrar

### SmartMemory mostrará:
- **Experiencias totales**: Conectado al REC real
- **Lecciones humanas vs IA**: Datos auténticos
- **Confianza promedio**: Algoritmo ValidadorCriterio
- **Búsqueda en tiempo real**: Por área y patrón

### Health Check:
```
GET https://your-vultr-server.vultr.app/api/health
```
Respuesta:
```json
{
  "status": "healthy",
  "connections": {
    "googleCloud": "active",
    "raindrop": "ready"
  }
}
```

## 🎯 Ventajas de esta Estrategia

1. **No comprometes el sistema real**: MERS core intacto
2. **Cumples requisitos**: SmartMemory es un SmartComponent
3. **Demuestras integración**: Raindrop + Vultr funcionando
4. **Backup inteligente**: Datos mock si falla conexión
5. **Presentación profesional**: Arquitectura distribuida real

## 📝 Script de Presentación

> *"Esta demo muestra MERS funcionando en una arquitectura distribuida. El frontend está en Raindrop, el proxy en Vultr, pero el cerebro real está en nuestro sistema de producción Google Cloud. SmartMemory consulta nuestro REC en tiempo real, mostrando cómo un SmartComponent puede acceder a memoria distribuida."*

¿Listo para implementar esta estrategia? 🚀