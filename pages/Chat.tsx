import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import { sendMessageToApi } from '../services/geminiService';
import { ChatMessage } from '../types';

export default function Chat() {
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
    
    const currentHistory = messages
      .filter(m => m.id !== 'welcome') // Don't send the welcome message as chat history
      .map(({ role, text }) => ({ role, text }));

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const stream = await sendMessageToApi(currentHistory, userMessage.text);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      const botMessageId = (Date.now() + 1).toString();

      // Add a placeholder for the bot's response
      setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '', timestamp: new Date() }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
        
        // Update the streaming message in place
        setMessages(prev => prev.map(msg => 
            msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
        ));
      }
    } catch (error) {
        console.error("API Chat Error:", error);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "Desculpe, ocorreu um erro de comunicação com a assistente. Tente novamente.",
          timestamp: new Date(),
        }]);
    } finally {
        setLoading(false);
    }
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
              <div className="whitespace-pre-wrap">{msg.text || '...'}</div>
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-havilah-darkGray border border-havilah-gold/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
               <Loader2 size={16} className="animate-spin text-havilah-gold" />
               <span className="text-xs text-havilah-champagne/50">Pensando...</span>
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
          className="flex-1 bg-havilah-black border border-havilah-gold/20 rounded-xl px-4 py-3 text-havilah-champagne focus:border-havilah-gold focus:outline-none disabled:opacity-50"
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
