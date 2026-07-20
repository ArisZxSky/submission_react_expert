# RuangKata Forum — Submission 2

RuangKata adalah aplikasi forum diskusi React yang menggunakan Dicoding Forum API. Versi ini melanjutkan submission pertama dengan automation testing, Storybook, GitHub Actions, dan konfigurasi deployment Vercel.

## Fitur Aplikasi

- Registrasi dan login.
- Daftar serta detail thread.
- Membuat thread dan komentar untuk pengguna terautentikasi.
- Vote thread dan komentar dengan optimistic update serta rollback.
- Leaderboard pengguna.
- Filter thread berdasarkan kategori.
- Loading indicator, toast, protected route, dan tampilan responsif.
- State data API tersimpan pada Redux Store.
- API dipanggil melalui thunk, bukan langsung di komponen.

## Automation Testing

- Lebih dari tiga pengujian reducer.
- Lebih dari tiga pengujian thunk.
- Lebih dari tiga pengujian React component.
- End-to-End test untuk alur login.
- Skenario tertulis pada setiap berkas pengujian.

## React Ecosystem

**Storybook** digunakan untuk mengembangkan dan mendokumentasikan komponen secara terisolasi. Tersedia stories untuk Button, CategoryFilter, ThreadCard, dan LeaderboardItem.

## CI/CD

- Continuous Integration: GitHub Actions melalui `.github/workflows/ci.yml`.
- Status check: `Quality Check` dan `E2E Login`.
- Continuous Deployment: Vercel melalui integrasi GitHub.
- Konfigurasi SPA Vite: `vercel.json`.
- Panduan lengkap: `docs/CI_CD_GUIDE.md`.
- Lokasi bukti screenshot: `submission-screenshots/`.

Konfigurasi repository, branch protection, koneksi akun Vercel, URL deployment, dan screenshot harus diselesaikan oleh pemilik akun GitHub/Vercel.

## Menjalankan Proyek

Gunakan Node.js 20.19 atau yang lebih baru.

```bash
npm install
npm start
```

## Menjalankan Pengujian

```bash
npm run lint
npm test
npx playwright install chromium
npm run e2e
```

## Storybook dan Build

```bash
npm run storybook
npm run build-storybook
npm run build
```

## Pemeriksaan

```bash
npm run check
npm run check:all
```

`npm run check` menjalankan lint, unit/integration test, production build, dan Storybook build. `npm run check:all` menambahkan End-to-End test.

## Struktur Utama

```text
.github/workflows/       workflow GitHub Actions
.storybook/              konfigurasi Storybook
e2e/                     pengujian End-to-End Playwright
src/components/          komponen UI dan component tests
src/states/              Redux slices, thunks, reducer tests, dan thunk tests
src/test/                setup lingkungan Vitest
docs/                    panduan testing dan CI/CD
submission-screenshots/  bukti CI error, CI pass, dan branch protection
vercel.json              konfigurasi Vercel untuk Vite SPA
```
# bismillah langsung diterima submission nya