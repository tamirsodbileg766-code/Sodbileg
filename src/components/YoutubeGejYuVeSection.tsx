import React, { useState } from 'react';
import { GEJ_YU_VE_TOPICS } from '../data/portfolioData';
import { YoutubeTopic } from '../types';
import { Youtube, Atom, HelpCircle, CheckCircle2, Orbit, ExternalLink } from 'lucide-react';

export const YoutubeGejYuVeSection: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<YoutubeTopic>(GEJ_YU_VE_TOPICS[0]);
  const [fissionStep, setFissionStep] = useState<number>(0);
  const [fissionActive, setFissionActive] = useState<boolean>(false);

  const triggerFissionSimulation = () => {
    setFissionActive(true);
    setFissionStep(1);
    setTimeout(() => setFissionStep(2), 800);
    setTimeout(() => setFissionStep(3), 1600);
    setTimeout(() => {
      setFissionActive(false);
      setFissionStep(0);
    }, 3000);
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-5 h-5 text-white" />;
      case 'Sparkles':
        return <Orbit className="w-5 h-5 text-white" />;
      default:
        return <Youtube className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="gejyuve" className="py-24 bg-[#111111] text-white relative overflow-hidden border-t border-white/15">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[radial-[#ffffff]/0.03_1px,transparent_1px] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-sm">
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>Section 06.5 — YouTube "Гэж Юу Вэ?" & Танин Медэхүй</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            "Гэж Юу Вэ?" & Шинжлэх Ухаан
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-medium mb-6">
            13 настай Содбилэгийн шимтэн үздэг "Гэж Юу Вэ?" YouTube суваг, Цөмийн Физик болон Одон орон судлалын дуртай сэдвүүд.
          </p>

          <a
            href="https://www.youtube.com/@GejYuVe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Youtube className="w-4 h-4" />
            <span>"Гэж Юу Вэ?" Албан Ёсны Суваг Рүү Очих</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Topic Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {GEJ_YU_VE_TOPICS.map((topic) => {
            const isSelected = activeTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`p-5 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white text-[#111111] border-white shadow-lg font-bold'
                    : 'bg-zinc-900/80 text-white border-white/15 hover:border-white/40 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 ${isSelected ? 'bg-[#111111]' : 'bg-white/10'} rounded-none`}>
                    {getTopicIcon(topic.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${isSelected ? 'bg-[#111111] text-white' : 'bg-white/10 text-white/70'}`}>
                    {topic.category}
                  </span>
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isSelected ? 'text-[#111111]/60' : 'text-white/50'}`}>
                    {topic.visualTag}
                  </span>
                  <h3 className="font-unbounded font-black text-sm uppercase leading-snug">
                    {topic.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Info Card */}
          <div className="lg:col-span-7 bg-zinc-900 border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="px-2.5 py-1 bg-red-600 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5" />
                  YouTube Topic
                </span>
                <span className="text-xs font-mono text-white/50 font-bold uppercase">
                  {activeTopic.category}
                </span>
              </div>

              <h3 className="font-unbounded font-black text-xl sm:text-3xl text-white uppercase mb-2">
                {activeTopic.title}
              </h3>
              <p className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-6">
                {activeTopic.subtitle}
              </p>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                {activeTopic.summary}
              </p>

              {/* Key Facts Bullet Points */}
              <div className="space-y-3 mb-8 bg-black/40 p-4 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  Гол баримтууд & Шинжлэх ухааны үндэслэл:
                </h4>
                {activeTopic.keyFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-400 italic border-l-2 border-white/30 pl-4 py-1">
                "{activeTopic.detailsMn}"
              </p>
            </div>

            {/* Interactive Widget depending on topic */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              {activeTopic.id === 'nuclear-bomb' && (
                <button
                  onClick={triggerFissionSimulation}
                  disabled={fissionActive}
                  className="px-6 py-3 bg-white text-[#111111] hover:bg-zinc-200 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Atom className={`w-4 h-4 ${fissionActive ? 'animate-spin' : ''}`} />
                  <span>{fissionActive ? 'Атомын Задрал Явагдаж байна...' : '⚛️ Атомын Задралыг Симмуляци Хийх'}</span>
                </button>
              )}

              {activeTopic.id === 'astronomy' && (
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                  <Orbit className="w-4 h-4 animate-spin" />
                  <span>Сүүн зам галактикт ~200 тэрбум од оршдог!</span>
                </div>
              )}

              {activeTopic.id === 'yt-channel' && (
                <a
                  href="https://www.youtube.com/@GejYuVe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4" />
                  <span>"Гэж Юу Вэ?" Суваг Хүрэх</span>
                </a>
              )}

              <span className="text-[11px] font-mono text-white/40 uppercase">
                "Гэж Юу Вэ?" Knowledge Base
              </span>
            </div>
          </div>

          {/* Right Visual Interactive Component */}
          <div className="lg:col-span-5 bg-zinc-900 border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {activeTopic.id === 'nuclear-bomb' ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-unbounded font-black text-sm uppercase text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Atom className="w-4 h-4 text-amber-400" />
                    <span>Атомын Задралын Процесс (Nuclear Fission)</span>
                  </h4>

                  <div className="bg-black/60 border border-white/10 p-4 text-center my-4 relative min-h-[160px] flex flex-col items-center justify-center">
                    {fissionStep === 0 && (
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-amber-500 rounded-full mx-auto flex items-center justify-center font-bold text-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                          U-235
                        </div>
                        <p className="text-xs text-zinc-400">Уран-235 Цөм (Тайван байдал)</p>
                      </div>
                    )}

                    {fissionStep === 1 && (
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
                          <span className="text-xs text-blue-400 font-bold">Нейтрон цохилоо 💥</span>
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black text-xs">
                            U-235
                          </div>
                        </div>
                        <p className="text-xs text-amber-300 font-bold">Нейтрон Уран-235-ийг бөмбөгдөв!</p>
                      </div>
                    )}

                    {fissionStep === 2 && (
                      <div className="space-y-2">
                        <div className="flex justify-center gap-6">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-ping">
                            Ba-141
                          </div>
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-ping">
                            Kr-92
                          </div>
                        </div>
                        <p className="text-xs text-red-400 font-bold uppercase animate-bounce">
                          💥 200 MeV Энерги & 3 Шинэ Нейтрон Гарав!
                        </p>
                      </div>
                    )}

                    {fissionStep === 3 && (
                      <div className="space-y-2">
                        <div className="text-2xl font-black text-amber-400 font-unbounded animate-pulse">
                          ⚡ ГИНЖИН РЕАКЦ!
                        </div>
                        <p className="text-xs text-emerald-400 font-bold">
                          Сая сая атомууд нэгэн зэрэг задарч асар их дулаан ба дэлбэрэлт үүсгэв.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-300 bg-white/5 p-3 border border-white/10">
                  <p className="font-bold text-white">💡 Содбилэгийн тэмдэглэл:</p>
                  <p className="text-zinc-400">
                    "Гэж Юу Вэ?" сувгаас үзснээр цөмийн энергийг аюулгүй цахилгаан станцад ч ашигладаг, мөн асар том зэвсэг болгож болдог физикийн гайхамшиг.
                  </p>
                </div>
              </div>
            ) : activeTopic.id === 'astronomy' ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-unbounded font-black text-sm uppercase text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Orbit className="w-4 h-4 text-sky-400" />
                    <span>Хар Нүх & Сансар Огторгуй</span>
                  </h4>

                  <div className="bg-black/80 border border-white/10 p-6 text-center my-4 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-black border-4 border-amber-500/80 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] relative animate-pulse">
                      <div className="w-8 h-8 bg-black rounded-full" />
                    </div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                      EVENT HORIZON (ҮЗЭГДЛИЙН ХОРИЗОНТ)
                    </p>
                    <p className="text-xs text-zinc-300 font-medium">
                      Гэрэл хүртэл таталцлын гүнээс гараж чадахгүй. Одон орон судлалын хамгийн нууцлаг обьект.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-300 bg-white/5 p-3 border border-white/10">
                  <p className="font-bold text-white">🌌 Нарны Аймаг & Жеймс Уэбб:</p>
                  <p className="text-zinc-400">
                    Орчлон ертөнц 13.8 тэрбум жилийн настай бөгөөд одоо ч тэлсээр байгаа нь сэтгэл хөдөлгөм.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-unbounded font-black text-sm uppercase text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>"Гэж Юу Вэ?" Түүх & Суваг</span>
                  </h4>

                  <div className="bg-black/80 border border-white/10 p-6 text-center my-4 space-y-3">
                    <div className="w-16 h-16 bg-red-600 rounded-full mx-auto flex items-center justify-center text-2xl shadow-lg">
                      ❓
                    </div>
                    <h5 className="font-unbounded font-black text-base text-white uppercase">
                      Гэж Юу Вэ?
                    </h5>
                    <p className="text-xs text-zinc-300 font-medium">
                      Юмс хэрхэн ажилладаг, шинжлэх ухаан ба технологийн хамгийн сонирхолтой асуултуудад хариулдаг Монгол суваг.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-300 bg-white/5 p-3 border border-white/10">
                  <p className="font-bold text-white">⭐ Дуртай цувралууд:</p>
                  <p className="text-zinc-400">
                    - Цөмийн физик & Зэвсэг хэрхэн ажилладаг вэ?<br />
                    - Сансар огторгуйн хязгаар ба Хар нүх<br />
                    - Технологи ба Ирээдүйн роботууд
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

