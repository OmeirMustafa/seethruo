import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onDemo }) => {
  return (
    <section className="relative z-10 min-h-[80vh] flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 pt-24 pb-12 gap-12">
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Reveal the
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-cyan to-quantum-purple text-glow">
              Hidden Context
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-light">
            World-class decision intelligence engine. Decode intent, bias, and claims in seconds using advanced deterministic client-side analysis.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-quantum-cyan text-void-900 font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 animate-glow-pulse"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Analysis <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={onDemo}
            className="px-8 py-4 border border-slate-700 hover:border-quantum-purple text-white rounded-lg transition-all hover:bg-slate-800/50 flex items-center gap-2 justify-center"
          >
            <Play size={18} className="text-quantum-purple" />
            Try Demo Input
          </button>
        </motion.div>
      </div>

      <div className="flex-1 w-full max-w-lg lg:max-w-xl relative hidden md:block">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="relative aspect-square"
        >
           {/* Abstract 3D Representation */}
           <div className="absolute inset-10 border border-quantum-cyan/30 rounded-full animate-[spin_12s_linear_infinite]" />
           <div className="absolute inset-20 border border-quantum-purple/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-48 h-48 bg-gradient-to-br from-quantum-blue/20 to-quantum-purple/20 backdrop-blur-xl border border-white/10 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl">
                <div className="text-center p-4">
                  <div className="h-2 w-24 bg-slate-700/50 rounded mb-2" />
                  <div className="h-2 w-16 bg-slate-700/50 rounded mb-4" />
                  <div className="h-20 w-full bg-slate-800/50 rounded border border-white/5" />
                </div>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;