import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HobbiesGrid } from './components/HobbiesGrid';
import { Volleyball3DSection } from './components/Volleyball3DSection';
import { MlbbTigrealSection } from './components/MlbbTigrealSection';
import { MusicPlayerSection } from './components/MusicPlayerSection';
import { AnimeSection } from './components/AnimeSection';
import { YoutubeGejYuVeSection } from './components/YoutubeGejYuVeSection';
import { StatsAndQuotes } from './components/StatsAndQuotes';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IdolChatModal } from './components/IdolChatModal';
import { MeAiChatPopup } from './components/MeAiChatPopup';

export default function App() {
  const [isIdolModalOpen, setIsIdolModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#111111] selection:bg-[#D94F04] selection:text-white font-montserrat overflow-x-hidden relative">
      {/* Sticky Navigation */}
      <Navbar onOpenIdolModal={() => setIsIdolModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero onOpenIdolModal={() => setIsIdolModalOpen(true)} />

        {/* About Section */}
        <About />

        {/* Hobbies Grid */}
        <HobbiesGrid />

        {/* 3D Multiplayer Volleyball Engine */}
        <Volleyball3DSection />

        {/* MLBB Tigreal Tank Showcase */}
        <MlbbTigrealSection />

        {/* Music Player (Mxrning Star & The Lemons) */}
        <MusicPlayerSection />

        {/* Demon Slayer / Anime Section */}
        <AnimeSection />

        {/* "Гэж Юу Вэ?" YouTube Science & Astronomy Section */}
        <YoutubeGejYuVeSection />

        {/* Highlight Stats & Testimonials */}
        <StatsAndQuotes />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* 🤖 Idol Chat Modal (Lionel Messi) */}
      <IdolChatModal
        isOpen={isIdolModalOpen}
        onClose={() => setIsIdolModalOpen(false)}
      />

      {/* Messenger-style Popup Widget (Sodbileg Tamir Me-AI Assistant) */}
      <MeAiChatPopup />
    </div>
  );
}
