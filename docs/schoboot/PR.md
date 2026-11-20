# Draft: SchoBoot LPDP landing page

Draft landing page **SchoBoot · Scholarship Bootcamp 2026–2027 (LPDP Prep)** yang langsung jualan ke checkout orderonline Global Hub (Rp149.000).
**Jangan di-merge dan jangan di-deploy.** Halaman masih `noindex, nofollow`.

## Ringkasan
- Ikut pola repo: sumber di `src/schoboot.html` + `src/schoboot.css`, dirakit `node build.js` jadi `schoboot/index.html` (mandiri, CSS/JS inline). Gambar WebP 17–23 KB di `schoboot/media/`.
- SchoBoot pakai gaya sendiri (referensi Supaste), jadi **tidak memakai `lp.css`**. `src/shared.js` tetap dipakai untuk WA admin dan tracking klik. Halaman lain hasil build-nya tidak berubah.
- Ditambahkan ke tabel README dan daftar di `index.html` root (seksi baru "Scholarship (LPDP)").
- Layout mengikuti Supaste: navbar pil melayang, section dalam kartu abu `#F7F7F7` radius 40 px, H1 dua baris dengan animasi per huruf, satu kartu harga, FAQ accordion dua kolom.
- Mockup **LPDP Prep Tracker** dibuat dengan HTML/CSS (bukan gambar). Progresnya mulai 0/5 dan terisi saat di-scroll.
- **Kartu destinasi bergerak** (Australia · Rusia · Tiongkok) dari aset foto yang diberikan: tumpukan kartu yang berganti otomatis tiap 3,2 detik, bisa di-tap, berhenti saat keluar layar, dan diam kalau user memilih reduced-motion.
- Bar melayang di HP muncul setelah hero lewat dan disembunyikan saat kartu harga terlihat.
- Varian buat dibandingkan: `?btn=orange` (tombol oranye, default hitam) dan `?h1=b` / `?h1=c` (H1 alternatif).

## ⚠️ Link checkout masih link contoh
`CONFIG.CHECKOUT_URL` = `https://globalhub.orderonline.id/scholarship-mentoring-essential` (produk **Scholarship Mentoring Essential**, bukan SchoBoot).
Semua tombol daftar mengambil link dari satu konstanta ini dan otomatis menambahkan `?utm_source=lp&utm_medium=schoboot&utm_content=<placement>`. Parameter iklan lain yang masuk ke halaman (`utm_campaign`, `fbclid`, `gclid`, dll.) ikut diteruskan; `utm_source/medium/content` dari iklan ditimpa sesuai brief. Kalau tim lebih butuh `utm_source` asli iklan di orderonline, ini perlu diputuskan. Developer cukup mengganti satu baris ini setelah produk SchoBoot dibuat di orderonline (contoh pola: `https://globalhub.orderonline.id/schoboot-lpdp`).

**Sebelum iklan jalan:** uji checkout SchoBoot dengan satu transaksi. Saat dicek 16 Nov, checkout orderonline Global Hub menampilkan harga tanpa format rupiah dan teks stok habis.

## Tracking
| Tombol | `data-marketing-placement` | Event (nanti) |
|---|---|---|
| Navbar "Daftar Rp149K" | `nav` | InitiateCheckout |
| Hero CTA | `hero` | InitiateCheckout |
| Kartu harga | `pricing` | InitiateCheckout |
| Penutup | `closing` | InitiateCheckout |
| Bar melayang HP | `mobile-sticky` | InitiateCheckout |
| Link admin hero / FAQ / penutup | `hero-wa` / `faq-wa` / `closing-wa` | Contact |

Sama seperti halaman lain di repo: tidak ada pixel/GA/Clarity. Tiap tombol punya `data-cta` (`checkout`/`whatsapp`) + `data-pos`, dan klik push `lp_cta_click` ke `dataLayer` lewat `src/shared.js` (variant `SCHOBOOT`, paket `schoboot`). Petakan di GTM: `checkout` → InitiateCheckout, `whatsapp` → Contact. Tidak ada event Purchase dari landing page. Tag jangan dibiarkan menembak dari localhost/preview.

