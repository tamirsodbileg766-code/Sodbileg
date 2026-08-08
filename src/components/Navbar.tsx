import React, { useState, useEffect } from 'react';
import { BatLogo } from './BatLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenIdolModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenIdolModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'hobbies', 'volleyball3d', 'mlbb', 'music', 'anime', 'gejyuve', 'stats', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Нүүр' },
    { id: 'about', label: 'Танилцуулга' },
    { id: 'hobbies', label: 'Сонирхол' },
    { id: 'volleyball3d', label: '3D Волейбол' },
    { id: 'mlbb', label: 'MLBB Tigreal' },
    { id: 'music', label: 'Хөгжим' },
    { id: 'anime', label: 'Demon Slayer' },
    { id: 'gejyuve', label: 'Гэж Юу Вэ?' },
    { id: 'contact', label: 'Холбогдох' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F7F7]/95 backdrop-blur-md border-b border-black/10 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#111111] text-white group-hover:bg-zinc-800 transition-colors">
              <BatLogo size={24} className="text-white" />
            </div>
            <div>
              <span className="font-unbounded font-black text-base sm:text-lg tracking-tighter text-[#111111] group-hover:text-zinc-700 transition-colors block leading-none">
                СОДБИЛЭГ
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#111111]/50 uppercase block mt-1">
                Edition 04 — Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-black/10 shadow-sm backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#111111]/70 hover:text-[#111111] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenIdolModal) onOpenIdolModal();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-amber-500/80 bg-amber-500 text-black hover:bg-amber-400 font-black text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
            >
              <span className="text-sm">🤖</span>
              <span>My Idol</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border border-[#111111] bg-[#111111] text-white hover:bg-zinc-800 hover:border-zinc-800 font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
            >
              <span>Холбоо Барих</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg bg-[#111111] text-white border border-black/10 hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#F7F7F7] border-b border-black/15 p-6 backdrop-blur-xl shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-none border-b border-black/5 text-xs font-bold uppercase tracking-widest text-left transition-all ${
                  activeSection === link.id
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] hover:bg-black/5'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-black animate-ping" />}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenIdolModal) onOpenIdolModal();
                }}
                className="w-full py-3.5 bg-amber-500 text-black font-black text-xs tracking-widest uppercase text-center shadow-md hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 rounded-xl"
              >
                <span>🤖 My Idol (Lionel Messi Coach)</span>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 bg-[#111111] text-white font-bold text-xs tracking-widest uppercase text-center shadow-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 rounded-xl"
              >
                <span>Мессеж Илгээх</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

