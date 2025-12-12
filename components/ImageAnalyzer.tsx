import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PhotoIcon, SpinnerIcon, EyeIcon } from './Icons';

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve((reader.result as string).split(',')[1]);
      } else {
        reject(new Error("Failed to read blob as Base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!image) {
      setError('Please upload an image to analyze.');
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Enviar la imagen al backend para análisis seguro (sin exponer claves)
      const form = new FormData();
      form.append('image', image);

      const resp = await fetch('/api/analyze-image', {
        method: 'POST',
        body: form
      });
      const data = await resp.json();
      setAnalysis(data.text || data.error || 'Analysis not available.');

    } catch (e: any) {
      console.error(e);
      setError('There was an error analyzing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Image Upload Area */}
        <div className="flex flex-col space-y-4">
            <div 
                className="relative w-full h-80 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <div className="text-center text-gray-500">
                  <PhotoIcon className="w-16 h-16 mx-auto" />
                  <p>Click to upload an image</p>
                </div>
              )}
            </div>
            <button
                onClick={handleAnalyzeClick}
                disabled={loading || !image}
                className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
                {loading ? <SpinnerIcon className="w-5 h-5 mr-2" /> : <EyeIcon className="w-5 h-5 mr-2" />}
                {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
        </div>

        {/* Analysis Result Area */}
        <div className="relative w-full h-96 bg-gray-900/50 rounded-lg p-4 border border-gray-600 overflow-y-auto">
            <h4 className="font-bold text-lg text-gray-200 mb-2">Image Analysis:</h4>
            {loading ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <SpinnerIcon className="w-8 h-8" />
                </div>
            ) : analysis ? (
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{analysis}</p>
            ) : (
                <p className="text-gray-500 text-sm italic">The image analysis will appear here.</p>
            )}
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
