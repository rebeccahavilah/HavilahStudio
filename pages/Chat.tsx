import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou a assistente virtual do Havilah Lash Studio. Como posso ajudar você hoje? Posso sugerir modelos, tirar dúvidas sobre cuidados ou ajudar com agendamentos.',
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
    setInput('');
    setLoading(true);

    // Prepare history for API context if needed, currently passing last messages
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    const responseText = await sendMessageToGemini(history, userMessage.text);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-havilah-card border border-havilah-gold/10 rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-4 bg-havilah-darkGray border-b border-havilah-gold/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-havilah-gold bg-havilah-black flex items-center justify-center text-havilah-gold">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-serif text-havilah-white">Assistente Havilah</h3>
          <p className="text-xs text-havilah-goldLight/70 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-havilah-gold text-havilah-black rounded-tr-sm' 
                : 'bg-havilah-darkGray border border-havilah-gold/10 text-havilah-champagne rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-havilah-darkGray border border-havilah-gold/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
               <Loader2 size={16} className="animate-spin text-havilah-gold" />
               <span className="text-xs text-havilah-champagne/50">Digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
          className="bg-havilah-gold text-havilah-black p-3 rounded-xl hover:bg-havilah-goldLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;