import { Track, BreathingStyle, Testimonial, StatItem, HobbyCard } from '../types';

export const PERSONAL_INFO = {
  name: 'Содбилэг',
  surname: 'Т.',
  age: 13,
  title: 'Залуу тамирчин, MLBB Tigreal Танк, хөгжим сонирхогч & аниме хорхойтон',
  tagline: 'Волейболын талбайн энерги, MLBB Tigreal-ийн хамгаалалт, Mxrning Star-ын аялгуу, Demon Slayer-ийн зориг тэвчээр.',
  location: 'Улаанбаатар, Монгол',
  aboutBrief: 'Би 13 настай. Волейболын спортоор хичээллэхийн зэрэгцээ Mobile Legends: Bang Bang (MLBB) тоглоомд Tigreal баатрыг голлон тоглодог Танк тоглогч. Чөлөөт цагаараа Mxrning Star, The Lemons хамтлагийн дуунуудыг сонсож, Demon Slayer аниме үзэх дуртай.',
  email: 'sodbileg.volley@gmail.com',
  phone: '+976 9911 ****',
  socials: {
    instagram: '@sodbileg_vb',
    facebook: 'Sodbileg Volley',
    tiktok: '@sodbileg_vibe',
  }
};

export const HOBBIES: HobbyCard[] = [
  {
    id: 'volleyball',
    title: 'Волейбол',
    subtitle: 'Багийн ажиллагаа & Эдренлин',
    description: 'Бөмбөг газар унах хүртэл тэмцэх нь миний хамгийн дуртай мэдрэмж. Хүчтэй довтолгоо, оновчтой дамжуулалт хийхэд анхаардаг.',
    icon: 'Volleyball',
    badge: 'Талбайн довтлогч',
    color: 'from-amber-500 to-rose-600'
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends: Tigreal',
    subtitle: 'MLBB Main Tank & Initiator',
    description: 'Tigreal бол миний хамгийн дуртай MLBB баатар. Flicker + Ultimate (Implosion) комбинациар тоглолтыг эргүүлэн багаа ялалтад хүргэх дуртай.',
    icon: 'Shield',
    badge: 'Tigreal Main Tank',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'music',
    title: 'Хөгжим Сонсох',
    subtitle: 'Mxrning Star & The Lemons',
    description: 'Mxrning Star-ын R&B, лофай, меланхолик аялгуу болон The Lemons-ийн классик инди рок хэмнэлүүд намайг эрч хүчээр цэнэглэдэг.',
    icon: 'Music',
    badge: '24/7 Вайб',
    color: 'from-rose-500 to-purple-600'
  },
  {
    id: 'anime',
    title: 'Demon Slayer',
    subtitle: 'Кимэцү но Яайба & Аниме',
    description: 'Танжиро болон Рэнгоку нарын зорилгынхоо төлөө тууштай тэмцэх чанар намайг сургадаг. Амьсгалын техникүүд ба Ничирин сэлэмний тулаан үнэхээр сэтгэл хөдөлгөм.',
    icon: 'Flame',
    badge: 'Demon Slayer Fan',
    color: 'from-emerald-500 to-teal-700'
  }
];

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Хүн',
    artist: 'Mxrning Star',
    album: 'Single Track',
    duration: '3:24',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Mxrning Star — Trap-Soul / R&B',
    lyricsSnippet: '“Бид бүгдээрээ л алдаж онодог эгэл хүн...”'
  },
  {
    id: '2',
    title: 'Бадамлянхуа',
    artist: 'Mxrning Star',
    album: 'Atmosphere',
    duration: '3:10',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Mxrning Star — Melodic Lo-Fi',
    lyricsSnippet: '“Шаварт ургасан ч цэвэрхэн дэлбээлэх бадамлянхуа...”'
  },
  {
    id: '3',
    title: 'Сүүлчийн уянга',
    artist: 'The Lemons',
    album: 'Red Album',
    duration: '3:52',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'The Lemons — Инди Рок Классик',
    lyricsSnippet: '“Сүүлчийн уянга зүрхэнд эгшиглэх тэр агшинд...”'
  },
  {
    id: '4',
    title: 'Монад',
    artist: 'The Lemons',
    album: 'Залуу нас',
    duration: '4:15',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'The Lemons — Альтернатив Рок',
    lyricsSnippet: '“Монад аялгуу чихэнд эгшиглэх сэтгэлийн давалгаа...”'
  }
];

export const BREATHING_STYLES: BreathingStyle[] = [
  {
    id: 'sun',
    nameMn: 'Нарны Амьсгал (Hinokami Kagura)',
    nameEn: 'Sun Breathing',
    user: 'Камадо Танжиро',
    element: 'sun',
    color: 'from-amber-500 via-orange-500 to-rose-600',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    quote: '“Хэзээ ч бүү бууж өг! Чамд хязгааргүй боломж бий.”',
    description: 'Бүх амьсгалын анхдагч эх үүсвэр. Хурц гэрэл, хязгааргүй дулаан ба шатамхай энергийг агуулдаг.',
    formsCount: 13
  },
  {
    id: 'flame',
    nameMn: 'Галын Амьсгал (Flame Breathing)',
    nameEn: 'Flame Breathing',
    user: 'Рэнгоку Кёжуро',
    element: 'fire',
    color: 'from-red-600 via-orange-500 to-amber-400',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    quote: '“Зүрхээ бадрааж, хязгаараа даван туул!”',
    description: 'Хүчтэй, халуун агаар болон галын дөл мэт шийдэмгий довтолгоог үзүүлдэг хашира нарын техник.',
    formsCount: 9
  },
  {
    id: 'water',
    nameMn: 'Усны Амьсгал (Water Breathing)',
    nameEn: 'Water Breathing',
    user: 'Томиока Гию',
    element: 'water',
    color: 'from-cyan-500 via-blue-600 to-indigo-800',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    quote: '“Ус шиг уян хатан, тайван мөртлөө асар хүчтэй бай.”',
    description: 'Ямар ч нөхцөлд зохицож чадах, урсах ус мэт зөөлөн мөн аюултай далай мэт ширүүн амьсгал.',
    formsCount: 11
  }
];

