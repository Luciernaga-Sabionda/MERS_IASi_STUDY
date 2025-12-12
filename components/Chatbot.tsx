import React, { useState, useRef, useEffect } from 'react';
import { SpinnerIcon } from './Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [proxyOk, setProxyOk] = useState<boolean | null>(null);
  const [missingKey, setMissingKey] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Show initial greeting. API key verification happens in the backend.
      setMessages([{ role: 'model', text: 'Hello! I\'m your AI assistant. I can help you with questions about the MERS-IASi project or anything else. How can I assist you?' }]);
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

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
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
        text = `MERS-IASi es nuestro proyecto para The AI Championship 2025. Es un sistema de inteligencia artificial para análisis de imágenes satelitales SAR con arquitectura híbrida (React + Vultr + Raindrop + Google Cloud). Se enfoca en educación geoespacial y análisis de datos satelitales. ¿Te gustaría saber más sobre algún aspecto específico?`;
      }

      const modelMessage: Message = { role: 'model', text };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: Message = { role: 'model', text: 'Sorry, an error occurred. Please try again.' };
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
            <h3 className="font-bold text-white text-center">Architecture Assistant</h3>
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
                  <SpinnerIcon className="animate-spin h-5 w-5 text-white" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                disabled={loading || proxyOk === false || missingKey}
              />
              <button
                onClick={handleSend}
                disabled={loading || proxyOk === false || missingKey}
                title={proxyOk === false ? 'Proxy not available. Start npm run server.' : (missingKey ? 'API key missing. Export VITE_GEMINI_API_KEY.' : '')}
                className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            {proxyOk === false && (
              <p className="text-xs text-red-400 mt-2">Proxy not available. Start the backend with <code>npm run server</code>.</p>
            )}
            {missingKey && (
              <p className="text-xs text-yellow-300 mt-2">API key missing. Define <code>VITE_GEMINI_API_KEY</code> in the terminal before starting the server.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};