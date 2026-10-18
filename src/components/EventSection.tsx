import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Video, Copy, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { FloralDivider, CornerOrnament } from './Ornaments';
import type { WeddingEvent } from '../types/wedding';

interface EventSectionProps {
  akad: WeddingEvent;
  resepsi: WeddingEvent;
}

export const EventSection: React.FC<EventSectionProps> = ({ akad, resepsi }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showAkadRundown, setShowAkadRundown] = useState(true);
  const [showResepsiRundown, setShowResepsiRundown] = useState(true);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="acara" className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-batik-subtle opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Rangkaian Acara Sakral
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          Waktu &amp; Tempat Acara
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/85 max-w-xl mx-auto mb-12">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan rawuh untuk memberikan doa restu pada hari bahagia kami:
        </p>

        {/* Two Separate Detailed Event Cards on the same page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
          {/* Card 1: Akad Nikah */}
          <div className="relative rounded-3xl bg-[#1f1610]/95 border border-[#d4af37]/45 p-6 sm:p-8 shadow-2xl backdrop-blur-sm gold-glow-sm flex flex-col justify-between">
            <CornerOrnament position="top-left" className="top-2 left-2 w-7 h-7 text-[#d4af37]/45" />
            <CornerOrnament position="bottom-right" className="bottom-2 right-2 w-7 h-7 text-[#d4af37]/45" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-xs font-semibold text-[#f5df9e] uppercase tracking-wider">
                  Prosesi Sakral
                </span>
                <span className="font-serif italic text-xs text-[#eedbb4]/70">
                  {akad.javaneseSubtitle || 'Ijab Qabul'}
                </span>
              </div>

              <h3 className="font-cormorant text-3xl font-bold text-[#f7e3a1] mb-1">
                {akad.title}
              </h3>
              <p className="text-xs text-[#eedbb4]/70 italic mb-6">
                Ikrar Suci Janji Pernikahan Adat Jawa
              </p>

              <div className="space-y-4 text-sm text-[#eedbb4] mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Hari &amp; Tanggal</span>
                    <p className="font-semibold text-[#f5df9e] text-base">{akad.dateStr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Waktu Acara</span>
                    <p className="font-semibold text-[#f5df9e]">{akad.timeStr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Lokasi Akad</span>
                    <p className="font-semibold text-[#f7e3a1] text-base mb-1">{akad.locationName}</p>
                    <p className="text-xs text-[#eedbb4]/80 leading-relaxed font-sans">{akad.address}</p>
                  </div>
                </div>
              </div>

              {/* Rundown Toggle */}
              {akad.rundown && akad.rundown.length > 0 && (
                <div className="mb-6 rounded-2xl bg-[#181109] border border-[#d4af37]/25 p-4">
                  <button
                    onClick={() => setShowAkadRundown(!showAkadRundown)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#f5df9e] uppercase tracking-wider cursor-pointer"
                  >
                    <span>Susunan Acara Akad Nikah</span>
                    {showAkadRundown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showAkadRundown && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-[#d4af37]/20">
                      {akad.rundown.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-mono text-[#d4af37] font-semibold">{item.time}</span>
                          <p className="font-medium text-[#eedbb4]">{item.event}</p>
                          {item.description && (
                            <p className="text-[11px] text-[#eedbb4]/65 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {akad.note && (
                <p className="text-xs italic text-[#eedbb4]/75 mb-6 bg-[#271d15] p-3 rounded-xl border border-[#d4af37]/20 leading-relaxed">
                  {akad.note}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#946522] via-[#cca33b] to-[#8a5b1c] text-[#160e07] font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Rute Google Maps</span>
              </a>

              <button
                onClick={() => handleCopyAddress(akad.address)}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#2a1d13] hover:bg-[#382619] border border-[#d4af37]/35 text-[#f5df9e] text-xs font-medium cursor-pointer transition-colors"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Alamat Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Salin Alamat Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Resepsi Pernikahan */}
          <div className="relative rounded-3xl bg-[#1f1610]/95 border border-[#d4af37]/45 p-6 sm:p-8 shadow-2xl backdrop-blur-sm gold-glow-sm flex flex-col justify-between">
            <CornerOrnament position="top-right" className="top-2 right-2 w-7 h-7 text-[#d4af37]/45" />
            <CornerOrnament position="bottom-left" className="bottom-2 left-2 w-7 h-7 text-[#d4af37]/45" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-xs font-semibold text-[#f5df9e] uppercase tracking-wider">
                  Pahargyan &amp; Syukuran
                </span>
                <span className="font-serif italic text-xs text-[#eedbb4]/70">
                  {resepsi.javaneseSubtitle || 'Kirab Temanten'}
                </span>
              </div>

              <h3 className="font-cormorant text-3xl font-bold text-[#f7e3a1] mb-1">
                {resepsi.title}
              </h3>
              <p className="text-xs text-[#eedbb4]/70 italic mb-6">
                Upacara Adat Panggih &amp; Ramah Tamah Sanak Kadang
              </p>

              <div className="space-y-4 text-sm text-[#eedbb4] mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Hari &amp; Tanggal</span>
                    <p className="font-semibold text-[#f5df9e] text-base">{resepsi.dateStr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Waktu Resepsi</span>
                    <p className="font-semibold text-[#f5df9e]">{resepsi.timeStr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#2a1d13] border border-[#d4af37]/30 text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#eedbb4]/60 uppercase tracking-wider block">Tempat Resepsi</span>
                    <p className="font-semibold text-[#f7e3a1] text-base mb-1">{resepsi.locationName}</p>
                    <p className="text-xs text-[#eedbb4]/80 leading-relaxed font-sans">{resepsi.address}</p>
                  </div>
                </div>
              </div>

              {/* Rundown Toggle */}
              {resepsi.rundown && resepsi.rundown.length > 0 && (
                <div className="mb-6 rounded-2xl bg-[#181109] border border-[#d4af37]/25 p-4">
                  <button
                    onClick={() => setShowResepsiRundown(!showResepsiRundown)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#f5df9e] uppercase tracking-wider cursor-pointer"
                  >
                    <span>Susunan Acara Resepsi &amp; Adat</span>
                    {showResepsiRundown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showResepsiRundown && (
                    <div className="mt-3 space-y-2.5 pt-2 border-t border-[#d4af37]/20">
                      {resepsi.rundown.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-mono text-[#d4af37] font-semibold">{item.time}</span>
                          <p className="font-medium text-[#eedbb4]">{item.event}</p>
                          {item.description && (
                            <p className="text-[11px] text-[#eedbb4]/65 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {resepsi.note && (
                <p className="text-xs italic text-[#eedbb4]/75 mb-6 bg-[#271d15] p-3 rounded-xl border border-[#d4af37]/20 leading-relaxed">
                  {resepsi.note}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#946522] via-[#cca33b] to-[#8a5b1c] text-[#160e07] font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Rute Google Maps</span>
              </a>

              {resepsi.isStreaming && (
                <a
                  href={resepsi.streamingUrl || 'https://youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#2a1d13] hover:bg-[#382619] border border-[#d4af37]/35 text-[#f5df9e] text-xs font-medium transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span>Siaran Langsung (Live Streaming)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* INTEGRATED GOOGLE MAPS SECTION */}
        <div className="rounded-3xl border border-[#d4af37]/40 bg-[#1f1610]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-sm gold-glow-sm mb-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Peta Interaktif Google Maps</span>
              </div>
              <h4 className="font-cormorant text-2xl font-bold text-[#f7e3a1]">
                Lokasi Acara Pernikahan
              </h4>
              <p className="text-xs text-[#eedbb4]/80 mt-0.5">
                {akad.address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2e1f14] hover:bg-[#3d2a1b] border border-[#d4af37]/50 text-xs font-semibold text-[#f5df9e] shadow transition-colors"
              >
                <span>Buka di Aplikasi Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps iFrame */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-inner bg-[#160f09]">
            <iframe
              title="Peta Lokasi Pernikahan Klaten Gading Rejo Pringsewu"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={akad.embedMapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(akad.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#eedbb4]/70">
            <p>
              📍 Patokan: Wilayah Klaten, Gading Rejo, Pringsewu (Akses mudah untuk kendaraan roda dua maupun empat).
            </p>
            <button
              onClick={() => handleCopyAddress(akad.address)}
              className="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#f7e3a1] cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedAddress ? 'Alamat Tersalin!' : 'Salin Teks Alamat'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
