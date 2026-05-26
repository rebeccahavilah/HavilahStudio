import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Calendar, DollarSign, MessageCircle, Star, Sparkles, User } from 'lucide-react';
import { AppRoute } from '../types';

import logoImg from './logo.jpeg';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: AppRoute.DASHBOARD },
    { icon: DollarSign, label: 'Valores', path: AppRoute.PRICING },
    { icon: Calendar, label: 'Agendar', path: AppRoute.BOOKING },
    { icon: Sparkles, label: 'Consultoria', path: AppRoute.CONSULTANCY },
    { icon: Star, label: 'Cuidados', path: AppRoute.CARE },
    { icon: MessageCircle, label: 'Assistente', path: AppRoute.CHAT },
    { icon: User, label: 'Sobre mim', path: '/sobre-mim' }, 
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-havilah-black text-havilah-champagne font-sans flex flex-col md:flex-row">
      
      {/* =========================================
          CABEÇALHO MOBILE
      ========================================= */}
      <div className="md:hidden flex items-center justify-between p-4 bg-havilah-black/95 backdrop-blur-md border-b border-havilah-gold/20 sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => navigate(AppRoute.DASHBOARD)}>
           <img 
             src={logoImg} 
             alt="Logo Rebecca Havilah" 
             className="w-8 h-8 rounded-full border border-havilah-gold object-cover" 
           />
           
           {/* TEXTOS DA MARCA NO MOBILE */}
           <div className="flex flex-col justify-center">
             <span className="font-serif text-havilah-champagne/80 tracking-wider text-[10px] leading-tight">REBECCA</span>
             <span className="font-serif text-havilah-gold tracking-widest text-sm leading-tight">HAVILAH</span>
           </div>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-havilah-gold p-1">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Fundo Escuro Menu Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* =========================================
          MENU LATERAL (DESKTOP)
      ========================================= */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-full w-72 bg-havilah-darkGray border-r border-havilah-gold/10 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          <div className="mb-10 text-center md:block flex flex-col items-center">
             <div className="md:hidden absolute top-4 right-4">
               <button onClick={() => setIsSidebarOpen(false)} className="text-havilah-champagne/50">
                 <X size={24} />
               </button>
             </div>
            
            <img 
              src={logoImg} 
              alt="Logo Rebecca Havilah" 
              className="w-16 h-16 rounded-full border border-havilah-gold object-cover mx-auto mb-4 bg-havilah-black" 
            />
            
            {/* TEXTOS DA MARCA NO DESKTOP */}
            <h2 className="font-serif text-havilah-champagne/90 tracking-widest text-sm mb-1">REBECCA</h2>
            <h1 className="font-serif text-havilah-gold tracking-widest text-lg">HAVILAH</h1>
            <p className="text-xs text-havilah-goldLight/70 tracking-wide uppercase mt-1">Lash Studio</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
                  ${location.pathname === item.path 
                    ? 'bg-havilah-gold/10 text-havilah-gold border-l-2 border-havilah-gold' 
                    : 'text-havilah-champagne/60 hover:text-havilah-gold
