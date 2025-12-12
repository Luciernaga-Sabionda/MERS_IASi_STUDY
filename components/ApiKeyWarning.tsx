import React from 'react';
import { ExclamationTriangleIcon } from './Icons';

interface ApiKeyWarningProps {
  onClose?: () => void;
}

export const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ onClose }) => {
  return (
    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6 mx-4 mt-4">
      <div className="flex items-start">
        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-bold text-yellow-200 mb-2 text-lg">🔑 API Configuration Required</h3>
          <div className="text-yellow-100 text-sm space-y-2">
            <p>To use AI features, you need to configure your <strong>Google Gemini API Key</strong>:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                Get your API Key at:{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:text-yellow-100 underline font-semibold"
                >
                  Google AI Studio
                </a>
              </li>
              <li>Create or open the <code className="bg-gray-800 px-1.5 py-0.5 rounded">.env</code> file in the project root</li>
              <li>Replace <code className="bg-gray-800 px-1.5 py-0.5 rounded">your_gemini_api_key_here</code> with your actual key</li>
              <li>Restart the server with <code className="bg-gray-800 px-1.5 py-0.5 rounded">npm start</code></li>
            </ol>
            <div className="mt-3 p-3 bg-gray-900/60 rounded border border-yellow-700/30 text-xs">
              <div className="font-mono text-yellow-200">
                VITE_GEMINI_API_KEY=<span className="text-green-400">AIzaSy...tu_clave_real_aqui</span>
              </div>
            </div>
            <p className="text-xs text-yellow-300 mt-2 flex items-start gap-1">
              <span>💡</span>
              <span><strong>Tip:</strong> If the .env file doesn't exist, copy .env.example and rename it</span>
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="mt-3 text-yellow-400 hover:text-yellow-300 text-sm underline"
            >
              Got it, close notice
            </button>
          )}
        </div>
      </div>
    </div>
  );
};