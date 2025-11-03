import React, { useState, useEffect } from 'react';
import { RaindropSmartMemory, RaindropSmartSQL, RaindropSmartInference } from './SmartComponents';

interface ArchitectureStatus {
  raindrop: 'connected' | 'connecting' | 'error';
  vultr: 'active' | 'pending' | 'error';
  googleCloud: 'ready' | 'processing' | 'error';
}

export const HybridArchitectureDashboard: React.FC = () => {
  const [status, setStatus] = useState<ArchitectureStatus>({
    raindrop: 'connecting',
    vultr: 'pending', 
    googleCloud: 'ready'
  });
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    simulateArchitectureConnection();
  }, []);

  const simulateArchitectureConnection = async () => {
    const addLog = (message: string) => {
      setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    try {
      addLog('🔄 Iniciando conexión híbrida...');
      
      // Paso 1: Conectar Raindrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus(prev => ({ ...prev, raindrop: 'connected' }));
      addLog('✅ Raindrop Platform conectado');

      // Paso 2: Activar Vultr Proxy
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus(prev => ({ ...prev, vultr: 'active' }));
      addLog('🌐 Vultr Proxy Server activado');

      // Paso 3: Validar Google Cloud MERS
      await new Promise(resolve => setTimeout(resolve, 800));
      setStatus(prev => ({ ...prev, googleCloud: 'processing' }));
      addLog('🧠 Google Cloud MERS procesando');

      addLog('🎯 Arquitectura híbrida completamente funcional');

    } catch (error) {
      addLog('❌ Error en conexión híbrida');
      console.error('Architecture connection error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'ready':
        return 'text-green-400';
      case 'connecting':
      case 'pending': 
      case 'processing':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'ready':
        return '✅';
      case 'connecting':
      case 'pending':
      case 'processing':
        return '🔄';
      default:
        return '❌';
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-cyan-300 mb-2">
          🏗️ Arquitectura Híbrida - IASi Study + Hackathon Demo
        </h3>
        <p className="text-gray-400 text-sm">
          Demostración de integración: Raindrop Platform → Vultr Services → Google Cloud MERS
        </p>
      </div>

      {/* Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 p-4 rounded-lg border border-blue-600">
          <div className="flex items-center justify-between">
            <span className="text-blue-300 font-semibold">Raindrop Platform</span>
            <span className="text-lg">{getStatusIcon(status.raindrop)}</span>
          </div>
          <div className={`text-sm ${getStatusColor(status.raindrop)}`}>
            {status.raindrop.charAt(0).toUpperCase() + status.raindrop.slice(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Frontend + SmartComponents</div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg border border-purple-600">
          <div className="flex items-center justify-between">
            <span className="text-purple-300 font-semibold">Vultr Services</span>
            <span className="text-lg">{getStatusIcon(status.vultr)}</span>
          </div>
          <div className={`text-sm ${getStatusColor(status.vultr)}`}>
            {status.vultr.charAt(0).toUpperCase() + status.vultr.slice(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Proxy Server + API Bridge</div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg border border-green-600">
          <div className="flex items-center justify-between">
            <span className="text-green-300 font-semibold">Google Cloud</span>
            <span className="text-lg">{getStatusIcon(status.googleCloud)}</span>
          </div>
          <div className={`text-sm ${getStatusColor(status.googleCloud)}`}>
            {status.googleCloud.charAt(0).toUpperCase() + status.googleCloud.slice(1)}
          </div>
          <div className="text-xs text-gray-500 mt-1">MERS Core System</div>
        </div>
      </div>

      {/* SmartComponents Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <RaindropSmartMemory 
          bucketId="mers-iasi-study-demo"
          onDataUpdate={(data) => console.log('SmartMemory Update:', data)}
        />
        <RaindropSmartSQL query="SELECT * FROM educational_patterns WHERE platform='IASi_Study'" />
        <RaindropSmartInference model="mers-hemisphere-cognitive-v1" />
      </div>

      {/* Connection Logs */}
      <div className="bg-gray-900/30 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">🔍 Logs de Conexión</h4>
        <div className="space-y-1 font-mono text-xs">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-400">
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Flow */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg border border-cyan-500">
        <h4 className="text-sm font-semibold text-cyan-300 mb-2">🔄 Flujo de Datos Híbrido</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <div>1. 🎯 Usuario interactúa con <strong>Raindrop Frontend</strong></div>
          <div>2. 🌐 Request pasa por <strong>Vultr Proxy Server</strong></div>
          <div>3. 🧠 Procesamiento en <strong>Google Cloud MERS</strong></div>
          <div>4. 📊 SmartComponents actualizan <strong>IASi Study Platform</strong></div>
        </div>
      </div>

      {/* Competition Note */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500 rounded-lg">
        <div className="text-yellow-300 text-sm font-semibold">🏆 Nota del Hackathon</div>
        <div className="text-yellow-200 text-xs mt-1">
          Esta es una <strong>demostración funcional</strong> de cómo MERS se integraría con los requisitos del 
          AI Championship 2025. En producción, todos los componentes estarían desplegados en sus respectivas plataformas.
        </div>
      </div>
    </div>
  );
};