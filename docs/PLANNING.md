# Rencana Aplikasi RuangKata

## Konsep visual

RuangKata memakai nuansa editorial modern: latar krem lembut, aksen indigo dan coral, kartu putih dengan bayangan ringan, serta navigasi desktop dan mobile yang berbeda. Desain tidak meniru aplikasi contoh.

## Sketsa halaman

### Beranda

```text
[Header: Logo | Threads | Leaderboard | Search/Profil]
[Hero singkat + tombol Buat Thread]
[Chip kategori horizontal]
[Kolom utama: daftar ThreadCard] [Sidebar: profil / kategori populer]
[Mobile navigation]
```

### Detail thread

```text
[Back link]
[Thread detail: kategori, judul, author, body, vote]
[Form komentar bila login / CTA login]
[Daftar komentar + vote komentar]
```

### Login dan registrasi

```text
[Panel branding dan manfaat] [Form autentikasi]
```

### Leaderboard

```text
[Intro leaderboard]
[Podium tiga besar]
[Daftar peringkat berikutnya]
```

## Hierarki komponen

- `App`
  - `AppShell`
    - `Header`
    - `Outlet`
    - `MobileNav`
  - `LoadingBar`
  - `Toast`
- `HomePage`
  - `PageHeader`
  - `CategoryFilter`
  - `ThreadList`
    - `ThreadCard`
      - `Avatar`
      - `VoteControl`
- `DetailPage`
  - `ThreadCard` mode detail
  - `CommentForm`
  - `CommentList`
    - `CommentCard`
      - `Avatar`
      - `VoteControl`
- `LeaderboardPage`
  - `LeaderboardItem`
- `LoginPage` / `RegisterPage`
  - `AuthLayout`
  - `TextField`
  - `Button`

## State Redux

- `authUser`: pengguna aktif dan status preload.
- `users`: daftar pengguna dari API.
- `threads`: daftar thread dan status request.
- `threadDetail`: detail thread beserta komentar.
- `leaderboards`: data peringkat.
- `categoryFilter`: kategori aktif.
- `ui`: pending request global dan toast.

## Action utama

- Autentikasi: preload, login, register, logout.
- Thread: fetch, create, optimistic vote, rollback vote.
- Detail: fetch, add comment, optimistic thread/comment vote, rollback.
- Leaderboard: fetch.
- Filter: memilih atau menghapus kategori.
- UI: menampilkan dan menutup toast.

Semua REST API call berada di `src/utils/api.js` dan dipanggil melalui async thunk, bukan langsung dari komponen.
