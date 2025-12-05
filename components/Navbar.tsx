import React from 'react';
import { LayoutGrid, Github } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 flex justify-between items-center glass-panel border-b-0 border-white/5 bg-opacity-40">
      <div className="flex items-center gap-2">
        <LayoutGrid className="text-quantum-cyan w-6 h-6" />
        <span className="font-heading font-bold text-xl tracking-tight text-white">
          SeeThruo <span className="text-quantum-cyan text-sm font-normal align-top">BETA</span>
        </span>
      </div>
      <div className="flex gap-4">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;