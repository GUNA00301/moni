import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCw, X, Heart, Sparkles, Pencil } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

export const PolaroidSection: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('Monisha @ 21 · Pure Sunshine 💖');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [rotation, setRotation] = useState<number>(-2);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPhotoUrl(event.target.result);
        sound.playPop();
        confetti.blast({ count: 40, velocity: 8 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cycleRotation = () => {
    setRotation((prev) => (prev === -2 ? 2 : prev === 2 ? 0 : -2));
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 flex flex-col items-center text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Section Heading */}
        <div className="space-y-1 mb-8">
          <span className="font-handwriting text-2xl text-pink-300 tracking-wide">
            Memory Lane
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Our Polaroid Keepsake
          </h2>
          <p className="text-sm text-slate-300 font-sans">
            Tap the polaroid or button below to add your favorite picture of Monisha!
          </p>
          {uploadError && (
            <div className="mt-2 text-xs text-rose-300 bg-rose-500/20 border border-rose-400/30 px-3 py-1.5 rounded-full inline-block animate-shake">
              {uploadError}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Polaroid Frame */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative bg-[#fdfbf7] text-slate-800 p-4 sm:p-5 pb-6 sm:pb-8 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer transition-transform duration-300 hover:scale-[1.02] max-w-[320px] sm:max-w-[340px] w-full select-none"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload photo to polaroid frame"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
        >
          {/* Tape decoration at top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/70 border border-amber-200/50 backdrop-blur-sm -rotate-1 shadow-sm rounded-xs pointer-events-none" />

          {/* Picture Box */}
          <div className="relative aspect-square w-full bg-[#1b1c2e] rounded-xs overflow-hidden border border-slate-300/40 flex items-center justify-center">
            {photoUrl ? (
              <>
                <img
                  src={photoUrl}
                  alt="Monisha uploaded memory"
                  className="w-full h-full object-cover"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                  title="Remove photo"
                  aria-label="Remove uploaded photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              /* Self-Contained Artistic Silhouette / Illustrated Avatar Fallback */
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#1a1c38] via-[#2f1b40] to-[#451e45] text-center relative group-hover:brightness-105 transition-all">
                {/* Subtle starlight inside frame */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-40 h-40 rounded-full bg-pink-500/20 blur-xl" />
                </div>

                {/* Illustrated Avatar Silhouette SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 mb-2 drop-shadow-[0_4px_12px_rgba(244,114,182,0.3)]"
                >
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Floral crown */}
                  <circle cx="50" cy="22" r="3" fill="#fde047" />
                  <circle cx="42" cy="25" r="2.5" fill="#f472b6" />
                  <circle cx="58" cy="25" r="2.5" fill="#38bdf8" />
                  {/* Girl head & hair silhouette */}
                  <path
                    d="M32 60 C32 38 40 30 50 30 C60 30 68 38 68 60 C68 65 65 72 62 76 C55 82 45 82 38 76 C35 72 32 65 32 60 Z"
                    fill="#3b2d54"
                  />
                  <ellipse cx="50" cy="46" rx="11" ry="13" fill="#fce7f3" />
                  {/* Hair bun and strands */}
                  <path
                    d="M39 42 C42 36 50 35 61 42 C59 38 52 35 48 35 C43 35 40 38 39 42 Z"
                    fill="#241530"
                  />
                  {/* Closed happy eyes smile */}
                  <path d="M44 46 Q46 48 48 46" stroke="#db2777" strokeWidth="1" fill="none" />
                  <path d="M52 46 Q54 48 56 46" stroke="#db2777" strokeWidth="1" fill="none" />
                  {/* Smile */}
                  <path d="M47 52 Q50 55 53 52" stroke="#db2777" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  {/* Blush */}
                  <circle cx="43" cy="49" r="2" fill="#fda4af" opacity="0.8" />
                  <circle cx="57" cy="49" r="2" fill="#fda4af" opacity="0.8" />
                  {/* Birthday party hat */}
                  <polygon points="50,12 43,26 57,26" fill="#f43f5e" />
                  <circle cx="50" cy="11" r="2" fill="#fef08a" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-pink-300">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Tap to upload a photo!</span>
                  </div>
                  <span className="text-[11px] text-slate-300 mt-1 font-sans">
                    Namma favourite memory inga podu
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Polaroid Bottom Caption (Handwritten in Caveat) */}
          <div className="mt-4 px-1 flex flex-col items-center">
            {isEditingCaption ? (
              <div
                className="w-full flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  onBlur={() => setIsEditingCaption(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingCaption(false)}
                  autoFocus
                  maxLength={40}
                  className="w-full text-center font-handwriting text-xl text-slate-800 bg-amber-50/60 border-b border-pink-400 focus:outline-none"
                />
              </div>
            ) : (
              <div
                className="w-full flex items-center justify-center gap-1 group/cap cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingCaption(true);
                }}
                title="Click to edit caption"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-slate-800 font-medium tracking-wide">
                  {caption}
                </p>
                <Pencil className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover/cap:opacity-100 transition-opacity" />
              </div>
            )}
            <span className="text-[11px] text-slate-500 font-sans tracking-tight mt-0.5">
              06.11.2005 · Forever Bestie
            </span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{photoUrl ? 'Change Photo' : 'Upload Her Photo'}</span>
          </button>

          <button
            type="button"
            onClick={cycleRotation}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs sm:text-sm transition-colors cursor-pointer"
            title="Tilt frame"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Tilt</span>
          </button>
        </div>
      </div>
    </section>
  );
};
