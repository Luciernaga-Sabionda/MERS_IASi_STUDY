import React, { useState } from 'react';

/**
 * ChatbotContext - Provider para compartir el estado del chatbot
 * Útil si quieres controlar el chatbot desde otros componentes
 */

interface ChatbotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

export const ChatbotContext = React.createContext<ChatbotContextType | null>(null);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = React.useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
};

/**
 * Ejemplo de uso en un componente:
 * 
 * import { useChatbot } from './ChatbotContext';
 * 
 * function MyComponent() {
 *   const { openChat } = useChatbot();
 *   
 *   return (
 *     <button onClick={openChat}>
 *       Abrir Chat de Ayuda
 *     </button>
 *   );
 * }
 */