export const STATS: StatItem[] = [
  {
    id: '1',
    label: 'Нас',
    value: '13',
    description: 'Сургуулийн сурагч & спортын хорхойтон',
    iconName: 'User'
  },
  {
    id: '2',
    label: 'Волейболын бэлтгэл',
    value: '120+',
    description: 'Цаг талбайд өнгөрүүлсэн довтолгоо & блокада',
    iconName: 'Activity'
  },
  {
    id: '3',
    label: 'MLBB Tigreal Winrate',
    value: '53.1%',
    description: '850+ тоглолтын олонх ялалт & Танк MVP',
    iconName: 'Shield'
  },
  {
    id: '4',
    label: 'Demon Slayer',
    value: '100%',
    description: 'Бүх анги, киног дуусгасан Хашира фэн',
    iconName: 'Flame'
  }
];

export const TIGREAL_DATA = {
  heroName: 'Tigreal',
  title: 'Warrior of Light (Мөнхийн Хамгаалагч)',
  role: 'Tank / Support',
  specialty: 'Crowd Control / Initiator',
  avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  lore: 'Мониан Гүрний бат бөх бамбай Tigreal нь ямар ч аюулаас ухрахгүй бөгөөд багийнхаа нөхдийг амиараа хамгаалахад ямагт бэлэн байдаг. Содбилэгийн хамгийн дуртай main tank баатар.',
  stats: {
    winRate: '53.1%',
    matches: '850+',
    mvpCount: '25+',
    ccRating: '70%',
  },
  skills: [
    {
      id: 'passive',
      nameMn: 'Fearless (Аймшиггүй)',
      type: 'Passive',
      description: 'Дайсны үндсэн цохилтыг бамбайгаа ашиглан буцааж, хамгаалалтын давхарга үүсгэнэ.',
      iconName: 'ShieldCheck'
    },
    {
      id: 'skill1',
      nameMn: 'Attack Wave (Довтлох Долгион)',
      type: 'Skill 1',
      description: 'Газар руу хүчтэй цохиж, урдах эсрэг баатруудад физик хохирол учруулан удаашруулна.',
      iconName: 'Zap'
    },
    {
      id: 'skill2',
      nameMn: 'Sacred Hammer (Ариун Алх)',
      type: 'Skill 2',
      description: 'Эсрэг чиглэлд түрэн довтолж, дахин дарахад дайснуудыг агаарт шидэж knockup хийнэ.',
      iconName: 'Crosshair'
    },
    {
      id: 'ultimate',
      nameMn: 'Implosion (Татлагын Дэлбэрэлт)',
      type: 'Ultimate',
      description: 'Сэлмээ газарт хаан эргэн тойрон дахь бүх дайснуудыг өөртөө татан stun өгч, комбинацийг эхлүүлнэ.',
      iconName: 'Flame'
    }
  ],
  buildItems: [
    { name: 'Tough Boots', role: 'Roaming / Conceal', desc: 'Хурд & Тэвчээр' },
    { name: 'Dominance Ice', role: 'Mana & Anti-heal', desc: 'Эсрэг баг цохиход удаашруулна' },
    { name: 'Immortality', role: 'Second Life', desc: 'Үхсэний дараа амилах бамбай' },
    { name: 'Athena\'s Shield', role: 'Magic Defense', desc: 'Ид шидийн хохирлыг бууруулна' },
    { name: 'Antique Cuirass', role: 'Physical Defense', desc: 'Физик довтолгоог бууруулна' },
  ],
  quotes: [
    "A real warrior never retreats!",
    "A shield for the defenseless!",
    "For the Moniyan Empire!",
    "Never fear, Tigreal is here!"
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Анар (Багийн ахлагч)',
    role: 'Волейболын багийн анд',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'Содбилэг талбай дээр гарахаараа багийн уур амьсгалыг үнэхээр сэргээдэг. Бөмбөг өгөхөд ямагт бэлэн байдаг ба оновчтой цохидог!',
    rating: 5
  },
  {
    id: '2',
    name: 'Бат-Эрдэнэ',
    role: 'Ангийн найз',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Mxrning Star-ын шинэ дуу гарах болгонд Содбилэг хамгийн эхэнд санал болгодог. Хөгжмийн мэдрэмж нь үнэхээр гоё!',
    rating: 5
  },
  {
    id: '3',
    name: 'Тэмүүлэн',
    role: 'Аниме сонирхогч найз',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    comment: 'Demon Slayer-ийн Рэнгокугийн тулааныг бидэнтэй хамт дахин дахин үзэж ярилцах үнэхээр сонирхолтой байдаг.',
    rating: 5
  }
];
