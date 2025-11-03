import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SpinnerIcon, GlobeAltIcon } from './Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !genAI) {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
          setMessages([{ role: 'model', text: 'Lo siento, no se ha configurado la clave de API de Gemini. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env' }]);
          return;
        }
        const ai = new GoogleGenerativeAI(apiKey);
        setGenAI(ai);
        setMessages([{ role: 'model', text: 'Hola! ¿En qué puedo ayudarte con la arquitectura MERS?' }]);
      } catch (e) {
        console.error("Failed to initialize Gemini:", e);
        setMessages([{ role: 'model', text: 'Lo siento, no pude iniciar el chat. Revisa la configuración de la API.' }]);
      }
    }
  }, [isOpen, genAI]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !genAI || loading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: 'Eres un asistente útil para la aplicación "Visualizador de Arquitectura Cognitiva IASi–MERS". Responde preguntas sobre la arquitectura y sus componentes en español.'
      });

      const result = await model.generateContent(currentInput);
      const response = await result.response;
      const text = response.text();

      const modelMessage: Message = { 
        role: 'model', 
        text: text
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: Message = { role: 'model', text: 'Lo siento, ocurrió un error. Inténtalo de nuevo.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-violet-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-violet-500 transition-transform transform hover:scale-110 z-50"
        aria-label="Toggle chatbot"
      >
        {/* Chat icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 border border-gray-700">
          <header className="bg-gray-900 p-3 rounded-t-lg">
            <h3 className="font-bold text-white text-center">Asistente de Arquitectura</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={`msg-${index}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-200 p-2 rounded-lg">
                      <SpinnerIcon className="w-5 h-5" />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              disabled={loading}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            />
          </div>
        </div>
      )}
    </>
  );
};