
import React from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="text-cyan-400 mr-4">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-100">{title}</h2>
      </div>
      {children}
    </section>
  );
};
