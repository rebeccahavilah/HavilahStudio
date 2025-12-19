
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Star, Calendar, MessageCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-havilah-gold mb-1">Bem-vinda!</h1>
        <p className="text-havilah-champagne/60">Este é o seu espaço de beleza.</p>
      </header>

      {/* Main Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-havilah-card border border-havilah-gold/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer" onClick={() => navigate(AppRoute.BOOKING)}>
         <div className="absolute inset-0 bg-gradient-to-r from-havilah-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
         <div className="relative z-10 text-left">
            <h3 className="font-serif text-2xl text-havilah-white mb-2">Agende seu horário</h3>
            <p className="text-havilah-champagne/70 max-w-sm">Garanta sua manutenção ou nova aplicação com a especialista Rebecca Havilah.</p>
         </div>
         <div className="relative z-10 bg-havilah-gold text-havilah-black rounded-full p-3 md:p-4 shadow-lg shadow-havilah-gold/20 group-hover:scale-110 transition-transform">
            <Calendar size={24} />
         </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div onClick={() => navigate(AppRoute.PRICING)} className="bg-havilah-card border border-havilah-gold/10 p-5 rounded-xl hover:border-havilah-gold/30 transition-all cursor-pointer text-center group">
          <div className="w-10 h-10 mx-auto rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold mb-3 group-hover:bg-havilah-gold group-hover:text-havilah-black transition-colors">
            <span className="font-serif font-bold text-lg">$</span>
          </div>
          <span className="text-sm font-medium text-havilah-champagne">Valores</span>
        </div>

        <div onClick={() => navigate(AppRoute.CONSULTANCY)} className="bg-havilah-card border border-havilah-gold/10 p-5 rounded-xl hover:border-havilah-gold/30 transition-all cursor-pointer text-center group">
          <div className="w-10 h-10 mx-auto rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold mb-3 group-hover:bg-havilah-gold group-hover:text-havilah-black transition-colors">
            <MessageCircle size={20} />
          </div>
          <span className="text-sm font-medium text-havilah-champagne">Consultoria IA</span>
        </div>

        <div onClick={() => navigate(AppRoute.CARE)} className="bg-havilah-card border border-havilah-gold/10 p-5 rounded-xl hover:border-havilah-gold/30 transition-all cursor-pointer text-center group">
          <div className="w-10 h-10 mx-auto rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold mb-3 group-hover:bg-havilah-gold group-hover:text-havilah-black transition-colors">
            <Star size={20} />
          </div>
          <span className="text-sm font-medium text-havilah-champagne">Cuidados</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;