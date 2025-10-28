import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { SpinnerIcon, GlobeAltIcon } from './Icons';

interface GroundingSource {
  uri: string;
  title: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chat) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful assistant for the "Visualizador de Arquitectura Cognitiva IASi–MERS" application. Answer questions about the architecture and its components. If the user asks a question about a recent event or something that requires up-to-date information from the web, use your search tool.',
            tools: [{googleSearch: {}}],
          },
        });
        setChat(newChat);
        setMessages([{ role: 'model', text: 'Hola! ¿En qué puedo ayudarte con la arquitectura MERS?' }]);
      } catch (e) {
        console.error("Failed to initialize chat:", e);
        setMessages([{ role: 'model', text: 'Lo siento, no pude iniciar el chat. Revisa la configuración de la API.' }]);
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chat || loading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: input });
      
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const sources = groundingMetadata?.groundingChunks
        ?.map(chunk => chunk.web)
        .filter((web): web is { uri: string; title: string } => !!web && !!web.uri && !!web.title);

      const modelMessage: Message = { 
        role: 'model', 
        text: response.text,
        sources: sources && sources.length > 0 ? sources : undefined
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
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.sources && (
                    <div className="mt-3 pt-2 border-t border-gray-600/50">
                      <h4 className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center">
                        <GlobeAltIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        Fuentes:
                      </h4>
                      <ul className="space-y-1">
                        {msg.sources.map((source, i) => (
                          <li key={i}>
                            <a
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-cyan-400 hover:underline truncate block"
                              title={source.title}
                            >
                              {source.title || source.uri}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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