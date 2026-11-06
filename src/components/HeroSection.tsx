import React from 'react';
import { Sparkles, Heart, Stars } from 'lucide-react';

interface HeroSectionProps {
  onWishClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWishClick }) => {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 flex flex-col items-center text-center">
      {/* Decorative ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-sky-500/20 via-pink-500/25 to-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Date & Milestone Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs sm:text-sm font-medium tracking-wide mb-6">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        <span>06 · 11 · 2005</span>
        <span className="text-pink-400/50">·</span>
        <span className="text-sky-300">Celebrating 21 Magical Years</span>
      </div>

      {/* Giant Glowing Gradient Age Number [21] */}
      <div className="relative my-2 select-none">
        {/* Glow behind the number */}
        <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-60">
          <span className="text-8xl sm:text-9xl md:text-[13rem] font-heading font-black text-pink-500">
            21
          </span>
        </div>

        {/* The Giant Number with Dusk Sky Gradient & Shimmer */}
        <h1 className="relative text-8xl sm:text-9xl md:text-[13rem] font-heading font-black tracking-tighter leading-none">
          <span className="bg-gradient-to-b from-white via-pink-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(244,114,182,0.45)]">
            21
          </span>
        </h1>

        {/* Subtle Floating Sparkles */}
        <div className="absolute -top-2 -right-4 sm:right-2 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }}>
          <Sparkles className="w-7 h-7 drop-shadow" />
        </div>
        <div className="absolute bottom-4 -left-3 sm:left-2 text-pink-400 animate-bounce" style={{ animationDuration: '2.5s' }}>
          <Heart className="w-6 h-6 fill-pink-400" />
        </div>
      </div>

      {/* Her Name: Monisha in Stately Fraunces Display Face */}
      <div className="mt-2 space-y-3">
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-300 tracking-wide">
          Happy Birthday, My Friend!
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white drop-shadow-lg">
          Monisha
        </h2>
      </div>

      {/* Tanglish Heartfelt Tagline */}
      <p className="mt-5 max-w-lg text-base sm:text-lg text-slate-200 font-sans leading-relaxed text-balance">
        21 years of pure chaotic energy, unstoppable laughter, and the most golden heart.
      </p>

      {/* Milestone Stat Strip (Unboxed Clean Numbers) */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md p-4 rounded-2xl glass-card text-center">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold font-heading text-sky-300 tabular-nums">252</span>
          <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Months of Smiles</span>
        </div>
        <div className="flex flex-col items-center border-x border-white/10 px-2">
          <span className="text-xl sm:text-2xl font-bold font-heading text-pink-300 tabular-nums">7,671</span>
          <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Days of Sunshine</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold font-heading text-yellow-300">∞</span>
          <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Unconditional Love</span>
        </div>
      </div>

      {/* Quick Jump Action */}
      <div className="mt-8 flex items-center justify-center">
        <button
          type="button"
          onClick={onWishClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 hover:text-white text-sm font-medium transition-all cursor-pointer group active:scale-95"
        >
          <Stars className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
          <span>Blow the Birthday Candles 🎂</span>
        </button>
      </div>
    </section>
  );
};
