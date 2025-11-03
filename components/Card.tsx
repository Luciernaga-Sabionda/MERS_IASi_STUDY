
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-500/30 ${className}`}>
      <h3 className="text-lg font-bold text-gray-200 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
};
