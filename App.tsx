import React from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { FlowDiagram } from './components/FlowDiagram';
import { SynapticDiagram } from './components/SynapticDiagram';
import { MicroserviceCard } from './components/MicroserviceCard';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { ImageGenerator } from './components/ImageGenerator';
import { VideoGenerator } from './components/VideoGenerator';
import { SmartMemory } from './components/SmartMemory';
import { Chatbot } from './components/Chatbot';
import { BookOpenIcon, CodeIcon, CogIcon, EyeIcon, PhotoIcon, VideoCameraIcon, DatabaseIcon } from './components/Icons';

function App() {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        
        <Section title="Arquitectura de Flujo Cognitivo" icon={<CogIcon className="w-8 h-8 md:w-10 md:h-10" />}>
          <p className="max-w-3xl mx-auto text-center text-gray-400 mb-12">
            La arquitectura MERS (Modelo de Enseñanza y Refuerzo Supervisado) procesa, valida, almacena y expone el conocimiento de forma adaptativa. A continuación se detallan los componentes principales del Hemisferio B, encargado del aprendizaje y la enseñanza.
          </p>
          <FlowDiagram />
        </Section>
        
        <Section title="Diagrama Sináptico" icon={<BookOpenIcon className="w-8 h-8 md:w-10 md:h-10" />}>
           <SynapticDiagram />
        </Section>

        <Section title="Componentes y Microservicios" icon={<CodeIcon className="w-8 h-8 md:w-10 md:h-10" />}>
          <p className="max-w-3xl mx-auto text-center text-gray-400 mb-12">
            La implementación se basa en una arquitectura de microservicios para garantizar escalabilidad, mantenibilidad y despliegue independiente de cada componente funcional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MicroserviceCard name="Gateway de Entrada" technologies="Node.js, Express, gRPC">
              Punto de entrada único. Gestiona la autenticación, el enrutamiento y la normalización de las peticiones.
            </MicroserviceCard>
            <MicroserviceCard name="Servicio de Validación" technologies="Python, TensorFlow, Scikit-learn">
              Implementa la lógica de la Neurona Ejecutiva (ValidadorCriterio) para puntuar y decidir sobre el conocimiento entrante.
            </MicroserviceCard>
            <MicroserviceCard name="Servicio de Memoria (REC)" technologies="Go, MongoDB, Pinecone">
              Gestiona el almacenamiento y la recuperación de experiencias en el Repositorio de Experiencias Contextuales.
            </MicroserviceCard>
            <MicroserviceCard name="Servicio de Explicación" technologies="Python, FastAPI, Gemini API">
              Genera las explicaciones utilizando el patrón Strategy y se apoya en modelos generativos para adaptar el lenguaje.
            </MicroserviceCard>
            <MicroserviceCard name="Servicio de Refuerzo" technologies="Python, Keras, RabbitMQ">
              Procesa el feedback del usuario y recalcula los pesos y estrategias del modelo de aprendizaje por refuerzo.
            </MicroserviceCard>
            <MicroserviceCard name="Broker de Mensajes" technologies="RabbitMQ / Kafka">
              Facilita la comunicación asíncrona y desacoplada entre los diferentes microservicios del sistema.
            </MicroserviceCard>
          </div>
        </Section>
        
        <Section title="Análisis de Imágenes con Gemini" icon={<EyeIcon className="w-8 h-8 md:w-10 md:h-10" />}>
            <ImageAnalyzer />
        </Section>
        
        <Section title="Generación de Imágenes con Imagen" icon={<PhotoIcon className="w-8 h-8 md:w-10 md:h-10" />}>
            <ImageGenerator />
        </Section>
        
        <Section title="Generación de Video con Veo" icon={<VideoCameraIcon className="w-8 h-8 md:w-10 md:h-10" />}>
            <VideoGenerator />
        </Section>

        <Section title="SmartMemory - REC Inspector" icon={<DatabaseIcon className="w-8 h-8 md:w-10 md:h-10" />}>
            <SmartMemory apiEndpoint="https://your-vultr-proxy.com/api/rec" />
        </Section>

      </main>
      <Chatbot />
      <footer className="text-center py-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Arquitectura Cognitiva IASi–MERS. Todos los derechos reservados.</p>
        <p className="text-gray-500 text-sm mt-2">
          Sello de la Creadora: <span className="font-semibold text-cyan-400">Roxana A. Salazar M. (Luciérnaga Sabionda)</span>
        </p>
      </footer>
    </div>
  );
}

export default App;