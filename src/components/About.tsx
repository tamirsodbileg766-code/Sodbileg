import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { BatLogo } from './BatLogo';
import { User, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F7F7F7] text-[#111111] relative overflow-hidden border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Figure 02 — Миний тухай</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            Танилцуулга & Үнэт зүйл
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Avatar / Stylized Visual Box */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="relative bg-white border border-black/20 p-8 text-center shadow-sm">
                {/* Background Bat Silhouette */}
                <div className="absolute top-4 right-4 opacity-5">
                  <BatLogo size={120} className="text-black" />
                </div>

                {/* Profile Image Representation */}
                <div className="relative w-40 h-40 mx-auto mb-6 border border-black/20 overflow-hidden bg-[#111111]">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
                    alt="Содбилэг - MLBB тоглож буй агшин"
                    className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#111111] text-white text-[9px] font-bold uppercase tracking-widest">
                    MLBB GAMER
                  </span>
                </div>

                <h3 className="font-unbounded font-black text-xl text-[#111111] uppercase mb-1">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-[#111111] font-bold tracking-widest uppercase mb-4">
                  {PERSONAL_INFO.title}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    🏆 13 Настай
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    🎮 MLBB Gamer
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    🛡️ Tigreal Tank
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    🎸 Гитарчин
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    🎵 Michael Jackson Fan
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F7F7] text-[#111111] text-xs font-bold border border-black/10">
                    📺 "Гэж Юу Вэ?" YT
                  </span>
                </div>

                <div className="pt-4 border-t border-black/10 text-left space-y-2">
                  <div className="flex items-center gap-3 text-xs text-[#111111]/80 font-medium">
                    <User className="w-4 h-4 text-black" />
                    <span>Нэр: <strong className="text-[#111111] font-bold">{PERSONAL_INFO.name}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#111111]/80 font-medium">
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Нас: <strong className="text-[#111111] font-bold">{PERSONAL_INFO.age} настай</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#111111]/80 font-medium">
                    <MapPin className="w-4 h-4 text-black" />
                    <span>Байршил: <strong className="text-[#111111] font-bold">{PERSONAL_INFO.location}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Content Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-unbounded text-2xl sm:text-3xl font-black text-[#111111] leading-snug uppercase">
              "Бүх зүйлд чин сэтгэлээсээ, <span className="font-serif-editorial italic font-normal text-black">бууж өгөлгүй</span> зүтгэх нь миний зарчим."
            </h3>

            <p className="text-[#111111]/80 text-sm sm:text-base leading-relaxed font-medium">
              Намайг Содбилэг гэдэг. Би одоогоор 13 настай. Миний амьдралын хамгийн том сонирхол бол <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Mobile Legends (MLBB) тоглох</strong> ба <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">гитар тоглох</strong> юм. Тоглоомонд багаараа тактик зохиож тэмцэхийн сацуу гитараар дуртай аялгуугаа тоглож сонирхдог.
            </p>

            <p className="text-[#111111]/80 text-sm sm:text-base leading-relaxed font-medium">
              Чөлөөт цагаараа <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Mobile Legends (MLBB)</strong> тоглож, өөрийн дуртай <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Tigreal</strong> танк баатар дээр 53.1% winrate-тэй тоглодог. Мөн <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Michael Jackson</strong>-ийн "Billie Jean", "Beat It", "Chicago", мөн <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Mxrning Star, The Lemons</strong> дууг сонсож, дуртай <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">"Гэж Юу Вэ?"</strong> YouTube суваг болон <strong className="text-[#111111] font-bold underline underline-offset-4 decoration-black">Demon Slayer</strong> анимег шимтэн үздэг.
            </p>

            {/* Quick Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/15">
              <div className="flex items-start gap-3 p-3 bg-white border border-black/10">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">Mobile Legends Gamer</h4>
                  <p className="text-xs text-[#111111]/70 mt-1">Багийн стратеги, бамбай болон тактикч сэтгэлгээг эрхэмлэдэг.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-black/10">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">Гитар Тоглох & Хөгжим</h4>
                  <p className="text-xs text-[#111111]/70 mt-1">Гитар тоглодог & Michael Jackson (Billie Jean, Beat It, Chicago), Mxrning Star.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-black/10">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">"Гэж Юу Вэ?" YouTube Суваг</h4>
                  <p className="text-xs text-[#111111]/70 mt-1">Дуртай танин мэдэхүйн сувгаа ашиглан шинэ зүйлсийг суралцдаг.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-black/10">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">MLBB Tigreal Main Tank</h4>
                  <p className="text-xs text-[#111111]/70 mt-1">53.1% Winrate & Имплошн комбо мастер (850+ matches).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-black/10 sm:col-span-2">
                <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">Demon Slayer Аниме</h4>
                  <p className="text-xs text-[#111111]/70 mt-1">Галын амьсгал ба Танжиро, Рэнгоку нарын тууштай дайчин сэтгэлзүй.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

