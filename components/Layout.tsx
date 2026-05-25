import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Calendar, Diamond, MessageCircle, Heart, Bot, User } from 'lucide-react';
import { AppRoute } from '../types';

// Importação da logo (Garante que a imagem 'logo.png' seja renderizada)
import logoImagem from './logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Matriz de navegação com os novos ícones e a nova rota da página Sobre Mim
  const navItems = [
    { icon: Home, label: 'Dashboard', path: AppRoute.DASHBOARD },
    { icon: Diamond, label: 'Valores', path: AppRoute.PRICING },
    { icon: Calendar, label: 'Agendar', path: AppRoute.BOOKING },
    { icon: Bot, label: 'Consultoria', path: AppRoute.CONSULTANCY },
    { icon: Heart, label: 'Cuidados', path: AppRoute.CARE },
    { icon: User, label: 'Sobre mim', path: AppRoute.ABOUT_ME }, // Utilizando a tipagem corrigida
    { icon: MessageCircle, label: 'Assistente', path: AppRoute.CHAT },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-havilah-black text-havilah-champagne font-sans flex flex-col md:flex-row">
      
      {/* Cabeçalho Mobile */}
      <div className="md:hidden flex items-center justify-between p-4 bg-havilah-black/95 backdrop-blur-md border-b border-havilah-gold/20 sticky top-0 z-40">
        <div className="flex items-center gap-2" onClick={() => navigate(AppRoute.DASHBOARD)}>
           <img 
             src={logoImagem} 
             alt="Logo Rebecca Havilah" 
             className="w-8 h-8 rounded-full border border-havilah-gold object-cover" 
           />
           <span className="font-serif text-havilah-gold tracking-widest text-sm">HAVILAH</span>
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

      {/* Menu Lateral (Desktop e Mobile) */}
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
            
            {/* Renderização do Logotipo RH na Barra Lateral */}
            <img 
              src={logoImagem} 
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

      <main className="flex-1 w-full min-w-0 bg-havilah-black">
        <div className="p-4 md:p-10 max-w-6xl mx-auto pb-24 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
