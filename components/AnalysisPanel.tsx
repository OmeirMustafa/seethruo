import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../types';
import { Download, Share2, AlertTriangle, ShieldCheck, Activity, BarChart2 } from 'lucide-react';
import TiltCard from './TiltCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisPanelProps {
  result: AnalysisResult | null;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result }) => {
  if (!result) return null;

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seethruo-analysis.json';
    a.click();
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 pb-24 relative z-10"
    >
      {/* Top Stats Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Confidence</span>
          <span className={`text-3xl font-heading font-bold ${result.scores.confidence > 80 ? 'text-green-400' : 'text-yellow-400'}`}>
            {result.scores.confidence}%
          </span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Est. Bias</span>
          <span className={`text-3xl font-heading font-bold ${Math.abs(result.scores.bias) < 20 ? 'text-blue-400' : 'text-accent-pink'}`}>
            {result.scores.bias > 0 ? 'Right Leaning' : result.scores.bias < 0 ? 'Left Leaning' : 'Neutral'}
          </span>
        </div>
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Key Intent</span>
          <span className="text-xl font-heading font-bold text-quantum-purple text-center">
            {result.intents[0]?.label || "General"}
          </span>
        </div>
         <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Read Time</span>
          <span className="text-xl font-heading font-bold text-white text-center">
            {result.stats.readingTime}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Claims & Bias */}
        <div className="space-y-8">
          <TiltCard className="h-auto">
            <div className="glass-panel rounded-xl p-6 h-full">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-quantum-cyan">
                <AlertTriangle size={20} /> Claims Detected
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {result.claims.length === 0 && <p className="text-slate-500 italic">No specific claims detected.</p>}
                {result.claims.map((claim, i) => (
                  <div key={i} className="p-3 bg-void-800/50 rounded border border-white/5 text-sm hover:border-quantum-cyan/30 transition-colors">
                    <p className="text-slate-300 mb-1">"{claim.text}"</p>
                    <span className="text-xs text-quantum-cyan uppercase tracking-wider font-bold">{claim.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

           <TiltCard className="h-auto">
            <div className="glass-panel rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-accent-pink">
                <Activity size={20} /> Emotional Profile
              </h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={Object.entries(result.scores.emotion).map(([k,v]) => ({name: k, value: v}))}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6">
                      {Object.entries(result.scores.emotion).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={[
                          '#22d3ee', '#ef4444', '#eab308', '#6366f1', '#10b981'
                        ][index % 5]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Center: Recommendations & Blindspots */}
        <div className="space-y-8">
          <TiltCard className="h-full">
            <div className="glass-panel rounded-xl p-6 h-full border-t-4 border-t-quantum-purple">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-6 text-white">
                <ShieldCheck size={20} className="text-quantum-purple" /> Strategic Advice
              </h3>
              
              <div className="mb-8">
                <h4 className="text-sm text-slate-400 uppercase tracking-widest mb-3">Blindspots</h4>
                <ul className="space-y-2">
                   {result.blindspots.length === 0 && <li className="text-slate-500">None detected.</li>}
                   {result.blindspots.map((b, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                       <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-red-400 shrink-0" />
                       {b}
                     </li>
                   ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 uppercase tracking-widest mb-3">Recommendations</h4>
                <ul className="space-y-2">
                   {result.recommendations.map((r, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                       <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-green-400 shrink-0" />
                       {r}
                     </li>
                   ))}
                </ul>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right: Timeline & Export */}
        <div className="space-y-8">
           <TiltCard className="h-auto">
            <div className="glass-panel rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-quantum-blue">
                <BarChart2 size={20} /> Timeline
              </h3>
              <div className="relative pl-4 border-l border-slate-700 space-y-6">
                {result.timeline.map((t, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-void-900 border-2 border-quantum-blue" />
                    <span className="text-xs font-mono text-quantum-blue bg-quantum-blue/10 px-2 py-0.5 rounded">{t.date}</span>
                    <p className="text-sm text-slate-300 mt-1">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <div className="flex flex-col gap-3">
            <button onClick={handleDownload} className="w-full py-3 bg-void-800 border border-slate-700 hover:border-quantum-cyan text-white rounded-lg transition-colors flex items-center justify-center gap-2">
              <Download size={18} /> Export JSON
            </button>
            <button className="w-full py-3 bg-void-800 border border-slate-700 hover:border-quantum-purple text-white rounded-lg transition-colors flex items-center justify-center gap-2 opacity-70 cursor-not-allowed">
              <Share2 size={18} /> Share Analysis (Pro)
            </button>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default AnalysisPanel;