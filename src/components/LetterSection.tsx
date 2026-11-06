import React from 'react';
import { Heart } from 'lucide-react';

export const LetterSection: React.FC = () => {

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-1 mb-8">
        <span className="font-handwriting text-2xl text-pink-300 tracking-wide">
          Straight From My Heart
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
          A Personal Letter to Monisha
        </h2>
        <p className="text-sm text-slate-300 font-sans">
          Some words I don't say out loud often enough, written just for you.
        </p>
      </div>

      {/* Parchment Letter Container */}
      <div className="relative bg-[#fcf8f2] text-slate-900 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-amber-200/60 overflow-hidden">
        {/* Subtle Paper Texture & Watermark */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Vintage Wax Seal & Header Stamp */}
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Wax Seal "M" */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#be123c] to-[#e11d48] flex items-center justify-center shadow-md border-2 border-[#fb7185] relative">
              <span className="font-heading font-black text-white text-lg drop-shadow">M</span>
              <div className="absolute inset-1 rounded-full border border-white/30 pointer-events-none" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-sans font-semibold">Special Edition</p>
              <p className="font-handwriting text-xl text-amber-950 font-bold">A Special Letter From Your Friend</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-500">06 Nov 2026</span>
            <p className="font-handwriting text-base text-pink-700">Year 21 ✨</p>
          </div>
        </div>

        {/* Letter Body in Tanglish + English */}
        <div className="space-y-4 text-slate-800 font-sans leading-relaxed text-sm sm:text-base">
          <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 font-bold">
            Hey Monisha (My Friend),
          </p>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans">
            Enaku therinchi un life la naraya kastam pattu iruka , and neraya vishiyam achive pannanum nanaipa but athulam silla reasons naala mudiyathu , anyway ithu un life unaku pudicha mari vazhthuko seriya yaar enna nanaipanga athulaam yapayumae yosikathaa seriya , just neeya iru ethukagavum unaa change panikanum nanaikatha and be happy always .
          </p>

          <div className="p-4 my-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 font-handwriting text-xl sm:text-2xl text-amber-900 leading-snug">
            "Just neeya iru ethukagavum unaa change panikanum nanaikatha and be happy always."
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            May this 21st year give you all the peace, courage, and unconditional happiness you deserve. Always here for you as your friend!
          </p>

          {/* Letter Sign-off */}
          <div className="pt-4 border-t border-amber-900/10 flex flex-col items-end">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-sans">With Warm Wishes & Care,</p>
            <p className="font-handwriting text-3xl sm:text-4xl text-pink-700 font-bold mt-1">
              Your Friend ❤️
            </p>
            <span className="font-handwriting text-lg text-slate-600 mt-0.5">
              Always wishing the best for you · 06.11.2005 to Infinity
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
