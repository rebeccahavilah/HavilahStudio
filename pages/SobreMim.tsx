import React from 'react';
// DOCUMENTAÇÃO: Adicionamos ícones novos (BookOpen, ExternalLink, Award) para a seção de cursos.
import { BookOpen, ExternalLink, Award } from 'lucide-react';
import profileImg from '../components/logo.jpeg'; 
// No futuro, você importará as fotos da galeria aqui:
// import foto1 from '../components/foto1.jpeg';

export default function SobreMim() {
  return (
    <div className="animate-fade-in space-y-12 pb-10">
      
      {/* =========================================
          SEÇÃO 1: CABEÇALHO E APRESENTAÇÃO
      ========================================= */}
      <div>
        <h1 className="text-2xl font-serif text-havilah-gold tracking-wide mb-1">Sobre mim</h1>
        <p className="text-sm text-havilah-champagne/60">Conheça a especialista por trás do seu olhar.</p>
      </div>

      <div className="bg-havilah-darkGray border border-havilah-gold/20 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-40 h-40 shrink-0">
          <img 
            src={profileImg} 
            alt="Rebecca Havilah" 
            className="w-full h-full object-cover rounded-full border-2 border-havilah-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
        </div>
        
        <div className="text-center md:text-left space-y-4">
          <div>
            <h2 className="text-3xl font-serif text-havilah-gold tracking-wider">Rebecca Havilah</h2>
            <h3 className="text-xs uppercase tracking-widest text-havilah-goldLight/70 mt-2">Especialista em Lash Design</h3>
          </div>
          
          <p className="text-havilah-champagne/80 leading-relaxed text-sm md:text-base">
            Com um olhar clínico e paixão por elevar a autoestima, dedico-me a transformar olhares através de técnicas avançadas de Lash Design. Meu objetivo é proporcionar uma experiência premium de beleza e cuidado no Havilah Studio, onde cada detalhe é pensado para realçar a sua essência com naturalidade e sofisticação.
          </p>
        </div>
      </div>

      {/* =========================================
          SEÇÃO 2: STORYTELLING (A JORNADA)
      ========================================= */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-havilah-gold border-b border-havilah-gold/20 pb-2">Minha Jornada</h3>
        <div className="text-havilah-champagne/80 space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            [AQUI ENTRA O TEXTO DA HISTÓRIA] Desde o início da minha carreira, percebi que os cílios não são apenas um detalhe estético, mas a moldura da alma... 
          </p>
          <p>
            Construí o Havilah Studio com a missão de criar um ambiente onde cada mulher possa se reconectar com seu poder pessoal.
          </p>
        </div>
        
        {/* Placeholder para uma galeria de fotos futura */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {/* Exemplo de espaço para foto: Substitua o bloco abaixo por tags <img /> futuramente */}
            <div className="bg-havilah-gold/5 border border-havilah-gold/10 h-32 rounded-lg flex items-center justify-center text-havilah-champagne/30 text-xs">Foto 1</div>
            <div className="bg-havilah-gold/5 border border-havilah-gold/10 h-32 rounded-lg flex items-center justify-center text-havilah-champagne/30 text-xs">Foto 2</div>
            <div className="bg-havilah-gold/5 border border-havilah-gold/10 h-32 rounded-lg flex items-center justify-center text-havilah-champagne/30 text-xs">Foto 3</div>
        </div>
      </div>

      {/* =========================================
          SEÇÃO 3: CURSOS E FORMAÇÕES
      ========================================= */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-havilah-gold border-b border-havilah-gold/20 pb-2 flex items-center gap-2">
          <Award size={20} /> Formações e Especializações
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card do Curso */}
          <div className="bg-gradient-to-br from-havilah-darkGray to-black border border-havilah-gold/30 rounded-xl p-6 hover:border-havilah-gold transition-colors duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-havilah-gold/10 rounded-lg text-havilah-gold">
                <BookOpen size={24} />
              </div>
              <h4 className="text-lg font-bold text-havilah-champagne">Método MRH</h4>
            </div>
            <p className="text-sm text-havilah-champagne/60 mb-6">
              Aprenda as técnicas exclusivas e os módulos avançados para se destacar no mercado de Lash Design com a nossa imersão completa.
            </p>
            
            {/* DOCUMENTAÇÃO: Botão com link externo. Substitua o '#' pelo link real do checkout. */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-havilah-gold text-black font-bold py-2 px-4 rounded-lg hover:bg-havilah-goldLight transition-colors w-full justify-center"
            >
              Conhecer a Imersão <ExternalLink size={16} />
            </a>
          </div>

          {/* Você pode copiar o bloco "Card do Curso" acima e colar aqui para adicionar mais cursos */}

        </div>
      </div>

    </div>
  );
}
