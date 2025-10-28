
import React from 'react';
import { CodeIcon } from './Icons';

interface MicroserviceCardProps {
  name: string;
  technologies: string;
  children: React.ReactNode;
}

export const MicroserviceCard: React.FC<MicroserviceCardProps> = ({ name, technologies, children }) => {
  return (
    <div className="bg-gray-800/60 p-5 rounded-lg border border-gray-700 hover:border-violet-500/40 transition-colors duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-3">
        <CodeIcon className="w-6 h-6 text-violet-400 mr-3 flex-shrink-0" />
        <h4 className="font-bold text-lg text-violet-300 truncate">{name}</h4>
      </div>
      <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{children}</p>
      <div className="text-xs font-mono bg-gray-900/70 p-2 rounded text-cyan-400">
        {technologies}
      </div>
    </div>
  );
};
