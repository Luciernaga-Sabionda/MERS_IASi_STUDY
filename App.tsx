
import React from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Card } from './components/Card';
import { FlowDiagram } from './components/FlowDiagram';
import { MicroserviceCard } from './components/MicroserviceCard';
// FIX: Removed 'UserGroupIcon' from import as it is not exported from './components/Icons'.
import { BrainIcon, CodeIcon, DatabaseIcon, CogIcon, LightBulbIcon, ScaleIcon, RecycleIcon, RocketLaunchIcon, BookOpenIcon, UsersIcon } from './components/Icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-300">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8 md:py-12">
        
        {/* 3.1 Arquitectura Cognitiva */}
        <Section title="Arquitectura Cognitiva de Doble Hemisferio (IASi–MERS)" icon={<BrainIcon />}>
          <p className="text-lg leading-relaxed mb-8">
            El proyecto MERS (Módulo Inteligente de Retroalimentación Educativa Selectiva) se implementa como el Hemisferio B de IASi Study, conformando una arquitectura cognitiva de doble hemisferio inspirada en el cerebro humano. Esta división estratégica separa la predicción técnica (razón analítica) de la enseñanza adaptativa (conciencia pedagógica), permitiendo que el sistema aprenda, interprete y enseñe con precisión y sentido.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Hemisferio A: Razón / Análisis" className="border-cyan-500/50">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Predicción Técnica SAR</h3>
              <p className="mb-4">Genera el conocimiento técnico a través del análisis de datos.</p>
              <p className="font-mono text-sm bg-gray-800 p-2 rounded">Python, TensorFlow, PyTorch</p>
            </Card>
            <Card title="Hemisferio B (MERS): Conciencia / Pedagogía" className="border-violet-500/50">
              <h3 className="text-xl font-semibold text-violet-400 mb-2">Enseñanza Adaptativa</h3>
              <p className="mb-4">Traduce la predicción técnica en lecciones comprensibles y adaptadas.</p>
              <p className="font-mono text-sm bg-gray-800 p-2 rounded">Python, NLP (BERT), MongoDB, RL</p>
            </Card>
          </div>
        </Section>
        
        {/* 3.2 Flujo Neuronal Detallado */}
        <Section title="Flujo Neuronal Detallado y Componentes del MERS" icon={<CogIcon />}>
           <p className="text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto">
            El Hemisferio B (MERS) funciona como una red neuronal digital. Cada capa transforma la información técnica en conocimiento significativo y útil para el usuario, simulando el flujo cognitivo de la mente humana.
          </p>
          <FlowDiagram />
        </Section>
        
        {/* 3.4 Arquitectura de Microservicios */}
        <Section title="Arquitectura de Microservicios" icon={<CodeIcon />}>
          <p className="text-lg leading-relaxed mb-8">
            Para garantizar escalabilidad y mantenimiento, el sistema se implementa mediante microservicios interconectados en Python/Flask, cada uno con una función especializada dentro del flujo cognitivo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MicroserviceCard name="svc-preprocess" technologies="Python, NumPy, NLP (BERT)">Unifica PrediccionIASi y LeccionHumana en el vector V_entrada.</MicroserviceCard>
            <MicroserviceCard name="svc-validator" technologies="Python, Cosine Similarity">Ejecuta el ValidadorCriterio, calculando C_confianza, C_coherencia y C_impacto.</MicroserviceCard>
            <MicroserviceCard name="svc-rec" technologies="Python, MongoDB, Redis">Gestiona el REC (CRUD, clustering, búsqueda semántica).</MicroserviceCard>
            <MicroserviceCard name="svc-explainer" technologies="Python (Patrón Strategy)">Aplica el Strategy Pattern para generar la explicación adaptada (NLG).</MicroserviceCard>
            <MicroserviceCard name="svc-rl" technologies="Python, stable-baselines3">Implementa el agente de Aprendizaje Reforzado para ajustar estrategias pedagógicas.</MicroserviceCard>
            <MicroserviceCard name="Base de Datos" technologies="MongoDB, Vector DB">Almacena predicciones, lecciones, perfiles y patrones validados.</MicroserviceCard>
          </div>
        </Section>
        
        {/* 3.5 Conclusión */}
        <Section title="Conclusión del Capítulo" icon={<RocketLaunchIcon />}>
          <p className="text-lg leading-relaxed italic text-center max-w-4xl mx-auto border-l-4 border-teal-500 pl-6">
            El diseño metodológico del MERS–IASi Study establece una arquitectura neuroinspirada, modular y ética. La combinación de IA explicable, retroalimentación humana y aprendizaje reforzado lo convierte en un sistema educativo vivo, capaz de aprender a enseñar con claridad, justicia y adaptabilidad. El MERS no solo procesa datos: comprende, razona y evoluciona, demostrando que la verdadera IA educativa colabora con el ser humano para expandir la conciencia del conocimiento.
          </p>
        </Section>
      </main>
    </div>
  );
};

export default App;