import React from 'react';

export const HackathonHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500 rounded-lg p-6 mb-8">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="text-4xl">🏆</div>
          <div>
            <h1 className="text-2xl font-bold text-yellow-300">
              The AI Championship 2025
            </h1>
            <p className="text-yellow-200 text-sm">
              Powered by LiquidMetal AI, Vultr, Cerebras, ElevenLabs
            </p>
          </div>
          <div className="text-4xl">🚀</div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-lg border border-yellow-600">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">
            MERS - Arquitectura Cognitiva Hemisférica
          </h2>
          <p className="text-gray-300 text-sm mb-3">
            Sistema educativo adaptativo con <strong>Repositorio de Experiencias Contextuales (REC)</strong>
            <br />
            Diseñado específicamente para <strong>The Scientific Bumblebees_IASi Study</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-blue-900/30 p-2 rounded border border-blue-500">
              <div className="text-blue-300 font-semibold">🔗 Raindrop Platform</div>
              <div className="text-blue-200">SmartComponents + Frontend</div>
            </div>
            <div className="bg-purple-900/30 p-2 rounded border border-purple-500">
              <div className="text-purple-300 font-semibold">🌐 Vultr Services</div>
              <div className="text-purple-200">Proxy Server + API Bridge</div>
            </div>
            <div className="bg-green-900/30 p-2 rounded border border-green-500">
              <div className="text-green-300 font-semibold">🧠 Google Gemini</div>
              <div className="text-green-200">Core MERS Intelligence</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-yellow-200 text-sm">
          <strong>Creadora:</strong> Roxana A. Salazar M. (Luciérnaga Sabionda) 
          <span className="mx-2">|</span>
          <strong>Categoría:</strong> Emprendedor Individual + Mejor Idea General
        </div>
      </div>
    </div>
  );
};