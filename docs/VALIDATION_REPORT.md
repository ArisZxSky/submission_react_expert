# Laporan Validasi Kode Submission 2

Validasi berikut dijalankan pada source code sebelum proyek dikemas.

## ESLint

```text
npm run lint
Status: PASS — 0 error, 0 warning
```

## Unit dan Integration Test

```text
npm test
Status: PASS
Test files: 13 passed
Test cases: 47 passed
```

Cakupan terdiri dari reducer, thunk, dan React component.

## Production Build

```text
npm run build
Status: PASS
```

## End-to-End Login

```text
npm run e2e
Status: PASS
Test cases: 1 passed
```

E2E menggunakan API interception agar hasil pengujian login konsisten dan tidak membutuhkan akun Dicoding Forum API khusus.

## Storybook

Konfigurasi Storybook React + Vite dan empat berkas component stories telah disiapkan. Jalankan pada lingkungan lokal setelah dependency terpasang:

```text
npm run storybook
npm run build-storybook
```
