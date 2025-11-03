import React from 'react';
import { Card } from './Card';

const Synapse: React.FC<{ x1: number, y1: number, x2: number, y2: number, active?: boolean }> = ({ x1, y1, x2, y2, active }) => (
  <line
    x1={x1} y1={y1}
    x2={x2} y2={y2}
    stroke={active ? '#22d3ee' : '#4b5563'}
    strokeWidth="2"
    markerEnd={active ? "url(#arrowhead-active)" : "url(#arrowhead)"}
    className="transition-all duration-500"
  />
);

const Neuron: React.FC<{ cx: number, cy: number, label: string, active?: boolean }> = ({ cx, cy, label, active }) => (
  <g className="cursor-pointer group">
    <circle
      cx={cx} cy={cy}
      r="20"
      fill={active ? '#06b6d4' : '#1f2937'}
      stroke={active ? '#22d3ee' : '#6b7280'}
      strokeWidth="2"
      className="transition-all duration-500"
    />
    <text
      x={cx} y={cy + 35}
      textAnchor="middle"
      fill={active ? '#f0f9ff' : '#9ca3af'}
      className="text-xs font-semibold transition-all duration-500 group-hover:fill-white"
    >
      {label}
    </text>
  </g>
);


export const SynapticDiagram: React.FC = () => {
    const [activePath, setActivePath] = React.useState(0);

    const paths = [
        [ 'Entrada', 'Criterio' ],
        [ 'Criterio', 'REC', 'Explicador' ],
        [ 'Explicador', 'Usuario' ],
        [ 'Usuario', 'RL', 'Criterio' ],
    ];

    const neurons: { [key: string]: { x: number, y: number } } = {
        'Entrada': { x: 50, y: 150 },
        'Criterio': { x: 200, y: 150 },
        'REC': { x: 350, y: 80 },
        'Explicador': { x: 500, y: 150 },
        'Usuario': { x: 650, y: 150 },
        'RL': { x: 350, y: 220 },
    };

    const isNeuronActive = (label: string) => {
        return paths[activePath]?.includes(label);
    };

    const isSynapseActive = (n1: string, n2: string) => {
        const path = paths[activePath];
        if (!path) return false;
        const index1 = path.indexOf(n1);
        const index2 = path.indexOf(n2);
        return index1 !== -1 && index2 === index1 + 1;
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActivePath(prev => (prev + 1) % paths.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [paths.length]);

  return (
    <Card title="Diagrama Sináptico Interactivo">
        <p className="text-sm text-gray-400 mb-6">
            Visualización del flujo de información a través de los componentes cognitivos. El camino activo se ilumina.
        </p>
        <div className="bg-gray-900/50 p-4 rounded-lg flex justify-center items-center">
            <svg viewBox="0 0 700 300" className="w-full h-auto">
                <defs>
                    <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" />
                    </marker>
                    <marker id="arrowhead-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                    </marker>
                </defs>

                {/* Synapses */}
                <Synapse x1={neurons['Entrada'].x} y1={neurons['Entrada'].y} x2={neurons['Criterio'].x} y2={neurons['Criterio'].y} active={isSynapseActive('Entrada', 'Criterio')} />
                <Synapse x1={neurons['Criterio'].x} y1={neurons['Criterio'].y} x2={neurons['REC'].x} y2={neurons['REC'].y} active={isSynapseActive('Criterio', 'REC')} />
                <Synapse x1={neurons['REC'].x} y1={neurons['REC'].y} x2={neurons['Explicador'].x} y2={neurons['Explicador'].y} active={isSynapseActive('REC', 'Explicador')} />
                <Synapse x1={neurons['Explicador'].x} y1={neurons['Explicador'].y} x2={neurons['Usuario'].x} y2={neurons['Usuario'].y} active={isSynapseActive('Explicador', 'Usuario')} />
                <Synapse x1={neurons['Usuario'].x} y1={neurons['Usuario'].y} x2={neurons['RL'].x} y2={neurons['RL'].y} active={isSynapseActive('Usuario', 'RL')} />
                <Synapse x1={neurons['RL'].x} y1={neurons['RL'].y} x2={neurons['Criterio'].x} y2={neurons['Criterio'].y} active={isSynapseActive('RL', 'Criterio')} />
                
                {/* Neurons */}
                {Object.entries(neurons).map(([label, coords]) => (
                    <Neuron key={label} cx={coords.x} cy={coords.y} label={label} active={isNeuronActive(label)} />
                ))}
            </svg>
        </div>
    </Card>
  );
};
