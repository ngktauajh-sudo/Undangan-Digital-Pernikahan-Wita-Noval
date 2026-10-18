import React from 'react';
import { Home, Users, Calendar, BookOpen, Image as ImageIcon, Gift, MessageSquareHeart } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'hero', label: 'Sampul', icon: Home },
    { id: 'mempelai', label: 'Mempelai', icon: Users },
    { id: 'acara', label: 'Acara', icon: Calendar },
    { id: 'cerita', label: 'Cerita', icon: BookOpen },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'amplop', label: 'Amplop', icon: Gift },
    { id: 'ucapan', label: 'Ucapan', icon: MessageSquareHeart },
  ];

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[#1b130ce6]/95 border border-[#d4af37]/40 shadow-2xl backdrop-blur-lg max-w-full overflow-x-auto no-scrollbar gold-glow-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[62px] py-1 px-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-[#d4af37]/30 to-[#9a7522]/20 text-[#f5df9e] font-medium'
                  : 'text-[#eedbb4]/70 hover:text-[#f5df9e] hover:bg-white/5'
              }`}
              aria-label={`Buka bagian ${item.label}`}
            >
              <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform ${isActive ? 'scale-110 text-[#f5df9e]' : ''}`} />
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
