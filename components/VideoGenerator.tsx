import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PhotoIcon, SpinnerIcon, VideoCameraIcon } from './Icons';

// Fix: Removed the conflicting `declare global` for `window.aistudio`.
// The type for `window.aistudio` is assumed to be provided by the global environment,
// and redeclaring it was causing a TypeScript type conflict.

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(blob);
  });
};

export const VideoGenerator: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Un dron vuela lentamente a través de la escena.');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          const keyStatus = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(keyStatus);
        } catch (e) {
          console.error("Error checking API key:", e);
          setHasApiKey(false);
        }
      } else {
        setHasApiKey(false);
      }
      setIsCheckingApiKey(false);
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success to improve UX, as hasSelectedApiKey might have a delay
      setHasApiKey(true);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setGeneratedVideoUrl(null);
      setError(null);
    }
  };

  const handleGenerateClick = async () => {
    if (!image || !prompt) {
      setError('Por favor, sube una imagen y escribe una descripción.');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);
    setLoadingMessage('Inicializando generación de video...');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        setError('No se ha configurado la clave de API de Gemini. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env');
        return;
      }

      // Nota: Google Generative AI no soporta generación de video directamente
      // Esta es una simulación para demostración
      setError('La generación de video requiere configuración adicional con APIs específicas como Veo o similares.');
      
      // Simulación de video generado para demo
      setTimeout(() => {
        setGeneratedVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4');
        setLoading(false);
        setLoadingMessage('');
      }, 3000);

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: imageBase64,
          mimeType: image.type,
        },
        config: {
          numberOfVideos: 1,
          aspectRatio: aspectRatio,
          resolution: '720p',
        }
      });
      
      setLoadingMessage('Procesando video... Esto puede tardar varios minutos. Por favor, mantén esta pestaña abierta.');

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      setLoadingMessage('Video generado. Descargando...');

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setGeneratedVideoUrl(videoUrl);
      } else {
        throw new Error('No se pudo obtener el enlace de descarga del video.');
      }

    } catch (e: any) {
      console.error(e);
      let errorMessage = 'Hubo un error al generar el video. Por favor, inténtalo de nuevo.';
      if (e.message?.includes('Requested entity was not found')) {
        errorMessage = "Error de autenticación. Por favor, selecciona tu clave API de nuevo.";
        setHasApiKey(false);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  if (isCheckingApiKey) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto flex justify-center items-center h-48">
        <SpinnerIcon className="w-8 h-8" />
      </div>
    );
  }

  if (!hasApiKey) {
    return (
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Se requiere una clave API</h3>
            <p className="text-gray-400 mb-6">Para usar la generación de video, debes seleccionar una clave API de Vertex AI. El uso de esta función puede incurrir en costos.</p>
            <button
                onClick={handleSelectKey}
                className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors"
            >
                Seleccionar Clave API
            </button>
            <p className="text-xs text-gray-500 mt-4">
                Para más información, consulta la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">documentación de facturación</a>.
            </p>
        </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image/Video Area */}
        <div className="relative w-full h-80 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
          {generatedVideoUrl ? (
             <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-contain rounded-lg" />
          ) : (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg cursor-pointer" onClick={() => fileInputRef.current?.click()} />
              ) : (
                <div className="text-center text-gray-500 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <PhotoIcon className="w-16 h-16 mx-auto" />
                  <p>Haz clic para subir una imagen</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="video-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe la animación:
            </label>
            <textarea
              id="video-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Ej: El coche se aleja a toda velocidad."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Formato del video:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="aspectRatio" value="16:9" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="form-radio bg-gray-900 text-cyan-500" />
                <span className="ml-2 text-sm">16:9 (Panorámico)</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="aspectRatio" value="9:16" checked={aspectRatio === '9:16'} onChange={() => setAspectRatio('9:16')} className="form-radio bg-gray-900 text-cyan-500" />
                <span className="ml-2 text-sm">9:16 (Vertical)</span>
              </label>
            </div>
          </div>
          <button
            onClick={handleGenerateClick}
            disabled={loading || !image}
            className="w-full bg-violet-600 text-white font-bold py-2 px-4 rounded-md hover:bg-violet-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mr-2" /> : <VideoCameraIcon className="w-5 h-5 mr-2" />}
            {loading ? 'Generando...' : 'Generar Video'}
          </button>
        </div>
      </div>
      
      {(loading || error) && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          {loading && (
             <div className="text-center text-cyan-300 bg-cyan-900/20 p-3 rounded-md">
                <p className="font-semibold">{loadingMessage}</p>
             </div>
          )}
          {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-md">{error}</p>}
        </div>
      )}
    </div>
  );
};
