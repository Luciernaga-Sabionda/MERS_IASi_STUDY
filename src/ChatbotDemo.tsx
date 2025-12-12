import React from 'react';
import { Chatbot } from '../components/Chatbot';
import { ChatSuggestions, HelpTooltip, ChatBanner } from '../components/ChatbotExtras';

/**
 * 🎨 Página de Demo del Chatbot
 * Muestra todas las características del sistema de chat
 */

export const ChatbotDemo: React.FC = () => {
  const handleSuggestion = (prompt: string) => {
    console.log('📝 Sugerencia seleccionada:', prompt);
    // Aquí podrías implementar la lógica para enviar automáticamente el prompt al chatbot
    alert(`Pregunta sugerida: ${prompt}\n\n¡Abre el chatbot para hacer esta pregunta!`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Banner superior */}
      <ChatBanner />

      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            🤖 MERS-IASi Chatbot
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Tu asistente inteligente para análisis satelital y arquitectura de sistemas
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-violet-500/30">
              <span className="text-violet-400 font-semibold">✨ IA Conversacional</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-purple-500/30">
              <span className="text-purple-400 font-semibold">🔄 Respuestas en Tiempo Real</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg border border-pink-500/30">
              <span className="text-pink-400 font-semibold">🎯 Contexto Especializado</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon="💬"
            title="Chat Inteligente"
            description="Respuestas contextuales sobre MERS-IASi y tecnologías satelitales"
          />
          <FeatureCard
            icon="🎨"
            title="Diseño Moderno"
            description="Interfaz intuitiva con animaciones suaves y degradados elegantes"
          />
          <FeatureCard
            icon="⚡"
            title="Tiempo Real"
            description="Indicadores de estado y escritura para mejor experiencia"
          />
          <FeatureCard
            icon="🔒"
            title="Seguro"
            description="API keys protegidas en el backend, nunca expuestas al cliente"
          />
          <FeatureCard
            icon="📱"
            title="Responsive"
            description="Se adapta perfectamente a móviles, tablets y desktop"
          />
          <FeatureCard
            icon="🌐"
            title="Multi-contexto"
            description="Puede responder sobre arquitectura, APIs, deployment y más"
          />
        </div>

        {/* Quick Suggestions */}
        <div className="mb-12">
          <ChatSuggestions onSuggestionClick={handleSuggestion} />
        </div>

        {/* How to Use */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">📖</span>
            Cómo Usar el Chatbot
          </h2>
          <div className="space-y-4">
            <Step
              number={1}
              title="Abre el Chat"
              description="Haz clic en el botón flotante violeta en la esquina inferior derecha"
            />
            <Step
              number={2}
              title="Escribe tu Pregunta"
              description="Pregunta sobre MERS-IASi, arquitectura, SAR, tecnologías, etc."
            />
            <Step
              number={3}
              title="Recibe Respuestas"
              description="El asistente IA te responderá con información detallada y contextual"
            />
            <Step
              number={4}
              title="Continúa la Conversación"
              description="Haz preguntas de seguimiento para profundizar en los temas"
            />
          </div>
        </div>

        {/* Examples */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-violet-500/30 mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">💡</span>
            Ejemplos de Preguntas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuestionExample
              question="¿Qué es MERS-IASi?"
              answer="Explica el proyecto completo y su propósito"
            />
            <QuestionExample
              question="¿Cómo funciona el análisis SAR?"
              answer="Detalla el procesamiento de imágenes satelitales"
            />
            <QuestionExample
              question="Explica la arquitectura del sistema"
              answer="Describe los componentes y su integración"
            />
            <QuestionExample
              question="¿Qué tecnologías cloud usan?"
              answer="Lista Vultr, Google Cloud, Raindrop, etc."
            />
            <QuestionExample
              question="¿Cómo se despliega en producción?"
              answer="Guía de deployment y configuración"
            />
            <QuestionExample
              question="¿Qué APIs están disponibles?"
              answer="Enumera endpoints y funcionalidades"
            />
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-3">🔧</span>
            Stack Tecnológico
            <HelpTooltip 
              topic="stack técnico" 
              description="Tecnologías utilizadas para construir el chatbot"
            />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechBadge name="React" icon="⚛️" />
            <TechBadge name="TypeScript" icon="📘" />
            <TechBadge name="Tailwind CSS" icon="🎨" />
            <TechBadge name="Node.js" icon="🟢" />
            <TechBadge name="Express" icon="🚂" />
            <TechBadge name="Google AI" icon="🤖" />
            <TechBadge name="Vite" icon="⚡" />
            <TechBadge name="REST API" icon="🌐" />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl border border-violet-500/50">
          <h3 className="text-2xl font-bold mb-4">¿Listo para probar el chatbot?</h3>
          <p className="text-gray-300 mb-6">
            Haz clic en el botón flotante en la esquina inferior derecha para comenzar
          </p>
          <div className="flex justify-center">
            <div className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-violet-500/50 transition-all">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const Step: React.FC<{ number: number; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const QuestionExample: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => (
  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
    <p className="text-violet-300 font-semibold mb-2">❓ {question}</p>
    <p className="text-gray-400 text-sm">→ {answer}</p>
  </div>
);

const TechBadge: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
  <div className="bg-gray-700 p-3 rounded-lg text-center hover:bg-violet-600/20 transition-all">
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-sm font-semibold">{name}</div>
  </div>
);

export default ChatbotDemo;
