/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Music, 
  VolumeX, 
  Volume2, 
  Gift, 
  Sparkles, 
  Download, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { GiftGate } from './components/GiftGate';
import { TwinklingStars, Lantern, Balloon } from './components/TwinklingStars';
import { HeroSection } from './components/HeroSection';
import { CakeSection } from './components/CakeSection';
import { PolaroidSection } from './components/PolaroidSection';
import { FlipCardsSection } from './components/FlipCardsSection';
import { LetterSection } from './components/LetterSection';
import { GrandFinaleModal } from './components/GrandFinaleModal';
import { SongSelectorModal } from './components/SongSelectorModal';
import { confetti } from './utils/confetti';
import { sound } from './utils/audio';
import { downloadStandaloneHTML } from './utils/singleFileExport';

export default function App() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userSongName, setUserSongName] = useState<string | null>(null);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [isFinaleOpen, setIsFinaleOpen] = useState(false);

  // Spawn floating lanterns
  const releaseLanterns = useCallback((count: number = 10) => {
    const colors: Array<'pink' | 'blue' | 'gold'> = ['pink', 'blue', 'gold'];
    const newLanterns: Lantern[] = [];

    for (let i = 0; i < count; i++) {
      newLanterns.push({
        id: Date.now() + Math.random(),
        x: Math.random() * (window.innerWidth - 60) + 30,
        y: window.innerHeight + Math.random() * 200,
        speed: Math.random() * 1.4 + 1.2,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.03 + 0.015,
        size: Math.random() * 0.4 + 0.75,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.95
      });
    }

    setLanterns((prev) => [...prev, ...newLanterns]);
  }, []);

  // Spawn floating 3D-CSS balloons
  const releaseBalloons = useCallback((count: number = 6) => {
    const colors: Array<'pink' | 'blue' | 'purple' | 'gold' | 'peach'> = ['pink', 'blue', 'purple', 'gold', 'peach'];
    const newBalloons: Balloon[] = [];

    for (let i = 0; i < count; i++) {
      newBalloons.push({
        id: Date.now() + Math.random() + i,
        x: Math.random() * (window.innerWidth - 80) + 40,
        y: window.innerHeight + Math.random() * 220 + 20,
        speed: Math.random() * 1.5 + 1.1,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.012,
        swayAmplitude: Math.random() * 16 + 10,
        size: Math.random() * 0.35 + 0.85,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.95,
        rotation: (Math.random() - 0.5) * 8
      });
    }

    setBalloons((prev) => [...prev, ...newBalloons]);
  }, []);

  // Update positions of lanterns and balloons (drifting upwards into the dusk sky)
  useEffect(() => {
    if (lanterns.length === 0 && balloons.length === 0) return;

    const interval = setInterval(() => {
      setLanterns((prev) =>
        prev
          .map((l) => ({
            ...l,
            y: l.y - l.speed,
            sway: l.sway + l.swaySpeed,
            opacity: l.y < 120 ? Math.max(0, l.y / 120) : 0.95
          }))
          .filter((l) => l.y > -90)
      );

      setBalloons((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y - b.speed,
            sway: b.sway + b.swaySpeed,
            opacity: b.y < 120 ? Math.max(0, b.y / 120) : 0.95
          }))
          .filter((b) => b.y > -130 && !b.isPopped)
      );
    }, 25);

    return () => clearInterval(interval);
  }, [lanterns.length, balloons.length]);

  // Periodic ambient drift of balloons and lanterns
  useEffect(() => {
    if (!isGateOpen) return;
    const interval = setInterval(() => {
      releaseBalloons(1);
      if (Math.random() > 0.4) {
        releaseLanterns(1);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isGateOpen, releaseBalloons, releaseLanterns]);

  // Interactive balloon pop
  const handlePopBalloon = (id: number, x: number, y: number) => {
    sound.playPop();
    confetti.blast({ x, y, count: 25, velocity: 8 });
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isPopped: true } : b))
    );
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== id));
    }, 220);
  };

  // Handle gift gate opening
  const handleOpenGate = () => {
    setIsGateOpen(true);
    // Release a festive bouquet of lanterns and 3D balloons
    releaseLanterns(6);
    releaseBalloons(8);
  };

  // Toggle birthday music
  const handleToggleMusic = () => {
    if (!userSongName) {
      setIsSongModalOpen(true);
      return;
    }
    sound.toggleMusic((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  // Toggle sound mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (nextMuted) {
      setIsPlayingMusic(false);
    }
  };

  // Trigger Grand Finale
  const handleGrandSurprise = () => {
    sound.playFirework();
    confetti.grandBlast();
    releaseLanterns(16);
    releaseBalloons(14);
    setIsFinaleOpen(true);
  };

  // Smooth scroll to wish section
  const scrollToWish = () => {
    const el = document.getElementById('wish-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* 1. Gift Gate Fullscreen Overlay */}
      {!isGateOpen && <GiftGate onOpen={handleOpenGate} />}

      {/* Dynamic Dusk-Sky Starfield, Floating Lanterns, and 3D Animated Balloons */}
      <TwinklingStars
        lanterns={lanterns}
        balloons={balloons}
        onPopBalloon={handlePopBalloon}
      />

      {/* Top Floating Utility Bar */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand / Greeting */}
        <div className="flex items-center gap-2">
          <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
            Monisha<span className="text-pink-400">.21</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-handwriting text-pink-300">
            · 06.11.2005
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Controls: User may add their own song if desired */}
          {userSongName ? (
            <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 p-0.5 shadow-sm">
              <button
                type="button"
                onClick={handleToggleMusic}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isPlayingMusic
                    ? 'bg-pink-500/25 text-pink-200 shadow-sm shadow-pink-500/20'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={isPlayingMusic ? 'Pause song' : 'Play song'}
                aria-label="Toggle song playback"
              >
                <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-pink-400 animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span className="max-w-[95px] sm:max-w-[130px] truncate">
                  {userSongName}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsSongModalOpen(true)}
                className="px-2.5 py-1.5 text-[11px] font-semibold text-pink-300 hover:text-pink-100 hover:bg-white/10 rounded-full border-l border-white/10 transition-colors cursor-pointer"
                title="Change or remove audio"
                aria-label="Open song settings"
              >
                Manage 🎵
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsSongModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-pink-300 hover:text-pink-100 transition-colors cursor-pointer"
              title="Add a song (.mp3, .wav) if desired"
              aria-label="Add background song"
            >
              <Music className="w-3.5 h-3.5 text-pink-400" />
              <span>+ Add Song 🎵</span>
            </button>
          )}

          {/* Mute Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Re-wrap Gift Button (re-open gate) */}
          <button
            type="button"
            onClick={() => setIsGateOpen(false)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Rewrap gift to open again"
            aria-label="Rewrap gift box"
          >
            <Gift className="w-4 h-4 text-pink-300" />
          </button>

          {/* Download Single-File HTML Keepsake */}
          <button
            type="button"
            onClick={downloadStandaloneHTML}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 text-xs font-medium transition-colors cursor-pointer"
            title="Download standalone single-file HTML (.html)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save .html</span>
          </button>
        </div>
      </header>

      {/* Main Birthday Content Area */}
      <main className="relative z-20 flex-1 flex flex-col items-center">
        {/* 2. Hero Section: Glowing 21, Monisha, Date */}
        <HeroSection onWishClick={scrollToWish} />

        {/* Floating Sky Balloons & Lanterns Prompt */}
        <div className="my-2">
          <button
            type="button"
            onClick={() => {
              releaseLanterns(3);
              releaseBalloons(4);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-pink-300 transition-colors cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Tap to send floating balloons & lanterns 🎈🏮</span>
          </button>
        </div>

        {/* 3. Make a Wish: Interactive SVG Birthday Cake */}
        <CakeSection
          onReleaseLanterns={(count) => {
            releaseLanterns(count);
            releaseBalloons(Math.floor(count * 0.75));
          }}
        />

        {/* 4. Polaroid Photo Section */}
        <PolaroidSection />

        {/* 5. Six Flip Cards */}
        <FlipCardsSection />

        {/* 6. Personal Letter Section */}
        <LetterSection />

        {/* 7. Final "One More Surprise" Section */}
        <section className="relative py-16 px-4 text-center flex flex-col items-center">
          <div className="max-w-md w-full space-y-4">
            <span className="font-handwriting text-2xl text-pink-300">
              Wait, one last thing...
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              A Finale for the Birthday Queen 👑
            </h2>
            <p className="text-sm text-slate-300 font-sans">
              Tap the button below to illuminate the dusk sky with fireworks, balloons, and floating lanterns!
            </p>

            <button
              type="button"
              onClick={handleGrandSurprise}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-base sm:text-lg shadow-[0_10px_35px_rgba(244,114,182,0.4)] hover:shadow-[0_15px_45px_rgba(244,114,182,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              <span>One More Surprise! 🎆</span>
              <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full py-8 text-center text-xs text-slate-400 border-t border-white/5 space-y-2">
        <p className="font-handwriting text-lg text-pink-300">
          Happy 21st Birthday, Monisha · 06.11.2005 · Made with endless love ❤️
        </p>
        <p className="font-sans text-[11px] text-slate-500">
          Crafted especially for your milestone 21st year · No matter what, besties forever.
        </p>
      </footer>

      {/* Grand Finale Modal */}
      <GrandFinaleModal
        isOpen={isFinaleOpen}
        onClose={() => setIsFinaleOpen(false)}
        onLaunchMore={() => {
          releaseLanterns(12);
          releaseBalloons(12);
        }}
      />

      {/* User Song Upload & Playback Modal */}
      <SongSelectorModal
        isOpen={isSongModalOpen}
        onClose={() => setIsSongModalOpen(false)}
        isPlaying={isPlayingMusic}
        userSongName={userSongName}
        onSongLoaded={(name) => {
          setUserSongName(name);
          setIsPlayingMusic(true);
        }}
        onSongRemoved={() => {
          setUserSongName(null);
          setIsPlayingMusic(false);
        }}
        onTogglePlay={handleToggleMusic}
      />
    </div>
  );
}
