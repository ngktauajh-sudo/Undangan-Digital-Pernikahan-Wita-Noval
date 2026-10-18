import React, { useState } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, ZoomIn, Heart, Sparkles, Image as ImageIcon, Edit3, Camera } from 'lucide-react';
import { FloralDivider, CornerOrnament } from './Ornaments';
import type { GalleryPhoto } from '../types/wedding';

interface GallerySectionProps {
  gallery: GalleryPhoto[];
  onOpenManageGallery: (photoId?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, onOpenManageGallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'adat' | 'prewedding' | 'momen'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    gallery.forEach((p) => {
      initial[p.id] = p.likes || 12;
    });
    return initial;
  });

  const filteredPhotos = gallery.filter((photo) => {
    if (selectedCategory === 'all') return true;
    return photo.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  const handleEditThisPhoto = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(null);
    onOpenManageGallery(photoId);
  };

  return (
    <section id="galeri" className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-batik-subtle opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-center mb-2">
          <ImageIcon className="w-8 h-8 text-[#d4af37]" />
        </div>
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Kenangan Indah Kasih Asmara
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          Galeri Foto Prewedding
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/80 max-w-lg mx-auto mb-8">
          Mengabadikan tiap tatap kasih, senyum tulus, dan ikrar asmara kedua mempelai Wita Mayasari &amp; Noval Bagus Ramadhan.
        </p>

        {/* Category Tabs & Manage Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Semua Foto' },
              { id: 'adat', label: 'Adat Jawa' },
              { id: 'prewedding', label: 'Prewedding' },
              { id: 'momen', label: 'Momen Indah' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#d4af37] text-[#181109] shadow-lg scale-105'
                    : 'bg-[#271d15] text-[#eedbb4]/70 hover:text-[#f5df9e] border border-[#d4af37]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenManageGallery()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#e5c158] text-[#181008] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              title="Edit foto yang ada, ganti gambar, ubah caption atau tambah foto"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Isi Galeri Foto</span>
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {filteredPhotos.map((photo, index) => {
            const likes = likesMap[photo.id] || 0;

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative h-52 sm:h-72 rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-lg cursor-pointer bg-[#201710] transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Always visible category badge */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-[#f5df9e] border border-[#d4af37]/30 uppercase tracking-wider">
                    {photo.category === 'adat' ? 'Adat Jawa' : photo.category === 'momen' ? 'Momen' : 'Prewedding'}
                  </span>
                </div>

                {/* Edit Photo Icon Button in card corner */}
                <button
                  onClick={(e) => handleEditThisPhoto(photo.id, e)}
                  className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/70 hover:bg-[#d4af37] text-[#eedbb4] hover:text-[#181008] border border-[#d4af37]/50 shadow transition-all duration-200 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
                  title="Edit foto ini"
                  aria-label="Edit foto ini"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-left">
                  <span className="text-xs sm:text-sm text-[#f5df9e] font-serif leading-tight line-clamp-2 mb-2">
                    {photo.caption}
                  </span>

                  <div className="flex items-center justify-between text-xs text-[#eedbb4]/80">
                    <span className="text-[11px] flex items-center gap-1 text-[#f5df9e]">
                      <ZoomIn className="w-3.5 h-3.5 text-[#d4af37]" /> Perbesar
                    </span>
                    <button
                      onClick={(e) => handleLike(photo.id, e)}
                      className="flex items-center gap-1 text-xs text-rose-400 hover:scale-110 transition-transform cursor-pointer"
                      title="Sukai foto ini"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500/50" />
                      <span>{likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to prompt easy editing */}
        <div className="mt-8 p-4 rounded-2xl bg-[#23180f]/90 border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2a1d13] border border-[#d4af37]/40 text-[#d4af37]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5df9e]">
                Ingin mengubah, menambah, atau menghapus foto galeri?
              </p>
              <p className="text-[11px] text-[#eedbb4]/70">
                Anda dapat mengunggah foto prewedding dari perangkat atau memasukkan URL foto kapan saja.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenManageGallery()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2e1f14] hover:bg-[#d4af37] text-[#f5df9e] hover:text-[#181109] border border-[#d4af37]/50 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Kelola Galeri Foto</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/60 text-white/90 hover:text-white border border-white/20 transition-transform hover:scale-110 cursor-pointer"
            aria-label="Tutup Galeri"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation left */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 p-2 rounded-full bg-black/60 text-white/90 hover:text-[#d4af37] border border-[#d4af37]/40 transition-transform hover:scale-110 cursor-pointer"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={filteredPhotos[selectedPhotoIndex].url}
                alt={filteredPhotos[selectedPhotoIndex].caption}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain border-2 border-[#d4af37]/60 shadow-2xl"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 w-full px-4">
              <p className="text-sm sm:text-base text-[#f5df9e] font-serif text-center sm:text-left">
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => handleEditThisPhoto(filteredPhotos[selectedPhotoIndex].id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37] text-[#181109] font-semibold text-xs transition-transform hover:scale-105 cursor-pointer shadow"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Foto Ini</span>
                </button>

                <button
                  onClick={() => handleLike(filteredPhotos[selectedPhotoIndex].id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-rose-950/60 text-rose-300 border border-rose-500/40 cursor-pointer transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  <span>{likesMap[filteredPhotos[selectedPhotoIndex].id] || 0} Suka</span>
                </button>

                <span className="text-[#eedbb4]/60">
                  {selectedPhotoIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation right */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 p-2 rounded-full bg-black/60 text-white/90 hover:text-[#d4af37] border border-[#d4af37]/40 transition-transform hover:scale-110 cursor-pointer"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
