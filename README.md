# Draft Landing Page Global Hub

Draft landing page untuk review dan serah terima ke developer. Belum final: semua halaman memakai `noindex`, dan teks berlatar kuning di halaman IELTS masih menunggu konfirmasi.

## Halaman

| Folder | Isi | Aksi utama |
|---|---|---|
| `ielts-a/` | IELTS · Versi A Tanya Admin (target `globalhub.id/ieltsgo`) | Chat WhatsApp |
| `ielts-b/` | IELTS · Versi B Daftar Langsung (usul `globalhub.id/ieltslive`) | Checkout Order Online |
| `study-abroad-a/` | Study Abroad · Versi A Direct Offer | Checkout Order Online |
| `study-abroad-b/` | Study Abroad · Versi B Konsultasi Dulu | Chat WhatsApp |

Tiap `index.html` berdiri sendiri (CSS dan JS sudah di dalam), jadi bisa langsung disalin ke server mana pun.

## Mengubah isi

Sumbernya ada di `src/`. Setelah mengubah, rakit ulang:

```bash
node build.js
```

- `src/shared.css`, `src/ielts.css`: tampilan.
- `src/shared.js`: nomor WhatsApp admin (`WA_NUMBER`), penerusan UTM ke Order Online, dan tracking klik.
- `src/ielts-a.html`, `src/ielts-b.html`, `src/a.html`, `src/b.html`: isi tiap halaman.

## Yang harus dikerjakan developer sebelum tayang

1. Pasang Meta Pixel dan Microsoft Clarity. Tiap tombol sudah mengirim event `lp_cta_click` ke `dataLayer` dengan `cta` (`whatsapp` atau `checkout`), `pos`, `variant`, dan `paket`. Petakan `whatsapp` ke `Contact` dan `checkout` ke `InitiateCheckout`.
2. Ganti semua teks berkelas `.ph` (latar kuning) dengan data yang sudah dikonfirmasi, lalu hapus bar `.draft` dan meta `noindex`.
3. Ganti inisial mentor (`.ava`) dengan foto.
4. IELTS Versi B: pastikan harga di `globalhub.orderonline.id/ielts-live-class` sudah Rp359.000 dan lakukan satu pembelian uji dari HP sebelum iklan diarahkan ke halaman ini.
