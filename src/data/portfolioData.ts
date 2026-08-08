import { Track, BreathingStyle, Testimonial, StatItem, HobbyCard, YoutubeTopic } from '../types';

export const PERSONAL_INFO = {
  name: 'Содбилэг',
  surname: 'Т.',
  age: 13,
  title: 'MLBB (Mobile Legends) Gamer, Tigreal Танк, Гитарчин & Michael Jackson, YT сонирхогч',
  tagline: 'Mobile Legends (MLBB) тоглох, Tigreal-ийн бамбай ба хамгаалалт, Гитар & Michael Jackson, Mxrning Star-ын аялгуу, "Гэж Юу Вэ?" YT суваг, Demon Slayer-ийн зориг тэвчээр.',
  location: 'Улаанбаатар, Монгол',
  aboutBrief: 'Би 13 настай. Миний хамгийн том хобби бол Mobile Legends (MLBB) тоглох бөгөөд Tigreal баатрыг голлон тоглодог. Түүнчлэн гитар тоглож, Michael Jackson (Billie Jean, Beat It, Chicago), Mxrning Star, The Lemons-ийн дуунуудыг сонсож, "Гэж Юу Вэ?" YouTube суваг, Demon Slayer аниме үздэг.',
  email: 'sodbileg@gmail.com',
  phone: '80816767',
  socials: {
    instagram: '@sodbileg',
    facebook: 'sodbileg',
    tiktok: '@sodbileg',
  }
};

