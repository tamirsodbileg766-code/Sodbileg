import React from 'react';
import { BatLogo } from './BatLogo';
import { ArrowDown, Flame, Music, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-editorial bg-[#F7F7F7] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Editorial Archival Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-black/15 shadow-sm mb-8 animate-fade-in">
          <span className="px-2 py-0.5 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest">
            Edition 04
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#111111]/70">
            Содбилэг • Archival Monolith
          </span>
          <span className="text-black/20">|</span>
          <span className="text-xs font-bold tracking-widest text-[#111111] uppercase">
            13 Настай
          </span>
        </div>

        {/* Main 1-Sentence Editorial Headline */}
        <h1 className="font-unbounded text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tighter leading-[1.15] max-w-5xl mx-auto mb-6 uppercase">
          Волейболын <span className="font-serif-editorial italic font-normal text-black lowercase">талбайн</span> энерги, хөгжмийн хэмнэлээр тэмүүлэгч <span className="border-b-4 border-black pb-1">Содбилэг</span>.
        </h1>

        {/* Sub-headline with serif touch */}
        <p className="font-montserrat text-[#111111]/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Спортын тэмүүлэл, <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Гитар тоглох</strong> сонирхол, <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Michael Jackson, Mxrning Star & Lemons</strong>-ийн аялгуу, <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">"Гэж Юу Вэ?"</strong> YT суваг болон <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Demon Slayer</strong> аниме нэг дор.
        </p>

        {/* Editorial Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('hobbies')}
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white font-bold text-xs tracking-widest uppercase shadow-md hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Сонирхолуудтай Танилцах</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('volleyball')}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-[#111111] text-[#111111] font-bold text-xs tracking-widest uppercase shadow-sm hover:bg-[#111111] hover:text-white transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>Волейбол Тоглох</span>
          </button>
        </div>

        {/* Figure Cards with Editorial Grid & Hairlines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6 text-left">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-black/15 shadow-sm group hover:border-black transition-all duration-300 relative">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#111111]/40 block mb-2">
              Figure 1.0 — Athlete
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-[#111111] text-white group-hover:bg-zinc-800 transition-colors">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-unbounded font-black text-sm text-[#111111] uppercase">Волейбол</h3>
                <span className="text-[11px] font-serif-editorial italic text-black font-bold">Талбайн Довтлогч</span>
              </div>
            </div>
            <p className="text-xs text-[#111111]/75 leading-relaxed font-medium">
              Бөмбөг өгөх болон довтлох оновчтой момент бүрийг мэдэрч тэмцдэг.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-black/15 shadow-sm group hover:border-black transition-all duration-300 relative">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#111111]/40 block mb-2">
              Figure 2.0 — Music & Guitar
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-[#111111] text-white group-hover:bg-zinc-800 transition-colors">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-unbounded font-black text-sm text-[#111111] uppercase">Гитар & Хөгжим</h3>
                <span className="text-[11px] font-serif-editorial italic text-black font-bold">Michael Jackson & Mxrning Star</span>
              </div>
            </div>
            <p className="text-xs text-[#111111]/75 leading-relaxed font-medium">
              Гитар тоглох дуртай! Michael Jackson (Billie Jean, Beat It, Chicago) болон Mxrning Star.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-black/15 shadow-sm group hover:border-black transition-all duration-300 relative">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#111111]/40 block mb-2">
              Figure 3.0 — Anime
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-[#111111] text-white group-hover:bg-zinc-800 transition-colors">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-unbounded font-black text-sm text-[#111111] uppercase">Demon Slayer</h3>
                <span className="text-[11px] font-serif-editorial italic text-black font-bold">Галын Амьсгал</span>
              </div>
            </div>
            <p className="text-xs text-[#111111]/75 leading-relaxed font-medium">
              Рэнгоку болон Танжиро нарын тэмцэгч дайчин чанарт дуртай.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => scrollTo('about')}
            className="p-3 bg-white border border-black/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-all animate-bounce cursor-pointer"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

