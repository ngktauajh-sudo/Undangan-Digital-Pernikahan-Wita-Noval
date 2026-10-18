import type { WeddingData, GuestWish } from '../types/wedding';

const VENUE_ADDRESS = 'Jl. Raya Klaten, Desa Klaten RT/RW 004/002 Kec. Gading Rejo, Kab. Pringsewu Prov. Lampung';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`;
const GOOGLE_MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent('Jl. Raya Klaten, Desa Klaten, Kec. Gading Rejo, Kab. Pringsewu, Lampung')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const INITIAL_WEDDING_DATA: WeddingData = {
  title: 'The Wedding of Wita & Noval',
  hashtag: '#WitaNovalSatuHati',
  ownerEmail: 'ngktauajh@gmail.com',
  venueLocationSummary: 'Desa Klaten, Kec. Gading Rejo, Kab. Pringsewu, Lampung',
  countdownTarget: '2026-11-17T08:00:00',
  bride: {
    fullName: 'Wita Mayasari',
    shortName: 'Wita',
    title: 'Mempelai Wanita',
    childOrderText: 'Putri pertama dari Pasangan',
    fatherName: 'Bapak Poniram',
    motherName: 'Ibu Purwaningsih',
    photoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    bio: 'Pemberian terindah dari Sang Pencipta, siap melangkah menyempurnakan separuh agama dalam ikatan suci pernikahan adat Jawa.',
  },
  groom: {
    fullName: 'Noval Bagus Ramadhan',
    shortName: 'Noval',
    title: 'Mempelai Pria',
    childOrderText: 'Putra ketiga dari Pasangan',
    fatherName: 'Bapak Agus Setiono',
    motherName: 'Ibu Sukaesih',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Lelaki yang bertekad menjadi nahkoda keluarga yang sakinah, mawaddah, warahmah berlandaskan cinta dan restu orang tua.',
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      javaneseSubtitle: 'Prosesi Ijab Qabul & Pasrah Tampi',
      dateStr: 'Selasa, 17 November 2026',
      isoDate: '2026-11-17T08:00:00',
      timeStr: 'Pukul 08.00 - 10.00 WIB',
      locationName: 'Kediaman Mempelai Wanita',
      address: VENUE_ADDRESS,
      mapsUrl: GOOGLE_MAPS_URL,
      embedMapUrl: GOOGLE_MAPS_EMBED,
      note: 'Diharapkan para saksi dan keluarga inti telah rawuh 15 menit sebelum prosesi ijab qabul dimulai dengan khidmat.',
      rundown: [
        { time: '08.00 - 08.30 WIB', event: 'Pasrah Tampi & Penyerahan Ubarampe Seserahan Adat Jawa', description: 'Rombongan keluarga calon mempelai pria disambut hangat oleh keluarga calon mempelai wanita.' },
        { time: '08.30 - 09.30 WIB', event: 'Ijab Qabul & Doa Sakral Akad Nikah', description: 'Pengucapan ikrar suci pernikahan di hadapan penghulu KUA dan para saksi.' },
        { time: '09.30 - 10.00 WIB', event: 'Penyerahan Mahar, Tukar Cincin & Doa Bersama', description: 'Penyerahan mahar pernikahan dan penandatanganan dokumen nikah resmi.' },
      ],
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      javaneseSubtitle: 'Pahargyan Ageng & Kirab Temanten',
      dateStr: 'Selasa, 17 November 2026',
      isoDate: '2026-11-17T11:00:00',
      timeStr: 'Sesi I: 11.00 - 14.00 WIB | Sesi II: 18.30 - 21.00 WIB',
      locationName: 'Kediaman Mempelai Wanita',
      address: VENUE_ADDRESS,
      mapsUrl: GOOGLE_MAPS_URL,
      embedMapUrl: GOOGLE_MAPS_EMBED,
      isStreaming: true,
      streamingUrl: 'https://youtube.com',
      note: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan rawuh dan paring berkah pangestu.',
      rundown: [
        { time: '11.00 - 11.30 WIB', event: 'Upacara Adat Panggih Penganten', description: 'Prosesi adat Jawa: Balangan Gantal (Suruh), Ngidak Endhog & Wijikan, Kacar-Kucur, dan Dulangan.' },
        { time: '11.30 - 12.00 WIB', event: 'Sungkeman Dhateng Tiyang Sepuh', description: 'Kedua mempelai bersimpuh memohon berkah pangestu dan ampunan kepada kedua orang tua.' },
        { time: '12.00 - 14.00 WIB', event: 'Pahargyan, Ramah Tamah Sesi Siang & Foto Bersama', description: 'Santap siang bersama diiringi gending Jawa klasik dan pemberian ucapan selamat.' },
        { time: '18.30 - 21.00 WIB', event: 'Sesi Resepsi Malam & Jamuan Santai Sahabat', description: 'Sesi santai penuh kehangatan bersama kerabat dan sahabat kedua mempelai.' },
      ],
    },
  },
  stories: [
    {
      id: 's1',
      year: '2023',
      title: 'First Meet (2023)',
      description: 'Bulan agustus 2023 kami pertama kali bertemu dalam 1 pekerjaan. Dalam masa itu kami hanya teman biasa.',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 's2',
      year: '2024 - 2025',
      title: 'Relationship (2024 - 2025)',
      description: '25 Februari 2024 kami mengikat janji sebagai sepasang kekasih.',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 's3',
      year: '2026',
      title: 'Engagement (2026)',
      description: 'Lika-liku hubungan kami lalui bersama hingga kami memutuskan untuk bertunangan pada 25 Februari 2026.',
      imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 's4',
      year: '2026',
      title: 'Married (2026)',
      description: 'Kami memutuskan untuk mengikat janji suci pernikahan pada 17 November 2026.',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
  ],
  gallery: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
      caption: 'Pesona Anggun Kebaya Brokat Jawa Klasik & Sanggul Solo',
      category: 'adat',
      likes: 24,
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      caption: 'Genggaman Kasih di Bawah Gapura Pendopo Jawa',
      category: 'prewedding',
      likes: 18,
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80',
      caption: 'Cincin Emas Pengikat Dua Jiwa dan Restu Orang Tua',
      category: 'momen',
      likes: 31,
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      caption: 'Momen Penuh Senyum Menatap Masa Depan Bersama',
      category: 'prewedding',
      likes: 19,
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80',
      caption: 'Kidung Asmara di Pelataran Alam Nuansa Senja',
      category: 'prewedding',
      likes: 15,
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80',
      caption: 'Rangkaian Bunga Melati Suci & Janur Kuning Penanda Berkah',
      category: 'adat',
      likes: 28,
    },
  ],
  bankAccounts: [
    {
      id: 'b1',
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8935028471',
      accountHolder: 'WITA MAYASARI',
      logoType: 'bca',
    },
    {
      id: 'b2',
      bankName: 'Bank Mandiri',
      accountNumber: '1370019284752',
      accountHolder: 'NOVAL BAGUS RAMADHAN',
      logoType: 'mandiri',
    },
  ],
  physicalGift: {
    recipientName: 'Wita Mayasari & Noval Bagus Ramadhan',
    phone: '0882-76615025',
    fullAddress: VENUE_ADDRESS,
    postalCode: '35372',
  },
  music: {
    title: 'Gending Jawa & Instrumental Romantic',
    artist: 'Alunan Kasmaran Tradisional',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-acoustic-112191.mp3',
  },
};

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w-1',
    name: 'Merta Silviana',
    phone: '081399887766',
    status: 'hadir',
    guestCount: 2,
    message: 'Barakallahu lakum wa baraka alaikum wa jamaa bainakuma fii khoir. Selamat ya Mbak Wita Mayasari & Mas Noval Bagus! Semoga langgeng sampai kakek nenek, sakinah mawaddah warahmah!',
    createdAt: '15 menit yang lalu',
    likes: 5,
  },
  {
    id: 'w-2',
    name: 'Dimas Prasetyo & Keluarga',
    phone: '081288776655',
    status: 'hadir',
    guestCount: 2,
    message: 'Nderek mangayubagyo kagem Mbak Wita kaliyan Mas Noval. Mugi-mugi tansah pinaringan kabagyan, tentrem ayem, lan dipun paringi momongan ingkang sholeh lan sholehah. Amin ya rabbal alamin.',
    createdAt: '1 jam yang lalu',
    likes: 8,
  },
  {
    id: 'w-3',
    name: 'Anisa Rahmawati (Sahabat SMA)',
    phone: '085711223344',
    status: 'hadir',
    guestCount: 1,
    message: 'Masya Allah cantiknya sahabatku Wita! Akhirnya hari bahagia ini tiba juga pada 17 November 2026. Lancar sampai hari H di Klaten Pringsewu yaa sayang, insya Allah pasti hadir!',
    createdAt: '3 jam yang lalu',
    likes: 12,
  },
  {
    id: 'w-4',
    name: 'Bpk. Hendro & Rekan Kerja',
    phone: '082133445566',
    status: 'ragu',
    guestCount: 1,
    message: 'Selamat menempuh hidup baru Mas Noval & Mbak Wita. Mohon doa restunya dari kami, diusahakan sekali bisa hadir di kediaman mempelai wanita. Sukses lancar acaranya!',
    createdAt: 'Kemarin',
    likes: 3,
  },
];

export const PRESET_BRIDE_PHOTOS = [
  {
    name: 'Kebaya Brokat Jawa Anggun',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nuansa Keraton Klasik',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tradisional Solo Putri',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
];

export const PRESET_GROOM_PHOTOS = [
  {
    name: 'Beskap Jawa Klasik Wibawa',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Modern Traditional Suit & Batik',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Surjan Lurik Gagah',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  },
];
