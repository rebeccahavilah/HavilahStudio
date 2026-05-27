import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

const HavilahAvatar = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
    {/* Cabelo */}
    <ellipse cx="20" cy="14" rx="11" ry="12" fill="#1a0a00"/>
    <ellipse cx="20" cy="10" rx="9" ry="8" fill="#1a0a00"/>
    {/* Cabelo lateral esquerdo */}
    <ellipse cx="10" cy="22" rx="4" ry="10" fill="#1a0a00"/>
    {/* Cabelo lateral direito */}
    <ellipse cx="30" cy="22" rx="4" ry="10" fill="#1a0a00"/>
    {/* Rosto */}
    <ellipse cx="20" cy="19" rx="8" ry="9" fill="#C8956C"/>
    {/* Pescoço */}
    <rect x="17" y="26" width="6" height="5" fill="#C8956C"/>
    {/* Roupa preta */}
    <ellipse cx="20" cy="36" rx="12" ry="8" fill="#111111"/>
    {/* Gola V */}
    <polygon points="20,28 15,36 25,36" fill="#0a0a0a"/>
    {/* Olhos */}
    <ellipse cx="16.5" cy="18" rx="1.5" ry="1.2" fill="#2d1a0a"/>
    <ellipse cx="23.5" cy="18" rx="1.5" ry="1.2" fill="#2d1a0a"/>
    {/* Sobrancelhas */}
    <path d="M14.5 15.5 Q16.5 14.5 18.5 15.5" stroke="#1a0a00" strokeWidth="1" fill="none"/>
    <path d="M21.5 15.5 Q23.5 14.5 25.5 15.5" stroke="#1a0a00" strokeWidth="1" fill="none"/>
    {/* Boca */}
    <path d="M17.5 22.5 Q20 24 22.5 22.5" stroke="#8B4513" strokeWidth="1" fill="none"/>
    {/* Brinco dourado */}
    <circle cx="12" cy="20" r="1" fill="#C9A84C"/>
    <circle cx="28" cy="20" r="1" fill="#C9A84C"/>
    {/* Colar dourado */}
    <path d="M16 28 Q20 31 24 28" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
    {/* Borda dourada */}
    <circle cx="20" cy="20" r="19.5" stroke="#C9A84C" strokeWidth="1"/>
  </svg>
);

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá, Maravilhosa! Sou Havilah, sua consultora especialista do Havilah Lash Studio. Como posso ajudá-la hoje?',
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na API');
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Erro Chat:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Desculpe, ocorreu um erro ao conectar com a assistente.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-havilah-card border border-havilah-gold/10 rounded-2xl overflow-hidden animate-fade-in">

      {/* HEADER */}
      <div className="p-4 bg-havilah-darkGray border-b border-havilah-gold/10 flex items-center gap-3">
        <HavilahAvatar />
        <div>
          <h3 className="font-serif text-havilah-white">Assistente Havilah</h3>
          <p className="text-xs text-havilah-goldLight/70 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Online
          </p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="mr-2 mt-1 flex-shrink-0">
                <HavilahAvatar />
              </div>
            )}
            <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-havilah-gold text-havilah-black rounded-tr-sm'
                : 'bg-havilah-darkGray border border-havilah-gold/10 text-havilah-champagne rounded-tl-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-center gap-2">
            <HavilahAvatar />
            <div className="bg-havilah-darkGray border border-havilah-gold/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-havilah-gold" />
              <span className="text-xs text-havilah-champagne/50">Havilah está digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <form onSubmit={handleSend} className="p-4 bg-havilah-darkGray border-t border-havilah-gold/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua dúvida..."
          className="flex-1 bg-havilah-black border border-havilah-gold/20 rounded-xl px-4 py-3 text-havilah-champagne focus:border-havilah-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-havilah-gold text-havilah-black p-3 rounded-xl hover:bg-havilah-goldLight disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
