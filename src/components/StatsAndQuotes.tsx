import React from 'react';
import { STATS, TESTIMONIALS } from '../data/portfolioData';
import { User, Activity, Headphones, Flame, Star, Quote } from 'lucide-react';

export const StatsAndQuotes: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'User':
        return <User className="w-5 h-5 text-black" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-black" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-black" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-black" />;
      default:
        return <Star className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section id="stats" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Highlight Stats Numbers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <span>Section 07 — Үзүүлэлт</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            Содбилэгийн Онцлох Үзүүлэлтүүд
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-white border border-black/20 shadow-sm hover:border-black transition-all duration-300 group"
            >
              <div className="p-3 bg-[#F7F7F7] border border-black/10 w-fit mb-4 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                {getIcon(stat.iconName)}
              </div>

              <span className="font-unbounded font-black text-3xl sm:text-4xl text-[#111111] block mb-1">
                {stat.value}
              </span>

              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] mb-2">
                {stat.label}
              </h3>

              <p className="text-xs text-[#111111]/70 leading-relaxed font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials / What Friends Say */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <span>Section 08 — Сэтгэгдэл</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            Багийн Андууд Ба Найзуудын Сэтгэгдэл
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 bg-white border border-black/20 shadow-sm relative flex flex-col justify-between hover:border-black transition-all"
            >
              <Quote className="w-8 h-8 text-black/20 absolute top-6 right-6" />

              <div className="space-y-4 mb-8">
                {/* Rating Stars */}
                <div className="flex gap-1 text-black">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-[#111111] text-sm leading-relaxed italic font-serif-editorial font-medium">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-black/15">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-11 h-11 border border-black/20 object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111111]">{testimonial.name}</h4>
                  <span className="text-[11px] font-medium text-[#111111]/60">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

