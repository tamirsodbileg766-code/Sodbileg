import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: 'Волейболын бэлтгэл / Хамтран тоглох',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        contact: '',
        subject: 'Волейболын бэлтгэл / Хамтран тоглох',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D94F04]" />
            <span>Section 09 — Холбоо барих</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight mb-4">
            Содбилэгтэй Холбогдох
          </h2>
          <p className="text-[#111111]/70 text-sm sm:text-base font-medium">
            Волейболын нөхөрсөг тоглолт, Mxrning Star дууны хэлэлцүүлэг эсвэл санал хүсэлтээ илгээгээрэй.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-white border border-black/20 shadow-sm space-y-6">
              <h3 className="font-unbounded font-black text-base uppercase text-[#111111] border-b border-black/10 pb-3">
                Шууд Мэдээлэл
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#F7F7F7] border border-black/10">
                  <div className="p-2.5 bg-[#111111] text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111111]/60 font-bold uppercase tracking-wider block">Цахим шуудан</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="font-bold text-xs text-[#111111] hover:underline transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F7F7F7] border border-black/10">
                  <div className="p-2.5 bg-[#111111] text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111111]/60 font-bold uppercase tracking-wider block">Холбогдох утас</span>
                    <span className="font-bold text-xs text-[#111111]">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F7F7F7] border border-black/10">
                  <div className="p-2.5 bg-[#111111] text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111111]/60 font-bold uppercase tracking-wider block">Байршил</span>
                    <span className="font-bold text-xs text-[#111111]">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Handles */}
              <div className="pt-4 border-t border-black/15">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 block mb-3">
                  Нийгмийн сүлжээ
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://instagram.com/${PERSONAL_INFO.socials.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 bg-[#F7F7F7] border border-black/15 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#111111]" />
                    <span>Instagram ({PERSONAL_INFO.socials.instagram})</span>
                  </a>

                  <a
                    href={`https://facebook.com/${PERSONAL_INFO.socials.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 bg-[#F7F7F7] border border-black/15 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <Facebook className="w-4 h-4 text-[#111111]" />
                    <span>Facebook ({PERSONAL_INFO.socials.facebook})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-black/20 p-8 shadow-sm relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#111111] border border-black text-white flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-unbounded font-black text-2xl text-[#111111] uppercase">
                  Баярлалаа! Зурвас амжилттай илгээгдлээ.
                </h3>
                <p className="text-[#111111]/80 text-sm max-w-md mx-auto font-medium">
                  Содбилэг таны зурвасыг хүлээн авлаа. Төд удалгүй эргэн холбогдох болно!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-3 bg-[#111111] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Дахин зурвас бичих
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-unbounded font-black text-base uppercase text-[#111111] mb-2 border-b border-black/10 pb-3">
                  Энгийн Холбоо Барих Форм
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2">
                      Таны нэр <span className="text-[#111111]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Жишээ: Батзориг"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F7F7F7] border border-black/15 text-[#111111] placeholder-[#111111]/40 text-xs focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2">
                      Имэйл эсвэл Утасны дугаар
                    </label>
                    <input
                      type="text"
                      placeholder="9911**** эсвэл email@domain.com"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F7F7F7] border border-black/15 text-[#111111] placeholder-[#111111]/40 text-xs focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2">
                    Зурвасын сэдэв
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F7F7F7] border border-black/15 text-[#111111] text-xs focus:outline-none focus:border-[#111111] transition-colors cursor-pointer font-medium"
                  >
                    <option value="Волейболын бэлтгэл / Хамтран тоглох">Волейболын бэлтгэл / Хамтран тоглох</option>
                    <option value="Mobile Legends (MLBB) / Tigreal дуэт багт тоглох">Mobile Legends (MLBB) / Tigreal дуэт багт тоглох</option>
                    <option value="Mxrning Star & Lemons дууны санал">Mxrning Star & Lemons дууны санал</option>
                    <option value="Demon Slayer ярилцлага">Demon Slayer ярилцлага</option>
                    <option value="Бусад асуулт">Бусад асуулт</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111] mb-2">
                    Зурвас <span className="text-[#111111]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Энд санал хүсэлт, мессежээ бичээрэй..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F7F7F7] border border-black/15 text-[#111111] placeholder-[#111111]/40 text-xs focus:outline-none focus:border-[#111111] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#111111] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Илгээж байна...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Зурвас Илгээх</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

