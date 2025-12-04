
import React from 'react';
import { ApiStatus } from './ApiStatus';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 text-center">
          Diseño Metodológico e Ingeniería de Software
        </h1>
        <h2 className="text-center text-lg md:text-xl text-gray-400 mt-1">
          Visualizador de Arquitectura Cognitiva IASi–MERS
        </h2>
        <div className="mt-3 flex justify-center"><ApiStatus /></div>
      </div>
    </header>
  );
};
