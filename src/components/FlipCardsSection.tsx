import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Laugh, 
  Moon, 
  ShieldCheck, 
  Infinity as InfinityIcon,
  Heart
} from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface MemoryCard {
  id: number;
  icon: React.ReactNode;
  tag: string;
  frontTitle: string;
  frontSubtitle: string;
  backTitle: string;
  backText: string;
  backQuote: string;
  accentColor: string;
}

export const FlipCardsSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const cards: MemoryCard[] = [
    {
      id: 1,
      icon: <Laugh className="w-6 h-6 text-pink-400" />,
      tag: "The Humor",
      frontTitle: "Unstoppable Laughs",
      frontSubtitle: "Namma siricha stop-ey aagathu!",
      backTitle: "Those Stomach-Cramping Laughs",
      backText: "Remember those moments when someone cracked a totally lame joke in the most serious situation, and both of us laughed till tears rolled down? Unkooda sirikira mathiri yaarkoodavum varaathu Moni. Nobody gets my crazy sense of humor like you do!",
      backQuote: "\"Laughter therapy with you is 100% free!\"",
      accentColor: "from-pink-500/20 to-rose-500/10 border-pink-400/30"
    },
    {
      id: 2,
      icon: <Moon className="w-6 h-6 text-sky-400" />,
      tag: "Safe Space",
      frontTitle: "Un Kooda Pesumbothu...",
      frontSubtitle: "Olarittey irunthaalum semma feeling 😁😜",
      backTitle: "My No-Judgment Zone",
      backText: "un kuda pesitu irunth okk antha feeling nalla  iruku , epayumae enna judge pana matta nanaikara , pesa start pana un vaai summa irukathu olaritae irupa yapyum , but athum nalla   thaan irukum 😁😜..  Namba elamae share panipom entha problem nalum serii ethuva irunthalum (apdi thaan nanaikara ) ,and enna yapyumae judge panama elamae share panra oru nalla  pullai  nee  😁",
      backQuote: "\"Enna eppayum judge pannaatha nalla pullai nee!\"",
      accentColor: "from-sky-500/20 to-blue-500/10 border-sky-400/30"
    },
    {
      id: 5,
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      tag: "Resilience",
      frontTitle: "Strongest Soul I Know",
      frontSubtitle: "Grace, dignity & quiet courage",
      backTitle: "Proud of the Woman You Are",
      backText: "People see your jokes and radiant smile, but I know how tough the battles you fought silently were. You handled every storm with so much courage and kindness. Stepping into 21 as a truly unstoppable warrior!",
      backQuote: "\"Soft heart, but made of unbreakable steel.\"",
      accentColor: "from-emerald-500/20 to-teal-500/10 border-emerald-400/30"
    },
    {
      id: 6,
      icon: <InfinityIcon className="w-6 h-6 text-purple-400" />,
      tag: "The Promise",
      frontTitle: "80 Vayasula Kooda...",
      frontSubtitle: "Till we have no teeth left!",
      backTitle: "A Lifetime Guarantee",
      backText: "Boyfriends, jobs, houses, cities might change over decades, but this bond is locked in titanium. 80 years aanaalum naama rendu perum tea kudichukitte gossip panni sirikanum. I'm unoda bestie for this life and all lifetimes to come!",
      backQuote: "\"Permanently stuck with me forever, Moni!\"",
      accentColor: "from-purple-500/20 to-pink-500/10 border-purple-400/30"
    }
  ];

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    // Determine card coordinate for targeted confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    sound.playPop();
    confetti.blast({ x, y, count: 25, velocity: 8, spread: Math.PI });

    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="font-handwriting text-2xl text-pink-300 tracking-wide">
          Tap Each Card to Flip ✨
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
          Reasons Why You're Irreplaceable
        </h2>
        <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
          Ovvoru card-layum unakkaga oru unmaiyaana memory & heartfelt note irukku.
        </p>
      </div>

      {/* Cards Grid (Mobile 1 col, Tablet/Desktop 2 cols for 4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {cards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="perspective-1000 h-64 sm:h-72 cursor-pointer select-none"
              onClick={(e) => handleCardClick(card.id, e)}
              role="button"
              tabIndex={0}
              aria-label={`Flip card: ${card.frontTitle}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Simulate click event
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleCardClick(card.id, {
                    currentTarget: e.currentTarget,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                  } as unknown as React.MouseEvent);
                }
              }}
            >
              {/* Flipping Inner Container */}
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div
                  className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between backface-hidden bg-gradient-to-br ${card.accentColor} backdrop-blur-md shadow-lg hover:border-pink-300/60 transition-colors`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                      {card.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-300/90 tracking-wide font-sans">
                      {card.tag}
                    </span>
                  </div>

                  {/* Middle Title */}
                  <div className="space-y-1.5 my-auto">
                    <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                      {card.frontTitle}
                    </h3>
                    <p className="font-handwriting text-lg text-pink-200">
                      {card.frontSubtitle}
                    </p>
                  </div>

                  {/* Bottom Tap Prompt */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Tap to flip</span>
                    </span>
                    <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  className={`absolute inset-0 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-gradient-to-br from-[#1c183b] via-[#29173f] to-[#3a1843] border border-pink-400/40 shadow-xl overflow-y-auto`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-heading font-bold text-pink-200">
                        {card.backTitle}
                      </h4>
                      <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-200 font-sans leading-relaxed">
                      {card.backText}
                    </p>
                  </div>

                  {/* Quote footer */}
                  <div className="pt-2 border-t border-pink-500/20 flex items-center justify-between">
                    <span className="font-handwriting text-sm text-yellow-300">
                      {card.backQuote}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Tap back</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
