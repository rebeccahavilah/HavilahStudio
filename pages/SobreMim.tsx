
import React from 'react';
// DOCUMENTAÇÃO: Importamos o logo que está na pasta components para servir de foto de perfil inicial.
// Verifique se o caminho de importação ('../components/logo.jpeg') reflete a estrutura exata das suas pastas.
import profileImg from '../components/logo.jpeg'; 

export default function SobreMim() {
  return (
    // DOCUMENTAÇÃO: Div principal com animação suave de entrada e espaçamento vertical.
    <div className="animate-fade-in space-y-6">
      
      {/* DOCUMENTAÇÃO: Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-havilah-gold tracking-wide">Sobre mim</h1>
        <p className="text-sm text-havilah-champagne/60 mt-1">Conheça a especialista por trás do seu olhar.</p>
      </div>

      {/* DOCUMENTAÇÃO: Card principal com bordas e fundo escuro que envolve a apresentação */}
      <div className="bg-havilah-darkGray border border-havilah-gold/20 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* DOCUMENTAÇÃO: Container da foto de perfil, garantindo que não amasse e fique redonda com borda dourada */}
        <div className="w-40 h-40 shrink-0">
          <img 
            src={profileImg} 
            alt="Rebecca Havilah" 
            className="w-full h-full object-cover rounded-full border-2 border-havilah-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
        </div>
        
        {/* DOCUMENTAÇÃO: Container dos textos (nome, especialidade e biografia) */}
        <div className="text-center md:text-left space-y-4">
          <div>
            <h2 className="text-3xl font-serif text-havilah-gold tracking-wider">Rebecca Havilah</h2>
            <h3 className="text-xs uppercase tracking-widest text-havilah-goldLight/70 mt-2">Especialista em Lash Design</h3>
          </div>
          
          <p className="text-havilah-champagne/80 leading-relaxed max-w-2xl text-sm md:text-base">
            Com um olhar clínico e paixão por elevar a autoestima, dedico-me a transformar olhares através de técnicas avançadas de Lash Design. Meu objetivo é proporcionar uma experiência premium de beleza e cuidado no Havilah Studio, onde cada detalhe é pensado para realçar a sua essência com naturalidade e sofisticação.
          </p>
        </div>

      </div>
    </div>
  );
}