export const HOBBIES: HobbyCard[] = [
  {
    id: 'volleyball',
    title: '3D Волейбол',
    subtitle: 'Багийн ажиллагаа & 3D Тэмцээн',
    description: 'Бөмбөг газар унах хүртэл тэмцэх нь миний дуртай спортын мэдрэмж. 3D талбайд олуулаа болон 2P тоглох боломжтой!',
    icon: 'Trophy',
    badge: 'Volleyball Player',
    color: 'from-[#111111] via-zinc-900 to-black'
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends (MLBB)',
    subtitle: 'Гейминг & Багийн Стратеги',
    description: 'Mobile Legends тоглох нь миний хамгийн дуртай хобби! Багаараа тактик зохиож, ялалт байгуулах нь асар их энерги өгдөг.',
    icon: 'Shield',
    badge: 'MLBB Gamer',
    color: 'from-black via-zinc-800 to-zinc-900'
  },
  {
    id: 'tigreal',
    title: 'Tigreal Main Tank',
    subtitle: 'MLBB Initiator & Combo Master',
    description: 'Tigreal баатар дээр Flicker + Implosion комбинаци хийж, эсрэг багийг барьж багаа ялалтад хүргэх дуртай.',
    icon: 'Shield',
    badge: '53.1% Winrate',
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
    lyricsSnippet: '“Billie Jean is not my lover, she\'s just a girl who claims that I am the one...”',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=funky-disco-112117.mp3',
    youtubeId: 'Zi_XLOBDo_Y',
    fullLyrics: `[Verse 1]
She was more like a beauty queen from a movie scene
I said don't mind, but what do you mean, I am the one
Who will dance on the floor in the round?
She said I am the one, who will dance on the floor in the round

[Verse 2]
She told me her name was Billie Jean, as she caused a scene
Then every head turned with eyes that dreamed of being the one
Who will dance on the floor in the round

[Pre-Chorus]
People always told me be careful of what you do
And don't go around breaking young girls' hearts
And mother always told me be careful of who you love
And be careful of what you do 'cause the lie becomes the truth

[Chorus]
Billie Jean is not my lover
She's just a girl who claims that I am the one
But the kid is not my son
She says I am the one, but the kid is not my son

[Verse 3]
For forty days and forty nights, The law was on her side
But who can stand when she's in demand, Her schemes and plans
'Cause we danced on the floor in the round
So take my strong advice, just remember to always think twice`,
    timedLyrics: [
      { time: 0, section: 'Intro', text: '🎵 [Хөгжмийн аялгуу эхэлж байна - Drum & Bass Intro]' },
      { time: 29, section: 'Verse 1', text: 'She was more like a beauty queen from a movie scene' },
      { time: 35, section: 'Verse 1', text: 'I said don\'t mind, but what do you mean, I am the one' },
      { time: 41, section: 'Verse 1', text: 'Who will dance on the floor in the round?' },
      { time: 47, section: 'Verse 1', text: 'She said I am the one, who will dance on the floor in the round' },
      { time: 54, section: 'Verse 2', text: 'She told me her name was Billie Jean, as she caused a scene' },
      { time: 60, section: 'Verse 2', text: 'Then every head turned with eyes that dreamed of being the one' },
      { time: 66, section: 'Verse 2', text: 'Who will dance on the floor in the round' },
      { time: 73, section: 'Pre-Chorus', text: 'People always told me be careful of what you do' },
      { time: 79, section: 'Pre-Chorus', text: 'And don\'t go around breaking young girls\' hearts' },
      { time: 85, section: 'Pre-Chorus', text: 'And mother always told me be careful of who you love' },
      { time: 91, section: 'Pre-Chorus', text: 'And be careful of what you do \'cause the lie becomes the truth' },
      { time: 98, section: 'Chorus', text: 'Billie Jean is not my lover' },
      { time: 104, section: 'Chorus', text: 'She\'s just a girl who claims that I am the one' },
      { time: 110, section: 'Chorus', text: 'But the kid is not my son' },
      { time: 116, section: 'Chorus', text: 'She says I am the one, but the kid is not my son' },
      { time: 123, section: 'Verse 3', text: 'For forty days and forty nights, The law was on her side' },
      { time: 130, section: 'Verse 3', text: 'But who can stand when she\'s in demand, Her schemes and plans' },
      { time: 136, section: 'Verse 3', text: '\'Cause we danced on the floor in the round' },
      { time: 142, section: 'Verse 3', text: 'So take my strong advice, just remember to always think twice' },
      { time: 148, section: 'Pre-Chorus', text: 'She told my baby we\'d danced \'til three, then she looked at me' },
      { time: 154, section: 'Pre-Chorus', text: 'Then showed a photo my baby cried, his eyes were like mine' },
      { time: 160, section: 'Pre-Chorus', text: '\'Cause we danced on the floor in the round, baby' },
      { time: 167, section: 'Pre-Chorus', text: 'People always told me be careful of what you do' },
      { time: 173, section: 'Pre-Chorus', text: 'And don\'t go around breaking young girls\' hearts' },
      { time: 179, section: 'Chorus', text: 'Billie Jean is not my lover' },
      { time: 185, section: 'Chorus', text: 'She\'s just a girl who claims that I am the one' },
      { time: 191, section: 'Chorus', text: 'But the kid is not my son' },
      { time: 197, section: 'Chorus', text: 'She says I am the one, but the kid is not my son' },
      { time: 205, section: 'Solo & Moonwalk', text: '🎷 [Solo / Moonwalk / Dance Solo Break]' },
      { time: 235, section: 'Chorus', text: 'Billie Jean is not my lover...' },
      { time: 255, section: 'Outro', text: 'She\'s just a girl who claims that I am the one...' },
      { time: 275, section: 'Outro', text: 'No, Billie Jean is not my lover... Hoo!' }
    ]
  },
  {
    id: 'mj-2',
    title: 'Beat It',
    artist: 'Michael Jackson',
    album: 'Thriller (1982)',
    duration: '4:18',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    vibeTag: 'Michael Jackson — Rock / Pop Guitar Solo',
    lyricsSnippet: '“Just beat it, beat it, no one wants to be defeated...”',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73223.mp3?filename=rock-guitar-riff-110241.mp3',
    youtubeId: 'oRdxUFDoQe0',
    fullLyrics: `[Verse 1]
They told him don't you ever come around here
Don't wanna see your face, you better disappear
The fire's in their eyes and their words are really clear
So beat it, just beat it

[Verse 2]
You better run, you better do what you can
Don't wanna see no blood, don't be a macho man
You wanna be tough, better do what you can
So beat it, but you wanna be bad

[Chorus]
Just beat it, beat it, beat it, beat it
No one wants to be defeated
Showin' how funky and strong is your fight
It doesn't matter who's wrong or right
Just beat it, beat it
Just beat it, beat it

[Verse 3]
They're out to get you, better leave while you can
Don't wanna be a boy, you wanna be a man
You wanna stay alive, better do what you can
So beat it, just beat it`,
    timedLyrics: [
      { time: 0, section: 'Intro', text: '🎸 [Гитарын аялгуу эхэлж байна - Gong & Rock Guitar Riff]' },
      { time: 26, section: 'Verse 1', text: 'They told him don\'t you ever come around here' },
      { time: 30, section: 'Verse 1', text: 'Don\'t wanna see your face, you better disappear' },
      { time: 34, section: 'Verse 1', text: 'The fire\'s in their eyes and their words are really clear' },
      { time: 38, section: 'Verse 1', text: 'So beat it, just beat it' },
      { time: 43, section: 'Verse 2', text: 'You better run, you better do what you can' },
      { time: 47, section: 'Verse 2', text: 'Don\'t wanna see no blood, don\'t be a macho man' },
      { time: 51, section: 'Verse 2', text: 'You wanna be tough, better do what you can' },
      { time: 55, section: 'Verse 2', text: 'So beat it, but you wanna be bad' },
      { time: 60, section: 'Chorus', text: 'Just beat it, beat it, beat it, beat it' },
      { time: 65, section: 'Chorus', text: 'No one wants to be defeated' },
      { time: 69, section: 'Chorus', text: 'Showin\' how funky and strong is your fight' },
      { time: 73, section: 'Chorus', text: 'It doesn\'t matter who\'s wrong or right' },
      { time: 77, section: 'Chorus', text: 'Just beat it, beat it' },
      { time: 82, section: 'Chorus', text: 'Just beat it, beat it' },
      { time: 88, section: 'Verse 3', text: 'They\'re out to get you, better leave while you can' },
      { time: 92, section: 'Verse 3', text: 'Don\'t wanna be a boy, you wanna be a man' },
      { time: 96, section: 'Verse 3', text: 'You wanna stay alive, better do what you can' },
      { time: 100, section: 'Verse 3', text: 'So beat it, just beat it' },
      { time: 105, section: 'Chorus', text: 'Just beat it, beat it, beat it, beat it' },
      { time: 110, section: 'Chorus', text: 'No one wants to be defeated' },
      { time: 114, section: 'Chorus', text: 'Showin\' how funky and strong is your fight' },
      { time: 118, section: 'Chorus', text: 'It doesn\'t matter who\'s wrong or right' },
      { time: 122, section: 'Solo', text: '🎸 [Eddie Van Halen — Electric Guitar Solo]' },
      { time: 160, section: 'Chorus', text: 'Beat it, beat it, beat it, beat it' },
      { time: 165, section: 'Chorus', text: 'No one wants to be defeated' },
      { time: 170, section: 'Chorus', text: 'Showin\' how funky and strong is your fight' },
      { time: 175, section: 'Outro', text: 'It doesn\'t matter who\'s wrong or right... Just beat it!' }
    ]
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
    description: 'Сургуулийн сурагч & MLBB геймер',
    iconName: 'User'
  },
  {
    id: '2',
    label: 'MLBB Тоглолт',
    value: '850+',
    description: 'Tigreal баатрыг голлон тоглосон тэмцээн ба ялалтууд',
    iconName: 'Shield'
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
    name: 'Анар (MLBB Squad)',
    role: 'MLBB багийн анд',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'Содбилэг Mobile Legends тоглоход Tigreal-аараа маш сайн хамгаалж, Flicker + Implosion комбогоор багийг үргэлж хожиход тусалдаг!',
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
    youtubeEmbedId: 'e-P5IFTqB98',
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
    youtubeEmbedId: '2ePf9rue1Ao',
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
