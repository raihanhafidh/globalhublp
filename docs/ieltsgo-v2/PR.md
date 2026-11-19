# Draft: IELTSGO v2 (Garansi Band 7)

Draft baru halaman `globalhub.id/ieltsgo` sesuai brief 19 Nov 2026: Garansi Band 7 jadi identitas halaman, halaman lebih pendek, satu aksi chat admin. Halaman live `/ieltsgo` tidak diubah. Jangan merge sebelum di-review.

## Update 2: versi ringkas (permintaan Rehan)

- Copy dipangkas: kata di halaman sekitar 240, tinggi HP 3.359 px (sebelumnya 4.971 px).
- Section garansi dihapus. Penjelasan dan syarat garansi hanya ada di FAQ "Garansi Band 7 itu gimana?". Badge "Bergaransi Band 7" di kartu Foundation diberi link "Lihat syarat" yang membuka FAQ itu.
- Kotak syarat di hero, syarat di kartu Foundation, dan baris "Mau yang bergaransi Band 7?" di kartu lain dihapus. Placement `guarantee` ikut hilang (8 tombol tersisa).
- Testimoni diringkas jadi nama dan skor saja (kutipan lengkap tetap di halaman live).

## Update: format visual baru (ref: lassie.ai)

Atas permintaan Rehan, tampilan diubah mengikuti format lassie.ai, dengan copy dan aturan brief tetap sama:

- Hero video layar penuh dari `Footage building.mp4` (drone kampus). Dipotong 7,5 detik dan dikompres dari 127 MB jadi 874 KB (desktop 1280 px) dan 399 KB (HP 540×960, potret). File ada di `ieltsgo-v2/media/`.
- Judul pakai font serif (Instrument Serif) dengan bagian kedua miring; teks isi tetap sans.
- Chip status di hero berganti tiap 2,8 detik (fakta dari halaman live: skor Kinanti, Dimas, band mentor, kelas malam).
- Bagian garansi jadi panel bergambar dengan kartu "Syaratnya" yang mencentang 4 langkah satu per satu saat terlihat, lalu menampilkan hasil "10x IELTS Live Class gratis".
- Kartu kelas dan section lain muncul pelan saat discroll; poin di kartu dicentang berurutan.
- FAQ bergaris tipis, penutup bergambar (still dari footage).
- Aksesibilitas: video tidak diputar otomatis kalau perangkat menyalakan "kurangi animasi" atau hemat data; ada tombol putar/jeda di pojok kanan atas hero. Tanpa JS, semua konten dan langkah garansi tetap terlihat.

## Temuan repo (brief 4.1)

Repo ini bukan situs globalhub.id. Isinya draft landing page statis (HTML + CSS + JS mandiri per halaman, dirakit dengan `node build.js`) yang dipublikasikan lewat GitHub Pages. Jadi:

- Halaman dibuat statis di `ieltsgo-v2/index.html` (sumber: `src/ieltsgo-v2.html` dan `src/ieltsgo-v2.css`, memakai ulang `src/lp.css`).
- Gambar diambil dari URL absolut globalhub.id (brief 4.4).
- Tombol mengarah ke endpoint konsultasi live `https://globalhub.id/ieltsgo/konsultasi` (brief 4.2).
- Tidak ada Meta Pixel, Zaraz, GA, atau Clarity. Ada komentar `TODO: tracking dipasang saat integrasi ke situs utama`.
- Kode endpoint `/ieltsgo/konsultasi` tidak ada di repo ini, jadi pengenalan paket Foundation belum bisa dicek atau ditambahkan (lihat daftar TODO).

## Hasil cek kriteria selesai

