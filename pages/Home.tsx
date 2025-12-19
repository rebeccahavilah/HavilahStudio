import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Button } from '../components/Button';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-havilah-black relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-havilah-gold/10 via-havilah-black to-havilah-black z-0 pointer-events-none"></div>

      <div className="z-10 max-w-md w-full animate-fade-in-up">
        <div className="w-24 h-24 rounded-full border-2 border-havilah-gold mx-auto mb-8 flex items-center justify-center">
          <span className="font-serif text-5xl text-havilah-gold">H</span>
        </div>
        
        <h1 className="font-serif text-4xl text-havilah-gold mb-2 tracking-wide">HAVILAH</h1>
        <p className="text-havilah-goldLight/80 text-sm tracking-[0.3em] uppercase mb-12">Lash Studio by Rebecca</p>

        <div className="space-y-4">
          <Button fullWidth onClick={() => navigate(AppRoute.LOGIN)}>
            Entrar
          </Button>
          <Button fullWidth variant="outline" onClick={() => navigate(AppRoute.REGISTER)}>
            Criar Conta
          </Button>
        </div>

        <p className="mt-12 text-havilah-champagne/40 text-xs">
          Experiência Premium em Extensão de Cílios
        </p>
      </div>
    </div>
  );
};

export default Welcome;