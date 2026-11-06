import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface GiftGateProps {
  onOpen: () => void;
}

export const GiftGate: React.FC<GiftGateProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = (e: React.MouseEvent | React.TouchEvent) => {
    if (isOpening) return;
    setIsOpening(true);

    // Get tap coordinates for confetti burst
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    if ('clientX' in e && e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Play procedural sound & blast confetti + hearts
    sound.playPop();
    confetti.blast({ x: clientX, y: clientY, count: 120, velocity: 16 });
    
    // Staggered grand burst
    setTimeout(() => {
      confetti.grandBlast();
    }, 250);

    // Transition out
    setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #26173d 0%, #120e29 60%, #060814 100%)',
      }}
    >
      {/* Background starlight shimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-sm w-full flex flex-col items-center">
        {/* Tanglish Greeting Header */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-pink-300 font-handwriting text-2xl tracking-wide">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Surprise for Monisha</span>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight drop-shadow-md">
            Something Special Awaits!
          </h1>
          <p className="text-sm sm:text-base text-pink-200/80 font-sans max-w-xs mx-auto">
            Unoda 21st birthday-ku oru chinna surprise kaathukittu irukku...
          </p>
        </div>

        {/* Interactive Bouncing 3D Gift Box */}
        <button
          type="button"
          onClick={handleOpenGift}
          className={`relative group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 rounded-3xl p-4 transition-transform duration-300 ${
            isOpening ? 'scale-110 rotate-3' : 'hover:scale-105 active:scale-95'
          }`}
          aria-label="Tap to open your birthday surprise gift"
        >
          {/* Pulsing ambient halo behind box */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-sky-500/30 blur-xl animate-pulse" />

          {/* SVG Gift Box Art */}
          <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex items-center justify-center">
            <svg
              viewBox="0 0 200 220"
              className={`w-full h-full drop-shadow-2xl transition-all duration-500 ${
                isOpening ? 'translate-y-[-10px]' : 'animate-bounce'
              }`}
              style={{ animationDuration: '2s' }}
            >
              <defs>
                {/* Box body gradient */}
                <linearGradient id="boxGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ec4899" />
                  <stop offset="0.5" stopColor="#db2777" />
                  <stop offset="1" stopColor="#9d174d" />
                </linearGradient>
                {/* Ribbon gradient */}
                <linearGradient id="ribbonGrad" x1="0" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fef08a" />
                  <stop offset="0.5" stopColor="#facc15" />
                  <stop offset="1" stopColor="#ca8a04" />
                </linearGradient>
                {/* Lid shadow */}
                <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Gift Box Base */}
              <rect x="35" y="80" width="130" height="115" rx="14" fill="url(#boxGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Base vertical ribbon */}
              <rect x="88" y="80" width="24" height="115" fill="url(#ribbonGrad)" />
              {/* Base horizontal ribbon */}
              <rect x="35" y="130" width="130" height="20" fill="url(#ribbonGrad)" />

              {/* Gift Box Lid (flies up when opening) */}
              <g
                className={`transition-all duration-500 ${
                  isOpening ? 'opacity-70 -translate-y-12 rotate-[-12deg]' : ''
                }`}
              >
                <rect
                  x="25"
                  y="62"
                  width="150"
                  height="26"
                  rx="6"
                  fill="#f472b6"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                  filter="url(#shadowFilter)"
                />
                {/* Lid vertical ribbon */}
                <rect x="88" y="62" width="24" height="26" fill="url(#ribbonGrad)" />

                {/* Bow Ribbons on top */}
                {/* Left loop */}
                <path
                  d="M100 62 C75 35 45 42 65 62 C75 66 90 64 100 62 Z"
                  fill="url(#ribbonGrad)"
                  stroke="#eab308"
                  strokeWidth="1"
                />
                {/* Right loop */}
                <path
                  d="M100 62 C125 35 155 42 135 62 C125 66 110 64 100 62 Z"
                  fill="url(#ribbonGrad)"
                  stroke="#eab308"
                  strokeWidth="1"
                />
                {/* Center Bow Knot */}
                <ellipse cx="100" cy="62" rx="9" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
                {/* Trailing ribbon ends */}
                <path d="M96 66 Q80 85 70 95" stroke="#facc15" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M104 66 Q120 85 130 95" stroke="#facc15" strokeWidth="4" strokeLinecap="round" fill="none" />
              </g>

              {/* Gift tag */}
              <g transform="translate(108, 110) rotate(12)">
                <rect x="0" y="0" width="55" height="34" rx="4" fill="#fdf4ff" stroke="#e879f9" strokeWidth="1" />
                <circle cx="8" cy="17" r="2.5" fill="#a855f7" />
                <text x="18" y="15" fill="#701a75" fontSize="8" fontWeight="bold" fontFamily="sans-serif">TO: MONI</text>
                <text x="18" y="27" fill="#ec4899" fontSize="9" fontWeight="bold" fontFamily="serif">Age 21 ✨</text>
              </g>
            </svg>
          </div>
        </button>

        {/* Tap Instruction Button */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleOpenGift}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>Tap to Open Surprise 🎁</span>
            <Heart className="w-4 h-4 text-white fill-white group-hover:scale-125 transition-transform" />
          </button>
          <span className="font-handwriting text-lg text-pink-300 tracking-wide">
            (Don't forget to smile when you open it!)
          </span>
        </div>
      </div>
    </div>
  );
};
