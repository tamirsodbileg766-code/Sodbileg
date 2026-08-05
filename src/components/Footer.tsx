import React from 'react';
import { BatLogo } from './BatLogo';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white py-16 text-xs border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-white/15 pb-12">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-[#111111]">
              <BatLogo size={24} className="text-[#111111]" />
            </div>
            <div>
              <span className="font-unbounded font-black text-base text-white block uppercase tracking-wider">
                СОДБИЛЭГ
              </span>
              <span className="text-[9px] text-white/60 uppercase tracking-widest block font-mono">
                ARCHIVE • 13 НАСТАЙ
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 font-bold text-white/80 uppercase tracking-widest text-[10px]">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors cursor-pointer">
              Нүүр
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
              Танилцуулга
            </button>
            <button onClick={() => scrollTo('hobbies')} className="hover:text-white transition-colors cursor-pointer">
              Сонирхол
            </button>
            <button onClick={() => scrollTo('volleyball')} className="hover:text-white transition-colors cursor-pointer">
              Волейбол
            </button>
            <button onClick={() => scrollTo('mlbb')} className="hover:text-white transition-colors cursor-pointer">
              MLBB Tigreal
            </button>
            <button onClick={() => scrollTo('music')} className="hover:text-white transition-colors cursor-pointer">
              Хөгжим
            </button>
            <button onClick={() => scrollTo('anime')} className="hover:text-white transition-colors cursor-pointer">
              Demon Slayer
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
              Холбогдох
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-white text-[#111111] hover:bg-zinc-200 hover:text-[#111111] transition-all cursor-pointer flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]"
            aria-label="Back to top"
          >
            <span>Дээшээ</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-[11px]">
          <p>© {new Date().getFullYear()} Содбилэг. Эдиториал дизайн ба бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="flex items-center gap-1 font-serif-editorial italic">
            <span>Волейболын тэмүүлэл ба дуу хөгжмөөр бүтээв</span>
            <Heart className="w-3.5 h-3.5 text-white fill-current inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
};