| Kriteria | Hasil |
|---|---|
| Tinggi halaman di 375 px ≤ 5.000 px | Lulus: **4.971 px** (diukur di Chrome, viewport 375×812) |
| Layar pertama HP (375×812) memuat label garansi, judul, sub-judul, tombol utama | Lulus: bawah tombol utama di 629 px. Foto/video hero jadi latar di belakang teks, bukan blok foto terpisah, jadi aturan foto maks 30% tinggi layar tidak berlaku lagi |
| Empat kartu ditumpuk di HP, Foundation paling menonjol | Lulus: 1 kolom di HP; Foundation jadi kartu gelap satu-satunya. Desktop 4 kolom |
| Setiap "Garansi Band 7" / "bergaransi" punya syarat singkat di dekatnya | Lulus dengan catatan: label dan sub-judul hero diikuti kotak syarat singkat; badge Foundation diikuti syarat di bawah harga; FAQ garansi berisi syaratnya. Baris link "Mau yang bergaransi Band 7? Lihat Private Foundation." di kartu Live Class, Sprint, dan Booster memakai copy brief apa adanya dan mengarah ke `#garansi`, tanpa syarat di sebelahnya |
| Tidak ada kalimat yang menyiratkan skor dijamin | Lulus |
| Tidak ada link ke orderonline | Lulus: 0 link |
| Setiap tombol WhatsApp punya `data-marketing-placement` unik | Lulus: 9 tombol, 9 nilai unik sesuai tabel 4.3. Semua `target="_blank" rel="noopener noreferrer"` |
| Semua `TODO [V]` jadi komentar di kode dan terkumpul di PR | Lulus: lihat daftar di bawah |
| Tidak ada tracking yang menembak dari localhost atau preview | Lulus: halaman tidak memuat skrip eksternal apa pun (hanya skrip interaksi di dalam halaman) |
| Lighthouse mobile Performance ≥ 90 | Lulus: **92** (FCP 2,7 s · LCP 2,7 s · TBT 0 ms · CLS 0 · Speed Index 2,7 s). Elemen LCP adalah video hero. Accessibility 95 |
| Screenshot HP (375 px) dan desktop (1440 px) | Terlampir di bawah |

## Screenshot

- HP 375 px, layar pertama: [mobile-375-first-screen.png](https://github.com/raihanhafidh/globalhublp/blob/feat/ieltsgo-v2-garansi/docs/ieltsgo-v2/mobile-375-first-screen.png)
- HP 375 px, satu halaman penuh: [mobile-375.png](https://github.com/raihanhafidh/globalhublp/blob/feat/ieltsgo-v2-garansi/docs/ieltsgo-v2/mobile-375.png)
- Desktop 1440 px, satu halaman penuh: [desktop-1440.png](https://github.com/raihanhafidh/globalhublp/blob/feat/ieltsgo-v2-garansi/docs/ieltsgo-v2/desktop-1440.png)

Screenshot diambil dengan mode "kurangi animasi" supaya semua bagian langsung di posisi akhir; video tampil sebagai poster. Di screenshot HP satu halaman penuh, bar melayang terlihat di bawah hero; itu efek cara screenshot diambil, bukan tampilan di HP.

## TODO [V] yang perlu dikonfirmasi

1. Isi promo November untuk bar promo (sekarang placeholder "Promo kelas IELTS sampai 24 November.").
2. Kutipan Kinanti ("Awalnya skorku cuma naik sedikit…") berdampingan dengan angka 5.5 → 7.0. Kata-kata testimoni tidak diubah; perlu dicek Rehan.
3. Slot 1 testimoni IELTS Live Class. Disembunyikan sampai datanya ada.
4. Label "Paling banyak dipilih" untuk Live Class.
5. Harga November Private IELTS Foundation. Sekarang tampil Rp5.599.000 (catatan produk) tanpa harga coret.
6. Garansi: skor awal minimum; batas waktu tes resmi setelah sesi terakhir; Band 7 overall atau per skill; aturan reschedule; garansi berlaku berapa kali.
7. Masa mengajar Aurelia (2 tahun di kartu, 4 tahun di detail halaman live). Tidak ditampilkan.
8. Cicilan 50% apakah juga berlaku untuk Foundation.
9. Endpoint `/ieltsgo/konsultasi` belum tentu mengenali `package=Private IELTS Foundation`. Pesan yang diusulkan: "Halo kak, aku mau tanya Private IELTS Foundation yang bergaransi Band 7. Skorku sekarang ___, targetku tes bulan ___."

## Catatan lain

- Warna tombol WhatsApp `#22C55E` dengan teks putih (sesuai brief 4.5) tidak lolos cek kontras Lighthouse. Opsi: pakai `#16A34A` sebagai warna dasar, atau teks gelap.
- Gambar kartu kelas (brief 4.4) tidak dipakai supaya tinggi halaman di HP tetap di bawah 5.000 px.
- Footage kampus kemungkinan kampus yang bisa dikenali. Pastikan pemakaiannya tidak terkesan Global Hub bermitra dengan kampus tersebut, dan hak pakainya aman.
- Font judul serif menyimpang dari font brand (Google Sans) demi mengikuti referensi.
- Kartu testimoni Kinanti dan Dimas dipasang sesuai brief.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
