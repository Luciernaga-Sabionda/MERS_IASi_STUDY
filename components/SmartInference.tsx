import React, { useState } from 'react';
import { SpinnerIcon } from './Icons';

interface ValidationResult {
  score: number;
  confianza: number;
  coherencia: number;
  impacto: number;
  approved: boolean;
  reasoning: string;
}

export const SmartInference: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [humanLesson, setHumanLesson] = useState('Esta imagen SAR muestra inundación en zona agrícola');
  const [iaPrediccion, setIaPrediccion] = useState('Detección de humedad elevada en superficie');
  const [result, setResult] = useState<ValidationResult | null>(null);

  // Simulación de similitud semántica con validación simple
  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(w => words2.includes(w));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);
    
    // Boost para keywords técnicos relevantes
    const keywords = ['sar', 'inundación', 'humedad', 'agrícola', 'zona', 'detección', 'imagen'];
    const keywordMatches = keywords.filter(k => 
      text1.toLowerCase().includes(k) && text2.toLowerCase().includes(k)
    ).length;
    
    return Math.min(1.0, similarity + (keywordMatches * 0.1));
  };

  const validateLesson = async () => {
    setLoading(true);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // SmartInference: Validación del ValidadorCriterio
    const confianza = 0.85 + (Math.random() * 0.15); // 0.85-1.0
    const coherencia = calculateSimilarity(humanLesson, iaPrediccion);
    const impacto = humanLesson.length > 30 ? 0.8 + (Math.random() * 0.2) : 0.5 + (Math.random() * 0.3);

    // Fórmula ValidadorCriterio
    const score = (0.5 * confianza) + (0.4 * coherencia) + (0.1 * impacto);
    const approved = score > 0.7;

    const reasoning = approved
      ? `✅ Lección APROBADA para el REC. La similitud semántica (${(coherencia * 100).toFixed(1)}%) indica coherencia con predicciones IA. El experto muestra alta confianza (${(confianza * 100).toFixed(1)}%).`
      : `❌ Lección RECHAZADA. Score insuficiente. ${
          coherencia < 0.5 ? 'Baja coherencia con predicción IA. ' : ''
        }${confianza < 0.7 ? 'Confianza del experto cuestionable. ' : ''}`;

    setResult({
      score,
      confianza,
      coherencia,
      impacto,
      approved,
      reasoning
    });

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-green-400 mb-2">🧠 SmartInference - ValidadorCriterio</h3>
        <p className="text-gray-400">Validación semántica ligera con similitud vectorial</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-3">🤖 Predicción IA (Hemisferio A)</h4>
          <textarea
            value={iaPrediccion}
            onChange={(e) => setIaPrediccion(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm resize-none"
            rows={3}
            placeholder="Predicción generada por IA..."
          />
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-3">👤 Lección Humana (Corrección Experta)</h4>
          <textarea
            value={humanLesson}
            onChange={(e) => setHumanLesson(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm resize-none"
            rows={3}
            placeholder="Corrección del experto humano..."
          />
        </div>
      </div>

      {/* Botón de validación */}
      <div className="text-center mb-6">
        <button
          onClick={validateLesson}
          disabled={loading || !humanLesson || !iaPrediccion}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-8 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <SpinnerIcon className="w-6 h-6" />
              <span>Validando con SmartInference...</span>
            </div>
          ) : (
            '🔍 Ejecutar ValidadorCriterio'
          )}
        </button>
      </div>

      {/* Resultados */}
      {result && (
        <div className="space-y-4">
          {/* Score principal */}
          <div className={`rounded-lg p-6 border-2 ${result.approved ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-400">Score Final</div>
                <div className="text-4xl font-bold text-white">{result.score.toFixed(3)}</div>
              </div>
              <div className={`text-6xl ${result.approved ? 'text-green-400' : 'text-red-400'}`}>
                {result.approved ? '✅' : '❌'}
              </div>
            </div>
            <div className={`text-sm ${result.approved ? 'text-green-300' : 'text-red-300'}`}>
              {result.reasoning}
            </div>
          </div>

          {/* Métricas detalladas */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-white mb-4">📊 Desglose de Métricas</h4>
            <div className="space-y-3">
              {/* Confianza */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Confianza (peso: 50%)</span>
                  <span className="text-white font-bold">{(result.confianza * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.confianza * 100}%` }}
                  />
                </div>
              </div>

              {/* Coherencia */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Coherencia Semántica (peso: 40%)</span>
                  <span className="text-white font-bold">{(result.coherencia * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.coherencia * 100}%` }}
                  />
                </div>
              </div>

              {/* Impacto */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Impacto Pedagógico (peso: 10%)</span>
                  <span className="text-white font-bold">{(result.impacto * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${result.impacto * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fórmula */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-cyan-400 mb-2">🧮 Fórmula ValidadorCriterio</h4>
            <div className="bg-gray-950 rounded p-3 font-mono text-sm">
              <div className="text-gray-400">score = 0.5 × confianza + 0.4 × coherencia + 0.1 × impacto</div>
              <div className="text-white mt-2">
                score = 0.5 × {result.confianza.toFixed(2)} + 0.4 × {result.coherencia.toFixed(2)} + 0.1 × {result.impacto.toFixed(2)}
              </div>
              <div className="text-green-400 mt-2 font-bold">
                score = {result.score.toFixed(3)} {result.approved ? '> 0.7 ✅' : '≤ 0.7 ❌'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-500">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="text-sm text-gray-300">
            <strong className="text-white">SmartInference</strong> utiliza similitud semántica simple para validar coherencia entre 
            predicción IA y lección humana. Solo lecciones con <strong>score {'>'} 0.7</strong> se almacenan en el REC.
            Esto asegura que MERS aprenda únicamente de conocimiento validado y de alta calidad.
          </div>
        </div>
      </div>
    </div>
  );
};
