import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PhotoIcon, SpinnerIcon } from './Icons';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Un astronauta montando a caballo en Marte, estilo fotorrealista.');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!prompt) {
      setError('Por favor, introduce una descripción para generar la imagen.');
      return;
    }
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        setError('No se ha configurado la clave de API de Gemini. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env');
        return;
      }

      // Nota: Google Generative AI no soporta generación de imágenes directamente
      // Esta es una simulación para demostración
      setError('La generación de imágenes requiere configuración adicional con APIs específicas como DALL-E o Imagen.');
      
      // Simulación de imagen generada para demo
      setTimeout(() => {
        setImageUrl('https://via.placeholder.com/512x512/4F46E5/FFFFFF?text=Imagen+Generada');
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.error(e);
      setError('Hubo un error al generar la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Result Area */}
        <div className="relative w-full h-80 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
          {loading ? (
            <div className="text-center text-gray-500">
              <SpinnerIcon className="w-16 h-16 mx-auto" />
              <p>Generando imagen...</p>
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt="Generated" className="w-full h-full object-contain rounded-lg" />
          ) : (
            <div className="text-center text-gray-500">
              <PhotoIcon className="w-16 h-16 mx-auto" />
              <p>La imagen generada aparecerá aquí</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe la imagen a generar:
            </label>
            <textarea
              id="image-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Ej: Un zorro cyberpunk en una ciudad de neón."
            />
          </div>
          <button
            onClick={handleGenerateClick}
            disabled={loading}
            className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mr-2" /> : null}
            {loading ? 'Generando...' : 'Generar Imagen'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-red-400 bg-red-900/20 p-3 rounded-md">{error}</p>
        </div>
      )}
    </div>
  );
};
