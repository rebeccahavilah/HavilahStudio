import React from 'react';
import { CARE_TIPS } from '../constants';
import { Droplet, Clock, Shield, Feather, Star } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  clock: <Clock size={24} />,
  droplet: <Droplet size={24} />,
  shield: <Shield size={24} />,
  feather: <Feather size={24} />
};

const Care: React.FC = () => {
  return (
    <div className="animate-fade-in pb-10">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-3xl text-havilah-gold mb-2">Cuidados Essenciais</h1>
        <p className="text-havilah-champagne/60">Para manter seus cílios impecáveis e duradouros.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARE_TIPS.map((tip, index) => (
          <div key={index} className="bg-havilah-card border border-havilah-gold/10 p-6 rounded-xl hover:border-havilah-gold/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold mb-4">
              {iconMap[tip.icon] || <Star size={24} />}
            </div>
            <h3 className="font-serif text-xl text-havilah-white mb-2">{tip.title}</h3>
            <p className="text-havilah-champagne/70 text-sm leading-relaxed">
              {tip.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-havilah-darkGray p-8 rounded-xl border-l-4 border-havilah-gold">
        <h3 className="text-havilah-gold font-serif text-lg mb-2">Atenção ao ciclo natural</h3>
        <p className="text-sm text-havilah-champagne/60">
          Perdemos naturalmente de 3 a 5 fios por dia. Não se assuste se ver um fio caindo junto com a extensão.
          Manutenções são recomendadas a cada 15 a 20 dias para manter o volume sempre perfeito.
        </p>
      </div>
    </div>
  );
};

export default Care;