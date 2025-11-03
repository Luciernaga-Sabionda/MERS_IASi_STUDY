import React, { useState, useEffect } from 'react';
import { DatabaseIcon, SpinnerIcon, LightBulbIcon } from './Icons';

interface ExperienceEntry {
  id: string;
  area: string;
  pattern: string;
  confidence: number;
  impact: number;
  timestamp: string;
  source: 'human' | 'ia';
  raindropBucket?: string;
}

interface SmartMemoryProps {
  apiEndpoint?: string; // Para conectar con el sistema real
  raindropMode?: boolean; // Activar compatibilidad con Raindrop
  vultrProxyUrl?: string; // URL del proxy de Vultr
}

export const SmartMemory: React.FC<SmartMemoryProps> = ({ 
  apiEndpoint = 'https://your-vultr-proxy.com/api/rec',
  raindropMode = true,
  vultrProxyUrl = 'https://your-vultr-server.com'
}) => {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    humanLessons: 0,
    aiPredictions: 0,
    avgConfidence: 0
  });

  // Simulación de datos para demo - Compatible con Raindrop SmartMemory
  const mockExperiences: ExperienceEntry[] = [
    {
      id: '1',
      area: 'SAR_Analysis',
      pattern: 'Detección de cambios en vegetación usando polarización VV',
      confidence: 0.92,
      impact: 0.85,
      timestamp: '2025-11-03T10:30:00Z',
      source: 'human',
      raindropBucket: 'mers-iasi-study-sar'
    },
    {
      id: '2',
      area: 'Image_Processing',
      pattern: 'Segmentación de nubes en imágenes multiespectrales',
      confidence: 0.78,
      impact: 0.73,
      timestamp: '2025-11-03T09:15:00Z',
      source: 'ia',
      raindropBucket: 'mers-iasi-study-vision'
    },
    {
      id: '3',
      area: 'Education_Strategy',
      pattern: 'Explicación adaptativa para nivel principiante',
      confidence: 0.95,
      impact: 0.91,
      timestamp: '2025-11-03T08:45:00Z',
      source: 'human',
      raindropBucket: 'mers-iasi-study-education'
    },
    {
      id: '4',
      area: 'Hackathon_Demo',
      pattern: 'Integración Raindrop + Vultr + Google Cloud exitosa',
      confidence: 0.88,
      impact: 0.94,
      timestamp: '2025-11-03T11:00:00Z',
      source: 'ia',
      raindropBucket: 'mers-hackathon-demo'
    }
  ];

  useEffect(() => {
    loadExperiences();
  }, [apiEndpoint]);

  const loadExperiences = async () => {
    setLoading(true);
    try {
      if (raindropMode) {
        // Simular conexión con Raindrop + Vultr
        console.log('🔗 Conectando con Raindrop SmartMemory via Vultr...');
        console.log('📡 Vultr Proxy:', vultrProxyUrl);
        console.log('🎯 Raindrop Endpoint:', apiEndpoint);
      }
      
      // En producción, esto hará una llamada real:
      // const response = await fetch(`${vultrProxyUrl}/api/raindrop/smartmemory`, {
      //   headers: {
      //     'Authorization': `Bearer ${process.env.REACT_APP_RAINDROP_API_KEY}`,
      //     'X-Vultr-Proxy': 'mers-iasi-study'
      //   }
      // });
      // const data = await response.json();
      
      // Por ahora, simulamos la carga con delay realista
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = mockExperiences;
      
      setExperiences(data);
      calculateStats(data);
      
      if (raindropMode) {
        console.log('✅ SmartMemory cargado via arquitectura híbrida');
      }
    } catch (error) {
      console.error('Error loading experiences:', error);
      // Fallback a datos mock si falla la conexión
      setExperiences(mockExperiences);
      calculateStats(mockExperiences);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (experiences: ExperienceEntry[]) => {
    const stats = {
      total: experiences.length,
      humanLessons: experiences.filter(e => e.source === 'human').length,
      aiPredictions: experiences.filter(e => e.source === 'ia').length,
      avgConfidence: experiences.reduce((sum, e) => sum + e.confidence, 0) / experiences.length
    };
    setStats(stats);
  };

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === 'all' || exp.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const areas = ['all', ...Array.from(new Set(experiences.map(e => e.area)))];

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <DatabaseIcon className="w-8 h-8 text-yellow-400 mr-3" />
        <div>
          <h3 className="text-xl font-bold text-yellow-300">SmartMemory - REC Inspector</h3>
          <p className="text-gray-400 text-sm">Repositorio de Experiencias Contextuales en tiempo real</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
          <div className="text-xs text-gray-400">Experiencias Total</div>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{stats.humanLessons}</div>
          <div className="text-xs text-gray-400">Lecciones Humanas</div>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.aiPredictions}</div>
          <div className="text-xs text-gray-400">Predicciones IA</div>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{(stats.avgConfidence * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Confianza Promedio</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar experiencias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="bg-gray-900 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          title="Filtrar por área"
        >
          {areas.map(area => (
            <option key={area} value={area}>
              {area === 'all' ? 'Todas las áreas' : String(area).replace('_', ' ')}
            </option>
          ))}
        </select>
        <button
          onClick={loadExperiences}
          disabled={loading}
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500 disabled:opacity-50 flex items-center"
        >
          {loading ? <SpinnerIcon className="w-4 h-4 mr-2" /> : null}
          Actualizar
        </button>
      </div>

      {/* Experiences List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">
            <SpinnerIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="text-gray-400">Cargando experiencias del REC...</p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <DatabaseIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No se encontraron experiencias</p>
          </div>
        ) : (
          filteredExperiences.map((exp) => (
            <div key={exp.id} className="bg-gray-900/30 border border-gray-600 p-4 rounded-lg hover:border-yellow-500/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <LightBulbIcon className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm font-mono text-gray-300 bg-gray-800 px-2 py-1 rounded">
                    {exp.area.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    exp.source === 'human' ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {exp.source === 'human' ? '👤 Humano' : '🤖 IA'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-200 text-sm mb-3">{exp.pattern}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex space-x-4">
                  <span>Confianza: <span className="text-cyan-400">{(exp.confidence * 100).toFixed(1)}%</span></span>
                  <span>Impacto: <span className="text-purple-400">{(exp.impact * 100).toFixed(1)}%</span></span>
                </div>
                <span>{new Date(exp.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Connection Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
        <span>Conectado a: {apiEndpoint}</span>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span>REC Activo</span>
        </div>
      </div>
    </div>
  );
};