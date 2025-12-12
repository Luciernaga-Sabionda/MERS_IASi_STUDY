import React, { useState } from 'react';

/**
 * 🎯 Sugerencias Rápidas para el Chatbot
 * Componente que muestra botones con preguntas predefinidas
 */

interface QuickSuggestion {
  icon: string;
  text: string;
  prompt: string;
}

const suggestions: QuickSuggestion[] = [
  {
    icon: '🛰️',
    text: 'Análisis SAR',
    prompt: '¿Cómo funciona el análisis de imágenes SAR en MERS-IASi?'
  },
  {
    icon: '🏗️',
    text: 'Arquitectura',
    prompt: 'Explícame la arquitectura del sistema MERS-IASi'
  },
  {
    icon: '☁️',
    text: 'Cloud Setup',
    prompt: '¿Qué servicios cloud utiliza MERS-IASi?'
  },
  {
    icon: '🔧',
    text: 'APIs',
    prompt: 'Lista todas las APIs disponibles en MERS-IASi'
  },
  {
    icon: '📊',
    text: 'Dashboard',
    prompt: '¿Qué funcionalidades tiene el dashboard?'
  },
  {
    icon: '🚀',
    text: 'Deploy',
    prompt: '¿Cómo desplegar MERS-IASi en producción?'
  }
];

interface ChatSuggestionsProps {
  onSuggestionClick?: (prompt: string) => void;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <h3 className="text-white font-semibold mb-3 flex items-center">
        <span className="mr-2">💡</span>
        Preguntas Rápidas
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick?.(suggestion.prompt)}
            className="bg-gray-700 hover:bg-violet-600 text-white px-3 py-2 rounded-lg text-sm transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span className="text-lg">{suggestion.icon}</span>
            <span className="truncate">{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * 🔍 Componente de ayuda contextual
 * Muestra un tooltip con opción de abrir el chat
 */

interface HelpTooltipProps {
  topic: string;
  description: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ topic, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-violet-400 hover:text-violet-300 ml-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 bg-gray-800 border border-violet-500 rounded-lg shadow-xl -translate-x-1/2 left-1/2 mt-2">
          <p className="text-sm text-gray-200 mb-2">{description}</p>
          <button className="text-xs text-violet-400 hover:text-violet-300 font-semibold">
            Pregunta al chatbot sobre "{topic}" →
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * 📢 Banner de ayuda
 * Banner superior que invita a usar el chatbot
 */

export const ChatBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-semibold">
          🤖 ¿Necesitas ayuda? Pregúntale a nuestro asistente IA sobre MERS-IASi
        </span>
      </div>
      <button
        onClick={() => setIsDismissed(true)}
        className="text-white/80 hover:text-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

/**
 * Ejemplo de uso completo:
 * 
 * import { ChatSuggestions, HelpTooltip, ChatBanner } from './ChatbotExtras';
 * 
 * function MyPage() {
 *   const handleSuggestion = (prompt: string) => {
 *     // Aquí podrías abrir el chatbot con el prompt preseleccionado
 *     console.log('Selected prompt:', prompt);
 *   };
 * 
 *   return (
 *     <>
 *       <ChatBanner />
 *       <h1>
 *         Mi Título 
 *         <HelpTooltip topic="arquitectura" description="Más info sobre la arquitectura" />
 *       </h1>
 *       <ChatSuggestions onSuggestionClick={handleSuggestion} />
 *     </>
 *   );
 * }
 */
