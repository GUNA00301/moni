import React, { useState } from 'react';
import { Sparkles, Wind, Flame, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { confetti } from '../utils/confetti';

interface CakeSectionProps {
  onReleaseLanterns: (count: number) => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onReleaseLanterns }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);
  const [showWishMessage, setShowWishMessage] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    sound.playBlow();
    setCandlesLit(false);
    setHasBlown(true);

    // Blast gentle star confetti
    confetti.blast({ count: 60, velocity: 10 });

    // Release lanterns into the dusk sky
    onReleaseLanterns(14);

    // Show emotional wish message
    setTimeout(() => {
      setShowWishMessage(true);
    }, 400);
  };

  const handleRelight = () => {
    sound.playPop();
    setCandlesLit(true);
    setShowWishMessage(false);
  };

  return (
    <section id="wish-section" className="relative py-12 px-4 sm:px-6 flex flex-col items-center text-center">
      <div className="max-w-xl w-full flex flex-col items-center">
        {/* Section Heading */}
        <div className="space-y-2 mb-6">
          <span className="font-handwriting text-2xl text-sky-300 tracking-wide">
            Make a Silent Wish First...
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            21st Birthday Cake
          </h2>
          <p className="text-sm text-slate-300 font-sans max-w-sm mx-auto">
            Kannai moodi unoda deepest wish-ah nenachukittu candles-ah blow pannu!
          </p>
        </div>

        {/* Interactive SVG Cake Container */}
        <div className="relative w-72 h-80 sm:w-80 sm:h-92 flex items-center justify-center my-2">
          {/* Cake Glow */}
          <div
            className={`absolute inset-4 rounded-full blur-2xl transition-all duration-700 ${
              candlesLit
                ? 'bg-gradient-to-t from-pink-500/30 via-yellow-400/25 to-sky-400/20 opacity-80'
                : 'bg-indigo-900/20 opacity-30'
            }`}
          />

          {/* SVG Birthday Cake */}
          <svg
            viewBox="0 0 300 340"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] select-none cursor-pointer"
            onClick={candlesLit ? handleBlowCandles : handleRelight}
            role="button"
            tabIndex={0}
            aria-label={candlesLit ? "Birthday cake with candles, click to blow out" : "Click to relight candles"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                candlesLit ? handleBlowCandles() : handleRelight();
              }
            }}
          >
            <defs>
              {/* Frosting Gradients */}
              <linearGradient id="tierBottom" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f472b6" />
                <stop offset="0.5" stopColor="#fb7185" />
                <stop offset="1" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="tierMiddle" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="0.5" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="tierTop" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbcfe8" />
                <stop offset="0.5" stopColor="#f472b6" />
                <stop offset="1" stopColor="#e879f9" />
              </linearGradient>
              <linearGradient id="frostingWhite" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="#fdf2f8" />
              </linearGradient>
              <linearGradient id="goldPlate" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ca8a04" />
                <stop offset="0.5" stopColor="#fef08a" />
                <stop offset="1" stopColor="#a16207" />
              </linearGradient>
            </defs>

            {/* Cake Stand / Plate */}
            <ellipse cx="150" cy="305" rx="135" ry="18" fill="url(#goldPlate)" />
            <ellipse cx="150" cy="303" rx="125" ry="14" fill="#1e1b4b" stroke="#fef08a" strokeWidth="1.5" />

            {/* Bottom Tier */}
            <path
              d="M45 220 C45 205 75 195 150 195 C225 195 255 205 255 220 L255 270 C255 285 225 295 150 295 C75 295 45 285 45 270 Z"
              fill="url(#tierBottom)"
            />
            {/* Bottom tier decorative dripping frosting */}
            <path
              d="M45 220 C60 235 75 220 90 235 C105 245 120 220 135 238 C150 245 165 220 180 238 C195 245 210 220 225 235 C240 220 255 235 255 220 L255 210 C255 195 225 195 150 195 C75 195 45 195 45 210 Z"
              fill="url(#frostingWhite)"
              opacity="0.95"
            />
            {/* Sprinkles on bottom tier */}
            <circle cx="80" cy="255" r="3" fill="#fde047" />
            <circle cx="120" cy="270" r="3" fill="#38bdf8" />
            <circle cx="170" cy="265" r="3.5" fill="#fef08a" />
            <circle cx="215" cy="255" r="3" fill="#a855f7" />

            {/* Middle Tier */}
            <path
              d="M75 150 C75 140 100 130 150 130 C200 130 225 140 225 150 L225 195 C225 208 200 216 150 216 C100 216 75 208 75 195 Z"
              fill="url(#tierMiddle)"
            />
            {/* Middle tier dripping frosting */}
            <path
              d="M75 150 C90 162 105 148 120 162 C135 170 150 152 165 166 C180 172 195 152 210 162 C218 152 225 160 225 150 L225 142 C225 130 200 130 150 130 C100 130 75 130 75 142 Z"
              fill="url(#frostingWhite)"
              opacity="0.95"
            />

            {/* Top Tier */}
            <path
              d="M100 95 C100 85 120 78 150 78 C180 78 200 85 200 95 L200 132 C200 142 180 148 150 148 C120 148 100 142 100 132 Z"
              fill="url(#tierTop)"
            />
            {/* Top tier frosting cream top */}
            <ellipse cx="150" cy="95" rx="50" ry="16" fill="url(#frostingWhite)" />

            {/* Strawberries on top rim */}
            <circle cx="120" cy="94" r="5" fill="#e11d48" />
            <circle cx="150" cy="98" r="5.5" fill="#e11d48" />
            <circle cx="180" cy="94" r="5" fill="#e11d48" />

            {/* Number 21 Golden Candle Topper */}
            {/* Candle Sticks (3 decorative candle pillars on top) */}
            {[
              { x: 125, y: 72, h: 22 },
              { x: 150, y: 66, h: 28 }, // Center tallest
              { x: 175, y: 72, h: 22 },
            ].map((c, idx) => (
              <g key={idx}>
                {/* Candle body with spiral stripes */}
                <rect x={c.x - 3} y={c.y} width="6" height={c.h} rx="2" fill="#fdf4ff" stroke="#e879f9" strokeWidth="0.8" />
                <path d={`M${c.x - 3} ${c.y + 6} L${c.x + 3} ${c.y + 10}`} stroke="#38bdf8" strokeWidth="1.5" />
                <path d={`M${c.x - 3} ${c.y + 14} L${c.x + 3} ${c.y + 18}`} stroke="#f472b6" strokeWidth="1.5" />
                {/* Wick */}
                <line x1={c.x} y1={c.y} x2={c.x} y2={c.y - 5} stroke="#334155" strokeWidth="1.2" />

                {/* Flame (flickering when lit) */}
                {candlesLit ? (
                  <g className="animate-flame" style={{ transformOrigin: `${c.x}px ${c.y - 5}px` }}>
                    {/* Outer flame glow */}
                    <ellipse cx={c.x} cy={c.y - 12} rx="6" ry="10" fill="#fde047" opacity="0.85" />
                    {/* Inner core flame */}
                    <ellipse cx={c.x} cy={c.y - 10} rx="3" ry="6" fill="#f97316" />
                    <ellipse cx={c.x} cy={c.y - 9} rx="1.5" ry="3" fill="#ffffff" />
                  </g>
                ) : (
                  /* Rising smoke puffs after blow */
                  <g className="animate-smoke" style={{ transformOrigin: `${c.x}px ${c.y - 5}px` }}>
                    <path
                      d={`M${c.x} ${c.y - 5} Q${c.x - 4} ${c.y - 14} ${c.x} ${c.y - 22} Q${c.x + 5} ${c.y - 30} ${c.x + 2} ${c.y - 38}`}
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                )}
              </g>
            ))}

            {/* "21" written in icing on middle tier */}
            <text
              x="150"
              y="182"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20"
              fontWeight="bold"
              fontFamily="Georgia, serif"
              letterSpacing="2"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            >
              21 ✨
            </text>
          </svg>
        </div>

        {/* Action Button: Blow the Candles / Relight */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          {candlesLit ? (
            <button
              type="button"
              onClick={handleBlowCandles}
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-sky-500 via-pink-500 to-rose-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Wind className="w-5 h-5 text-sky-200 group-hover:translate-x-1 transition-transform" />
              <span>Blow the Candles! 💨</span>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white font-medium text-sm transition-all cursor-pointer active:scale-95"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>

        {/* Wish Card Revealed after blowing candles */}
        {showWishMessage && (
          <div className="mt-8 p-6 rounded-2xl glass-panel border border-pink-400/30 max-w-md w-full animate-in fade-in zoom-in-95 duration-500 text-center space-y-3 shadow-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/20 text-pink-300 mx-auto">
              <Heart className="w-6 h-6 fill-pink-400 text-pink-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              Wish Registered in the Stars! ✨
            </h3>
            <p className="text-sm sm:text-base text-pink-200 font-sans leading-relaxed">
              Unoda wish kandippa niraverum Moni! May this 21st year give you all the peaceful sleep, 
              unfiltered joy, incredible career milestones, and all the love you effortlessly give everyone else.
            </p>
            <p className="font-handwriting text-xl text-yellow-300">
              "Look up! Glowing lanterns are floating to heaven for you 🏮"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
