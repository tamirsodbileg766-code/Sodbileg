import React, { useState } from 'react';
import { BREATHING_STYLES } from '../data/portfolioData';
import { BreathingStyle } from '../types';
import { Flame, Sparkles, Swords, Quote } from 'lucide-react';

export const AnimeSection: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<BreathingStyle>(BREATHING_STYLES[1]); // Flame Breathing default
  const [isSlashing, setIsSlashing] = useState(false);

  const handleSlash = () => {
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 800);
  };

  return (
    <section id="anime" className="py-24 bg-[#F7F7F7] text-[#111111] relative overflow-hidden border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Swords className="w-3.5 h-3.5 text-black" />
            <span>Section 06 — Аниме</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight mb-4">
            Кимэцү но Яайба & Амьсгалын Техникүүд
          </h2>
          <p className="text-[#111111]/70 text-sm sm:text-base font-medium">
            Содбилэгийн хамгийн дуртай аниме болон тууштай дайчин чанарыг илэрхийлэх амьсгалын хэлбэрүүд.
          </p>
        </div>

        {/* Breathing Style Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {BREATHING_STYLES.map((style) => {
            const isSelected = selectedStyle.id === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`px-5 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border border-black shadow-sm'
                    : 'bg-white text-[#111111]/70 border border-black/15 hover:border-black hover:text-[#111111]'
                }`}
              >
                <Flame className={`w-4 h-4 ${isSelected ? 'text-white animate-pulse' : ''}`} />
                <span>{style.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Breathing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Style Info & Animated Sword Slash Display */}
          <div className="lg:col-span-8 bg-white border border-black/20 p-8 shadow-sm relative flex flex-col justify-between">
            {/* Sword Slash FX Overlay */}
            {isSlashing && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-[#111111]/90 backdrop-blur-sm">
                <div className="w-full h-1 bg-white rotate-[-25deg] shadow-[0_0_30px_rgba(255,255,255,1)] animate-ping" />
                <div className="absolute text-center font-unbounded text-2xl font-black text-white uppercase tracking-widest animate-bounce">
                  ⚡ {selectedStyle.nameMn} — ТАЙРАЛТ!
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-4">
                <span className="px-2.5 py-1 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest">
                  Эзэмшигч: {selectedStyle.user}
                </span>
                <span className="text-xs text-[#111111]/60 font-bold uppercase tracking-wider">
                  Нийт {selectedStyle.formsCount} Хэлбэр
                </span>
              </div>

              <h3 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase mb-4">
                {selectedStyle.nameMn}
              </h3>

              <p className="text-[#111111]/80 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                {selectedStyle.description}
              </p>

              {/* Quote Card */}
              <div className="p-6 bg-[#F7F7F7] border border-black/15 relative mb-8">
                <Quote className="w-8 h-8 text-black/20 absolute top-4 left-4" />
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#111111] pl-8 relative z-10 font-medium">
                  {selectedStyle.quote}
                </p>
                <p className="text-right text-xs font-bold uppercase tracking-widest text-black mt-2">
                  — {selectedStyle.user}
                </p>
              </div>
            </div>

            {/* Sword Action Button */}
            <div className="pt-4 border-t border-black/15 flex items-center justify-between">
              <button
                onClick={handleSlash}
                className="px-8 py-4 bg-[#111111] hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center gap-3 shadow-sm active:scale-95"
              >
                <Swords className="w-4 h-4" />
                <span>Ничирин Сэлэмний Довтолгоо</span>
              </button>

              <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#111111]/40 uppercase tracking-widest">
                Demon Slayer Corps
              </span>
            </div>
          </div>

          {/* Anime Stats & Fun Fact Card */}
          <div className="lg:col-span-4 bg-white border border-black/20 p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h4 className="font-unbounded font-black text-base uppercase text-[#111111] mb-6 flex items-center gap-2 border-b border-black/10 pb-3">
                <Sparkles className="w-4 h-4 text-black" />
                <span>Ничирин Металл</span>
              </h4>

              <div className="space-y-4">
                <div className="p-4 bg-[#F7F7F7] border border-black/10">
                  <span className="text-[10px] text-[#111111]/60 font-bold uppercase tracking-wider block mb-1">Сэлэмний Өнгө</span>
                  <span className="font-bold text-[#111111] text-xs uppercase">Хар ба Хар цагаан Хэв маяг</span>
                </div>

                <div className="p-4 bg-[#F7F7F7] border border-black/10">
                  <span className="text-[10px] text-[#111111]/60 font-bold uppercase tracking-wider block mb-1">Содбилэгийн Сургамж</span>
                  <p className="text-xs text-[#111111]/80 leading-relaxed font-medium">
                    "Ямар ч саад бэрхшээл тулгарсан зүрхнийхээ галыг хэзээ ч бүү унтраа."
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#111111] text-white text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 block mb-1">
                Хашира Зэрэг
              </span>
              <span className="font-unbounded font-black text-lg block">
                РЭНГОКУ ФЭН
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

