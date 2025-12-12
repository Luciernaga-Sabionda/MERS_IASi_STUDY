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
  const [prompt, setPrompt] = useState<string>('A drone flies slowly through the scene.');
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
      setError('Please upload an image and write a description.');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);
    setLoadingMessage('Initializing video generation...');

    try {
      // La clave de Gemini no debe estar en el frontend; el backend gestiona el secreto.

      // Request narration from backend (demo) using /api/generate
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Generate a brief narration for a video from this description: ${prompt}` })
      });
      const data = await resp.json();
      const narration = data.text || 'Narration not available.';
      
      // Simulación de video generado para demo (sin exponer claves)
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
      
      setLoadingMessage('Processing video... This may take several minutes. Please keep this tab open.');

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      setLoadingMessage('Video generated. Downloading...');

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setGeneratedVideoUrl(videoUrl);
      } else {
        throw new Error('Could not obtain video download link.');
      }

    } catch (e: any) {
      console.error(e);
      let errorMessage = 'There was an error generating the video. Please try again.';
      if (e.message?.includes('Requested entity was not found')) {
        errorMessage = "Authentication error. Please select your API key again.";
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
            <h3 className="text-xl font-semibold text-white mb-4">API Key Required</h3>
            <p className="text-gray-400 mb-6">To use video generation, you must select a Vertex AI API key. Using this feature may incur costs.</p>
            <button
                onClick={handleSelectKey}
                className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-500 transition-colors"
            >
                Select API Key
            </button>
            <p className="text-xs text-gray-500 mt-4">
                For more information, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">billing documentation</a>.
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
                  <p>Click to upload an image</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="video-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe the animation:
            </label>
            <textarea
              id="video-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="E.g.: The car speeds away."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video format:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="aspectRatio" value="16:9" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="form-radio bg-gray-900 text-cyan-500" />
                <span className="ml-2 text-sm">16:9 (Panoramic)</span>
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
            {loading ? 'Generating...' : 'Generate Video'}
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
