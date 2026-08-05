import React, { useState } from 'react';
import { Trophy, Zap, Shield, Target, RotateCcw, Activity } from 'lucide-react';

export const VolleyballSection: React.FC = () => {
  const [score, setScore] = useState(0);
  const [combos, setCombos] = useState(0);
  const [lastHitType, setLastHitType] = useState<string | null>(null);
  const [isSpiking, setIsSpiking] = useState(false);
  const [spikePower, setSpikePower] = useState(85);

  const handleSpike = (type: 'spike' | 'serve' | 'block') => {
    setIsSpiking(true);
    setTimeout(() => setIsSpiking(false), 400);

    let addedScore = 1;
    let label = '';

    if (type === 'spike') {
      addedScore = Math.floor(Math.random() * 3) + 2;
      label = '🔥 Хүчтэй Довтолгоо! (+ ' + addedScore + ' оочко)';
      setSpikePower(Math.min(100, spikePower + 2));
    } else if (type === 'serve') {
      addedScore = 2;
      label = '⚡ Эйс Дамжуулалт! (+2 оочко)';
    } else {
      addedScore = 3;
      label = '🛡️ Шилдэг Блок! (+3 оочко)';
    }

    setScore((prev) => prev + addedScore);
    setCombos((prev) => prev + 1);
    setLastHitType(label);
  };

  const resetGame = () => {
    setScore(0);
    setCombos(0);
    setLastHitType(null);
    setSpikePower(85);
  };

  return (
    <section id="volleyball" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5 text-[#D94F04]" />
              <span>Section 04 — Спорт</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              Волейболын Талбай & Интерактив Дасгал
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
            Содбилэгийн тоглолтын тактик, талбайн оноо болон интерактив довтолгооны дасгалыг туршиж үзээрэй.
          </p>
        </div>

        {/* Volleyball Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Court Simulator */}
          <div className="lg:col-span-7 bg-white border border-black/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#D94F04] animate-pulse" />
                <h3 className="font-unbounded font-black text-base uppercase text-[#111111]">
                  Интерактив Довтолгооны Дасгал
                </h3>
              </div>
              <button
                onClick={resetGame}
                className="p-2 bg-[#F7F7F7] border border-black/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                title="Шинэчлэх"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Court Graphic */}
            <div className="relative w-full h-64 sm:h-80 bg-[#F7F7F7] border-2 border-[#111111] p-4 flex flex-col justify-between overflow-hidden my-4">
              {/* Volleyball Net Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#111111] -translate-y-1/2 z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest z-20">
                ТОР (NET)
              </div>

              {/* Court Attack Lines */}
              <div className="absolute top-1/4 left-0 right-0 border-b border-dashed border-black/20" />
              <div className="absolute bottom-1/4 left-0 right-0 border-b border-dashed border-black/20" />

              {/* Court Top Half (Opponent) */}
              <div className="text-center pt-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#111111]/50">
                  Өрсөлдөгч талбай
                </span>
              </div>

              {/* Ball Animation Element */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 z-30 ${
                  isSpiking ? 'top-6 scale-125 rotate-180' : 'bottom-10 scale-100'
                }`}
              >
                <div className="w-12 h-12 bg-[#D94F04] border-2 border-[#111111] text-white font-black text-xs flex items-center justify-center shadow-sm">
                  🏐
                </div>
              </div>

              {/* Court Bottom Half (Sodbileg's Team) */}
              <div className="text-center pb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D94F04]">
                  Содбилэгийн Бүс
                </span>
              </div>

              {/* Feedback Overlay */}
              {lastHitType && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-4 py-2 border border-black/20 font-bold text-xs uppercase tracking-wider animate-bounce z-40">
                  {lastHitType}
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => handleSpike('spike')}
                className="py-3 px-4 bg-[#D94F04] hover:bg-[#111111] text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Довтлох</span>
              </button>

              <button
                onClick={() => handleSpike('serve')}
                className="py-3 px-4 bg-[#111111] hover:bg-[#D94F04] text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <Target className="w-4 h-4" />
                <span>Дамжуулах</span>
              </button>

              <button
                onClick={() => handleSpike('block')}
                className="py-3 px-4 bg-white border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <Shield className="w-4 h-4" />
                <span>Блок Хийх</span>
              </button>
            </div>
          </div>

          {/* Volleyball Stats & Player Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Live Scorecard */}
            <div className="p-6 bg-white border border-black/20 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-4 flex items-center justify-between border-b border-black/10 pb-2">
                <span>Дасгалын Статистик</span>
                <Activity className="w-4 h-4 text-[#D94F04]" />
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#D94F04] font-unbounded block">
                    {score}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Нийт Оноо
                  </span>
                </div>

                <div className="p-4 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#111111] font-unbounded block">
                    {combos}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Амжилттай Цохилт
                  </span>
                </div>
              </div>

              {/* Spike Power Meter */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                  <span>Довтолгооны Хүч</span>
                  <span className="text-[#D94F04]">{spikePower}%</span>
                </div>
                <div className="w-full h-3 bg-[#F7F7F7] border border-black/15 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#D94F04] transition-all duration-300"
                    style={{ width: `${spikePower}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Position Cards */}
            <div className="p-6 bg-white border border-black/20 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-2 border-b border-black/10 pb-2">
                Сонгодог Байрлал
              </h4>

              <div className="p-3 bg-[#F7F7F7] border border-black/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase text-[#111111] block">Гадна талын довтлогч (Outside Hitter)</span>
                  <span className="text-[11px] text-[#111111]/70 font-medium">Хүчтэй цохилт & багийн оноо авах гол хүч.</span>
                </div>
                <span className="px-2 py-0.5 bg-[#D94F04] text-white text-[9px] font-bold uppercase tracking-widest shrink-0 ml-2">
                  ГОЛ
                </span>
              </div>

              <div className="p-3 bg-[#F7F7F7] border border-black/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase text-[#111111] block">Дамжуулагч (Setter)</span>
                  <span className="text-[11px] text-[#111111]/70 font-medium">Бөмбөгний чиглэлийг тохируулах тактикч.</span>
                </div>
                <span className="px-2 py-0.5 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest shrink-0 ml-2">
                  ТАКТИК
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

