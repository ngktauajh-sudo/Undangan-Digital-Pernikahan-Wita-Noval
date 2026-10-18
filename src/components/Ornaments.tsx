import React from 'react';

/**
 * Authentic Gunungan Wayang (Tree of Life) Javanese Traditional Motif
 */
export const GununganWayang: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-24 h-36 text-[#d4af37]',
  size = 140,
}) => {
  return (
    <svg
      viewBox="0 0 160 240"
      fill="currentColor"
      className={className}
      style={{ width: size, height: (size * 3) / 2 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gununganGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcedc2" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7522" />
        </linearGradient>
      </defs>
      {/* Outer Leaf / Flame Contour */}
      <path
        d="M80 8 
           C90 35, 120 70, 135 110 
           C148 145, 150 180, 140 210 
           C130 225, 110 232, 80 232 
           C50 232, 30 225, 20 210 
           C10 180, 12 145, 25 110 
           C40 70, 70 35, 80 8 Z"
        fill="none"
        stroke="url(#gununganGold)"
        strokeWidth="2.5"
      />
      {/* Inner Decorative Arch */}
      <path
        d="M80 22 
           C88 45, 112 76, 125 112 
           C136 142, 138 172, 128 198 
           C118 212, 102 218, 80 218 
           C58 218, 42 212, 32 198 
           C22 172, 24 142, 35 112 
           C48 76, 72 45, 80 22 Z"
        fill="rgba(212, 175, 55, 0.06)"
        stroke="url(#gununganGold)"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
      {/* Gate / Gapura (Pintu Gerbang Kalpataru) */}
      <path
        d="M62 218 L62 170 Q80 152 98 170 L98 218 Z"
        fill="rgba(212, 175, 55, 0.2)"
        stroke="url(#gununganGold)"
        strokeWidth="1.8"
      />
      {/* Gate Doors */}
      <line x1="80" y1="160" x2="80" y2="218" stroke="url(#gununganGold)" strokeWidth="1.2" />
      {/* Central Trunk / Pohon Hayat */}
      <path
        d="M80 8 L80 155"
        stroke="url(#gununganGold)"
        strokeWidth="2"
      />
      {/* Intricate Branches & Leaves */}
      <path
        d="M80 50 Q105 55 115 80 M80 50 Q55 55 45 80"
        stroke="url(#gununganGold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M80 75 Q115 85 125 115 M80 75 Q45 85 35 115"
        stroke="url(#gununganGold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M80 105 Q120 120 128 150 M80 105 Q40 120 32 150"
        stroke="url(#gununganGold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M80 135 Q115 150 122 175 M80 135 Q45 150 38 175"
        stroke="url(#gununganGold)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Sacred Birds / Garuda Motif Wings */}
      <circle cx="80" cy="95" r="7" fill="none" stroke="url(#gununganGold)" strokeWidth="1.5" />
      <circle cx="80" cy="95" r="3" fill="url(#gununganGold)" />
      {/* Finial / Crown on Top */}
      <polygon points="80,2 84,10 76,10" fill="url(#gununganGold)" />
    </svg>
  );
};

/**
 * Royal Javanese Floral Divider
 */
export const FloralDivider: React.FC<{ className?: string }> = ({ className = 'my-6' }) => {
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <div className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
      <div className="flex items-center space-x-1.5 text-[#d4af37]">
        <svg className="w-3.5 h-3.5 rotate-45 fill-current" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        <svg className="w-3.5 h-3.5 rotate-45 fill-current" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      </div>
      <div className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
    </div>
  );
};

/**
 * Corner Batik Ornaments for royal frames
 */
export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = 'w-10 h-10 text-[#d4af37]/50' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-[-1]';
    }
  };

  return (
    <div className={`absolute pointer-events-none ${getTransform()} ${className}`}>
      <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M2 2 L38 2 C44 2 48 6 48 12 L48 24 M2 2 L2 38 C2 44 6 48 12 48 L24 48" strokeWidth="2" />
        <path d="M7 7 L28 7 C32 7 35 10 35 14 L35 20 M7 7 L7 28 C7 32 10 35 14 35 L20 35" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="2" cy="2" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

/**
 * Melati Flower Garland Motif
 */
export const JasmineGarland: React.FC<{ className?: string }> = ({ className = 'w-full' }) => {
  return (
    <div className={`flex justify-center items-center gap-2 overflow-hidden py-1 opacity-70 ${className}`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="text-[#f1e4c3] text-xs select-none">
          ✦ ❀ ✦
        </span>
      ))}
    </div>
  );
};
