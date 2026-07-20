# Panduan GitHub Actions, Branch Protection, dan Vercel

Dokumen ini digunakan setelah seluruh kode dan pengujian lokal berhasil.

## 1. Persiapan lokal

Gunakan Node.js 20.19 atau versi lebih baru, lalu jalankan:

```bash
npm install
npm run check
npx playwright install chromium
npm run e2e
```

`npm install` akan membuat `package-lock.json`. Commit berkas tersebut agar dependency yang digunakan lokal dan CI konsisten.

Pastikan folder berikut tidak ikut di-commit:

- `node_modules`
- `dist`
- `storybook-static`
- `playwright-report`
- `test-results`

## 2. Membuat repository GitHub public

Buat repository public baru. Gunakan `master` sebagai default branch karena kriteria submission meminta proteksi branch `master`.

Dari folder proyek:

```bash
git init -b master
git add .
git commit -m "feat: prepare RuangKata submission 2"
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin master
```

Ganti `USERNAME` dan `NAMA-REPOSITORY` sesuai repository Anda.

## 3. Memastikan Continuous Integration berjalan

Workflow berada di `.github/workflows/ci.yml` dan berjalan pada:

- push ke `master`;
- pull request menuju `master`;
- eksekusi manual melalui `workflow_dispatch`.

Dua status check yang akan muncul:

- `Quality Check`
- `E2E Login`

`Quality Check` menjalankan ESLint, unit/integration test, build aplikasi, dan build Storybook. `E2E Login` memasang Chromium dan menjalankan pengujian login Playwright.

Buka tab **Actions** dan pastikan workflow awal berhasil sebelum mengatur branch protection.

## 4. Mengaktifkan branch protection

Di repository GitHub:

1. Buka **Settings**.
2. Buka **Branches**.
3. Pilih **Add branch protection rule**.
4. Isi branch name pattern dengan `master`.
5. Aktifkan **Require a pull request before merging**.
6. Aktifkan **Require status checks to pass before merging**.
7. Aktifkan **Require branches to be up to date before merging**.
8. Pilih check `Quality Check` dan `E2E Login`.
9. Simpan aturan.

Tidak perlu mewajibkan approval bila repository hanya dikerjakan oleh satu akun, karena hal itu dapat membuat Anda tidak bisa menggabungkan pull request sendiri.

## 5. Membuat bukti CI error dan CI pass

Jangan meninggalkan test gagal pada branch final. Gunakan branch sementara untuk memperoleh bukti.

### Membuat CI gagal

```bash
git switch -c ci-evidence
```

Buka `src/states/categoryFilter/slice.test.js`. Ubah sementara pengujian pertama dari:

```js
expect(reducer(undefined, { type: 'UNKNOWN' })).toBe('Semua')
```

menjadi:

```js
expect(reducer(undefined, { type: 'UNKNOWN' })).toBe('Kategori Salah')
```

Commit dan push:

```bash
git add src/states/categoryFilter/slice.test.js
git commit -m "test: demonstrate failing CI check"
git push -u origin ci-evidence
```

Buat Pull Request dari `ci-evidence` menuju `master`. Tunggu check gagal, lalu ambil screenshot dan simpan sebagai:

`submission-screenshots/1_ci_check_error.jpg`

### Memperbaiki CI

Kembalikan assertion menjadi `Semua`, lalu:

```bash
git add src/states/categoryFilter/slice.test.js
git commit -m "test: restore passing CI check"
git push
```

Tunggu kedua check berhasil. Ambil screenshot dan simpan sebagai:

`submission-screenshots/2_ci_check_pass.jpg`

Ambil screenshot yang memperlihatkan proteksi `master` dan status check pada Pull Request, lalu simpan sebagai:

`submission-screenshots/3_branch_protection.jpg`

Setelah seluruh check berhasil, merge Pull Request tersebut.

## 6. Menghubungkan Vercel untuk Continuous Deployment

1. Masuk ke Vercel menggunakan akun GitHub.
2. Pilih **Add New Project**.
3. Import repository RuangKata.
4. Pastikan Framework Preset terdeteksi sebagai **Vite**.
5. Pastikan Production Branch adalah `master`.
6. Build Command: `npm run build`.
7. Output Directory: `dist`.
8. Deploy proyek.

`vercel.json` sudah menyertakan rewrite ke `index.html` agar direct access ke route React Router seperti `/login`, `/leaderboard`, atau `/threads/:id` tidak menghasilkan 404.

Setelah integrasi Git aktif:

- setiap Pull Request memperoleh Preview Deployment;
- setiap merge atau push ke `master` memicu Production Deployment.

## 7. Verifikasi deployment

Uji URL Vercel berikut:

- halaman utama;
- `/login`;
- `/register`;
- `/leaderboard`;
- membuka detail thread;
- refresh browser ketika berada pada route selain `/`;
- registrasi dan login melalui Dicoding Forum API.

## 8. Catatan submission

Isi `docs/SUBMISSION_NOTES.md` dengan:

- URL repository GitHub;
- URL deployment Vercel;
- nama branch yang diproteksi;
- nama status check yang diwajibkan.

Pastikan ketiga screenshot sudah berada di `submission-screenshots/`, lalu hapus `node_modules` sebelum membuat ZIP final.
