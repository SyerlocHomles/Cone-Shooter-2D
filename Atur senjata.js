/* ==========================================================================
   ATUR SENJATA   (file: atur-senjata.js)

   Semua senjata ada di sini. Ubah angkanya, simpan, lalu muat ulang game.
   Tiap senjata punya blok sendiri. Contoh membaca satu blok:

     nama            : nama senjata yang tampil di game
     jenis           : pistol / shotgun / smg / ar / sniper / mg
     harga           : harga di toko (mode tim)
     jedaTembak      : detik antar tembakan (makin KECIL = makin cepat)
     damage          : damage per peluru (shotgun: total semua peluru, dibagi ke 3 garis)
     kecepatanPeluru : kecepatan peluru (dikali PELURU_KALI di bawah)
     jumlahPeluru    : jumlah peluru tiap tembakan (dipakai untuk menghitung damage shotgun)
     sebaran         : seberapa menyebar (hanya bot dan mode DARK), 1 = normal
     jarakDekat      : jarak (px) yang damage-nya penuh
     jarakJauh       : jarak maksimal peluru (px) = panjang garis jangkauan
     isiMagasin      : peluru per magasin
     waktuReload     : detik untuk reload
     gambar          : bentuk gambar pixel (lihat catatan "GAMBAR" di bagian bawah)

   Senjata JARAK DEKAT punya bagian sendiri di paling bawah.
   Urutan senjata di daftar = urutan di toko dan galeri. Jangan mencampur jenis.
   ========================================================================== */

// ---------- Pengaturan umum senjata ----------
const PELURU_KALI = 2.0;       // pengali kecepatan SEMUA peluru (naikkan = lebih cepat)
const JARAK_GARIS_SHOTGUN = 0.07; // jarak antar 3 garis shotgun (radian, makin kecil makin rapat)

// Seberapa besar damage berkurang di jarak jauh (0.1 = tinggal 10%, 1 = tidak berkurang)
const DAMAGE_JAUH = { pistol:0.5, shotgun:0.08, smg:0.4, ar:0.5, mg:0.5, sniper:0.85 };

// Tolakan ke belakang tiap menembak (makin besar = makin terdorong)
const TOLAKAN = { pistol:60, shotgun:260, smg:35, ar:50, sniper:320, mg:30 };

// Senjata yang terpilih di menu saat game pertama dibuka (utama, pistol, jarak dekat)
const SENJATA_PILIHAN_AWAL = ['M4A1', 'Glock 17', 'Pisau'];

