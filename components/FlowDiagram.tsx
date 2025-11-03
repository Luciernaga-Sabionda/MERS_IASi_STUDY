
import React from 'react';
import { Card } from './Card';
import { BookOpenIcon, CogIcon, DatabaseIcon, LightBulbIcon, RecycleIcon, ScaleIcon, UsersIcon } from './Icons';

const FlowNode: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; color: string }> = ({ title, icon, children, color }) => (
    <div className={`relative bg-gray-800 p-4 rounded-lg border-l-4 ${color} shadow-md`}>
        <div className="flex items-center mb-2">
            <div className="mr-3 text-white">{icon}</div>
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <div className="text-sm text-gray-400">{children}</div>
    </div>
);

const Arrow: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`flex items-center justify-center my-4 md:my-0 md:mx-4 ${className}`}>
        <div className="w-px h-8 md:w-12 md:h-px bg-gray-600"></div>
        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-gray-500 -ml-1 md:border-l-0 md:border-t-[6px] md:border-t-gray-500 md:border-r-[4px] md:border-r-transparent md:border-b-0 md:ml-0 md:-mt-1"></div>
    </div>
);


export const FlowDiagram: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* 3.2.1 Capa de Entrada */}
                <Card title="3.2.1 Capa de Entrada y Preprocesamiento" className="border-blue-500/50">
                    <CogIcon className="w-8 h-8 text-blue-400 mb-3" />
                    <p>Recibe, normaliza y vectoriza la información de la IA (Hemisferio A) y del usuario (feedback).</p>
                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong className="text-blue-300">Input:</strong> <span className="font-mono">PrediccionIASi</span>, <span className="font-mono">LeccionHumana</span></p>
                        <p><strong className="text-blue-300">Output:</strong> Vector combinado <span className="font-mono">V_entrada</span></p>
                    </div>
                </Card>

                {/* 3.2.2 ValidadorCriterio */}
                <Card title="3.2.2 ValidadorCriterio (Neurona Ejecutiva)" className="border-green-500/50">
                    <ScaleIcon className="w-8 h-8 text-green-400 mb-3" />
                    <p>Centro decisor que determina qué conocimiento merece ser almacenado y utilizado para enseñar.</p>
                     <div className="mt-4 text-sm font-mono bg-gray-800 p-3 rounded-md">
                        <span className="text-green-300">score</span> = 0.5*C<sub>conf</sub> + 0.4*C<sub>coh</sub> + 0.1*C<sub>imp</sub>
                        <br/>
                        <span className="text-gray-400">Acepta si &gt; 0.7</span>
                    </div>
                </Card>
                
                {/* 3.2.3 REC */}
                <Card title="3.2.3 Repositorio de Experiencias Contextuales (REC)" className="border-yellow-500/50">
                    <DatabaseIcon className="w-8 h-8 text-yellow-400 mb-3" />
                    <p>Memoria a largo plazo. Almacena lecciones validadas como experiencias reutilizables.</p>
                     <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-yellow-300">Indexación:</strong> Área, Patrón disparador.</p>
                       <p><strong className="text-yellow-300">Tecnología:</strong> MongoDB, Vector DB.</p>
                    </div>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                 {/* 3.2.4 Explicador Digital */}
                <Card title="3.2.4 Explicador Digital (Patrón Strategy)" className="border-purple-500/50">
                    <LightBulbIcon className="w-8 h-8 text-purple-400 mb-3" />
                    <p>Genera explicaciones adaptadas al nivel de comprensión del usuario.</p>
                    <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-purple-300">Principiante:</strong> Lenguaje simple.</p>
                       <p><strong className="text-purple-300">Intermedio:</strong> Ejemplos aplicados.</p>
                       <p><strong className="text-purple-300">Avanzado:</strong> Métricas técnicas.</p>
                    </div>
                </Card>

                {/* Interacción Usuario */}
                <Card title="Interacción con el Usuario" className="border-red-500/50">
                    <UsersIcon className="w-8 h-8 text-red-400 mb-3" />
                    <p>El usuario recibe la explicación y proporciona retroalimentación (positiva o negativa).</p>
                    <div className="mt-4 flex justify-around">
                        <span className="text-green-400 font-bold text-2xl">+1</span>
                        <span className="text-red-400 font-bold text-2xl">-1</span>
                    </div>
                </Card>

                {/* 3.2.5 Aprendizaje Reforzado */}
                <Card title="3.2.5 Aprendizaje Reforzado (RL)" className="border-teal-500/50">
                    <RecycleIcon className="w-8 h-8 text-teal-400 mb-3" />
                    <p>Mecanismo de evolución cognitiva. Ajusta las estrategias pedagógicas según la recompensa del usuario.</p>
                    <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-teal-300">(+1):</strong> Fortalece patrón exitoso.</p>
                       <p><strong className="text-teal-300">(-1):</strong> Disminuye uso o reentrena.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
