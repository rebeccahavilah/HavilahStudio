import React from 'react';
import { CARE_TIPS } from '../constants';

const careImages: Record<string, string> = {
  clock: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=800&auto=format&fit=crop",
  droplet: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
  shield: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?q=80&w=800&auto=format&fit=crop",
  feather: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop"
};

const careGradients: Record<string, string> = {
  clock: "from-amber-900/80 to-black/60",
  droplet: "from-stone-900/80 to-black/60",
  shield: "from-zinc-900/80 to-black/60",
  feather: "from-yellow-900/80 to-black/60"
};

export default function Care() {
  return (
    <div className="animate-fade-in pb-10">

      {/* HEADER */}
      <header className="mb-10 text-center">
        <p className="text-havilah-gold/60 text-xs uppercase tracking-widest mb-2">Havila