// ==========================================================================
//                         DAFTAR SENJATA JARAK JAUH
// ==========================================================================
const SENJATA = [
  // ========================== Pistol ==========================
  { nama:'Desert Eagle', jenis:'pistol',
    harga:650,
    jedaTembak:0.55,  damage:34,  kecepatanPeluru:700,  jumlahPeluru:1,  sebaran:0.8,
    jarakDekat:200,  jarakJauh:380,  isiMagasin:7,  waktuReload:1.8,
    gambar:{ badan:5, laras:3, popor:0, magasin:'kecil', scope:0, warna:'perak', gagang:'hitam', tambahan:[] } },

  { nama:'Glock 17', jenis:'pistol',
    harga:200,
    jedaTembak:0.18,  damage:16,  kecepatanPeluru:650,  jumlahPeluru:1,  sebaran:1,
    jarakDekat:180,  jarakJauh:340,  isiMagasin:17,  waktuReload:1.5,
    gambar:{ badan:5, laras:2, popor:0, magasin:'kecil', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'Dual Pistol', jenis:'pistol',
    harga:800,
    jedaTembak:0.14,  damage:9,  kecepatanPeluru:650,  jumlahPeluru:2,  sebaran:1.3,
    jarakDekat:160,  jarakJauh:300,  isiMagasin:30,  waktuReload:2.2,
    gambar:{ badan:4, laras:2, popor:0, magasin:'kecil', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:['ganda'] } },

  { nama:'Pistol and Knife', jenis:'pistol',
    harga:400,
    jedaTembak:0.25,  damage:20,  kecepatanPeluru:650,  jumlahPeluru:1,  sebaran:0.9,
    jarakDekat:180,  jarakJauh:340,  isiMagasin:12,  waktuReload:1.6,
    gambar:{ badan:5, laras:2, popor:0, magasin:'kecil', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:['pisau'] } },

  { nama:'Revolver', jenis:'pistol',
    harga:600,
    jedaTembak:0.7,  damage:40,  kecepatanPeluru:700,  jumlahPeluru:1,  sebaran:0.75,
    jarakDekat:220,  jarakJauh:400,  isiMagasin:6,  waktuReload:2.2,
    gambar:{ badan:4, laras:4, popor:0, magasin:'silinder', scope:0, warna:'perak', gagang:'kayu', tambahan:[] } },

  // ========================== Shotgun ==========================
  { nama:'Benelli M3', jenis:'shotgun',
    harga:1700,
    jedaTembak:0.85,  damage:11,  kecepatanPeluru:560,  jumlahPeluru:7,  sebaran:1.7,
    jarakDekat:110,  jarakJauh:220,  isiMagasin:7,  waktuReload:2.4,
    gambar:{ badan:6, laras:7, popor:4, magasin:'tabung', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'M1887X', jenis:'shotgun',
    harga:1500,
    jedaTembak:0.7,  damage:10,  kecepatanPeluru:560,  jumlahPeluru:6,  sebaran:1.6,
    jarakDekat:100,  jarakJauh:210,  isiMagasin:6,  waktuReload:2.6,
    gambar:{ badan:5, laras:8, popor:4, magasin:'tabung', scope:0, warna:'perak', gagang:'kayu', tambahan:[] } },

  { nama:'M1014', jenis:'shotgun',
    harga:1800,
    jedaTembak:0.45,  damage:8,  kecepatanPeluru:560,  jumlahPeluru:6,  sebaran:1.8,
    jarakDekat:110,  jarakJauh:220,  isiMagasin:7,  waktuReload:2.2,
    gambar:{ badan:6, laras:6, popor:4, magasin:'tabung', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'SPAS-12', jenis:'shotgun',
    harga:1600,
    jedaTembak:0.55,  damage:10,  kecepatanPeluru:560,  jumlahPeluru:7,  sebaran:1.7,
    jarakDekat:120,  jarakJauh:230,  isiMagasin:8,  waktuReload:2.5,
    gambar:{ badan:6, laras:6, popor:3, magasin:'tabung', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:[] } },

  { nama:'USAS-12', jenis:'shotgun',
    harga:2000,
    jedaTembak:0.3,  damage:6,  kecepatanPeluru:560,  jumlahPeluru:6,  sebaran:2,
    jarakDekat:100,  jarakJauh:200,  isiMagasin:20,  waktuReload:3,
    gambar:{ badan:7, laras:5, popor:3, magasin:'panjang', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  // ========================== Submachine Gun ==========================
  { nama:'Thompson', jenis:'smg',
    harga:1200,
    jedaTembak:0.1,  damage:11,  kecepatanPeluru:640,  jumlahPeluru:1,  sebaran:1.4,
    jarakDekat:150,  jarakJauh:300,  isiMagasin:30,  waktuReload:2.4,
    gambar:{ badan:6, laras:4, popor:3, magasin:'drum', scope:0, warna:'hitam', gagang:'kayu', tambahan:[] } },

  { nama:'Dual Uzi', jenis:'smg',
    harga:1500,
    jedaTembak:0.07,  damage:7,  kecepatanPeluru:640,  jumlahPeluru:1,  sebaran:1.7,
    jarakDekat:130,  jarakJauh:260,  isiMagasin:50,  waktuReload:2.8,
    gambar:{ badan:4, laras:2, popor:0, magasin:'panjang', scope:0, warna:'hitam', gagang:'hitam', tambahan:['ganda'] } },

  { nama:'MX4', jenis:'smg',
    harga:1100,
    jedaTembak:0.09,  damage:8,  kecepatanPeluru:640,  jumlahPeluru:1,  sebaran:1.3,
    jarakDekat:150,  jarakJauh:300,  isiMagasin:32,  waktuReload:2,
    gambar:{ badan:5, laras:3, popor:2, magasin:'panjang', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:[] } },

  { nama:'MP7', jenis:'smg',
    harga:1400,
    jedaTembak:0.075,  damage:8,  kecepatanPeluru:650,  jumlahPeluru:1,  sebaran:1.2,
    jarakDekat:170,  jarakJauh:320,  isiMagasin:40,  waktuReload:2.1,
    gambar:{ badan:5, laras:3, popor:2, magasin:'panjang', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'UMP45', jenis:'smg',
    harga:1200,
    jedaTembak:0.095,  damage:10,  kecepatanPeluru:640,  jumlahPeluru:1,  sebaran:1.2,
    jarakDekat:160,  jarakJauh:310,  isiMagasin:25,  waktuReload:2.2,
    gambar:{ badan:6, laras:3, popor:3, magasin:'panjang', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:[] } },

  // ========================== Assault Rifle ==========================
  { nama:'AUG', jenis:'ar',
    harga:3500,
    jedaTembak:0.11,  damage:15,  kecepatanPeluru:750,  jumlahPeluru:1,  sebaran:0.8,
    jarakDekat:260,  jarakJauh:480,  isiMagasin:30,  waktuReload:2.5,
    gambar:{ badan:9, laras:3, popor:0, magasin:'panjang', scope:3, warna:'hijau', gagang:'hitam', tambahan:[] } },

  { nama:'FAMAS', jenis:'ar',
    harga:2250,
    jedaTembak:0.08,  damage:13,  kecepatanPeluru:750,  jumlahPeluru:1,  sebaran:0.9,
    jarakDekat:240,  jarakJauh:450,  isiMagasin:25,  waktuReload:2.3,
    gambar:{ badan:9, laras:2, popor:0, magasin:'panjang', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'M16A4', jenis:'ar',
    harga:3000,
    jedaTembak:0.15,  damage:18,  kecepatanPeluru:760,  jumlahPeluru:1,  sebaran:0.7,
    jarakDekat:300,  jarakJauh:520,  isiMagasin:30,  waktuReload:2.4,
    gambar:{ badan:7, laras:6, popor:4, magasin:'panjang', scope:3, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'AK47', jenis:'ar',
    harga:2500,
    jedaTembak:0.12,  damage:20,  kecepatanPeluru:740,  jumlahPeluru:1,  sebaran:0.9,
    jarakDekat:260,  jarakJauh:460,  isiMagasin:30,  waktuReload:2.6,
    gambar:{ badan:6, laras:6, popor:4, magasin:'lengkung', scope:0, warna:'abuGelap', gagang:'kayu', tambahan:[] } },

  { nama:'M4A1', jenis:'ar',
    harga:3100,
    jedaTembak:0.1,  damage:15,  kecepatanPeluru:750,  jumlahPeluru:1,  sebaran:0.75,
    jarakDekat:270,  jarakJauh:490,  isiMagasin:30,  waktuReload:2.2,
    gambar:{ badan:6, laras:5, popor:3, magasin:'panjang', scope:2, warna:'hitam', gagang:'hitam', tambahan:[] } },

  // ========================== Sniper Rifle ==========================
  { nama:'VSK-94', jenis:'sniper',
    harga:3000,
    jedaTembak:0.5,  damage:28,  kecepatanPeluru:800,  jumlahPeluru:1,  sebaran:0.6,
    jarakDekat:300,  jarakJauh:560,  isiMagasin:10,  waktuReload:2.6,
    gambar:{ badan:7, laras:4, popor:4, magasin:'panjang', scope:4, warna:'abuGelap', gagang:'kayu', tambahan:[] } },

  { nama:'Scout', jenis:'sniper',
    harga:2750,
    jedaTembak:1.2,  damage:60,  kecepatanPeluru:850,  jumlahPeluru:1,  sebaran:0.35,
    jarakDekat:400,  jarakJauh:800,  isiMagasin:10,  waktuReload:2.5,
    gambar:{ badan:7, laras:8, popor:4, magasin:'tidak', scope:4, warna:'hitam', gagang:'kayu', tambahan:[] } },

  { nama:'M24', jenis:'sniper',
    harga:3500,
    jedaTembak:1.7,  damage:80,  kecepatanPeluru:900,  jumlahPeluru:1,  sebaran:0.3,
    jarakDekat:450,  jarakJauh:850,  isiMagasin:5,  waktuReload:3,
    gambar:{ badan:8, laras:9, popor:5, magasin:'tidak', scope:5, warna:'hijau', gagang:'hitam', tambahan:[] } },

  { nama:'AWP', jenis:'sniper',
    harga:4750,
    jedaTembak:2,  damage:100,  kecepatanPeluru:950,  jumlahPeluru:1,  sebaran:0.25,
    jarakDekat:480,  jarakJauh:900,  isiMagasin:10,  waktuReload:3.2,
    gambar:{ badan:8, laras:10, popor:5, magasin:'panjang', scope:5, warna:'hijau', gagang:'hitam', tambahan:['kakiDua'] } },

  { nama:'M95', jenis:'sniper',
    harga:5500,
    jedaTembak:2,  damage:130,  kecepatanPeluru:1000,  jumlahPeluru:1,  sebaran:0.25,
    jarakDekat:500,  jarakJauh:950,  isiMagasin:5,  waktuReload:3.5,
    gambar:{ badan:9, laras:10, popor:4, magasin:'panjang', scope:6, warna:'abuGelap', gagang:'hitam', tambahan:['kakiDua'] } },

  // ========================== Machine Gun ==========================
  { nama:'MK48', jenis:'mg',
    harga:5000,
    jedaTembak:0.09,  damage:14,  kecepatanPeluru:740,  jumlahPeluru:1,  sebaran:1.3,
    jarakDekat:260,  jarakJauh:460,  isiMagasin:100,  waktuReload:4.5,
    gambar:{ badan:8, laras:6, popor:4, magasin:'sabuk', scope:0, warna:'hitam', gagang:'hitam', tambahan:[] } },

  { nama:'QBB-95', jenis:'mg',
    harga:4500,
    jedaTembak:0.08,  damage:12,  kecepatanPeluru:740,  jumlahPeluru:1,  sebaran:1.2,
    jarakDekat:250,  jarakJauh:450,  isiMagasin:80,  waktuReload:4,
    gambar:{ badan:9, laras:3, popor:0, magasin:'drum', scope:0, warna:'hijau', gagang:'hitam', tambahan:[] } },

  { nama:'FN M249', jenis:'mg',
    harga:5750,
    jedaTembak:0.075,  damage:12,  kecepatanPeluru:740,  jumlahPeluru:1,  sebaran:1.4,
    jarakDekat:250,  jarakJauh:450,  isiMagasin:100,  waktuReload:4.6,
    gambar:{ badan:8, laras:7, popor:4, magasin:'sabuk', scope:0, warna:'hitam', gagang:'hitam', tambahan:['kakiDua'] } },

  { nama:'Gatling Gun', jenis:'mg',
    harga:7000,
    jedaTembak:0.04,  damage:8,  kecepatanPeluru:700,  jumlahPeluru:1,  sebaran:2,
    jarakDekat:220,  jarakJauh:400,  isiMagasin:200,  waktuReload:6,
    gambar:{ badan:6, laras:9, popor:0, magasin:'sabuk', scope:0, warna:'abuGelap', gagang:'hitam', tambahan:['larasTebal'] } },

  { nama:'M249 Veteran', jenis:'mg',
    harga:6000,
    jedaTembak:0.07,  damage:13,  kecepatanPeluru:740,  jumlahPeluru:1,  sebaran:1.2,
    jarakDekat:260,  jarakJauh:470,  isiMagasin:120,  waktuReload:4.2,
    gambar:{ badan:8, laras:7, popor:4, magasin:'sabuk', scope:2, warna:'hijau', gagang:'hitam', tambahan:['kakiDua'] } },

];

// ==========================================================================
//                        DAFTAR SENJATA JARAK DEKAT
//   jedaTebas  : detik antar tebasan        damage    : damage tiap tebasan
//   jangkauan  : jarak tebasan (px)         sudut     : lebar busur tebasan (radian, 0 = lurus)
//   jumlahTebasan : 2 = dua kali tebas      berputar  : true = menebas ke segala arah
//   maju       : true = karakter melesat ke depan saat menyerang
//   bentuk     : bentuk gambar (pisau / samurai / kapak / pisauGanda / ular)
// ==========================================================================
const SENJATA_DEKAT = [
  { nama:'Pisau', harga:0, bentuk:'pisau',
    jedaTebas:0.35,  damage:25,  jangkauan:40,  sudut:0.9,  jumlahTebasan:1,  berputar:false,  maju:false },

  { nama:'Samurai', harga:800, bentuk:'samurai',
    jedaTebas:0.6,  damage:45,  jangkauan:75,  sudut:0.8,  jumlahTebasan:1,  berputar:false,  maju:false },

  { nama:'Kapak', harga:600, bentuk:'kapak',
    jedaTebas:0.5,  damage:30,  jangkauan:45,  sudut:0,  jumlahTebasan:1,  berputar:true,  maju:false },

  { nama:'Dual Knife', harga:500, bentuk:'pisauGanda',
    jedaTebas:0.5,  damage:18,  jangkauan:40,  sudut:0.9,  jumlahTebasan:2,  berputar:false,  maju:false },

  { nama:'Serpent Knife', harga:900, bentuk:'ular',
    jedaTebas:0.8,  damage:40,  jangkauan:55,  sudut:0.3,  jumlahTebasan:1,  berputar:false,  maju:true },

];

/* ==========================================================================
   GAMBAR (untuk senjata jarak jauh) - bentuk dirakit dari kotak-kotak pixel:
     badan   : panjang badan senjata       laras  : panjang laras
     popor   : panjang popor (0 = tanpa)   scope  : panjang scope (0 = tanpa)
     magasin : tidak / kecil / panjang / drum / lengkung / sabuk / tabung / silinder
     warna   : perak / abuGelap / hitam / hijau / emas / abu
     gagang  : kayu / hitam
     tambahan: boleh berisi 'ganda' (dua senjata), 'pisau' (ada pisau di bawah),
               'kakiDua' (penopang), 'larasTebal' (laras tebal seperti gatling)
   ========================================================================== */

// ==========================================================================
//  JANGAN UBAH DI BAWAH GARIS INI.
//  Bagian ini menerjemahkan daftar di atas ke format yang dipakai game.
// ==========================================================================
const _WARNA_HURUF = { perak:'m', abuGelap:'d', hitam:'k', kayu:'w', hijau:'g', emas:'y', putih:'b', merah:'r', abu:'s' };
const _MAG_KODE = { tidak:0, kecil:1, panjang:2, drum:3, lengkung:4, sabuk:5, tabung:6, silinder:8 };
const _FLAG_HURUF = { ganda:'D', pisau:'K', kakiDua:'B', larasTebal:'T' };
const _BENTUK_DEKAT = { pisau:'pisau', samurai:'samurai', kapak:'kapak', pisauGanda:'pisauGanda', ular:'ular' };

const CATN = { pistol:'Pistol', shotgun:'Shotgun', smg:'Submachine Gun', ar:'Assault Rifle', sniper:'Sniper Rifle', mg:'Machine Gun', melee:'Jarak dekat' };
const PALW = { m:'#b8c0d0', d:'#59607a', k:'#2a2d3a', w:'#a06a3a', g:'#4a6a45', y:'#e0b040', b:'#eef4ff', r:'#d94a3a', s:'#8a94a8' };
const BSP = PELURU_KALI, SGAP = JARAK_GARIS_SHOTGUN, FALL = DAMAGE_JAUH, RC = TOLAKAN;
const PRICE = {}, WD = {};
const WP = SENJATA.map(s => {
  PRICE[s.nama] = s.harga;
  WD[s.nama] = [s.gambar.badan, s.gambar.laras, s.gambar.popor, _MAG_KODE[s.gambar.magasin], s.gambar.scope,
    _WARNA_HURUF[s.gambar.warna], s.gambar.gagang === 'kayu' ? 'w' : 'k', s.gambar.tambahan.map(t => _FLAG_HURUF[t]).join('')];
  return { n:s.nama, cat:s.jenis, slot:(s.jenis === 'pistol' ? 1 : 0), rate:s.jedaTembak, dmg:s.damage, spd:s.kecepatanPeluru,
    pel:s.jumlahPeluru, sp:s.sebaran, near:s.jarakDekat, far:s.jarakJauh, mag:s.isiMagasin, rl:s.waktuReload };
}).concat(SENJATA_DEKAT.map(s => {
  PRICE[s.nama] = s.harga;
  return { n:s.nama, cat:'melee', slot:2, cd:s.jedaTebas, dmg:s.damage, reach:s.jangkauan, arc:s.sudut,
    hits:s.jumlahTebasan, spin:s.berputar ? 1 : 0, dash:s.maju ? 1 : 0, shape:_BENTUK_DEKAT[s.bentuk] };
}));
