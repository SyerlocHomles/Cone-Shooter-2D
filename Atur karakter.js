/* ==========================================================================
   ATUR KARAKTER   (file: atur-karakter.js)

   Di sini diatur kelas karakter (Scout, Sniper, Heavy), warna tim, dan
   (nanti) bagian-bagian pembuat karakter.

   Penjelasan isi tiap kelas:
     nama            : nama kelas
     hp              : nyawa
     kecepatanLari   : kecepatan jalan biasa (makin besar makin cepat)
     kecepatanPelan  : kecepatan saat jalan senyap (stick digeser setengah / tahan Shift)
     segitigaMin     : lebar segitiga saat DIAM  (radian)        } dipakai di
     segitigaMax     : lebar segitiga saat LARI  (radian)        } mode DARK
     pandangMin      : jarak pandang saat LARI  (px)             } dan menentukan
     pandangMax      : jarak pandang saat DIAM  (px)             } sebaran peluru bot
     tameng          : 0 = tanpa tameng, 0.5 = tembakan dari depan hanya 50% damage
   ========================================================================== */

// ==========================================================================
//                              KELAS KARAKTER
// ==========================================================================
const KARAKTER = [

  // ----------------------------- Scout -----------------------------
  // Cepat tapi rapuh. Segitiga lebar dan pendek.
  { nama:'Scout',
    hp:90,
    kecepatanLari:360,   kecepatanPelan:170,
    segitigaMin:0.13,    segitigaMax:0.85,
    pandangMin:260,      pandangMax:480,
    tameng:0 },

  // ----------------------------- Sniper ----------------------------
  // Lambat, pandangan sangat jauh dan sempit.
  { nama:'Sniper',
    hp:90,
    kecepatanLari:280,   kecepatanPelan:130,
    segitigaMin:0.06,    segitigaMax:0.55,
    pandangMin:340,      pandangMax:800,
    tameng:0 },

  // ----------------------------- Heavy -----------------------------
  // HP besar, tameng di depan, agak lambat.
  { nama:'Heavy',
    hp:160,
    kecepatanLari:265,   kecepatanPelan:125,
    segitigaMin:0.11,    segitigaMax:0.7,
    pandangMin:300,      pandangMax:600,
    tameng:0.5 },
];

// ==========================================================================
//                          WARNA TIM DAN KULIT
//   baju      : warna baju terang          bajuGelap : warna sabuk / bayangan baju
// ==========================================================================
const WARNA_TIM = {
  biru:  { baju:'#4b8be2', bajuGelap:'#2d5fae' },   // Counter-Terrorist
  merah: { baju:'#e24b4b', bajuGelap:'#a62d2d' },   // Terrorist
};
const WARNA_KULIT = '#f2c9a0';

// ==========================================================================
//   BAGIAN PEMBUAT KARAKTER  (BELUM AKTIF - disiapkan untuk nanti)
//   Setiap bagian nanti punya minimal 5 pilihan. Isi nama dan warnanya di sini.
// ==========================================================================
const BAGIAN_KARAKTER = {
  rambutKepala: ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
  wajah:        ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
  badan:        ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
  baju:         ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
  celana:       ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
  sepatu:       ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4', 'Pilihan 5'],
};

// ==========================================================================
//  JANGAN UBAH DI BAWAH GARIS INI.
// ==========================================================================
const CL = KARAKTER.map(k => ({ n:k.nama, hp:k.hp, spd:k.kecepatanLari, sn:k.kecepatanPelan,
  hmin:k.segitigaMin, hmax:k.segitigaMax, rmin:k.pandangMin, rmax:k.pandangMax, sh:k.tameng }));
