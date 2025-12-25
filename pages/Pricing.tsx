import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoute, LashModel } from '../types';
import { Check } from 'lucide-react';
import { LASH_MODELS } from '../constants';

interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

export default function Pricing() {
  const navigate = useNavigate();
  
  // Data now comes directly from constants, removing the Supabase dependency.
  const [models] = useState<LashModel[]>(LASH_MODELS);
  const [additionalServices] = useState<AdditionalService[]>([
    { id: 'rem_out', name: 'Remoção de Cílios (outro profissional)', price: 40 },
    { id: 'rem_our', name: 'Remoção (nossa aplicação)', price: 30 },
    { id: 'hygiene', name: 'Higienização Profunda', price: 20 },
  ]);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <header className="mb-10">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-havilah-gold mb-2">Investimento</h1>
          <p className="text-havilah-champagne/60 text-sm md:text-base">Transparência e valor em cada detalhe.</p>
        </div>
      </header>

      {/* Pricing Table */}
      <div className="bg-havilah-card border border-havilah-gold/10 rounded-2xl overflow-hidden mb-12 shadow-xl">
        <div className="grid grid-cols-12 bg-havilah-gold/5 text-havilah-gold text-[10px] md:text-xs uppercase tracking-wider font-semibold py-4 px-4 md:px-6 border-b border-havilah-gold/10 gap-2">
          <div className="col-span-6 md:col-span-5 flex items-center">Procedimento</div>
          <div className="col-span-3 md:col-span-3 text-right flex items-center justify-end">Aplicação</div>
          <div className="col-span-3 md:col-span-4 text-right flex items-center justify-end leading-tight">
            <span className="hidden md:inline">Manutenção (20 dias)</span>
            <span className="md:hidden">Manut.</span>
          </div>
        </div>

        {models.map((model, idx) => (
          <div key={model.id} className={`grid grid-cols-12 py-4 md:py-5 px-4 md:px-6 items-center hover:bg-havilah-gold/5 transition-colors gap-2 ${idx !== models.length - 1 ? 'border-b border-havilah-gold/5' : ''}`}>
            
            <div className="col-span-6 md:col-span-5 font-medium text-havilah-champagne text-sm md:text-base truncate pr-2">
              {model.name}
            </div>
            
            <div className="col-span-3 md:col-span-3 text-right text-havilah-white flex justify-end text-sm md:text-base">
              {`R$ ${model.price}`}
            </div>
            
            <div className="col-span-3 md:col-span-4 text-right text-havilah-champagne/70 flex justify-end text-sm md:text-base">
              {model.maintenancePrice ? `R$ ${model.maintenancePrice}` : '-'}
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-2xl text-havilah-gold mb-6 text-center">Combos Especiais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gradient-to-br from-havilah-card to-black border border-havilah-gold/20 p-6 md:p-8 rounded-xl relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 bg-havilah-gold text-black text-[10px] font-bold px-3 py-1 uppercase shadow-md">Best Seller</div>
          <h3 className="font-serif text-xl text-havilah-white mb-2">Combo Glamour</h3>
          <div className="text-3xl font-serif text-havilah-gold mb-4">R$ 230</div>
          <ul className="space-y-3 mb-8 text-sm text-havilah-champagne/70">
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>Aplicação Volume Havilah</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>Kit de Cuidados (Shampoo + Pincel)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>1ª Manutenção Inclusa</span></li>
          </ul>
          <Button fullWidth variant="outline" onClick={() => navigate(AppRoute.BOOKING)}>Quero este</Button>
        </div>

        <div className="bg-havilah-card border border-havilah-gold/10 p-6 md:p-8 rounded-xl h-full">
          <h3 className="font-serif text-xl text-havilah-white mb-2">Serviços Adicionais</h3>
          <ul className="space-y-4 mt-6">
            {additionalServices.map((service) => (
              <li key={service.id} className="flex justify-between items-center text-sm border-b border-havilah-gold/5 pb-3 last:border-0">
                <span className="text-havilah-champagne pr-2">{service.name}</span>
                <span className="text-havilah-gold font-medium whitespace-nowrap">
                  {`R$ ${service.price}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
