
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
                <Card title="3.2.1 Input and Preprocessing Layer" className="border-blue-500/50">
                    <CogIcon className="w-8 h-8 text-blue-400 mb-3" />
                    <p>Receives, normalizes and vectorizes information from AI (Hemisphere A) and user (feedback).</p>
                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong className="text-blue-300">Input:</strong> <span className="font-mono">IASiPrediction</span>, <span className="font-mono">HumanLesson</span></p>
                        <p><strong className="text-blue-300">Output:</strong> Combined vector <span className="font-mono">V_input</span></p>
                    </div>
                </Card>

                {/* 3.2.2 ValidadorCriterio */}
                <Card title="3.2.2 CriteriaValidator (Executive Neuron)" className="border-green-500/50">
                    <ScaleIcon className="w-8 h-8 text-green-400 mb-3" />
                    <p>Decision center that determines which knowledge deserves to be stored and used for teaching.</p>
                     <div className="mt-4 text-sm font-mono bg-gray-800 p-3 rounded-md">
                        <span className="text-green-300">score</span> = 0.5*C<sub>conf</sub> + 0.4*C<sub>coh</sub> + 0.1*C<sub>imp</sub>
                        <br/>
                        <span className="text-gray-400">Acepta si &gt; 0.7</span>
                    </div>
                </Card>
                
                {/* 3.2.3 REC */}
                <Card title="3.2.3 Contextual Experience Repository (CER)" className="border-yellow-500/50">
                    <DatabaseIcon className="w-8 h-8 text-yellow-400 mb-3" />
                    <p>Long-term memory. Stores validated lessons as reusable experiences.</p>
                     <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-yellow-300">Indexing:</strong> Area, Trigger pattern.</p>
                       <p><strong className="text-yellow-300">Technology:</strong> MongoDB, Vector DB.</p>
                    </div>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                 {/* 3.2.4 Explicador Digital */}
                <Card title="3.2.4 Digital Explainer (Strategy Pattern)" className="border-purple-500/50">
                    <LightBulbIcon className="w-8 h-8 text-purple-400 mb-3" />
                    <p>Generates explanations adapted to the user's comprehension level.</p>
                    <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-purple-300">Beginner:</strong> Simple language.</p>
                       <p><strong className="text-purple-300">Intermediate:</strong> Applied examples.</p>
                       <p><strong className="text-purple-300">Advanced:</strong> Technical metrics.</p>
                    </div>
                </Card>

                {/* Interacción Usuario */}
                <Card title="User Interaction" className="border-red-500/50">
                    <UsersIcon className="w-8 h-8 text-red-400 mb-3" />
                    <p>The user receives the explanation and provides feedback (positive or negative).</p>
                    <div className="mt-4 flex justify-around">
                        <span className="text-green-400 font-bold text-2xl">+1</span>
                        <span className="text-red-400 font-bold text-2xl">-1</span>
                    </div>
                </Card>

                {/* 3.2.5 Aprendizaje Reforzado */}
                <Card title="3.2.5 Reinforcement Learning (RL)" className="border-teal-500/50">
                    <RecycleIcon className="w-8 h-8 text-teal-400 mb-3" />
                    <p>Cognitive evolution mechanism. Adjusts pedagogical strategies based on user reward.</p>
                    <div className="mt-4 space-y-2 text-sm">
                       <p><strong className="text-teal-300">(+1):</strong> Strengthens successful pattern.</p>
                       <p><strong className="text-teal-300">(-1):</strong> Decreases usage or retrains.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
