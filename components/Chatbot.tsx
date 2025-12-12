import React, { useState, useRef, useEffect } from 'react';
import { SpinnerIcon } from './Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp?: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [proxyOk, setProxyOk] = useState<boolean | null>(null);
  const [missingKey, setMissingKey] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Show initial greeting with timestamp
      setMessages([{ 
        role: 'model', 
        text: '👋 ¡Hola! Soy tu asistente de IA para MERS-IASi. Puedo ayudarte con análisis satelital, arquitectura del sistema, o cualquier pregunta técnica. ¿En qué puedo asistirte?',
        timestamp: new Date()
      }]);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Poll de salud del proxy para habilitar/deshabilitar el envío
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const resp = await fetch('/api/health');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const j = await resp.json();
        if (!cancelled) { setProxyOk(true); setMissingKey(!!j?.missingApiKey); }
      } catch {
        if (!cancelled) setProxyOk(false);
      }
    };
    check();
    const id = setInterval(check, 10000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || proxyOk === false || missingKey) return;

    const userMessage: Message = { 
      role: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Llamamos al backend proxy que realiza la llamada segura a Gemini
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput })
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Server error ${resp.status}: ${errText}`);
      }

      const body = await resp.json();
      let text = body.text || 'Lo siento, no obtuve respuesta.';

      // Corrección de off-topic similar a la anterior
      const askedAboutMERS = currentInput.toLowerCase().includes('mers');
      const isOffTopic = askedAboutMERS && (
        text.toLowerCase().includes('hipoteca') || 
        text.toLowerCase().includes('mortgage') || 
        text.toLowerCase().includes('coronavirus') ||
        text.toLowerCase().includes('respiratorio')
      );

      if (isOffTopic) {
        text = `🛰️ MERS-IASi es nuestro proyecto para The AI Championship 2025. Es un sistema de inteligencia artificial para análisis de imágenes satelitales SAR con arquitectura híbrida (React + Vultr + Raindrop + Google Cloud). Se enfoca en educación geoespacial y análisis de datos satelitales. ¿Te gustaría saber más sobre algún aspecto específico?`;
      }

      const modelMessage: Message = { 
        role: 'model', 
        text,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: Message = { 
        role: 'model', 
        text: '⚠️ Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:from-violet-500 hover:to-purple-500 transition-all transform hover:scale-110 z-50 animate-pulse"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-violet-500/30 overflow-hidden">
          {/* Header */}
          <header className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">MERS-IASi Assistant</h3>
                <p className="text-xs text-violet-100">{proxyOk ? '🟢 En línea' : '🔴 Desconectado'}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </header>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-gray-800">
            {messages.map((msg, index) => (
              <div key={`msg-${index}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-none' 
                      : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  {msg.timestamp && (
                    <p className="text-xs mt-1 opacity-60">
                      {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-200 p-3 rounded-2xl rounded-bl-none border border-gray-600">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Status Bar */}
          {(missingKey || proxyOk === false) && (
            <div className="px-4 py-2 bg-yellow-900/50 border-t border-yellow-700/50 text-yellow-200 text-xs text-center">
              {missingKey ? '⚠️ API Key faltante' : '⚠️ Servidor desconectado'}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700 bg-gray-800/50">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || proxyOk === false || missingKey}
                placeholder={loading ? 'Esperando respuesta...' : 'Escribe tu mensaje...'}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading || proxyOk === false || missingKey}
                className="px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
                aria-label="Send message"
              >
                {loading ? (
                  <SpinnerIcon className="animate-spin h-5 w-5" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};