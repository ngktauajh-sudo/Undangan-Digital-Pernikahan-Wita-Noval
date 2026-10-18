import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getGuestNameFromUrl,
  calculateCountdown,
  validateRsvpInput,
  addWish,
  updateCouplePhoto,
  getWishesStats,
  exportWishesToCsv,
  generateRsvpEmailLink,
} from './invitation.ts';
import type { GuestWish, WeddingData } from '../types/wedding.ts';

test('getGuestNameFromUrl handles valid and decoded names', () => {
  assert.equal(getGuestNameFromUrl('Merta%20Silviana'), 'Merta Silviana');
  assert.equal(getGuestNameFromUrl('Bpk.%20Budi%20%26%20Keluarga'), 'Bpk. Budi & Keluarga');
  assert.equal(getGuestNameFromUrl(null, 'Tamu Undangan'), 'Tamu Undangan');
  assert.equal(getGuestNameFromUrl('', 'Tamu Undangan'), 'Tamu Undangan');
});

test('calculateCountdown returns accurate time components', () => {
  const baseTime = new Date('2026-10-18T10:00:00Z');
  const targetIso = '2026-10-20T13:15:30Z';
  const result = calculateCountdown(targetIso, baseTime);

  assert.equal(result.isPassed, false);
  assert.equal(result.days, 2);
  assert.equal(result.hours, 3);
  assert.equal(result.minutes, 15);
  assert.equal(result.seconds, 30);
});

test('calculateCountdown flags passed dates', () => {
  const baseTime = new Date('2026-10-25T00:00:00Z');
  const pastTarget = '2026-10-20T00:00:00Z';
  const result = calculateCountdown(pastTarget, baseTime);

  assert.equal(result.isPassed, true);
  assert.equal(result.days, 0);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('validateRsvpInput enforces required fields', () => {
  const emptyName = validateRsvpInput({ name: '', status: 'hadir', message: 'Selamat!' });
  assert.equal(emptyName.isValid, false);
  assert.match(emptyName.errorMessage || '', /Nama wajib diisi/);

  const invalidStatus = validateRsvpInput({ name: 'Dewi', status: 'maybe' as any, message: 'Selamat!' });
  assert.equal(invalidStatus.isValid, false);

  const emptyMessage = validateRsvpInput({ name: 'Dewi', status: 'hadir', message: '' });
  assert.equal(emptyMessage.isValid, false);

  const valid = validateRsvpInput({ name: 'Merta Silviana', status: 'hadir', guestCount: 2, message: 'Selamat berbahagia Wita & Noval!' });
  assert.equal(valid.isValid, true);
});

test('addWish appends new wish at the beginning with optional phone', () => {
  const initialWishes: GuestWish[] = [
    {
      id: 'w1',
      name: 'Rian & Partner',
      phone: '0812000000',
      status: 'hadir',
      guestCount: 2,
      message: 'Samawa ya!',
      createdAt: '1 jam lalu',
      likes: 1,
    },
  ];

  const updated = addWish(initialWishes, {
    name: 'Merta Silviana',
    phone: '0813998877',
    status: 'hadir',
    guestCount: 2,
    message: 'Selamat menempuh hidup baru!',
  });

  assert.equal(updated.length, 2);
  assert.equal(updated[0].name, 'Merta Silviana');
  assert.equal(updated[0].phone, '0813998877');
  assert.equal(updated[0].status, 'hadir');
  assert.equal(updated[0].guestCount, 2);
  assert.equal(updated[1].name, 'Rian & Partner');
});

test('updateCouplePhoto updates bride or groom photo cleanly', () => {
  const dummyData = {
    bride: { fullName: 'Wita', photoUrl: 'old_bride.jpg' },
    groom: { fullName: 'Noval', photoUrl: 'old_groom.jpg' },
  } as unknown as WeddingData;

  const afterBride = updateCouplePhoto(dummyData, 'bride', 'new_bride.jpg');
  assert.equal(afterBride.bride.photoUrl, 'new_bride.jpg');
  assert.equal(afterBride.groom.photoUrl, 'old_groom.jpg');

  const afterGroom = updateCouplePhoto(afterBride, 'groom', 'new_groom.jpg');
  assert.equal(afterGroom.bride.photoUrl, 'new_bride.jpg');
  assert.equal(afterGroom.groom.photoUrl, 'new_groom.jpg');
});

test('getWishesStats calculates statistics correctly', () => {
  const wishes: GuestWish[] = [
    { id: '1', name: 'A', status: 'hadir', guestCount: 2, message: '', createdAt: '', likes: 0 },
    { id: '2', name: 'B', status: 'hadir', guestCount: 3, message: '', createdAt: '', likes: 0 },
    { id: '3', name: 'C', status: 'tidak', guestCount: 1, message: '', createdAt: '', likes: 0 },
    { id: '4', name: 'D', status: 'ragu', guestCount: 1, message: '', createdAt: '', likes: 0 },
  ];

  const stats = getWishesStats(wishes);
  assert.equal(stats.total, 4);
  assert.equal(stats.hadir, 2);
  assert.equal(stats.tidak, 1);
  assert.equal(stats.ragu, 1);
  assert.equal(stats.totalAttendingGuests, 5);
});

test('exportWishesToCsv produces formatted CSV headers and records', () => {
  const wishes: GuestWish[] = [
    { id: '1', name: 'Merta Silviana', phone: '0812345678', status: 'hadir', guestCount: 2, message: 'Selamat!', createdAt: 'Hari ini', likes: 2 },
  ];
  const csv = exportWishesToCsv(wishes);
  assert.match(csv, /Nama Tamu/);
  assert.match(csv, /Merta Silviana/);
  assert.match(csv, /0812345678/);
  assert.match(csv, /Akan Hadir/);
});

test('generateRsvpEmailLink outputs proper mailto URL with owner email and summary', () => {
  const wishes: GuestWish[] = [
    { id: '1', name: 'Merta Silviana', status: 'hadir', guestCount: 2, message: 'Selamat!', createdAt: 'Hari ini', likes: 2 },
  ];
  const emailLink = generateRsvpEmailLink(wishes, 'ngktauajh@gmail.com', 'Wita & Noval');
  assert.match(emailLink, /^mailto:ngktauajh@gmail\.com/);
  assert.match(emailLink, /subject=/);
  assert.match(emailLink, /body=/);
});
