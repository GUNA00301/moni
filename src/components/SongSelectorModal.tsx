import React, { useRef } from 'react';
import { Music, Upload, X, Play, Pause, Trash2, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface SongSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  userSongName: string | null;
  onSongLoaded: (songName: string) => void;
  onSongRemoved: () => void;
  onTogglePlay: () => void;
}

export const SongSelectorModal: React.FC<SongSelectorModalProps> = ({
  isOpen,
  onClose,
  isPlaying,
  userSongName,
  onSongLoaded,
  onSongRemoved,
  onTogglePlay
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.loadUserSong(file, (playing, songName) => {
      onSongLoaded(songName);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    sound.removeUserSong();
    onSongRemoved();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Add Background Song"
    >
      <div className="relative max-w-sm w-full rounded-3xl bg-gradient-to-b from-[#1c183b] via-[#28183c] to-[#361840] border border-pink-400/40 p-6 text-center shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {userSongName ? (
          /* Song Loaded State */
          <div className="space-y-4 pt-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 shadow-md">
              <Music className={`w-7 h-7 ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }} />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-sans">
                Active Song
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5 truncate px-2">
                {userSongName}
              </h3>
            </div>

            {/* Play/Pause Control */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={onTogglePlay}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-medium text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause Song</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Play Song</span>
                  </>
                )}
              </button>
            </div>

            {/* Change & Remove buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-pink-300" />
                <span>Change File</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Add Song State */
          <div className="space-y-4 pt-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-pink-300">
              <Music className="w-7 h-7 text-pink-300" />
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Add Birthday Song
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed max-w-xs mx-auto">
                No songs are pre-loaded. If you'd like background music to play, choose any audio file (.mp3, .wav, .m4a) from your device!
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer mx-auto"
            >
              <Upload className="w-4 h-4 text-white" />
              <span>Choose Audio File (.mp3)</span>
            </button>

            <p className="text-[11px] text-slate-400 font-sans">
              Works with songs from your local phone or laptop storage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
