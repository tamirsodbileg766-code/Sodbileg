import React, { useState } from 'react';
import { TRACKS } from '../data/portfolioData';
import { Track } from '../types';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Heart, Disc, Radio } from 'lucide-react';

export const MusicPlayerSection: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({ '1': true });

  const currentTrack: Track = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
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
              <Music className="w-3.5 h-3.5 text-[#D94F04]" />
              <span>Section 05 — Хөгжим</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              Mxrning Star & The Lemons Вайб
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
            Содбилэгийн хамгийн их сонсдог дуунууд болон хөгжмийн тоглуулагчийг эндээс мэдрээрэй.
          </p>
        </div>

        {/* Music Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Player */}
          <div className="lg:col-span-7 bg-white border border-black/20 p-6 sm:p-8 shadow-sm relative">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
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
                  <div className="absolute -top-3 -right-3 p-2.5 bg-[#111111] text-[#D94F04] border border-black/20 shadow-sm animate-spin">
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
                  {currentTrack.artist} — <span className="text-[#D94F04] font-normal">{currentTrack.album}</span>
                </p>

                {/* Lyrics Highlight Card */}
                <div className="p-4 bg-[#F7F7F7] border border-black/15 text-xs text-[#111111] mt-2">
                  <p className="mb-1 text-[#D94F04] font-bold uppercase tracking-wider text-[10px]">Дууны үгээс:</p>
                  <p className="font-serif-editorial italic text-sm text-[#111111] font-medium">{currentTrack.lyricsSnippet}</p>
                </div>
              </div>
            </div>

            {/* Sound Wave Animation Visualizer */}
            <div className="h-10 bg-[#F7F7F7] border border-black/15 px-4 flex items-center justify-between gap-1 mb-6">
              {[40, 70, 30, 90, 60, 20, 85, 45, 100, 65, 30, 80, 50, 95, 40, 75, 35, 90, 60].map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-[#111111] transition-all duration-300 ${
                    isPlaying ? 'bg-[#D94F04] animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (height * Math.random()) % 100)}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-black/15">
              <button
                onClick={() => toggleLike(currentTrack.id)}
                className={`p-3 border transition-colors cursor-pointer ${
                  isLiked[currentTrack.id]
                    ? 'text-[#D94F04] bg-[#D94F04]/10 border-[#D94F04]'
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
                  className="p-4 bg-[#D94F04] hover:bg-[#111111] text-white shadow-sm transition-all cursor-pointer active:scale-95"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 bg-white border border-black/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer active:scale-95"
                  aria-label="Next song"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[#111111] text-xs font-bold font-mono">
                <Volume2 className="w-4 h-4 text-[#D94F04]" />
                <span>{currentTrack.duration}</span>
              </div>
            </div>
          </div>

          {/* Playlist Tracklist */}
          <div className="lg:col-span-5 bg-white border border-black/20 p-6 sm:p-8 shadow-sm">
            <h4 className="font-unbounded font-black text-base uppercase text-[#111111] mb-6 flex items-center justify-between border-b border-black/10 pb-3">
              <span>Плейлист Дуунууд</span>
              <Radio className="w-5 h-5 text-[#D94F04]" />
            </h4>

            <div className="space-y-3">
              {TRACKS.map((track, index) => {
                const isSelected = index === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setCurrentTrackIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-[#F7F7F7] border-black/10 hover:bg-white hover:border-[#D94F04]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 border border-black/10 overflow-hidden shrink-0 bg-[#111111]">
                        <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className={`font-bold text-xs uppercase tracking-wider ${isSelected ? 'text-[#D94F04]' : 'text-[#111111]'}`}>
                          {track.title}
                        </h5>
                        <p className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-[#111111]/60'}`}>{track.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white/70' : 'text-[#111111]/50'}`}>{track.duration}</span>
                      {isSelected && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-4">
                          <span className="w-1 bg-[#D94F04] h-full animate-bounce" />
                          <span className="w-1 bg-[#D94F04] h-2/3 animate-bounce delay-100" />
                          <span className="w-1 bg-[#D94F04] h-1/2 animate-bounce delay-200" />
                        </span>
                      ) : (
                        <Play className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#111111]/40 group-hover:text-[#D94F04]'}`} />
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

