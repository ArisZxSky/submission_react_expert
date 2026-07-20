# Checklist Submission 2

## Automation Testing

- [x] Lebih dari tiga pengujian reducer.
- [x] Lebih dari tiga pengujian thunk.
- [x] Lebih dari tiga pengujian React component.
- [x] End-to-End test untuk alur login.
- [x] Skenario tertulis pada setiap berkas pengujian.
- [x] Unit/integration test dapat dijalankan dengan `npm test`.
- [x] E2E test dapat dijalankan dengan `npm run e2e`.

## React Ecosystem

- [x] Storybook React + Vite.
- [x] Lebih dari dua component stories.
- [x] Story untuk Button, CategoryFilter, ThreadCard, dan LeaderboardItem.

## Kriteria Submission Sebelumnya

- [x] Registrasi dan login.
- [x] Daftar serta detail thread.
- [x] Membuat thread dan komentar.
- [x] Loading indicator.
- [x] Vote thread dan komentar dengan optimistic update.
- [x] Leaderboard.
- [x] Filter berdasarkan kategori.
- [x] React Strict Mode.
- [x] State API dikelola melalui Redux Store.
- [x] API dipanggil dari thunk, bukan langsung di komponen.
- [x] UI dan state dipisahkan.
- [x] Komponen modular dan reusable.

## CI/CD pada Source Code

- [x] Workflow GitHub Actions tersedia.
- [x] CI menjalankan lint, unit/integration test, build aplikasi, dan build Storybook.
- [x] CI menjalankan End-to-End login pada job terpisah.
- [x] Artifact build dan laporan kegagalan Playwright dikonfigurasi.
- [x] Konfigurasi Vercel untuk Vite SPA tersedia.
- [x] Template Pull Request tersedia.
- [x] Folder bukti screenshot tersedia.

## Tindakan pada Akun GitHub dan Vercel

- [ ] Jalankan `npm install` dan commit `package-lock.json`.
- [ ] Push repository public dengan default branch `master`.
- [ ] Pastikan `Quality Check` dan `E2E Login` berhasil.
- [ ] Proteksi branch `master` dan wajibkan kedua status check.
- [ ] Buat bukti CI gagal pada branch sementara.
- [ ] Perbaiki test dan buat bukti CI berhasil.
- [ ] Simpan screenshot branch protection.
- [ ] Hubungkan repository dengan Vercel.
- [ ] Pastikan Production Branch Vercel adalah `master`.
- [ ] Isi URL GitHub dan Vercel pada `docs/SUBMISSION_NOTES.md`.
- [ ] Hapus `node_modules` sebelum membuat ZIP final.
