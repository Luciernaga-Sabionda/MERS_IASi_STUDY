import React from 'react';
import { ExclamationTriangleIcon } from './Icons';

interface ApiKeyWarningProps {
  onClose?: () => void;
}

export const ApiKeyWarning: React.FC<ApiKeyWarningProps> = ({ onClose }) => {
  return (
    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-200 mb-2">Configuración de API Requerida</h3>
          <div className="text-yellow-100 text-sm space-y-2">
            <p>Para usar las funciones de IA, necesitas configurar tu API Key de Google Gemini:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>
                Obtén tu API Key en:{' '}
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  Google AI Studio
                </a>
              </li>
              <li>Abre el archivo <code className="bg-gray-800 px-1 rounded">.env</code> en la raíz del proyecto</li>
              <li>Reemplaza <code className="bg-gray-800 px-1 rounded">your_gemini_api_key_here</code> con tu clave real</li>
              <li>Reinicia el servidor de desarrollo</li>
            </ol>
            <div className="mt-3 p-3 bg-gray-800 rounded text-xs font-mono">
              VITE_GEMINI_API_KEY=tu_clave_real_aqui
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="mt-3 text-yellow-400 hover:text-yellow-300 text-sm underline"
            >
              Entendido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};