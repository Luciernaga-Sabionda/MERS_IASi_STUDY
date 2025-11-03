# 🏆 MERS - Módulo Inteligente de Retroalimentación Educativa Selectiva

> **Prototipo funcional para The AI Championship 2025**  
> **Creado por:** Roxana A. Salazar M. (Luciérnaga Sabionda)

## 🚀 Demo en Vivo

```bash
npm install
npm run dev
# Abrir: http://localhost:3000
```

## 🧠 ¿Qué es MERS?

MERS es un sistema de enseñanza adaptativa con **arquitectura cognitiva hemisférica** que aprende a enseñar mediante la simbiosis entre retroalimentación humana y predicciones de IA.

### Arquitectura Hemisférica:
- **Hemisferio A (Razón Técnica)**: Procesa datos complejos (SAR, imágenes, etc.)
- **Hemisferio B (MERS - Conciencia Pedagógica)**: Valida, almacena y explica conocimiento

## ✨ Funcionalidades Implementadas

### 🎯 SmartMemory - REC Inspector (SmartComponent)
- Visualiza el **Repositorio de Experiencias Contextuales** en tiempo real
- Dashboard con estadísticas de lecciones humanas vs predicciones IA
- Búsqueda y filtrado por área de conocimiento
- Conexión preparada para arquitectura distribuida

### 🤖 Chatbot Inteligente
- Asistente conversacional sobre la arquitectura MERS
- Powered by Google Gemini 1.5-flash
- Explicaciones adaptativas según nivel del usuario

### 👁️ Análisis Visual Multimodal
- Análisis de imágenes con Gemini Vision
- Descripción detallada de contenido visual
- Integración con el sistema cognitivo

### 📊 Diagramas Interactivos
- **Flujo Cognitivo**: Visualización de los 5 componentes MERS
- **Diagrama Sináptico**: Animación del flujo neuronal
- **Arquitectura de Microservicios**: 6 servicios distribuidos

## 🏗️ Arquitectura Técnica

### Frontend (React + TypeScript)
```
├── components/
│   ├── SmartMemory.tsx      # SmartComponent principal
│   ├── Chatbot.tsx          # IA conversacional
│   ├── ImageAnalyzer.tsx    # Análisis visual
│   ├── FlowDiagram.tsx      # Arquitectura cognitiva
│   └── SynapticDiagram.tsx  # Flujo neuronal
├── utils/
│   └── gemini.ts            # Cliente Google AI
└── vultr-proxy/             # Servidor proxy para desafío
    └── server.js
```

### Backend (Microservicios)
- **Gateway de Entrada**: Node.js, Express, gRPC
- **Servicio de Validación**: Python, TensorFlow (ValidadorCriterio)
- **Servicio de Memoria**: Go, MongoDB, Pinecone (REC)
- **Servicio de Explicación**: Python, FastAPI, Gemini
- **Servicio de Refuerzo**: Python, Keras, RabbitMQ
- **Broker de Mensajes**: RabbitMQ/Kafka

## 🌐 Preparado para el Desafío

### Integración Raindrop + Vultr
```
[Raindrop Demo] ←→ [Vultr Proxy] ←→ [Google Cloud MERS Core]
```

- **Capa Demo (Raindrop)**: Frontend con SmartMemory
- **Puente (Vultr)**: Proxy server para conectividad
- **Core (Google Cloud)**: Sistema MERS completo

### Configuración del Proxy
```bash
cd vultr-proxy
npm install
npm start
# Proxy corriendo en puerto 3001
```

## 🔧 Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar API Key (opcional para demo básica)
```bash
# .env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Ejecutar
```bash
npm run dev
```

## 🎯 Componentes del ValidadorCriterio

El **SmartMemory** demuestra el algoritmo central de MERS:

```typescript
score = 0.5 * Confianza + 0.4 * Coherencia + 0.1 * Impacto
// Acepta experiencias con score > 0.7
```

## 📊 Métricas Demostradas

- **Experiencias Totales**: Almacenadas en REC
- **Lecciones Humanas**: Retroalimentación validada
- **Predicciones IA**: Datos del Hemisferio A
- **Confianza Promedio**: Algoritmo ValidadorCriterio

## 🏆 Impacto y Visión

MERS democratiza el acceso a educación personalizada mediante:
- **Aprendizaje Equitativo**: Tutor socrático adaptativo
- **Accesibilidad**: Compatible con diversas capacidades
- **Pensamiento Crítico**: Enseña evaluación de fuentes
- **Conocimiento Técnico**: Traduce complejidad en claridad

## 🚀 Próximos Pasos

1. **Integración IASi**: Incorporación al sistema principal
2. **Escalamiento**: Despliegue en arquitectura distribuida
3. **APIs Avanzadas**: Generación de imagen/video completa
4. **ML Avanzado**: Optimización del ValidadorCriterio

---

## 📄 Documentación Adicional

- [DEMO_README.md](./DEMO_README.md) - Guía de demostración
- [DEPLOYMENT_STRATEGY.md](./DEPLOYMENT_STRATEGY.md) - Estrategia Raindrop/Vultr
- [API_SETUP.md](./API_SETUP.md) - Configuración de APIs

---

**🌟 "La inteligencia no debe ocultar, debe iluminar." - Roxana A. Salazar M.**

[![Made for The AI Championship 2025](https://img.shields.io/badge/Made%20for-The%20AI%20Championship%202025-gold?style=for-the-badge)](https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-red?style=for-the-badge&logo=google)](https://ai.google.dev/)