import React, { useState } from 'react';
import { X, Mail, Download, Search, CheckCircle2, XCircle, HelpCircle, Users, Trash2, Plus, Send } from 'lucide-react';
import { exportWishesToCsv, generateRsvpEmailLink, getWishesStats } from '../utils/invitation';
import type { GuestWish } from '../types/wedding';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: GuestWish[];
  ownerEmail: string;
  onDeleteWish: (id: string) => void;
  onAddManualWish: (wish: { name: string; phone?: string; status: 'hadir' | 'tidak' | 'ragu'; guestCount: number; message: string }) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  wishes,
  ownerEmail,
  onDeleteWish,
  onAddManualWish,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'hadir' | 'ragu' | 'tidak'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual Add state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualStatus, setManualStatus] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [manualCount, setManualCount] = useState(2);
  const [manualMessage, setManualMessage] = useState('Konfirmasi kehadiran via keluarga/WhatsApp.');

  if (!isOpen) return null;

  const stats = getWishesStats(wishes);

  const filteredWishes = wishes.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.phone && w.phone.includes(searchQuery));
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadCsv = () => {
    const csvContent = exportWishesToCsv(wishes);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_rsvp_wita_noval_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmailNotification = () => {
    const emailUrl = generateRsvpEmailLink(wishes, ownerEmail, 'Wita & Noval');
    window.open(emailUrl, '_blank');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;
    onAddManualWish({
      name: manualName.trim(),
      phone: manualPhone.trim() || undefined,
      status: manualStatus,
      guestCount: manualCount,
      message: manualMessage.trim(),
    });
    setManualName('');
    setManualPhone('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#1c130d] border border-[#d4af37]/60 shadow-2xl gold-glow overflow-hidden text-left text-[#eedbb4]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#d4af37]/30 bg-[#251a11]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[10px] font-bold text-[#f5df9e] uppercase">
                Panel Tuan Rumah
              </span>
              <h3 className="font-cormorant text-2xl font-bold text-[#f7e3a1]">
                Rekapitulasi RSVP &amp; Buku Tamu
              </h3>
            </div>
            <p className="text-xs text-[#eedbb4]/70 mt-0.5">
              Kelola data kehadiran tamu undangan pernikahan Wita &amp; Noval
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Bar & Email Notification */}
        <div className="p-4 bg-[#21160e] border-b border-[#d4af37]/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Summary Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-[#2b1d14] border border-[#d4af37]/30 text-[#f5df9e]">
              Total: <strong>{stats.total}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
              Hadir: <strong>{stats.hadir}</strong> ({stats.totalAttendingGuests} Pax)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300">
              Ragu: <strong>{stats.ragu}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300">
              Tidak: <strong>{stats.tidak}</strong>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSendEmailNotification}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8a5b23] hover:bg-[#a67130] text-white text-xs font-semibold shadow transition-colors cursor-pointer"
              title={`Kirim Rekap RSVP ke Email: ${ownerEmail}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Rekap</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#2e1f14] hover:bg-[#3d2a1b] border border-[#d4af37]/40 text-[#f5df9e] text-xs font-medium shadow transition-colors cursor-pointer"
              title="Download File CSV/Excel"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#d4af37] text-[#181109] text-xs font-bold shadow hover:bg-[#e2be5c] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tamu</span>
            </button>
          </div>
        </div>

        {/* Manual Add Form Toggle */}
        {showAddForm && (
          <form onSubmit={handleManualSubmit} className="p-4 bg-[#271b12] border-b border-[#d4af37]/30 text-xs space-y-3">
            <h4 className="font-semibold text-sm text-[#f5df9e]">Catat Konfirmasi Tamu Manual</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[#eedbb4]/70 mb-1">Nama Tamu</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/35 text-[#f5df9e]"
                />
              </div>
              <div>
                <label className="block text-[#eedbb4]/70 mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="0812xxxxxxx"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/35 text-[#f5df9e]"
                />
              </div>
              <div>
                <label className="block text-[#eedbb4]/70 mb-1">Status</label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/35 text-[#f5df9e]"
                >
                  <option value="hadir">Akan Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                  <option value="tidak">Tidak Hadir</option>
                </select>
              </div>
              <div>
                <label className="block text-[#eedbb4]/70 mb-1">Jumlah Orang</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={manualCount}
                  onChange={(e) => setManualCount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/35 text-[#f5df9e]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#eedbb4]/70 mb-1">Catatan / Ucapan</label>
              <input
                type="text"
                value={manualMessage}
                onChange={(e) => setManualMessage(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#18110a] border border-[#d4af37]/35 text-[#f5df9e]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-[#181109] font-semibold"
              >
                Simpan Konfirmasi
              </button>
            </div>
          </form>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 bg-[#1f160f] flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-[#d4af37]/20 text-xs">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#eedbb4]/60 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu / no hp..."
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#160f09] border border-[#d4af37]/30 text-[#f5df9e] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'hadir', label: 'Hadir' },
              { id: 'ragu', label: 'Ragu' },
              { id: 'tidak', label: 'Tidak Hadir' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-[#d4af37] text-[#181109] font-bold'
                    : 'bg-[#271d15] text-[#eedbb4]/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Responses Table */}
        <div className="p-4 overflow-y-auto flex-1 max-h-[480px]">
          {filteredWishes.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#eedbb4]/60">
              Tidak ada data konfirmasi kehadiran yang sesuai kriteria pencarian.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#d4af37]/30 text-[#f5df9e] uppercase tracking-wider text-[11px] bg-[#22170f]">
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Nama Tamu</th>
                    <th className="py-2.5 px-3">Kontak</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Jumlah</th>
                    <th className="py-2.5 px-3">Ucapan &amp; Doa</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4af37]/15">
                  {filteredWishes.map((w, index) => {
                    const isAttending = w.status === 'hadir';
                    const isUnsure = w.status === 'ragu';

                    return (
                      <tr key={w.id} className="hover:bg-[#251a11]/60 transition-colors">
                        <td className="py-3 px-3 text-[#eedbb4]/60 font-mono">{index + 1}</td>
                        <td className="py-3 px-3 font-semibold text-[#f5df9e]">
                          {w.name}
                          <span className="block text-[10px] text-[#eedbb4]/50 font-normal">{w.createdAt}</span>
                        </td>
                        <td className="py-3 px-3 text-[#eedbb4]/80 font-mono text-[11px]">
                          {w.phone ? (
                            <a
                              href={`https://wa.me/${w.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#d4af37] hover:underline"
                            >
                              {w.phone}
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                              isAttending
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                                : isUnsure
                                ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                                : 'bg-rose-900/60 text-rose-300 border border-rose-500/40'
                            }`}
                          >
                            {isAttending ? 'Hadir' : isUnsure ? 'Ragu' : 'Tidak'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#eedbb4] font-semibold">
                          {isAttending ? `${w.guestCount} org` : '-'}
                        </td>
                        <td className="py-3 px-3 text-[#eedbb4]/80 italic max-w-xs truncate font-serif" title={w.message}>
                          &ldquo;{w.message}&rdquo;
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus konfirmasi dari ${w.name}?`)) {
                                onDeleteWish(w.id);
                              }
                            }}
                            className="p-1 rounded hover:bg-red-950 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Hapus data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#d4af37]/30 bg-[#251a11] flex items-center justify-between text-xs">
          <p className="text-[#eedbb4]/70">
            Laporan RSVP otomatis tersimpan di peramban dan siap diexport.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
