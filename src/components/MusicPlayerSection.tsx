import React, { useState, useEffect, useRef } from 'react';
import { TRACKS } from '../data/portfolioData';
import { Track } from '../types';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, VolumeX, Heart, Disc, Radio, Sparkles, FileText, ChevronDown, ChevronUp, Video, Tv, ExternalLink } from 'lucide-react';

export const MusicPlayerSection: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({ '1': true, '2': true });
  const [showFullLyrics, setShowFullLyrics] = useState(true);
  const [playerMode, setPlayerMode] = useState<'youtube' | 'audio'>('youtube');

  const currentTrack: Track | undefined = TRACKS[currentTrackIndex];

  if (!TRACKS || TRACKS.length === 0 || !currentTrack) {
    return (
      <section id="music" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
                <Music className="w-3.5 h-3.5 text-black" />
                <span>Section 05 — Хөгжим Сонсох</span>
              </div>
              <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
                Хөгжим тоглуулагч
              </h2>
            </div>
            <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
              Дууны жагсаалтыг цэвэрлэсэн байна.
            </p>
          </div>

          <div className="bg-white border border-black/20 p-12 text-center shadow-sm">
            <Music className="w-16 h-16 text-black/30 mx-auto mb-4" />
            <h3 className="font-unbounded text-xl font-bold mb-2">Дууны жагсаалт хоосон байна</h3>
            <p className="text-black/60 text-sm max-w-md mx-auto">
              Бүх дууг устгасан тул одоогоор тоглуулах дуу байхгүй байна.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // HTML5 Audio Element Ref & Web Audio Synthesizer Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const [trackDuration, setTrackDuration] = useState<number>(240);
  const [useSynth, setUseSynth] = useState<boolean>(false);

  // Frequency mappings for notes (Hz)
  const NOTES: Record<string, number> = {
    'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00,
  };

  // Song Melodies / Sequences
  const getTrackMelody = (trackId: string) => {
    switch (trackId) {
      case 'mj-1': // Billie Jean iconic F# bassline
        return {
          tempo: 117,
          notes: ['F#2', 'C#3', 'E3', 'F#3', 'D3', 'C#3', 'B2', 'C#3'],
          type: 'sawtooth' as OscillatorType,
          percussion: true
        };
      case 'mj-2': // Beat It rock guitar riff
        return {
          tempo: 138,
          notes: ['Eb3', 'Gb3', 'Ab3', 'Eb4', 'Db4', 'Eb4', 'Db4', 'Bb3'],
          type: 'square' as OscillatorType,
          percussion: true
        };
      case 'mj-3': // Chicago smooth R&B
        return {
          tempo: 104,
          notes: ['C3', 'E3', 'G3', 'B3', 'A3', 'F3', 'D3', 'G3'],
          type: 'sine' as OscillatorType,
          percussion: true
        };
      case '1': // Mxrning Star - Хүн (Trap Soul)
        return {
          tempo: 90,
          notes: ['A2', 'C3', 'E3', 'A3', 'F2', 'A2', 'C3', 'F3'],
          type: 'triangle' as OscillatorType,
          percussion: true
        };
      case '2': // Mxrning Star - Бадамлянхуа (Lo-Fi)
        return {
          tempo: 80,
          notes: ['D3', 'F3', 'A3', 'C4', 'G2', 'B2', 'D3', 'F3'],
          type: 'sine' as OscillatorType,
          percussion: false
        };
      case '3': // The Lemons - Сүүлчийн уянга (Indie Rock)
        return {
          tempo: 120,
          notes: ['G3', 'B3', 'D4', 'G4', 'D3', 'F#3', 'A3', 'D4'],
          type: 'sawtooth' as OscillatorType,
          percussion: true
        };
      case '4': // The Lemons - Монад (Alternative Rock)
        return {
          tempo: 128,
          notes: ['E3', 'G3', 'B3', 'E4', 'C3', 'E3', 'G3', 'C4'],
          type: 'square' as OscillatorType,
          percussion: true
        };
      default:
        return {
          tempo: 110,
          notes: ['C3', 'E3', 'G3', 'C4'],
          type: 'sine' as OscillatorType,
          percussion: true
        };
    }
  };

  // Play synthetic audio note
  const playNextNote = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const melodyData = getTrackMelody(currentTrack.id);
    const noteName = melodyData.notes[noteIndexRef.current % melodyData.notes.length];
    const freq = NOTES[noteName] || 220;
    noteIndexRef.current += 1;

    const now = ctx.currentTime;
    const effectiveVol = isMuted ? 0 : volume;

    // Main Melody Oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = melodyData.type;
    osc.frequency.setValueAtTime(freq, now);

    // Filter for warmer sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const noteDuration = (60 / melodyData.tempo) * 0.5;
    gain.gain.setValueAtTime(0.25 * effectiveVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + noteDuration);

    osc.start(now);
    osc.stop(now + noteDuration);

    // Percussion snare/kick simulation
    if (melodyData.percussion && noteIndexRef.current % 2 === 0 && effectiveVol > 0) {
      const pOsc = ctx.createOscillator();
      const pGain = ctx.createGain();
      pOsc.type = 'sine';
      pOsc.frequency.setValueAtTime(130, now);
      pOsc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      pOsc.connect(pGain);
      pGain.connect(ctx.destination);

      pGain.gain.setValueAtTime(0.3 * effectiveVol, now);
      pGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      pOsc.start(now);
      pOsc.stop(now + 0.08);
    }
  };

  // HTML5 Audio element setup & Volume sync
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      if (playerMode === 'audio') {
        setCurrentTime(Math.floor(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setTrackDuration(Math.floor(audio.duration));
      }
    };

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    const handleError = () => {
      // Fallback to Web Audio synthesizer if URL fails to load
      if (playerMode === 'audio') {
        setUseSynth(true);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, isMuted, playerMode]);

  // Track change & play/pause sync for Audio Mode
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (playerMode === 'youtube') {
      audio.pause();
      return;
    }

    if (currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.currentTime = 0;
      setCurrentTime(0);

      if (isPlaying) {
        audio.play().catch(() => {
          setUseSynth(true);
        });
      }
    } else {
      setUseSynth(true);
    }
  }, [currentTrackIndex, playerMode]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (playerMode === 'youtube') {
      audio.pause();
      return;
    }

    if (isPlaying) {
      if (currentTrack.audioUrl && !useSynth) {
        audio.play().catch(() => {
          setUseSynth(true);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, useSynth, playerMode]);

  // Fallback Synthesizer loop if audio file fails
  useEffect(() => {
    if (isPlaying && useSynth && playerMode === 'audio') {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      const melody = getTrackMelody(currentTrack.id);
      const intervalMs = (60 / melody.tempo) * 500;

      timerRef.current = window.setInterval(() => {
        playNextNote();
      }, intervalMs);

      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, useSynth, playerMode, currentTrackIndex, volume, isMuted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Convert track duration string e.g. "4:54" to total seconds
  const parseTotalSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 240;
  };

  const totalSeconds = trackDuration || parseTotalSeconds(currentTrack.duration);
  const progressPercent = Math.min(100, (currentTime / totalSeconds) * 100);

  // Refs for Synced Lyrics Container and Active Lyric Line
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);
  const activeLyricRef = useRef<HTMLDivElement | null>(null);

  // Sync timer for YouTube mode to advance currentTime and trigger synced lyrics
  useEffect(() => {
    let ytTimer: number | null = null;
    if (isPlaying && (playerMode === 'youtube' || useSynth)) {
      ytTimer = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (ytTimer) clearInterval(ytTimer);
    };
  }, [isPlaying, playerMode, useSynth, totalSeconds]);

  // Determine active lyric line index based on current time
  const timedLyrics = currentTrack.timedLyrics || [];
  let activeLyricIndex = -1;
  if (timedLyrics.length > 0) {
    for (let i = 0; i < timedLyrics.length; i++) {
      if (currentTime >= timedLyrics[i].time) {
        activeLyricIndex = i;
      } else {
        break;
      }
    }
  }

  // Smoothly scroll active lyric into view
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeLyricIndex]);

  const togglePlay = () => {
    if (useSynth && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (useSynth && audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const toggleLike = (id: string) => {
    setIsLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="music" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
              <Music className="w-3.5 h-3.5 text-black" />
              <span>Section 05 — Хөгжим Сонсох</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              Michael Jackson, Mxrning Star & Lemons (Хөгжим тоглуулагч)
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
            Тоглуулах товчлуурыг дарж Michael Jackson-ийн "Billie Jean", "Beat It", "Chicago" болон бусад дуунуудын аялгууг шууд сонсоорой!
          </p>
        </div>

        {/* Music Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Player */}
          <div className="lg:col-span-7 bg-white border border-black/20 p-6 sm:p-8 shadow-sm relative">
            
            {/* Player Mode Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#F7F7F7] p-2.5 border border-black/15">
              <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Сонсох горим:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPlayerMode('youtube');
                  }}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                    playerMode === 'youtube'
                      ? 'bg-[#111111] text-white border-black shadow-sm'
                      : 'bg-white text-black border-black/20 hover:border-black'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-rose-500" />
                  <span>Оригинал дуучнаар нь (YouTube Vocal MV)</span>
                </button>

                <button
                  onClick={() => setPlayerMode('audio')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                    playerMode === 'audio'
                      ? 'bg-[#111111] text-white border-black shadow-sm'
                      : 'bg-white text-black border-black/20 hover:border-black'
                  }`}
                >
                  <Disc className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Аудио хэмнэл</span>
                </button>
              </div>
            </div>

            {/* Embedded YouTube Vocal Player OR Album Cover */}
            {playerMode === 'youtube' && currentTrack.youtubeId ? (
              <div className="mb-6 border border-black/20 bg-[#111111] overflow-hidden relative group">
                <div className="aspect-video w-full relative">
                  <iframe
                    key={`${currentTrack.id}-${isPlaying ? 'play' : 'pause'}`}
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`}
                    title={`${currentTrack.title} — ${currentTrack.artist}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 bg-[#111111] text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-2 text-rose-400">
                    <Video className="w-4 h-4 animate-pulse" />
                    Оригинал клип ба вокал дуу: {currentTrack.artist} — {currentTrack.title}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 rounded-xs transition-colors text-[11px]"
                  >
                    <span>YouTube дээр үзэх</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
              {/* Album Cover & Rotating Disc effect */}
              <div className="relative group shrink-0">
                <div className="w-44 h-44 sm:w-52 sm:h-52 border border-black/20 overflow-hidden relative bg-[#111111]">
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105 filter brightness-105' : ''
                    }`}
                  />
                </div>

                {/* Spinning Vinyl Badge when Playing */}
                {isPlaying && (
                  <div className="absolute -top-3 -right-3 p-2.5 bg-[#111111] text-white border border-black/20 shadow-sm animate-spin">
                    <Disc className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Track Details & Lyrics */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                <div className="inline-block px-2.5 py-1 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest">
                  {currentTrack.vibeTag}
                </div>

                <h3 className="font-unbounded font-black text-2xl sm:text-3xl text-[#111111] uppercase">
                  {currentTrack.title}
                </h3>

                <p className="text-[#111111]/80 font-bold text-xs uppercase tracking-wider">
                  {currentTrack.artist} — <span className="text-black font-semibold">{currentTrack.album}</span>
                </p>

                {/* Lyrics Highlight & Live Synced Karaoke Lyrics Card */}
                <div className="p-4 bg-[#F7F7F7] border border-black/15 text-xs text-[#111111] mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-black" />
                      Синхрон дууны үг (Live Karaoke Lyrics):
                    </span>
                    <button
                      onClick={() => setShowFullLyrics(!showFullLyrics)}
                      className="text-[10px] font-bold uppercase tracking-wider text-black hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showFullLyrics ? 'Хумих' : 'Бүтэн үгийг дэлгэх'}</span>
                      {showFullLyrics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {showFullLyrics ? (
                    timedLyrics.length > 0 ? (
                      <div
                        ref={lyricsContainerRef}
                        className="max-h-60 overflow-y-auto pr-2 font-sans text-xs border-t border-black/10 pt-2 bg-white p-2.5 border space-y-1.5 scroll-smooth"
                      >
                        {timedLyrics.map((line, idx) => {
                          const isActive = idx === activeLyricIndex;
                          return (
                            <div
                              key={idx}
                              ref={isActive ? activeLyricRef : null}
                              onClick={() => {
                                setCurrentTime(line.time);
                                if (audioRef.current) {
                                  audioRef.current.currentTime = line.time;
                                }
                              }}
                              className={`p-2.5 rounded-xs transition-all duration-300 cursor-pointer flex items-start gap-3 group ${
                                isActive
                                  ? 'bg-[#111111] text-white font-bold border-l-4 border-l-rose-500 shadow-md scale-[1.01]'
                                  : 'hover:bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              <span
                                className={`text-[10px] font-mono shrink-0 px-1.5 py-0.5 border ${
                                  isActive
                                    ? 'bg-rose-600 text-white border-rose-500 font-bold'
                                    : 'bg-zinc-100 text-zinc-500 border-zinc-200 group-hover:border-zinc-400'
                                }`}
                              >
                                {formatTime(line.time)}
                              </span>
                              <div className="flex-1">
                                {line.section && (
                                  <span
                                    className={`text-[9px] font-bold uppercase tracking-wider block mb-0.5 ${
                                      isActive ? 'text-rose-400' : 'text-zinc-400'
                                    }`}
                                  >
                                    {line.section}
                                  </span>
                                )}
                                <p className={`text-xs ${isActive ? 'text-white font-semibold text-sm' : 'text-zinc-800'}`}>
                                  {line.text}
                                </p>
                              </div>
                              {isActive && (
                                <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0 animate-pulse mt-1" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="max-h-48 overflow-y-auto pr-2 font-mono text-xs leading-relaxed text-[#111111] whitespace-pre-line border-t border-black/10 pt-2 bg-white p-3 border">
                        {currentTrack.fullLyrics || currentTrack.lyricsSnippet}
                      </div>
                    )
                  ) : (
                    <p className="font-serif-editorial italic text-sm text-[#111111] font-medium">{currentTrack.lyricsSnippet}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Progress Bar & Time */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-mono font-bold text-black/70 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span className="flex items-center gap-1 text-[10px] text-[#111111] font-sans font-bold">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {isPlaying ? 'ОРИГИНАЛ ДУУ ТОГЛОЖ БАЙНА' : 'ТҮР ЗОГССОН'}
                </span>
                <span>{currentTrack.duration}</span>
              </div>
              <div
                className="w-full h-2 bg-zinc-200 border border-black/10 cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  const newSecs = Math.floor(ratio * totalSeconds);
                  setCurrentTime(newSecs);
                  if (audioRef.current) {
                    audioRef.current.currentTime = newSecs;
                  }
                }}
              >
                <div
                  className="h-full bg-[#111111] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Sound Wave Animation Visualizer */}
            <div className="h-10 bg-[#F7F7F7] border border-black/15 px-4 flex items-center justify-between gap-1 mb-6">
              {[40, 70, 30, 90, 60, 20, 85, 45, 100, 65, 30, 80, 50, 95, 40, 75, 35, 90, 60].map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-[#111111] transition-all duration-200 ${
                    isPlaying ? 'bg-[#111111] animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (i + 1) * (currentTime + 1)) % 100)}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/15">
              <button
                onClick={() => toggleLike(currentTrack.id)}
                className={`p-3 border transition-colors cursor-pointer ${
                  isLiked[currentTrack.id]
                    ? 'text-white bg-[#111111] border-black'
                    : 'text-[#111111]/60 bg-white border-black/15 hover:text-[#111111]'
                }`}
                aria-label="Like song"
              >
                <Heart className={`w-4 h-4 ${isLiked[currentTrack.id] ? 'fill-current' : ''}`} />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white border border-black/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer active:scale-95"
                  aria-label="Previous song"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="px-6 py-4 bg-[#111111] hover:bg-zinc-800 text-white shadow-md transition-all cursor-pointer active:scale-95 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>ЗОГСООХ</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>СОНСОХ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 bg-white border border-black/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer active:scale-95"
                  aria-label="Next song"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider & Sound Mute Toggle */}
              <div className="flex items-center gap-2 text-[#111111]">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:bg-zinc-200 transition-colors cursor-pointer"
                  title="Дуу хаах/нээх"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-black" />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-20 accent-black cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Playlist Tracklist */}
          <div className="lg:col-span-5 bg-white border border-black/20 p-6 sm:p-8 shadow-sm">
            <h4 className="font-unbounded font-black text-base uppercase text-[#111111] mb-6 flex items-center justify-between border-b border-black/10 pb-3">
              <span>Плейлист Дуунууд (Дараад сонс)</span>
              <Radio className="w-5 h-5 text-black" />
            </h4>

            <div className="space-y-3">
              {TRACKS.map((track, index) => {
                const isSelected = index === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setCurrentTrackIndex(index);
                      setPlayerMode('youtube');
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F7F7F7] border-black/10 hover:bg-white hover:border-black'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 border border-black/10 overflow-hidden shrink-0 bg-[#111111]">
                        <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className={`font-bold text-xs uppercase tracking-wider ${isSelected ? 'text-white font-black' : 'text-[#111111]'}`}>
                          {track.title}
                        </h5>
                        <p className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-[#111111]/60'}`}>{track.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white/70' : 'text-[#111111]/50'}`}>{track.duration}</span>
                      {isSelected && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-4">
                          <span className="w-1 bg-white h-full animate-bounce" />
                          <span className="w-1 bg-white h-2/3 animate-bounce delay-100" />
                          <span className="w-1 bg-white h-1/2 animate-bounce delay-200" />
                        </span>
                      ) : (
                        <Play className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#111111]/40 group-hover:text-black'}`} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
