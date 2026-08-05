import { Track, BreathingStyle, Testimonial, StatItem, HobbyCard, YoutubeTopic } from '../types';

export const PERSONAL_INFO = {
  name: 'Содбилэг',
  surname: 'Т.',
  age: 13,
  title: 'Залуу тамирчин, MLBB Tigreal Танк, гитарчин & Michael Jackson, YT сонирхогч',
  tagline: 'Волейболын талбайн энерги, MLBB Tigreal-ийн хамгаалалт, Гитар & Michael Jackson, Mxrning Star-ын аялгуу, "Гэж Юу Вэ?" YT суваг, Demon Slayer-ийн зориг тэвчээр.',
  location: 'Улаанбаатар, Монгол',
  aboutBrief: 'Би 13 настай. Волейболын спортоор хичээллэхийн зэрэгцээ гитар тоглодог. Mobile Legends (MLBB) тоглоомд Tigreal баатрыг голлон тоглодог. Чөлөөт цагаараа Michael Jackson (Billie Jean, Beat It, Chicago), Mxrning Star, The Lemons-ийн дуунуудыг сонсож, "Гэж Юу Вэ?" YouTube сувгийг шимтэн үзэж, Demon Slayer аниме үздэг.',
  email: 'tamirsodbileg766@gmail.com',
  phone: '+976 8081 5800',
  socials: {
    instagram: '@t.sdblg2',
    facebook: 't.sdblg2',
    tiktok: '@t.sdblg2',
  }
};

export const HOBBIES: HobbyCard[] = [
  {
    id: 'volleyball',
    title: 'Волейбол',
    subtitle: 'Багийн ажиллагаа & Адреналин',
    description: 'Бөмбөг газар унах хүртэл тэмцэх нь миний хамгийн дуртай мэдрэмж. Хүчтэй довтолгоо, оновчтой дамжуулалт хийхэд анхаардаг.',
    icon: 'Volleyball',
    badge: 'Талбайн довтлогч',
    color: 'from-black via-zinc-800 to-zinc-900'
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends: Tigreal',
    subtitle: 'MLBB Main Tank & Initiator',
    description: 'Tigreal бол миний хамгийн дуртай MLBB баатар. Flicker + Ultimate (Implosion) комбинациар тоглолтыг эргүүлэн багаа ялалтад хүргэх дуртай.',
    icon: 'Shield',
    badge: 'Tigreal Main Tank',
    color: 'from-[#111111] via-zinc-900 to-[#1e1e1e]'
  },
  {
    id: 'music',
    title: 'Хөгжим & Гитар',
    subtitle: 'Michael Jackson, Mxrning Star, Lemons',
    description: 'Гитар тоглох дуртай! Michael Jackson-ийн "Billie Jean", "Beat It", "Chicago" дуунууд болон Mxrning Star, The Lemons-ийн хэмнэлүүд намайг үргэлж цэнэглэдэг.',
    icon: 'Music',
    badge: 'Гитарчин & 24/7 Вайб',
    color: 'from-[#111111] via-zinc-800 to-black'
  },
  {
    id: 'anime',
    title: 'Demon Slayer & YouTube',
    subtitle: 'Кимэцү но Яайба & "Гэж Юу Вэ?"',
    description: 'Demon Slayer анимегийн Ничирин сэлэмний тулаан ба Танжирогийн тэвчээр, мөн дуртай "Гэж Юу Вэ?" YouTube суваг маань танин мэдэхүйн ертөнцөд хөтөлдөг.',
    icon: 'Flame',
    badge: 'Demon Slayer & YT Fan',
    color: 'from-zinc-900 via-neutral-900 to-black'
  }
];

