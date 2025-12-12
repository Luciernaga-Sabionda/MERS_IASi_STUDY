import React from 'react';

export const VultrArchitecture: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Título */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blue-400 mb-2">Arquitectura de Despliegue</h3>
          <p className="text-gray-400">Backend desplegado en Vultr para inferencia y persistencia</p>
        </div>

        {/* Diagrama de flujo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Frontend */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg flex-1 max-w-xs">
            <div className="text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h4 className="font-bold text-white mb-2">Raindrop Platform</h4>
              <p className="text-sm text-purple-200">Frontend + SmartComponents</p>
              <div className="mt-3 text-xs text-purple-300">
                • React + TypeScript<br/>
                • SmartMemory (REC)<br/>
                • Chatbot UI
              </div>
            </div>
          </div>

          {/* Flecha */}
          <div className="text-yellow-400 text-3xl rotate-90 md:rotate-0">→</div>

          {/* Vultr Backend */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-lg p-6 shadow-lg flex-1 max-w-xs border-4 border-yellow-400">
            <div className="text-center">
              <div className="text-4xl mb-3">🖥️</div>
              <h4 className="font-bold text-white mb-2">Vultr Cloud Compute</h4>
              <p className="text-sm text-blue-200">Backend Node.js</p>
              <div className="mt-3 text-xs text-blue-300">
                • Express Server<br/>
                • Raindrop MCP Client<br/>
                • API Proxy<br/>
                • Persistencia REC
              </div>
              <div className="mt-3 px-3 py-1 bg-yellow-400 text-gray-900 rounded text-xs font-bold">
                207.148.31.144:3002
              </div>
            </div>
          </div>

          {/* Flecha */}
          <div className="text-yellow-400 text-3xl rotate-90 md:rotate-0">→</div>

          {/* Google Cloud */}
          <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-lg p-6 shadow-lg flex-1 max-w-xs">
            <div className="text-center">
              <div className="text-4xl mb-3">☁️</div>
              <h4 className="font-bold text-white mb-2">Google AI</h4>
              <p className="text-sm text-red-200">Motor de Inferencia</p>
              <div className="mt-3 text-xs text-red-300">
                • Gemini 1.5-Pro<br/>
                • Vision API<br/>
                • Embeddings<br/>
                • SmartInference
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios de Vultr */}
        <div className="bg-gray-900 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-cyan-400 mb-3 text-center">🎯 ¿Por qué Vultr?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-white">Baja Latencia</div>
              <div className="text-gray-400 text-xs mt-1">SSD NVMe para inferencia rápida</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold text-white">Seguridad</div>
              <div className="text-gray-400 text-xs mt-1">API keys protegidas en backend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💾</div>
              <div className="font-semibold text-white">Persistencia</div>
              <div className="text-gray-400 text-xs mt-1">REC almacenado en servidor</div>
            </div>
          </div>
        </div>

        {/* Status en vivo */}
        <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Estado del Backend Vultr</div>
              <div className="text-sm text-gray-400">Servidor activo y respondiendo</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
