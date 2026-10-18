import type { GuestWish, WeddingData } from '../types/wedding';

/**
 * Extracts and cleans the guest name from URL search parameter (e.g. ?to=Merta%20Silviana)
 */
export function getGuestNameFromUrl(searchParam: string | null | undefined, defaultName: string = 'Tamu Undangan'): string {
  if (!searchParam) return defaultName;
  const decoded = decodeURIComponent(searchParam).trim();
  if (decoded.length === 0) return defaultName;
  return decoded.slice(0, 80);
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  totalSeconds: number;
}

/**
 * Calculates countdown time left until target wedding date
 */
export function calculateCountdown(targetIsoDate: string, now: Date = new Date()): CountdownResult {
  const target = new Date(targetIsoDate).getTime();
  const current = now.getTime();
  const diff = target - current;

  if (isNaN(target) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isPassed: false,
    totalSeconds,
  };
}

export interface RsvpInput {
  name: string;
  phone?: string;
  status: 'hadir' | 'tidak' | 'ragu';
  guestCount: number;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates RSVP submission input
 */
export function validateRsvpInput(input: Partial<RsvpInput>): ValidationResult {
  if (!input.name || input.name.trim().length === 0) {
    return { isValid: false, errorMessage: 'Nama wajib diisi' };
  }
  if (!input.status || !['hadir', 'tidak', 'ragu'].includes(input.status)) {
    return { isValid: false, errorMessage: 'Silakan pilih konfirmasi kehadiran' };
  }
  if (!input.message || input.message.trim().length === 0) {
    return { isValid: false, errorMessage: 'Mohon tulis ucapan atau doa restu' };
  }
  if (input.message.trim().length < 3) {
    return { isValid: false, errorMessage: 'Ucapan terlalu singkat' };
  }
  if (input.guestCount !== undefined && (input.guestCount < 1 || input.guestCount > 10)) {
    return { isValid: false, errorMessage: 'Jumlah tamu berkisar antara 1 hingga 10 orang' };
  }
  return { isValid: true };
}

/**
 * Adds a new guest wish to the existing list, sorting newest first
 */
export function addWish(
  existingWishes: GuestWish[],
  newWish: { name: string; phone?: string; status: 'hadir' | 'tidak' | 'ragu'; guestCount: number; message: string }
): GuestWish[] {
  const wishItem: GuestWish = {
    id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: newWish.name.trim(),
    phone: newWish.phone ? newWish.phone.trim() : undefined,
    status: newWish.status,
    guestCount: newWish.guestCount || 1,
    message: newWish.message.trim(),
    createdAt: 'Baru saja',
    likes: 0,
  };
  return [wishItem, ...existingWishes];
}

/**
 * Updates bride or groom photo in wedding data
 */
export function updateCouplePhoto(
  data: WeddingData,
  role: 'bride' | 'groom',
  newPhotoUrl: string
): WeddingData {
  if (!newPhotoUrl) return data;
  return {
    ...data,
    [role]: {
      ...data[role],
      photoUrl: newPhotoUrl,
    },
  };
}

/**
 * Filters and counts wishes by status
 */
export function getWishesStats(wishes: GuestWish[]) {
  const total = wishes.length;
  const hadir = wishes.filter((w) => w.status === 'hadir').length;
  const tidak = wishes.filter((w) => w.status === 'tidak').length;
  const ragu = wishes.filter((w) => w.status === 'ragu').length;
  const totalAttendingGuests = wishes
    .filter((w) => w.status === 'hadir')
    .reduce((sum, w) => sum + (w.guestCount || 1), 0);

  return { total, hadir, tidak, ragu, totalAttendingGuests };
}

/**
 * Generates CSV string for exporting RSVP guest list
 */
export function exportWishesToCsv(wishes: GuestWish[]): string {
  const headers = ['No', 'Nama Tamu', 'No WhatsApp', 'Status Kehadiran', 'Jumlah Tamu', 'Waktu Konfirmasi', 'Ucapan & Doa'];
  const rows = wishes.map((w, index) => [
    index + 1,
    `"${w.name.replace(/"/g, '""')}"`,
    `"${(w.phone || '-').replace(/"/g, '""')}"`,
    w.status === 'hadir' ? 'Akan Hadir' : w.status === 'ragu' ? 'Masih Ragu' : 'Tidak Hadir',
    w.status === 'hadir' ? w.guestCount : 0,
    `"${w.createdAt.replace(/"/g, '""')}"`,
    `"${w.message.replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Generates mailto link formatted with current RSVP summary to user's email
 */
export function generateRsvpEmailLink(wishes: GuestWish[], ownerEmail: string, coupleTitle: string = 'Wita & Noval'): string {
  const stats = getWishesStats(wishes);
  const subject = encodeURIComponent(`[Rekap RSVP Undangan] Pernikahan ${coupleTitle}`);

  const lines = [
    `Halo Pengantin & Keluarga Besar,`,
    ``,
    `Berikut adalah Rekapitulasi Konfirmasi Kehadiran Tamu (RSVP) Pernikahan ${coupleTitle}:`,
    `----------------------------------------------------`,
    `Total Konfirmasi: ${stats.total} Tamu`,
    `Jumlah Akan Hadir: ${stats.hadir} Keluarga / Undangan`,
    `Total Estimasi Tamu Hadir: ${stats.totalAttendingGuests} Orang`,
    `Masih Ragu: ${stats.ragu} Tamu`,
    `Tidak Hadir: ${stats.tidak} Tamu`,
    `----------------------------------------------------`,
    ``,
    `DAFTAR DETAIL KONFIRMASI TAMU:`,
    ...wishes.map((w, i) =>
      `${i + 1}. ${w.name} - ${w.status.toUpperCase()} (${w.guestCount} org) | HP: ${w.phone || '-'} | Ucapan: "${w.message}"`
    ),
    ``,
    `Laporan ini digenerate otomatis dari Sistem Buku Tamu Undangan Pernikahan Adat Jawa.`,
  ];

  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
}
