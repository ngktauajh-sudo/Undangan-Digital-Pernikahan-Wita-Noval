import React, { useState, useEffect } from 'react';
import { INITIAL_WEDDING_DATA, INITIAL_WISHES } from './data/defaultWeddingData';
import { getGuestNameFromUrl, addWish } from './utils/invitation';
import { CoverScreen } from './components/CoverScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { BottomNav } from './components/BottomNav';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { JavaneseBlessing } from './components/JavaneseBlessing';
import { FooterSection } from './components/FooterSection';
import { EditorModal } from './components/EditorModal';
import { ShareModal } from './components/ShareModal';
import { AdminModal } from './components/AdminModal';
import { Camera, ShieldCheck, Share2 } from 'lucide-react';
import type { WeddingData, GuestWish } from './types/wedding';

const STORAGE_KEY_DATA = 'wedding_data_custom_v3';
const STORAGE_KEY_WISHES = 'wedding_wishes_custom_v1';

export default function App() {
  // Read query parameters
  const [guestName, setGuestName] = useState<string>('Merta Silviana');
  const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [editRole, setEditRole] = useState<'bride' | 'groom' | null>(null);
  const [editorTab, setEditorTab] = useState<'couple' | 'gallery' | 'event' | 'gift'>('couple');

  // Wedding data with localStorage persistence
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_WEDDING_DATA;
  });

  // Guest wishes with localStorage persistence
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(getGuestNameFromUrl(toParam, 'Merta Silviana'));
    }

    // autostart support for automated tests or skipping cover
    if (params.get('autostart') === '1') {
      setIsInvitationOpen(true);
      setIsAudioPlaying(false);
    }
  }, []);

  // Save changes to localStorage
  const handleSaveWeddingData = (newData: WeddingData) => {
    setWeddingData(newData);
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(newData));
    } catch (err) {
      console.warn('Failed to save wedding data to localStorage:', err);
    }
  };

  const handleResetWeddingData = () => {
    if (window.confirm('Kembalikan semua data dan foto ke setelan awal?')) {
      setWeddingData(INITIAL_WEDDING_DATA);
      setWishes(INITIAL_WISHES);
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_WISHES);
      setIsEditorOpen(false);
    }
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsAudioPlaying(true);
  };

  const handleToggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const handleOpenCalendar = () => {
    // Selasa, 17 November 2026 (WIB is UTC+7) -> 08.00 WIB is 01.00 UTC, 21.00 WIB is 14.00 UTC
    const startDate = '20261117T010000Z';
    const endDate = '20261117T140000Z';
    const title = encodeURIComponent(`Pernikahan ${weddingData.bride.shortName} & ${weddingData.groom.shortName}`);
    const details = encodeURIComponent(
      `Pernikahan adat Jawa ${weddingData.bride.fullName} & ${weddingData.groom.fullName}. Lokasi: ${weddingData.events.akad.locationName}, ${weddingData.events.akad.address}. Info lengkap: ${window.location.href}`
    );
    const location = encodeURIComponent(
      `${weddingData.events.akad.locationName}, ${weddingData.events.akad.address}`
    );
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  const handleOpenEditPhoto = (role: 'bride' | 'groom') => {
    setEditRole(role);
    setEditorTab('couple');
    setIsEditorOpen(true);
  };

  const handleOpenManageGallery = () => {
    setEditRole(null);
    setEditorTab('gallery');
    setIsEditorOpen(true);
  };

  const handleOpenGeneralEditor = (tab: 'couple' | 'gallery' | 'event' | 'gift' = 'couple') => {
    setEditRole(null);
    setEditorTab(tab);
    setIsEditorOpen(true);
  };

  const handleSubmitWish = (newWish: {
    name: string;
    phone?: string;
    status: 'hadir' | 'tidak' | 'ragu';
    guestCount: number;
    message: string;
  }) => {
    const updated = addWish(wishes, newWish);
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteWish = (id: string) => {
    const updated = wishes.filter((w) => w.id !== id);
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLikeWish = (wishId: string) => {
    const updated = wishes.map((w) =>
      w.id === wishId ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'mempelai', 'acara', 'cerita', 'galeri', 'amplop', 'ucapan'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#16100b] text-[#f7f3eb] font-sans antialiased selection:bg-[#d4af37] selection:text-[#16100b]">
      {/* Cover Modal Screen */}
      <CoverScreen
        brideName={weddingData.bride.shortName}
        groomName={weddingData.groom.shortName}
        guestName={guestName}
        dateStr={weddingData.events.akad.dateStr}
        isOpen={isInvitationOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Floating Audio Player */}
      {isInvitationOpen && (
        <AudioPlayer
          isPlaying={isAudioPlaying}
          onToggle={handleToggleAudio}
          audioUrl={weddingData.music.audioUrl}
          songTitle={weddingData.music.title}
        />
      )}

      {/* Floating Quick Actions: Edit Foto & Admin Buku Tamu */}
      {isInvitationOpen && (
        <div className="fixed top-5 left-5 z-40 flex items-center gap-2">
          <button
            onClick={() => handleOpenGeneralEditor('couple')}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#20150ee6] hover:bg-[#d4af37] text-[#f5df9e] hover:text-[#181109] border border-[#d4af37]/60 shadow-xl backdrop-blur-md text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer gold-glow-sm"
            title="Edit Foto Mempelai & Isi Undangan"
            aria-label="Edit Undangan & Foto Mempelai"
          >
            <Camera className="w-4 h-4 text-[#d4af37] group-hover:text-[#181109]" />
            <span className="hidden sm:inline">Edit Foto &amp; Undangan</span>
            <span className="sm:hidden">Edit</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#20150ee6] hover:bg-[#a67130] text-[#eedbb4] hover:text-white border border-[#d4af37]/40 shadow-xl backdrop-blur-md text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title="Rekap Konfirmasi Tamu & Buku Tamu (Admin)"
            aria-label="Buku Tamu Admin"
          >
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden sm:inline">Buku Tamu Admin</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>
      )}

      {/* Main Wedding Content Container */}
      <main className="relative z-10 max-w-4xl mx-auto shadow-2xl bg-[#18110a] border-x border-[#d4af37]/25">
        {/* Hero Section */}
        <HeroSection
          weddingData={weddingData}
          onOpenCalendar={handleOpenCalendar}
        />

        {/* Mempelai Section */}
        <CoupleSection
          bride={weddingData.bride}
          groom={weddingData.groom}
          onEditPhoto={handleOpenEditPhoto}
        />

        {/* Acara Section */}
        <EventSection
          akad={weddingData.events.akad}
          resepsi={weddingData.events.resepsi}
        />

        {/* Kisah Cerita Section */}
        <StorySection stories={weddingData.stories} />

        {/* Galeri Prewedding Section */}
        <GallerySection
          gallery={weddingData.gallery}
          onOpenManageGallery={handleOpenManageGallery}
        />

        {/* Amplop & Tanda Kasih Section */}
        <GiftSection
          bankAccounts={weddingData.bankAccounts}
          physicalGift={weddingData.physicalGift}
        />

        {/* RSVP & Buku Tamu Section */}
        <RsvpSection
          initialGuestName={guestName}
          wishes={wishes}
          ownerEmail={weddingData.ownerEmail}
          onSubmitWish={handleSubmitWish}
          onLikeWish={handleLikeWish}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Doa Adat Jawa & Restu */}
        <JavaneseBlessing />

        {/* Footer */}
        <FooterSection
          onBackToTop={handleBackToTop}
          onOpenShareModal={() => setIsShareOpen(true)}
          onOpenEditor={() => handleOpenGeneralEditor('couple')}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Bottom Floating Navigation Dock */}
      {isInvitationOpen && (
        <BottomNav
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Editor & Photo Customization Modal */}
      <EditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        weddingData={weddingData}
        onSaveData={handleSaveWeddingData}
        onResetData={handleResetWeddingData}
        initialRole={editRole}
        initialTab={editorTab}
      />

      {/* Share / Generate Link Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        brideName={weddingData.bride.shortName}
        groomName={weddingData.groom.shortName}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        wishes={wishes}
        ownerEmail={weddingData.ownerEmail}
        onDeleteWish={handleDeleteWish}
        onAddManualWish={(newW) => {
          handleSubmitWish(newW);
        }}
      />
    </div>
  );
}