export const TRACKS: Track[] = [
  {
    id: 'mj-1',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller (1982)',
    duration: '4:54',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Michael Jackson — Pop / Dance Legend',
    lyricsSnippet: '“Billie Jean is not my lover, she\'s just a girl who claims that I am the one...”'
  },
  {
    id: 'mj-2',
    title: 'Beat It',
    artist: 'Michael Jackson',
    album: 'Thriller (1982)',
    duration: '4:18',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Michael Jackson — Rock / Pop Solo Guitar Solo',
    lyricsSnippet: '“Just beat it, beat it, no one wants to be defeated...”'
  },
  {
    id: 'mj-3',
    title: 'Chicago',
    artist: 'Michael Jackson',
    album: 'Xscape (2014)',
    duration: '4:05',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Michael Jackson — Smooth Contemporary R&B',
    lyricsSnippet: '“I met her on the way to Chicago, where she was going to meet her guy...”'
  },
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
    color: 'from-black via-zinc-800 to-zinc-900',
    glowColor: 'rgba(255, 255, 255, 0.5)',
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
    color: 'from-zinc-900 via-zinc-800 to-black',
    glowColor: 'rgba(200, 200, 200, 0.5)',
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
    color: 'from-black via-zinc-900 to-neutral-800',
    glowColor: 'rgba(255, 255, 255, 0.4)',
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

export const GEJ_YU_VE_TOPICS: YoutubeTopic[] = [
  {
    id: 'nuclear-bomb',
    title: 'Цөмийн бөмбөг хэрхэн ажилладаг вэ?',
    subtitle: 'Атомын задрал & Гинжин реакцын физик',
    category: 'Физик & Технологи',
    iconName: 'Atom',
    summary: 'Уран-235 ба Плутони-239 атомын цөм нейтроноор бөмбөгдүүлж задрах үед асар их дулаан, цацраг туяа болон гинжин реакц үүсдэг. Энэ бол шинжлэх ухааны хамгийн сэтгэл хөдөлгөм бөгөөд аюултай үзэгдлүүдийн нэг юм.',
    keyFacts: [
      'Уран-235 атомын цөм нейтрон шингээж 2 жижиг цөмд задардаг (Nuclear Fission)',
      'Миллисекундэд сая сая дахин үржих гинжин реакц (Chain Reaction)',
      'Эйнштейний E = mc² томьёогоор өчүүхэн масс асар их энергид хувирдаг'
    ],
    visualTag: '⚛️ Цөмийн Физик',
    detailsMn: 'Содбилэгийн "Гэж Юу Вэ?" сувгаас үзэж сонирхсон хамгийн сэтгэл хөдөлгөм сэдвүүдийн нэг. Атомын задрал болон термоцөмийн синтез хэрхэн явагддаг тухай шинжлэх ухааны мэдлэг.'
  },
  {
    id: 'astronomy',
    title: 'Одон орон ба Сансар огторгуйн нууцууд',
    subtitle: 'Хар нүх, Галактикууд, Нарны аймаг ба Одод',
    category: 'Астрономи & Физик',
    iconName: 'Sparkles',
    summary: 'Тэрбум тэрбум гэрлийн жилийн зайд орших Хар нүх, Галактикууд, Нарны аймаг болон Орчлон ертөнцийн нууцлаг үзэгдлүүдийн тухай сонирхолтой танин мэдэхүй.',
    keyFacts: [
      'Хар нүхний (Black Hole) асар их таталцлын хүчнээс гэрэл ч зугтаж чадахгүй',
      'Манай Сүүн зам (Milky Way) галактикт 100-400 тэрбум од оршин байдаг',
      'Гэрлийн хурдаар (300,000 км/сек) аялахад ч Орчлон ертөнц хязгааргүй уудам'
    ],
    visualTag: '🌌 Одон Орон Судлал',
    detailsMn: 'Одон орон ба астрономи бол Содбилэгийн сонирхдог гол танин мэдэхүйн ертөнц. Нарны аймгийн гаригууд, Жеймс Уэбб телескоп болон супернова оддын мөхлийн тухай видеонууд.'
  },
  {
    id: 'yt-channel',
    title: '"Гэж Юу Вэ?" YouTube Суваг',
    category: 'Танин Медэхүй & Шинжлэх ухаан',
    subtitle: 'Мэдлэгийн царааг тэлэх танин мэдэхүйн суваг',
    iconName: 'Youtube',
    summary: 'Монголын хамгийн сонирхолтой "Гэж Юу Вэ?" YouTube суваг нь нийгэм, шинжлэх ухаан, түүх, технологийн нарийн төвөгтэй сэдвүүдийг маш ойлгомжтой бөгөөд сонирхолтой тайлбарладаг.',
    keyFacts: [
      'Хамгийн сонирхолтой асуултуудад шинжлэх ухааны үндэстэй хариулт өгдөг',
      'Анимейшн & бодит баримт дээр суурилсан үзүүлэн тайлбарууд',
      'Содбилэгийн чөлөөт цагаараа шимтэн үздэг №1 YouTube суваг'
    ],
    visualTag: '📺 YT "Гэж Юу Вэ?"',
    detailsMn: '13 настай Содбилэгийн хувьд асуулт асууж, юмсын учир шалтгааныг олж мэдэх дуртай. "Гэж Юу Вэ?" суваг нь түүний мэдлэгийн царааг тэлж өгдөг.'
  }
];
