# Automation Testing Plan — RuangKata

## Tujuan

Pengujian dibuat untuk menjaga perilaku reducer, asynchronous thunk, komponen React, dan alur login utama. Setiap berkas pengujian memuat komentar **Skenario pengujian** agar tujuan dan ekspektasinya mudah ditinjau reviewer.

## Unit dan Integration Test

Framework yang digunakan adalah **Vitest** dengan **React Testing Library** dan lingkungan DOM dari **happy-dom**.

Cakupan pengujian:

- Reducer `authUser`, `threads`, `threadDetail`, dan `categoryFilter`.
- Thunk autentikasi, thread, detail/comment, serta optimistic votes.
- Komponen `CategoryFilter`, `VoteControl`, `TextField`, `ThreadCard`, dan `LeaderboardItem`.

Jalankan seluruh unit dan integration test:

```bash
npm test
```

Mode pengembangan:

```bash
npm run test:watch
```

## End-to-End Test

End-to-End test menggunakan **Playwright**. Endpoint Dicoding Forum API di-intercept pada pengujian agar alur login deterministik dan tidak bergantung pada akun atau jaringan eksternal reviewer.

Jalankan:

```bash
npx playwright install chromium
npm run e2e
```

## React Ecosystem

Proyek memanfaatkan **Storybook** sebagai ecosystem React tambahan untuk pengembangan dan dokumentasi komponen secara terisolasi.

Jalankan Storybook:

```bash
npm run storybook
```

Bangun Storybook statis:

```bash
npm run build-storybook
```

Stories yang tersedia:

- `Button.stories.jsx`
- `CategoryFilter.stories.jsx`
- `ThreadCard.stories.jsx`
- `LeaderboardItem.stories.jsx`

## Pemeriksaan Sebelum CI/CD

```bash
npm run check
npm run e2e
```
