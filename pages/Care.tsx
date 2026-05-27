import React from 'react';
import { CARE_TIPS } from '../constants';

const careImages: Record<string, string> = {
  clock: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
  droplet: "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=800&auto=format&fit=crop",
  shield: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=800&auto=format&fit=crop",
  feather: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop"
};

export default function Care() {
  return (
    <div className="animate-fade-in pb-10">
      <header className="mb-10 text-center">
        <p className="text-havilah-gold/60 text-xs uppercase tracking-widest mb-2">Havilah Lash Studio</p>
        <h1 className="font-serif text-3xl text-havilah-gold mb-3">Cuidados Essenciais</h1>
        <div className="w-16 h-px bg-havilah-gold/40 mx-auto mb-3"></div>
        <p className="text-havilah-champagne/60 text-sm">Para manter seus cílios impecáveis e duradouros.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARE_TIPS.map((tip, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden border border-havilah-gold/20 hover:border-havilah-gold/50 transition-all duration-300 group cursor-default"
            style={{ height: '260px' }}
          >
            <img
              src={careImages[tip.icon]}
              alt={tip.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-havilah-gold/50 flex items-center justify-center">
              <span className="text-havilah-gold text-xs font-serif">{index + 1}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="w-8 h-px bg-havilah-gold/60 mb-3"></div>
              <h3 className="font-serif text-xl text-havilah-gold mb-2">{tip.title}</h3>
              <p className="text-havilah-champagne/80 text-sm leading-relaxed">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 relative rounded-2xl overflow-hidden border border-havilah-gold/20">
        <img
          src="https://images.unsplash.com/photo-1587779782550-908359781b0f?q=80&w=1200&auto=format&fit=crop"
          alt="Cílios naturais"
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40 flex items-center px-8">
          <div>
            <div className="w-8 h-px bg-havilah-gold mb-3"></div>
            <h3 className="text-havilah-gold font-serif text-lg mb-1">Atenção ao ciclo natural</h3>
            <p className="text-sm text-havilah-champagne/70 max-w-md">Perdemos naturalmente de 3 a 5 fios por dia. Manutenções são recomendadas a cada 15 a 20 dias para manter o volume sempre perfeito.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
