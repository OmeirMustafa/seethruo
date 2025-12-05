import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-8 text-center text-slate-500 text-sm border-t border-white/5 bg-void-900/80 backdrop-blur-md">
      <p>&copy; {new Date().getFullYear()} SeeThruo Decision Intelligence. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <span className="hover:text-quantum-cyan cursor-pointer transition-colors">Privacy</span>
        <span className="hover:text-quantum-cyan cursor-pointer transition-colors">Terms</span>
        <span className="hover:text-quantum-cyan cursor-pointer transition-colors">GitHub</span>
      </div>
      <p className="mt-4 text-xs opacity-50">Engineered by Omeir Mustafa</p>
    </footer>
  );
};

export default Footer;