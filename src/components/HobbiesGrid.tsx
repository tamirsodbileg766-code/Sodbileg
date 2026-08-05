import React from 'react';
import { HOBBIES } from '../data/portfolioData';
import { Trophy, Music, Flame, ArrowRight, Sparkles, Shield } from 'lucide-react';

export const HobbiesGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Volleyball':
        return <Trophy className="w-6 h-6 text-[#111111]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#111111]" />;
      case 'Music':
        return <Music className="w-6 h-6 text-[#111111]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#111111]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#111111]" />;
    }
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hobbies" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D94F04]" />
            <span>Section 03 — Хоббинууд</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight mb-4">
            Содбилэгийн Гол Хоббинууд
          </h2>
          <p className="text-[#111111]/70 text-sm sm:text-base font-medium">
            Спорт, MLBB Tigreal тоглоом, хөгжим ба анимегийн хослол — Миний амьдралын хэв маягийг тодорхойлогч 4 үндсэн ертөнц.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOBBIES.map((hobby, index) => (
            <div
              key={hobby.id}
              className="relative bg-white border border-black/15 p-6 sm:p-8 hover:border-[#D94F04] transition-all duration-300 group shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-4">
                  <div className="p-3 bg-[#F7F7F7] border border-black/10 group-hover:bg-[#D94F04] group-hover:text-white transition-colors">
                    {getIcon(hobby.icon)}
                  </div>
                  <span className="px-2 py-1 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest">
                    {hobby.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/50 block mb-1">
                  Figure 3.{index + 1} — {hobby.subtitle}
                </span>
                <h3 className="font-unbounded font-black text-lg text-[#111111] uppercase mb-3 group-hover:text-[#D94F04] transition-colors">
                  {hobby.title}
                </h3>

                {/* Description */}
                <p className="text-[#111111]/75 text-xs leading-relaxed mb-8 font-medium">
                  {hobby.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => scrollToTarget(hobby.id)}
                className="inline-flex items-center justify-between w-full px-4 py-3 bg-[#111111] hover:bg-[#D94F04] text-white font-bold text-[11px] tracking-widest uppercase transition-all duration-200 cursor-pointer"
              >
                <span>Үзэх & Тоглох</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

