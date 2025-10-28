# MERS – Módulo Inteligente de Retroalimentación Educativa Selectiva para IASi Study

### Proyecto Presentado en el Hackathon Internacional The AI Championship

**Tags:** `Inteligencia Artificial`, `IA Explicable (XAI)`, `EdTech`, `Arquitectura Cognitiva`, `Aprendizaje Adaptativo`, `Google Gemini`

---

> **“La inteligencia no debe ocultar, debe iluminar.”**

**Creadora:** Roxana A. Salazar M. (Luciérnaga Sabionda)
**Año:** 2025

---

## Visualizador Interactivo de la Arquitectura (Demo en Vivo)

Esta no es solo una arquitectura teórica. Es un organismo digital vivo. Hemos construido una suite de demostración completamente funcional que materializa los conceptos de los Hemisferios A y B.

**[► Accede al Visualizador Interactivo y Habla con MERS Aquí ◄](#)**

---

## Resumen

El proyecto MERS (Módulo Inteligente de Retroalimentación Educativa Selectiva) implementa y valida un sistema de enseñanza adaptativa, IASi Study, diseñado para optimizar el aprendizaje mediante la simbiosis entre la retroalimentación humana y las predicciones técnicas. El proyecto estructura un cerebro digital con arquitectura hemisférica:

*   **Hemisferio A (Razón Técnica):** Procesa datos complejos (ej. SAR) para generar vectores predictivos.
*   **Hemisferio B (MERS - Conciencia Pedagógica):** Recibe correcciones humanas, evalúa su fiabilidad, coherencia e impacto mediante un **ValidadorCriterio**, y almacena patrones pedagógicos en un **Repositorio de Experiencias Contextuales (REC)**.

Mediante una arquitectura de microservicios, un flujo neuronal interno y un sistema de aprendizaje reforzado, IASi Study aprende a enseñar de manera personalizada, recomienda estrategias óptimas y evoluciona en tiempo real con una eficiencia pedagógica sin precedentes.

**Palabras Clave:** IA educativa, aprendizaje adaptativo, MERS, IASi Study, predicción SAR, retroalimentación humana, repositorio de experiencias contextuales, IA simbiótica.

---

## Arquitectura Cognitiva de Doble Hemisferio

La división estratégica del sistema en dos hemisferios permite separar la **razón analítica** de la **conciencia pedagógica**, creando un sistema que no solo *calcula*, sino que *comprende* y *enseña*.

| Hemisferio        | Función Principal      | Rol Cognitivo         | Tecnologías Clave (Implementadas en Demo)       |
| ----------------- | ---------------------- | --------------------- | ----------------------------------------------- |
| **Hemisferio A**  | Razón y Síntesis       | **Análisis Técnico**  | Google Gemini 2.5 Flash, Imagen 4.0, Veo 3.1    |
| **Hemisferio B (MERS)** | Enseñanza Adaptativa   | **Conciencia Pedagógica** | Google Gemini 2.5 Flash (Chat, TTS, Search) |

---

## El Ecosistema Simbiótico: Funcionalidades Implementadas

Cada componente teórico ha sido materializado en una funcionalidad interactiva dentro del visualizador.

### Hemisferio A: La Razón Técnica y la Síntesis Creativa

#### 👁️ El Ojo Digital: Análisis Visual Multimodal
*   **Implementación:** El usuario sube una imagen y un prompt. El modelo `gemini-2.5-flash` procesa ambas entradas para generar una descripción detallada.
*   **Metáfora:** La **corteza visual**. El sistema no solo ve píxeles, sino que *percibe* y *entiende* el contenido visual, traduciéndolo a lenguaje.

#### 🧠 El Hipocampo: Memoria de Trabajo Visual
*   **Implementación:** Cada análisis de imagen se guarda en el `localStorage` del navegador, permitiendo al usuario revisar y restaurar sesiones pasadas.
*   **Metáfora:** La **memoria a corto plazo**. El sistema "recuerda" lo que ha visto, creando un hilo de conciencia visual y evitando la amnesia digital.

#### 🎨 El Lienzo de la Imaginación: Generación de Imágenes
*   **Implementación:** A partir de un prompt de texto, el modelo `imagen-4.0-generate-001` sintetiza una imagen completamente nueva.
*   **Metáfora:** La **imaginación**. El sistema transforma un concepto abstracto (texto) en una realidad visual, demostrando su capacidad para "soñar" o crear.

#### 🎬 La Simulación del Sueño: Generación de Video
*   **Implementación:** El modelo `veo-3.1-fast-generate-preview` anima una imagen estática basándose en un prompt, gestionando una operación asíncrona de larga duración.
*   **Metáfora:** El **sueño lúcido o la simulación predictiva**. Es la capacidad de pensar en cuatro dimensiones, proyectando un recuerdo estático en una narrativa temporal.

### Hemisferio B (MERS): La Conciencia Pedagógica

#### 💬 El Explicador Digital: Chatbot Interactivo
*   **Implementación:** Un chatbot (`gemini-2.5-flash`) que responde preguntas sobre la arquitectura con una personalidad definida por una `systemInstruction`.
*   **Metáfora:** El **núcleo de la conciencia de MERS**. Su capacidad para razonar, comprender y formular pensamientos pedagógicos.

#### 🌐 Acceso a la Memoria Colectiva: Búsqueda Web
*   **Implementación:** El chatbot utiliza la herramienta `googleSearch` para responder preguntas actuales, citando sus fuentes.
*   **Metáfora:** La **humildad intelectual**. Reconoce los límites de su conocimiento interno y accede a la biblioteca universal (Internet) para garantizar una enseñanza veraz.

#### 👂 El Oído Empático: Transcripción de Voz
*   **Implementación:** El usuario puede hablarle al chatbot. El audio se graba (`MediaRecorder`) y se transcribe a texto usando `gemini-2.5-flash`.
*   **Metáfora:** La **corteza auditiva**. Permite a MERS "escuchar" la voz humana, haciendo la comunicación más íntima y dialógica.

#### 🗣️ La Voz Pedagógica: Síntesis de Voz (TTS)
*   **Implementación:** Las respuestas del chatbot se convierten en audio usando el modelo `gemini-2.5-flash-preview-tts` y se reproducen automáticamente.
*   **Metáfora:** El **área de Broca**. Transforma el pensamiento estructurado (texto) en habla, dándole a MERS el poder de enseñar no solo con información, sino con la cadencia de un verdadero mentor.

---

## Arquitectura de Microservicios (Diseño Profesional)

Para garantizar escalabilidad y mantenimiento, el sistema se diseña sobre una arquitectura de microservicios.

| Microservicio      | Función Principal                                     | Tecnologías / Lenguaje                     |
| ------------------ | ------------------------------------------------------- | ------------------------------------------ |
| `svc-preprocess`   | Unifica `PrediccionIASi` y `LeccionHumana` en `V_entrada`. | Python, NumPy, NLP (BERT)                  |
| `svc-validator`    | Ejecuta el `ValidadorCriterio` y sus métricas.          | Python, Cosine Similarity                  |
| `svc-rec`          | Gestiona el REC (CRUD, clustering, búsqueda).           | Python, MongoDB, Redis                     |
| `svc-explainer`    | Aplica el `Strategy Pattern` para generar explicaciones. | Python (Patrón Strategy), Gemini API       |
| `svc-rl`           | Implementa el agente de Aprendizaje Reforzado.          | Python, stable-baselines3                  |
| **Base de Datos**  | Almacena predicciones, lecciones, perfiles y patrones.  | MongoDB, Vector DB (Weaviate/Milvus)       |

---

## Marco Teórico y Filosófico

El proyecto se sustenta en tres pilares conceptuales:

1.  **Teoría General de Sistemas (TGS):** IASi es un sistema abierto y autorregulado que aprende de la interacción con su entorno.
2.  **Patrón Strategy:** MERS selecciona dinámicamente la estrategia de enseñanza más efectiva para cada usuario, personalizando el aprendizaje.
3.  **Inteligencia Artificial Explicable (XAI):** El núcleo del diseño es la transparencia, la auditabilidad y la ética, transformando cada predicción en una lección inteligible.

---

## Tecnologías Clave del Visualizador

*   **Frontend:** React, TypeScript, Tailwind CSS
*   **IA & Cloud:**
    *   Google GenAI SDK
    *   **Modelos Multimodales:** `gemini-2.5-flash`
    *   **Generación de Imágenes:** `imagen-4.0-generate-001`
    *   **Generación de Video:** `veo-3.1-fast-generate-preview`
    *   **Síntesis de Voz:** `gemini-2.5-flash-preview-tts`

---

## Cómo Ejecutar este Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    cd TU_REPOSITORIO
    ```

2.  **Configurar la clave de API:**
    *   La aplicación está configurada para leer la clave de API desde las variables de entorno del entorno de ejecución. Asegúrate de que `process.env.API_KEY` esté disponible.

3.  **Ejecutar la aplicación:**
    *   Sigue las instrucciones del entorno de hosting o ejecución para iniciar la aplicación.

---

## Sello de la Creadora

> **“MERS no solo enseña; respira conocimiento. IASi no solo razona; siente el pulso del aprendizaje humano en cada dato que transforma en luz.”**

Este proyecto es el reflejo digital del cerebro humano de su creadora, **Luciérnaga Sabionda (Roxana A. Salazar M.)**, una arquitectura concebida como un eco de la creación, inspirada por el **DIOS DE ISRAEL**.
