import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { sampleKb } from '../sample_kb';
import { findBestMatch } from '../utils/vectorizer';
import { KnowledgeBase } from '../types';

const AskAIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: 'Hello. I am the SeeThruo Assistant. I can explain how this engine works or details about the analysis. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const kb: KnowledgeBase = sampleKb;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Local Logic Response
    setTimeout(() => {
      const { match, score } = findBestMatch(userMsg, kb.faqs);
      
      let responseText = "I don't have enough information in my local knowledge base to answer that properly.";
      
      if (score > 0.1 && match) {
        responseText = match.a;
      } else if (userMsg.toLowerCase().includes('hello') || userMsg.toLowerCase().includes('hi')) {
         responseText = "Greetings. I am ready to assist.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] glass-panel rounded-2xl shadow-2xl z-50 flex flex-col border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-void-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-quantum-cyan" size={20} />
                <span className="font-bold font-heading">Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-void-900/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-quantum-blue text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-void-900/80 flex gap-2">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about this tool..."
                className="flex-1 bg-void-800 border-none rounded-md px-3 py-2 text-sm text-white focus:ring-1 focus:ring-quantum-cyan"
              />
              <button onClick={handleSend} className="p-2 bg-quantum-cyan text-void-900 rounded-md hover:bg-cyan-300">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-quantum-cyan text-void-900 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center hover:scale-110 transition-transform z-50 animate-glow-pulse"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </>
  );
};

export default AskAIWidget;