import React from 'react';
import { HackathonHeader } from '../components/HackathonHeader';
import { Chatbot } from '../components/Chatbot';
import { ImageAnalyzer } from '../components/ImageAnalyzer';
import { Section } from '../components/Section';
import { ApiKeyWarning } from '../components/ApiKeyWarning';
import { ImageGenerator } from '../components/ImageGenerator';
import { FlowDiagram } from '../components/FlowDiagram';
import { MicroserviceCard } from '../components/MicroserviceCard';
import { RaindropDemo } from '../components/RaindropDemo';
import { SmartInference } from '../components/SmartInference';
import { SmartMemory } from '../components/SmartMemory';
import { SynapticDiagram } from '../components/SynapticDiagram';
import { VideoGenerator } from '../components/VideoGenerator';
import { VultrArchitecture } from '../components/VultrArchitecture';
import { BrainIcon, CodeIcon, RocketIcon } from '../components/Icons';


function App() {
  return (
    <div className="App bg-gray-900 text-white min-h-screen font-sans">
      <ApiKeyWarning />
      <HackathonHeader />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Welcome to MERS IASI Study Dashboard</h1>

        <Section title="AI Capabilities" icon={<BrainIcon className="w-8 h-8" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Chatbot />
            <ImageAnalyzer />
            <ImageGenerator />
            <SmartInference />
            <SmartMemory />
            <VideoGenerator />
          </div>
        </Section>

        <Section title="Architecture & Infrastructure" icon={<CodeIcon className="w-8 h-8" />}>
          <div className="grid grid-cols-1 gap-8">
            <FlowDiagram />
            <SynapticDiagram />
            <VultrArchitecture />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MicroserviceCard title="Service A" description="Description for service A" />
                <MicroserviceCard title="Service B" description="Description for service B" />
                <MicroserviceCard title="Service C" description="Description for service C" />
            </div>
          </div>
        </Section>

        <Section title="Demos & Examples" icon={<RocketIcon className="w-8 h-8" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RaindropDemo />
            {/* Add other demos here if available */}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
