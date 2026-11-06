import React from 'react';
import { Sparkles, Heart, Flame, Download, X, Volume2, Stars } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';
import { downloadStandaloneHTML } from '../utils/singleFileExport';

interface GrandFinaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchMore: () => void;
}

export const GrandFinaleModal: React.FC<GrandFinaleModalProps> = ({
  isOpen,
  onClose,
  onLaunchMore,
}) => {
  if (!isOpen) return null;

  const handleLaunchMore = () => {
    sound.playFirework();
    confetti.grandBlast();
    onLaunchMore();
  };

  const handleDownload = () => {
    sound.playPop();
    downloadStandaloneHTML();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Happy 21st Birthday Grand Celebration"
    >
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-pink-500/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-sky-500/25 blur-3xl pointer-events-none" />

      {/* Modal Dialog Card */}
      <div className="relative max-w-lg w-full rounded-3xl bg-gradient-to-b from-[#1c183b] via-[#2a1740] to-[#391845] border border-pink-400/40 p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Badges */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>The Grand Birthday Wish</span>
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
        </div>

        {/* Glowing Headings */}
        <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
          Happy 21st Birthday, <br />
          <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-sky-300 bg-clip-text text-transparent">
            Monisha!
          </span>
        </h3>

        <p className="font-handwriting text-2xl text-pink-300 mt-2">
          May the stars always guide your steps ✨
        </p>

        {/* Emotional Tanglish Toast */}
        <div className="my-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-sans text-xs sm:text-sm leading-relaxed space-y-2">
          <p>
            Inaikku unakku 21 years start aaguthu! This is your golden era Moni. 
            May your twenties be filled with unforgettable journeys, belly-aching laughter, 
            peaceful nights, loyal friends, and every single dream you've whispered to the universe.
          </p>
          <p className="font-handwriting text-lg sm:text-xl text-yellow-300">
            "Never stop being the bold, hilarious, kind-hearted queen you are today!"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleLaunchMore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-medium text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <Stars className="w-4 h-4 text-yellow-300" />
            <span>Launch More Fireworks! 🎆</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white font-medium text-sm transition-all cursor-pointer active:scale-95"
            title="Download this website as a standalone single-file HTML (.html)"
          >
            <Download className="w-4 h-4 text-sky-300" />
            <span>Download .html Keepsake</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 font-sans mt-4">
          Save the single-file HTML to send to Monisha on WhatsApp or keep forever offline.
        </p>
      </div>
    </div>
  );
};
