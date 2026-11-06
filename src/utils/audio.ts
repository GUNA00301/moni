/**
 * Audio Controller:
 * - Interactive sound effects (procedural Web Audio API for pops, candle blow, fireworks).
 * - Background music: user-driven (no default songs; users can add/upload their own audio track).
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingMusic: boolean = false;
  private userAudio: HTMLAudioElement | null = null;
  private userSongName: string | null = null;
  private userAudioUrl: string | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.userAudio) {
      this.userAudio.muted = muted;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlayingMusic(): boolean {
    return this.isPlayingMusic;
  }

  public hasUserSong(): boolean {
    return this.userAudio !== null;
  }

  public getUserSongName(): string | null {
    return this.userSongName;
  }

  /** Load a user-selected audio file (.mp3, .wav, .m4a, etc.) */
  public loadUserSong(file: File, callback?: (playing: boolean, songName: string) => void) {
    this.removeUserSong();

    this.userAudioUrl = URL.createObjectURL(file);
    const audio = new Audio(this.userAudioUrl);
    audio.loop = true;
    audio.muted = this.isMuted;
    this.userAudio = audio;
    this.userSongName = file.name.replace(/\.[^/.]+$/, "");

    audio.onended = () => {
      this.isPlayingMusic = false;
    };

    audio.play().then(() => {
      this.isPlayingMusic = true;
      if (callback) callback(true, this.userSongName || 'Custom Song');
    }).catch(() => {
      // Autoplay might require user gesture in some browsers
      this.isPlayingMusic = false;
      if (callback) callback(false, this.userSongName || 'Custom Song');
    });
  }

  /** Remove current user-added song */
  public removeUserSong() {
    if (this.userAudio) {
      this.userAudio.pause();
      this.userAudio.src = '';
      this.userAudio = null;
    }
    if (this.userAudioUrl) {
      URL.revokeObjectURL(this.userAudioUrl);
      this.userAudioUrl = null;
    }
    this.userSongName = null;
    this.isPlayingMusic = false;
  }

  /** Toggle play/pause of the user-added song */
  public toggleMusic(callback?: (playing: boolean) => void) {
    if (!this.userAudio) {
      if (callback) callback(false);
      return;
    }

    if (this.isPlayingMusic) {
      this.userAudio.pause();
      this.isPlayingMusic = false;
      if (callback) callback(false);
    } else {
      this.userAudio.muted = this.isMuted;
      this.userAudio.play().then(() => {
        this.isPlayingMusic = true;
        if (callback) callback(true);
      }).catch(() => {
        this.isPlayingMusic = false;
        if (callback) callback(false);
      });
    }
  }

  public stopMusic() {
    if (this.userAudio) {
      this.userAudio.pause();
    }
    this.isPlayingMusic = false;
  }

  /** Soft pop & sparkle chime for gift opening and cards */
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low pop body
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(260, now);
    osc1.frequency.exponentialRampToValueAtTime(70, now + 0.12);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Sparkle high chime
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.12, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.3);
    });
  }

  /** Candle blow whoosh + gentle extinguishment */
  public playBlow() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    filter.Q.value = 2.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.4);
  }

  /** Fireworks rocket rise and burst */
  public playFirework() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Deep boom
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    // Crackle chimes
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + 0.05 + idx * 0.03);
      g.gain.setValueAtTime(0.1, now + 0.05 + idx * 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.05 + idx * 0.03 + 0.4);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now + 0.05 + idx * 0.03);
      o.stop(now + 0.05 + idx * 0.03 + 0.4);
    });
  }
}

export const sound = new SoundController();
