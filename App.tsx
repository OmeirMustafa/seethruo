import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EngineInput from './components/EngineInput';
import AnalysisPanel from './components/AnalysisPanel';
import AskAIWidget from './components/AskAIWidget';
import Footer from './components/Footer';
import { AuroraLayer, ParticleLayer, NoiseLayer } from './components/BackgroundLayers';
import { analyzeText } from './utils/analysis';
import { AnalysisResult } from './types';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleScrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDemo = () => {
    handleScrollToInput();
    // In a real app we might auto-fill the input here via state in EngineInput,
    // but for now scrolling focuses the user on the action area.
  };

  const handleAnalyze = (text: string) => {
    const res = analyzeText(text);
    setResult(res);
    // Smooth scroll to results
    setTimeout(() => {
      window.scrollTo({ top: window.scrollY + 400, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen font-sans text-white selection:bg-quantum-cyan selection:text-void-900 relative">
      <Navbar />
      
      {/* Background System */}
      <AuroraLayer />
      <ParticleLayer />
      <NoiseLayer />

      <main className="pt-16">
        <Hero onStart={handleScrollToInput} onDemo={handleDemo} />
        <EngineInput onAnalyze={handleAnalyze} inputRef={inputRef} />
        <AnalysisPanel result={result} />
      </main>

      <AskAIWidget />
      <Footer />
    </div>
  );
}

export default App;