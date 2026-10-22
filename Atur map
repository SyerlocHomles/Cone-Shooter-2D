/* ==========================================================================
   ATUR MAP   (file: atur-map.js)

   Di sini diatur ukuran map, tembok, peti, posisi base, dan site bomb.
   Semua posisi dalam piksel (px). Titik (0,0) ada di pojok kiri atas map.
   Catatan: yang diperbesar sebaiknya ukuran RUANGNYA saja, bukan zoom pandang.
   ========================================================================== */

// ---------- Ukuran map ----------
const UKURAN_MAP = { lebar:3000, tinggi:2000 };
const NAMA_MAP = 'Arena 1';

// ---------- Tembok luar ----------
const TEBAL_TEMBOK_LUAR = 40;

// ---------- Tembok dalam ----------
// Tiap tembok: [x, y, lebar, tinggi]
// Cukup tulis tembok untuk KUADRAN KIRI-ATAS saja. Game otomatis mencerminkannya
// ke kanan-atas, kiri-bawah, dan kanan-bawah supaya map adil untuk kedua tim.
const TEMBOK_KUADRAN_KIRI_ATAS = [
  [450, 250,  40, 380],   // dinding tegak
  [450, 250, 260,  40],   // dinding mendatar (menyambung ke yang atas)
  [900, 180,  40, 300],
  [1000, 520, 360,  40],
  [700, 760,  40, 240],
  [1150, 300,  40, 160],
  [1300, 780, 120, 120],  // peti
  [800, 560, 100, 100],   // peti
  [350, 820, 160,  40],
];

// Tembok yang berdiri sendiri di tengah map (tidak dicerminkan)
const TEMBOK_TENGAH = [
  [1350, 940, 300, 120],
];

// ---------- Base (tempat muncul dan toko) ----------
// Biru = Counter-Terrorist (kanan), Merah = Terrorist (kiri)
const POSISI_BASE = {
  biru:  { x: UKURAN_MAP.lebar - 150, y: UKURAN_MAP.tinggi / 2 },
  merah: { x: 150,                    y: UKURAN_MAP.tinggi / 2 },
};

// ---------- Site bomb (mode Bomb) ----------
const SITE_BOMB = [
  { nama:'A', x: UKURAN_MAP.lebar - 700, y: UKURAN_MAP.tinggi - 550 },
  { nama:'B', x: UKURAN_MAP.lebar - 700, y: 550 },
];

// ---------- Navigasi bot ----------
// Ukuran kotak peta jalur untuk bot. Lebih kecil = bot lebih teliti tapi lebih berat.
const UKURAN_GRID_NAVIGASI = 50;

// ==========================================================================
//  JANGAN UBAH DI BAWAH GARIS INI.
// ==========================================================================
const WW = UKURAN_MAP.lebar, WH = UKURAN_MAP.tinggi;
const walls = [
  [0, 0, WW, TEBAL_TEMBOK_LUAR], [0, WH - TEBAL_TEMBOK_LUAR, WW, TEBAL_TEMBOK_LUAR],
  [0, 0, TEBAL_TEMBOK_LUAR, WH], [WW - TEBAL_TEMBOK_LUAR, 0, TEBAL_TEMBOK_LUAR, WH],
];
for (const q of TEMBOK_KUADRAN_KIRI_ATAS) {
  walls.push(q, [WW - q[0] - q[2], q[1], q[2], q[3]], [q[0], WH - q[1] - q[3], q[2], q[3]],
    [WW - q[0] - q[2], WH - q[1] - q[3], q[2], q[3]]);
}
for (const t of TEMBOK_TENGAH) walls.push(t);
const BASE = [POSISI_BASE.biru, POSISI_BASE.merah];   // indeks 0 = biru, 1 = merah
const SITES = SITE_BOMB;
