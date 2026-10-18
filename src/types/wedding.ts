export interface CouplePerson {
  fullName: string;
  shortName: string;
  title?: string;
  fatherName: string;
  motherName: string;
  photoUrl: string;
  instagram?: string;
  childOrderText: string;
  bio?: string;
}

export interface RundownItem {
  time: string;
  event: string;
  description?: string;
}

export interface WeddingEvent {
  title: string;
  javaneseSubtitle?: string;
  dateStr: string;
  isoDate: string;
  timeStr: string;
  locationName: string;
  address: string;
  mapsUrl: string;
  embedMapUrl?: string;
  rundown?: RundownItem[];
  isStreaming?: boolean;
  streamingUrl?: string;
  note?: string;
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category?: 'all' | 'prewedding' | 'adat' | 'momen';
  likes?: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoType?: 'bca' | 'mandiri' | 'bri' | 'bni' | 'qris';
  qrImageUrl?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phone: string;
  fullAddress: string;
  postalCode: string;
}

export interface GuestWish {
  id: string;
  name: string;
  phone?: string;
  status: 'hadir' | 'tidak' | 'ragu';
  guestCount: number;
  message: string;
  createdAt: string;
  likes: number;
}

export interface WeddingData {
  title: string;
  hashtag: string;
  ownerEmail: string;
  venueLocationSummary: string;
  bride: CouplePerson;
  groom: CouplePerson;
  countdownTarget: string;
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
  dresscode?: {
    description: string;
    colors: { name: string; hex: string }[];
  };
  stories: StoryMilestone[];
  gallery: GalleryPhoto[];
  bankAccounts: BankAccount[];
  physicalGift: PhysicalGiftAddress;
  music: {
    title: string;
    artist: string;
    audioUrl: string;
  };
}
