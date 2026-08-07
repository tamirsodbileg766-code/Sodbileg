export interface LyricLine {
  time: number;
  text: string;
  section?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  vibeTag: string;
  lyricsSnippet: string;
  audioUrl?: string;
  youtubeId?: string;
  fullLyrics?: string;
  timedLyrics?: LyricLine[];
}

export interface BreathingStyle {
  id: string;
  nameMn: string;
  nameEn: string;
  user: string;
  element: 'fire' | 'water' | 'sun' | 'thunder';
  color: string;
  glowColor: string;
  quote: string;
  description: string;
  formsCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface HobbyCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
}

export interface YoutubeTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  summary: string;
  keyFacts: string[];
  visualTag: string;
  detailsMn: string;
}
