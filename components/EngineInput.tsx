import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle } from 'lucide-react';
import TiltCard from './TiltCard';

interface EngineInputProps {
  onAnalyze: (text: string) => void;
  inputRef: React.RefObject<HTMLDivElement>;
}

const PRESETS = {
  press_release: "Company X today announced a new strategic partnership with Company Y to expand market reach. The CEO emphasized growth, agility, and shared values. Analysts expect a revenue boost of 20% by Q4. We remain committed to innovation.",
  speech: "My friends, we stand at a crossroads. The future is ours to seize, but only if we act with courage. There are those who say we cannot, but I say we must. We will never surrender our values. We will fight for every inch of progress.",
  scandal_response: "We deeply regret the recent confusion regarding our service metrics. While there were minor discrepancies, our commitment to transparency is absolute. We are launching an internal review immediately to ensure this never happens again."
};

const EngineInput: React.FC<EngineInputProps> = ({ onAnalyze, inputRef }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRun = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    // Fake processing delay for cinematic effect
    setTimeout(() => {
      onAnalyze(text);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handlePreset = (key: keyof typeof PRESETS) => {
    setText(PRESETS[key]);
  };

  return (
    <section ref={inputRef} className="py-20 px-6 max-w-5xl mx-auto relative z-10">
      <TiltCard className="w-full">
        <div className="glass-panel rounded-2xl p-1 bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-void-900/90 rounded-xl p-6 md:p-10 backdrop-blur-sm">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                <Cpu className="text-quantum-cyan" /> Input Source
              </h2>
              <div className="flex gap-2">
                <button onClick={() => handlePreset('press_release')} className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400 transition-colors">Press Release</button>
                <button onClick={() => handlePreset('speech')} className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400 transition-colors">Speech</button>
                <button onClick={() => handlePreset('scandal_response')} className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-400 transition-colors">Crisis</button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste text here for analysis..."
              className="w-full h-48 bg-void-800 border border-slate-700 rounded-lg p-4 text-slate-300 focus:outline-none focus:border-quantum-cyan focus:ring-1 focus:ring-quantum-cyan transition-all font-mono text-sm resize-none"
            />

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-quantum-cyan" /> Deterministic</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-quantum-cyan" /> Client-Side</span>
              </div>

              <button
                onClick={handleRun}
                disabled={!text.trim() || isAnalyzing}
                className={`
                  px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all
                  ${!text.trim() ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-quantum-blue text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'}
                `}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText size={18} /> Run Analysis
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </TiltCard>
    </section>
  );
};

export default EngineInput;