import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PhotoIcon, SpinnerIcon } from './Icons';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('An astronaut riding a horse on Mars, photorealistic style.');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!prompt) {
      setError('Please enter a description to generate the image.');
      return;
    }
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
        // La clave de Gemini no debe estar en el frontend; el backend gestiona el secreto.
        const apiKey = ''; // Placeholder for backend API key

      // Note: Google Generative AI does not support image generation directly
      // This is a simulation for demonstration
      setError('Image generation requires additional configuration with specific APIs like DALL-E or Imagen.');
      
      // Simulated generated image for demo
      setTimeout(() => {
        setImageUrl('https://via.placeholder.com/512x512/4F46E5/FFFFFF?text=Generated+Image');
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.error(e);
      setError('There was an error generating the image. Please try again.');
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
              <p>Generating image...</p>
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt="Generated" className="w-full h-full object-contain rounded-lg" />
          ) : (
            <div className="text-center text-gray-500">
              <PhotoIcon className="w-16 h-16 mx-auto" />
              <p>Generated image will appear here</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe the image to generate:
            </label>
            <textarea
              id="image-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="E.g.: A cyberpunk fox in a neon city."
            />
          </div>
          <button
            onClick={handleGenerateClick}
            disabled={loading}
            className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mr-2" /> : null}
            {loading ? 'Generating...' : 'Generate Image'}
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
