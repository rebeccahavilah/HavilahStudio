import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// 1. Atualizamos a importação para trazer os novos ícones: Diamond, Bot, Heart e User
import { Menu, X, Home, Calendar, Diamond, MessageCircle, Heart, Bot, User } from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 2. Atualizamos os ícones e adicionamos a nova rota 'Sobre mim'
  const navItems = [
    { icon: Home, label: 'Dashboard', path: AppRoute.DASHBOARD },
    { icon: Diamond, label: 'Valores', path: AppRoute.PRICING }, // Ícone alterado
    { icon: Calendar, label: 'Agendar', path: AppRoute.BOOKING },
    { icon: Bot, label: 'Consultoria', path: AppRoute.CONSULTANCY }, // Ícone alterado
    { icon: Heart, label: 'Cuidados', path: AppRoute.CARE }, // Ícone alterado
    { icon: User, label: 'Sobre mim', path: '/sobre-mim' }, // Nova aba adicionada
    { icon: MessageCircle, label: 'Assistente', path: AppRoute.CHAT },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-havilah-black text-havilah-champagne font-sans flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-havilah-black/95 backdrop-blur-md border-b border-havilah-gold/20 sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => navigate(AppRoute.DASHBOARD)}>
           
           {/* 3. LOGOTIPO MOBILE: Trocamos a <div> pelo <img> */}
           <img 
             src="/logo.png" 
             alt="Logo Rebecca Havilah" 
             className="w-8 h-8 rounded-full border border-havilah-gold object-cover" 
           />
           
           <span className="font-serif text-havilah-gold tracking-widest text-sm">HAVILAH</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-havilah-gold p-1">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
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
            
            {/* 4. LOGOTIPO DESKTOP: Trocamos a <div> pelo <img> */}
            <img 
              src="/logo.png" 
              alt="Logo Rebecca Havilah" 
              className="w-16 h-16 rounded-full border border-havilah-gold object-cover mx-auto mb-4 bg-havilah-black" 
            />
            
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
                    : 'text-havilah-champagne/60 hover:text-havilah-gold hover:bg-havilah-gold/5'
                  }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-havilah-gold/10">
            <p className="text-xs text-center text-havilah-champagne/30">
              © 2026 Havilah Studio
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0 bg-havilah-black">
        <div className="p-4 md:p-10 max-w-6xl mx-auto pb-24 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