## Kriteria selesai
- [x] Layar pertama HP (375×812) menampilkan label, H1, harga Rp149K, dan tombol daftar (bawah tombol di y ≈ 538 px).
- [x] Tinggi halaman di HP: **5.712 px** (≤ 6.000; 5.808 px sebelum semua section dirender karena `content-visibility`). Desktop 1440: 5.407 px. Tidak ada scroll horizontal.
- [x] Mockup LPDP Prep Tracker dibuat dengan HTML/CSS.
- [x] Tidak ada logo/warna resmi LPDP. Disclaimer non-afiliasi ada di FAQ dan footer.
- [x] Tidak ada kalimat yang menjanjikan lolos LPDP, dan tidak ada garansi uang kembali.
- [x] Angka kuota tidak palsu: label "Sisa X kursi" disembunyikan selama `CONFIG.SEATS_LEFT = null`.
- [x] Semua tombol daftar mengarah ke `CHECKOUT_URL` (satu tempat) dan membawa UTM.
- [x] Semua tombol/link punya `data-marketing-placement` unik.
- [x] Semua TODO [V] ada di komentar kode `src/schoboot.html` dan terkumpul di bawah.
- [x] Lighthouse mobile (v12.6.1, localhost, 3× run konsisten): **Performance 91**, Accessibility 100, Best Practices 100, SEO 63. SEO rendah hanya karena `noindex` yang disengaja selama draft. TBT 0 ms, CLS 0, LCP 2,8 s.
- [x] Screenshot di `docs/schoboot/` (lihat di bawah).

Catatan Lighthouse: diukur di `python -m http.server` (tanpa gzip/cache). Di server produksi dengan kompresi dan cache, angkanya mestinya sama atau lebih baik.

## Screenshot
| HP 375 px (layar pertama) | HP 375 px (penuh) | Desktop 1440 px |
|---|---|---|
| ![](https://raw.githubusercontent.com/raihanhafidh/globalhublp/feat/lp-schoboot/docs/schoboot/mobile-375-fold.png) | ![](https://raw.githubusercontent.com/raihanhafidh/globalhublp/feat/lp-schoboot/docs/schoboot/mobile-375.png) | ![](https://raw.githubusercontent.com/raihanhafidh/globalhublp/feat/lp-schoboot/docs/schoboot/desktop-1440.png) |

## TODO [V]: perlu dikonfirmasi sebelum tayang
1. **Link checkout final** SchoBoot di orderonline (`CONFIG.CHECKOUT_URL`).
2. **Admin WhatsApp**: link "Tanya admin" sekarang pakai `WA_NUMBER` di `src/shared.js` (nomor admin dari globalhub.id/study-abroad), dengan pesan dari brief + ref `SA-SCHOBOOT/<posisi>`. Pastikan admin ini yang pegang SchoBoot, atau ganti ke endpoint `globalhub.id/.../konsultasi?package=SchoBoot` kalau endpoint-nya mendukung.
3. **Tanggal dan jam** tiap sesi (strip fakta, FAQ "Kapan jadwalnya?").
4. **Judul dan isi Sesi 1–4.** Placeholder diambil dari content angle MOFU deck PM, termasuk label "Sesi N" di tracker.
5. **Chip persiapan** belum dipasang terpisah. Isinya sudah tercakup di tracker dan blok sesi; tambahkan setelah materi sesi final.
6. **Testimoni** peserta mentoring beasiswa Global Hub + izin tertulis. Slot di antara sesi 2 dan 3 dikomentari (tidak tampil).
7. **Mentor bootcamp**: nama, foto, beasiswa/kampus, izin. Klaim "awardee LPDP" hanya kalau sudah diverifikasi. Sekarang tampil kartu placeholder netral.
8. **Sisa kursi asli** (`CONFIG.SEATS_LEFT`), atau biarkan tersembunyi.
9. **Poin checklist** "Peta persiapan LPDP yang bisa langsung kamu pakai".
10. **Bonus diskon mentoring**: ditampilkan di LP atau cuma di chat? Saat ini tampil di kartu harga + S&K.
11. **Cara kirim link kelas** setelah pembayaran (email/WhatsApp).
12. **Platform kelas** dan **rekaman**: item FAQ-nya disembunyikan (`hidden`) sampai dikonfirmasi. Sertifikat tidak disebut sama sekali.
13. **Metode pembayaran** (FAQ "Bayarnya gimana?").
14. **Kartu destinasi**: pastikan hak pakai ketiga foto, dan bahwa Australia/Rusia/Tiongkok sesuai daftar kampus tujuan LPDP.
15. **Favicon** Global Hub (sementara kosong).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
