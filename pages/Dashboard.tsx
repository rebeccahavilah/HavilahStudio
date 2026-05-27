import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const carouselImages = [
  "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-10">

      {/* HERO — Foto + Info */}
      <div className="relative rounded-2xl overflow-hidden border border-havilah-gold/20" style={{ minHeight: '340px' }}>
        <img
          src="/rebecca.jpeg"
          alt="Rebecca Havilah"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        {/* Logo */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2">
            <div className="w-px h-8 bg-havilah-gold/50"></div>
            <div>
              <p className="text-havilah-gold/70 text-xs uppercase tracking-widest">by</p>
              <p className="text-havilah-gold font-serif text-sm">Rebecca Havilah</p>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 p-8 pt-20 flex flex-col justify-end h-full" style={{ minHeight: '340px' }}>
          <p className="text-havilah-gold/60 text-xs uppercase tracking-widest mb-2">Havilah Lash Studio</p>
          <h1 className="font-serif text-4xl text-white mb-2 leading-tight">
            Realçando o que há<br/>
            <span className="text-havilah-gold">de mais belo em você</span>
          </h1>
          <div className="w-12 h-px bg-havilah-gold/50 my-4"></div>
          <p className="text-havilah-champagne/70 text-sm max-w-xs mb-6">
            Especialista em extensão de cílios e criadora do exclusivo modelo Havilah.
          </p>
          <button
            onClick={() => navigate(AppRoute.BOOKING)}
            className="w-fit bg-havilah-gold text-havilah-black font-serif px-8 py-3 rounded-full hover:bg-havilah-goldLight transition-all text-sm tracking-wide"
          >
            Agendar Horário
          </button>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { number: "5+", label: "Anos de experiência" },
          { number: "500+", label: "Clientes atendidas" },
          { number: "8", label: "Modelos exclusivos" },
        ].map((stat, i) => (
          <div key={i} className="bg-havilah-card border border-havilah-gold/10 rounded-xl p-4 text-center hover:border-havilah-gold/30 transition-all">
            <p className="font-serif text-2xl text-havilah-gold mb-1">{stat.number}</p>
            <p className="text-havilah-champagne/50 text-xs leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CARROSSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-havilah-gold/60 text-xs uppercase tracking-widest">Nosso trabalho</p>
          <div className="flex gap-1">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-havilah-gold' : 'w-2 bg-havilah-gold/20'}`}
              />
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-havilah-gold/20" style={{ height: '220px' }}>
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Trabalho ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>

      {/* NAVEGAÇÃO PREMIUM */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            label: "Valores",
            sub: "Conheça nossos serviços",
            route: AppRoute.PRICING,
            img: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=400&auto=format&fit=crop"
          },
          {
            label: "Consultoria IA",
            sub: "Descubra seu estilo ideal",
            route: AppRoute.CONSULTANCY,
            img: "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=400&auto=format&fit=crop"
          },
          {
            label: "Cuidados",
            sub: "Preserve seus cílios",
            route: AppRoute.CARE,
            img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop"
          },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.route)}
            className="relative rounded-xl overflow-hidden border border-havilah-gold/20 hover:border-havilah-gold/50 cursor-pointer group transition-all"
            style={{ height: '130px' }}
          >
            <img
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-serif text-havilah-gold text-sm">{item.label}</p>
              <p className="text-havilah-champagne/50 text-xs">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const carouselImages = [
  "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-10">

      {/* HERO — Foto + Info */}
      <div className="relative rounded-2xl overflow-hidden border border-havilah-gold/20" style={{ minHeight: '340px' }}>
        <img
          src="/rebecca.jpeg"
          alt="Rebecca Havilah"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        {/* Logo */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2">
            <div className="w-px h-8 bg-havilah-gold/50"></div>
            <div>
              <p className="text-havilah-gold/70 text-xs uppercase tracking-widest">by</p>
              <p className="text-havilah-gold font-serif text-sm">Rebecca Havilah</p>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 p-8 pt-20 flex flex-col justify-end h-full" style={{ minHeight: '340px' }}>
          <p className="text-havilah-gold/60 text-xs uppercase tracking-widest mb-2">Havilah Lash Studio</p>
          <h1 className="font-serif text-4xl text-white mb-2 leading-tight">
            Realçando o que há<br/>
            <span className="text-havilah-gold">de mais belo em você</span>
          </h1>
          <div className="w-12 h-px bg-havilah-gold/50 my-4"></div>
          <p className="text-havilah-champagne/70 text-sm max-w-xs mb-6">
            Especialista em extensão de cílios e criadora do exclusivo modelo Havilah.
          </p>
          <button
            onClick={() => navigate(AppRoute.BOOKING)}
            className="w-fit bg-havilah-gold text-havilah-black font-serif px-8 py-3 rounded-full hover:bg-havilah-goldLight transition-all text-sm tracking-wide"
          >
            Agendar Horário
          </button>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { number: "5+", label: "Anos de experiência" },
          { number: "500+", label: "Clientes atendidas" },
          { number: "8", label: "Modelos exclusivos" },
        ].map((stat, i) => (
          <div key={i} className="bg-havilah-card border border-havilah-gold/10 rounded-xl p-4 text-center hover:border-havilah-gold/30 transition-all">
            <p className="font-serif text-2xl text-havilah-gold mb-1">{stat.number}</p>
            <p className="text-havilah-champagne/50 text-xs leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CARROSSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-havilah-gold/60 text-xs uppercase tracking-widest">Nosso trabalho</p>
          <div className="flex gap-1">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-havilah-gold' : 'w-2 bg-havilah-gold/20'}`}
              />
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-havilah-gold/20" style={{ height: '220px' }}>
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Trabalho ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>

      {/* NAVEGAÇÃO PREMIUM */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            label: "Valores",
            sub: "Conheça nossos serviços",
            route: AppRoute.PRICING,
            img: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=400&auto=format&fit=crop"
          },
          {
            label: "Consultoria IA",
            sub: "Descubra seu estilo ideal",
            route: AppRoute.CONSULTANCY,
            img: "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=400&auto=format&fit=crop"
          },
          {
            label: "Cuidados",
            sub: "Preserve seus cílios",
            route: AppRoute.CARE,
            img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop"
          },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.route)}
            className="relative rounded-xl overflow-hidden border border-havilah-gold/20 hover:border-havilah-gold/50 cursor-pointer group transition-all"
            style={{ height: '130px' }}
          >
            <img
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-serif text-havilah-gold text-sm">{item.label}</p>
              <p className="text-havilah-champagne/50 text-xs">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
