import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Users, Calendar, Gift, Save, RotateCcw, Check, Trash2, Camera } from 'lucide-react';
import { PRESET_BRIDE_PHOTOS, PRESET_GROOM_PHOTOS } from '../data/defaultWeddingData';
import type { WeddingData, GalleryPhoto } from '../types/wedding';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
  onSaveData: (newData: WeddingData) => void;
  onResetData: () => void;
  initialRole?: 'bride' | 'groom' | null;
  initialTab?: 'couple' | 'gallery' | 'event' | 'gift';
}

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  weddingData,
  onSaveData,
  onResetData,
  initialRole = null,
  initialTab = 'couple',
}) => {
  const [activeTab, setActiveTab] = useState<'couple' | 'gallery' | 'event' | 'gift'>(
    initialTab || (initialRole ? 'couple' : 'couple')
  );
  const [formData, setFormData] = useState<WeddingData>(weddingData);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'adat' | 'prewedding' | 'momen'>('adat');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if modal reopens or props change
  useEffect(() => {
    setFormData(weddingData);
    if (initialTab) {
      setActiveTab(initialTab);
    } else if (initialRole) {
      setActiveTab('couple');
    }
  }, [weddingData, isOpen, initialTab, initialRole]);

  if (!isOpen) return null;

  // Handle local image file upload and convert to base64 Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (.jpg, .png, .webp)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        callback(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryPhoto = () => {
    if (!newGalleryUrl.trim()) {
      alert('Mohon masukkan URL foto atau unggah gambar terlebih dahulu');
      return;
    }
    const newPhoto: GalleryPhoto = {
      id: 'g-' + Date.now(),
      url: newGalleryUrl.trim(),
      caption: newGalleryCaption.trim() || 'Momen Prewedding Adat Jawa',
      category: newGalleryCategory,
      likes: 12,
    };
    setFormData({
      ...formData,
      gallery: [newPhoto, ...formData.gallery],
    });
    setNewGalleryUrl('');
    setNewGalleryCaption('');
  };

  const handleDeleteGalleryPhoto = (id: string) => {
    if (window.confirm('Hapus foto ini dari galeri?')) {
      setFormData({
        ...formData,
        gallery: formData.gallery.filter((g) => g.id !== id),
      });
    }
  };

  const handleUpdateGalleryItem = (id: string, updates: Partial<GalleryPhoto>) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#1c130d] border border-[#d4af37]/60 shadow-2xl gold-glow overflow-hidden text-left text-[#eedbb4]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#d4af37]/30 bg-[#251a11]">
          <div>
            <h3 className="font-cormorant text-2xl font-bold text-[#f7e3a1]">
              Edit Undangan &amp; Kelola Galeri Foto
            </h3>
            <p className="text-xs text-[#eedbb4]/70">
              Ubah foto kedua mempelai, isi galeri pre-wedding, waktu, dan informasi pernikahan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#d4af37]/25 bg-[#20160e] px-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'couple', label: 'Foto & Data Mempelai', icon: Users },
            { id: 'gallery', label: 'Kelola Galeri Foto', icon: ImageIcon },
            { id: 'event', label: 'Acara & Lokasi', icon: Calendar },
            { id: 'gift', label: 'Amplop & Rekening', icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#d4af37] text-[#f5df9e] bg-[#2a1d13]/60'
                    : 'border-transparent text-[#eedbb4]/60 hover:text-[#eedbb4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-400 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Perubahan berhasil disimpan dan diperbarui di undangan!</span>
            </div>
          )}

          {/* TAB 1: COUPLE PHOTO & DETAILS */}
          {activeTab === 'couple' && (
            <div className="space-y-8">
              {/* Mempelai Wanita (Bride) */}
              <div className="p-4 rounded-2xl bg-[#23180f] border border-[#d4af37]/30">
                <h4 className="font-semibold text-base text-[#f5df9e] mb-3 flex items-center gap-2">
                  <span>Mempelai Wanita: {formData.bride.fullName}</span>
                </h4>

                <div className="flex flex-col sm:flex-row gap-5 items-start mb-4">
                  {/* Photo Preview */}
                  <div className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-[#d4af37] shrink-0 bg-[#160f09] relative shadow-md">
                    <img
                      src={formData.bride.photoUrl}
                      alt="Foto Mempelai Wanita"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs text-[#eedbb4]/80 mb-1 font-medium">
                        Unggah Foto Pengantin Wanita Baru (dari HP/Laptop):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setFormData({
                              ...formData,
                              bride: { ...formData.bride, photoUrl: base64 },
                            })
                          )
                        }
                        className="text-xs text-[#eedbb4]/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-[#181109] hover:file:bg-[#e5c158] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#eedbb4]/80 mb-1">
                        Atau masukkan URL Foto:
                      </label>
                      <input
                        type="text"
                        value={formData.bride.photoUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: { ...formData.bride, photoUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      />
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="block text-[11px] text-[#eedbb4]/60 mb-1">
                        Preset Foto Adat Jawa Pilihan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_BRIDE_PHOTOS.map((preset, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, photoUrl: preset.url },
                              })
                            }
                            className="px-2 py-1 rounded-md bg-[#2d1f14] hover:bg-[#3d2a1b] border border-[#d4af37]/30 text-[10px] text-[#f5df9e] cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Lengkap Mempelai Wanita</label>
                    <input
                      type="text"
                      value={formData.bride.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fullName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      value={formData.bride.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, shortName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Ayah</label>
                    <input
                      type="text"
                      value={formData.bride.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Ibu</label>
                    <input
                      type="text"
                      value={formData.bride.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                </div>
              </div>

              {/* Mempelai Pria (Groom) */}
              <div className="p-4 rounded-2xl bg-[#23180f] border border-[#d4af37]/30">
                <h4 className="font-semibold text-base text-[#f5df9e] mb-3 flex items-center gap-2">
                  <span>Mempelai Pria: {formData.groom.fullName}</span>
                </h4>

                <div className="flex flex-col sm:flex-row gap-5 items-start mb-4">
                  {/* Photo Preview */}
                  <div className="w-32 h-44 rounded-2xl overflow-hidden border-2 border-[#d4af37] shrink-0 bg-[#160f09] relative shadow-md">
                    <img
                      src={formData.groom.photoUrl}
                      alt="Foto Mempelai Pria"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-3 flex-1 w-full">
                    <div>
                      <label className="block text-xs text-[#eedbb4]/80 mb-1 font-medium">
                        Unggah Foto Pengantin Pria Baru (dari HP/Laptop):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) =>
                            setFormData({
                              ...formData,
                              groom: { ...formData.groom, photoUrl: base64 },
                            })
                          )
                        }
                        className="text-xs text-[#eedbb4]/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-[#181109] hover:file:bg-[#e5c158] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#eedbb4]/80 mb-1">
                        Atau masukkan URL Foto:
                      </label>
                      <input
                        type="text"
                        value={formData.groom.photoUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: { ...formData.groom, photoUrl: e.target.value },
                          })
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      />
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="block text-[11px] text-[#eedbb4]/60 mb-1">
                        Preset Foto Adat Jawa Pilihan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_GROOM_PHOTOS.map((preset, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, photoUrl: preset.url },
                              })
                            }
                            className="px-2 py-1 rounded-md bg-[#2d1f14] hover:bg-[#3d2a1b] border border-[#d4af37]/30 text-[10px] text-[#f5df9e] cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Lengkap Mempelai Pria</label>
                    <input
                      type="text"
                      value={formData.groom.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fullName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Panggilan</label>
                    <input
                      type="text"
                      value={formData.groom.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, shortName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Ayah</label>
                    <input
                      type="text"
                      value={formData.groom.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Ibu</label>
                    <input
                      type="text"
                      value={formData.groom.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GALLERY PHOTOS (FULL EDITING SUITE) */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Photo Form */}
              <div className="p-4 rounded-2xl bg-[#23180f] border border-[#d4af37]/30">
                <h4 className="font-semibold text-sm text-[#f5df9e] mb-3 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#d4af37]" />
                  <span>Tambah Foto Baru ke Galeri</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#eedbb4]/80 mb-1 font-medium">
                      Unggah File Gambar (dari HP / Laptop):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (base64) => setNewGalleryUrl(base64))
                      }
                      className="text-xs text-[#eedbb4]/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-[#181109] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#eedbb4]/80 mb-1">Atau Masukkan URL Gambar:</label>
                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#eedbb4]/80 mb-1 font-medium">Kategori Foto:</label>
                      <select
                        value={newGalleryCategory}
                        onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      >
                        <option value="adat">Busana Adat Jawa</option>
                        <option value="prewedding">Prewedding Romantis</option>
                        <option value="momen">Momen Indah / Prosesi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#eedbb4]/80 mb-1 font-medium">Keterangan / Caption Foto:</label>
                      <input
                        type="text"
                        value={newGalleryCaption}
                        onChange={(e) => setNewGalleryCaption(e.target.value)}
                        placeholder="Contoh: Senyum Kasih di Pelataran Klaten"
                        className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddGalleryPhoto}
                    className="w-full py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#181109] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    + Tambahkan Foto ke Galeri
                  </button>
                </div>
              </div>

              {/* Current Photos with Inline Editing */}
              <div>
                <h5 className="font-semibold text-xs uppercase tracking-wider text-[#d4af37] mb-3">
                  Kelola &amp; Edit Foto Galeri Saat Ini ({formData.gallery.length} foto)
                </h5>

                <div className="space-y-4">
                  {formData.gallery.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-3.5 rounded-2xl bg-[#23180f] border border-[#d4af37]/30 flex flex-col sm:flex-row gap-4 items-start shadow-md"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-[#d4af37]/40 shrink-0 bg-[#160f09]">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                        <label
                          className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white cursor-pointer transition-opacity"
                          title="Ganti gambar ini"
                        >
                          <Camera className="w-4 h-4 mb-0.5" />
                          <span>Ganti</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (base64) =>
                                handleUpdateGalleryItem(photo.id, { url: base64 })
                              )
                            }
                          />
                        </label>
                      </div>

                      {/* Photo Detail Inputs */}
                      <div className="flex-1 space-y-2.5 w-full text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#f5df9e]">Foto #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGalleryPhoto(photo.id)}
                            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-xs cursor-pointer p-1 rounded hover:bg-red-950/60"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Foto</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[#eedbb4]/70 mb-1 text-[11px]">Keterangan / Caption:</label>
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) =>
                              handleUpdateGalleryItem(photo.id, { caption: e.target.value })
                            }
                            className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-[#eedbb4]/70 text-[11px] shrink-0">Kategori:</label>
                          <select
                            value={photo.category || 'adat'}
                            onChange={(e) =>
                              handleUpdateGalleryItem(photo.id, { category: e.target.value as any })
                            }
                            className="px-2.5 py-1 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                          >
                            <option value="adat">Busana Adat Jawa</option>
                            <option value="prewedding">Prewedding Romantis</option>
                            <option value="momen">Momen Indah / Prosesi</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVENT DETAILS */}
          {activeTab === 'event' && (
            <div className="space-y-6 text-xs">
              {/* Akad */}
              <div className="p-4 rounded-2xl bg-[#23180f] border border-[#d4af37]/30 space-y-3">
                <h4 className="font-semibold text-sm text-[#f5df9e]">Prosesi Akad Nikah</h4>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Hari &amp; Tanggal</label>
                  <input
                    type="text"
                    value={formData.events.akad.dateStr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          akad: { ...formData.events.akad, dateStr: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={formData.events.akad.timeStr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          akad: { ...formData.events.akad, timeStr: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Nama Tempat / Lokasi</label>
                  <input
                    type="text"
                    value={formData.events.akad.locationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          akad: { ...formData.events.akad, locationName: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Alamat Lengkap</label>
                  <textarea
                    rows={2}
                    value={formData.events.akad.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          akad: { ...formData.events.akad, address: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
              </div>

              {/* Resepsi */}
              <div className="p-4 rounded-2xl bg-[#23180f] border border-[#d4af37]/30 space-y-3">
                <h4 className="font-semibold text-sm text-[#f5df9e]">Resepsi Pernikahan</h4>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Hari &amp; Tanggal</label>
                  <input
                    type="text"
                    value={formData.events.resepsi.dateStr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          resepsi: { ...formData.events.resepsi, dateStr: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={formData.events.resepsi.timeStr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          resepsi: { ...formData.events.resepsi, timeStr: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Nama Tempat / Lokasi</label>
                  <input
                    type="text"
                    value={formData.events.resepsi.locationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          resepsi: { ...formData.events.resepsi, locationName: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Alamat Lengkap</label>
                  <textarea
                    rows={2}
                    value={formData.events.resepsi.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        events: {
                          ...formData.events,
                          resepsi: { ...formData.events.resepsi, address: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GIFT & BANK */}
          {activeTab === 'gift' && (
            <div className="space-y-4 text-xs">
              <p className="text-xs text-[#eedbb4]/80">
                Ubah informasi nomor rekening dan nama pemilik rekening untuk amplop digital:
              </p>
              {formData.bankAccounts.map((account, index) => (
                <div key={account.id} className="p-4 rounded-xl bg-[#23180f] border border-[#d4af37]/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-[#f5df9e]">{account.bankName}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#eedbb4]/70 mb-1">Nomor Rekening</label>
                      <input
                        type="text"
                        value={account.accountNumber}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index] = { ...updated[index], accountNumber: e.target.value };
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#eedbb4]/70 mb-1">Atas Nama (Pemilik)</label>
                      <input
                        type="text"
                        value={account.accountHolder}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index] = { ...updated[index], accountHolder: e.target.value };
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Physical Gift Information */}
              <div className="p-4 rounded-xl bg-[#23180f] border border-[#d4af37]/30 space-y-3 mt-4">
                <span className="font-semibold text-sm text-[#f5df9e] block">Informasi Kirim Kado Fisik &amp; No. HP</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">Nama Penerima Kado</label>
                    <input
                      type="text"
                      value={formData.physicalGift.recipientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalGift: { ...formData.physicalGift, recipientName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#eedbb4]/70 mb-1">No. Handphone / WhatsApp</label>
                    <input
                      type="text"
                      value={formData.physicalGift.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalGift: { ...formData.physicalGift, phone: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#eedbb4]/70 mb-1">Alamat Tujuan Pengiriman Kado</label>
                  <textarea
                    rows={2}
                    value={formData.physicalGift.fullAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physicalGift: { ...formData.physicalGift, fullAddress: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/30 text-xs text-[#f5df9e]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#d4af37]/30 bg-[#251a11] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Awal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#b68832] to-[#e2be5c] text-[#181109] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
