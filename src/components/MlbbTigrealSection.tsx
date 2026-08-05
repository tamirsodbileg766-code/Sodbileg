import React, { useState } from 'react';
import { TIGREAL_DATA } from '../data/portfolioData';
import { Shield, Zap, Swords, Trophy, RotateCcw, Crosshair, Sparkles, Volume2, ShieldCheck, Award } from 'lucide-react';
import { Tigreal3DGame } from './Tigreal3DGame';

export const MlbbTigrealSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState(TIGREAL_DATA.skills[3]); // Default Ultimate

  return (
    <section id="mlbb" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
              <Shield className="w-3.5 h-3.5 text-[#D94F04]" />
              <span>Section 04 — Mobile Legends 3D Arena Game</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              Tigreal 3D MOBA Тоглоом — Клавиатураар Тоглох
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
            Содбилэгийн дуртай Tigreal баатрыг 3D талбайд клавиатурын W, A, S, D болон 1, 2, 3 товчлуураар удирдан тоглож, Implosion combo туршаарай!
          </p>
        </div>

        {/* Hero Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Playable Game Canvas Container */}
          <div className="lg:col-span-7 bg-white border border-black/20 p-4 sm:p-6 shadow-sm">
            <div className="mb-4 pb-2 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#D94F04] animate-pulse rounded-full" />
                <h3 className="font-unbounded font-black text-sm sm:text-base uppercase text-[#111111]">
                  Playable 3D Battle Arena
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#111111] text-white">
                3D Realtime Engine
              </span>
            </div>

            {/* Render 3D Game */}
            <Tigreal3DGame />
          </div>

          {/* Tigreal Stats, Skills & Core Items */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Player MLBB Tank Stats Card */}
            <div className="p-6 bg-white border border-black/20 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-4 flex items-center justify-between border-b border-black/10 pb-2">
                <span>Содбилэгийн MLBB Тоглолтын Үзүүлэлт</span>
                <Award className="w-4 h-4 text-[#D94F04]" />
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#D94F04] font-unbounded block">
                    {TIGREAL_DATA.stats.winRate}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Tigreal Win Rate
                  </span>
                </div>

                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#111111] font-unbounded block">
                    {TIGREAL_DATA.stats.matches}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Нийт Тоглосон
                  </span>
                </div>

                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#111111] font-unbounded block">
                    {TIGREAL_DATA.stats.mvpCount}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Танк MVP
                  </span>
                </div>

                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-2xl font-black text-[#D94F04] font-unbounded block">
                    {TIGREAL_DATA.stats.ccRating}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Crowd Control Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Skills Accordion List */}
            <div className="p-6 bg-white border border-black/20 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-3 border-b border-black/10 pb-2">
                Tigreal Скиллүүд & Чадвар
              </h4>

              <div className="space-y-2">
                {TIGREAL_DATA.skills.map((skill) => {
                  const isSelected = activeSkill.id === skill.id;
                  return (
                    <div
                      key={skill.id}
                      onClick={() => setActiveSkill(skill)}
                      className={`p-3 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#F7F7F7] border-black/10 hover:border-[#D94F04]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              isSelected ? 'bg-[#D94F04] text-white' : 'bg-white text-[#111111] border border-black/15'
                            }`}
                          >
                            {skill.type}
                          </span>
                          <span className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-[#111111]'}`}>
                            {skill.nameMn}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <p className="text-[11px] text-white/80 mt-2 leading-relaxed font-medium">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Core Item Build Grid */}
            <div className="p-6 bg-white border border-black/20 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-3 border-b border-black/10 pb-2">
                Сонгодог Танк Эд Зүйлс (Item Build)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIGREAL_DATA.buildItems.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#F7F7F7] border border-black/10 text-left">
                    <span className="font-bold text-[11px] text-[#111111] block uppercase">{item.name}</span>
                    <span className="text-[9px] text-[#D94F04] font-bold block">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

