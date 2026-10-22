/* ==========================================================================
   ATUR MEKANIK GAMEPLAY   (file: atur-mekanik.js)

   Semua aturan main ada di sini: target poin, respawn, uang, waktu beli,
   bomb, lompat, jongkok, item di map, armor, granat, dan tingkat kesulitan bot.
   Ubah angkanya, simpan, lalu muat ulang game. Waktu dalam DETIK.
   ========================================================================== */

const MEKANIK = {

  // ======================== TARGET POIN =========================
  // Urutan mode: FFA, Capture Flag, Bomb, Death Match.
  // Angka di TENGAH tiap daftar = pilihan bawaan di menu.
  targetPoin: [
    [50, 100, 150],   // FFA            (poin = jumlah kill)
    [10, 12, 15],     // Capture Flag   (poin = jumlah bendera)
    [3, 5, 7],        // Bomb           (poin = jumlah ronde menang)
    [50, 100, 150],   // Death Match    (poin = jumlah kill tim)
  ],

  // Pilihan jumlah pemain per tim (mode tim)
  pilihanJumlahPerTim: [3, 5, 10],

  // ======================== RESPAWN ==============================
  respawn: {
    waktuTunggu: 4,     // detik menunggu setelah mati
    kebalDetik: 3,      // detik kebal setelah muncul (hilang kalau menembak)
  },

  // ======================== UANG DAN TOKO ========================
  uang: {
    awal: 800,          // uang saat mulai
    maksimal: 16000,    // batas uang
    perKill: 300,       // hadiah tiap kill
    menangRonde: 3000,  // hadiah tim yang menang ronde (mode Bomb)
    kalahRonde: 1400,   // hadiah tim yang kalah ronde
    waktuBeli: 15,      // WAKTU BELI: berapa detik daftar beli terbuka setelah muncul
    radiusBase: 150,    // jarak (px) dari pusat base agar bisa membeli
  },

  // Senjata awal di mode tim (utama, pistol, jarak dekat). Sisanya harus dibeli.
  senjataAwalTim: ['Glock 17', 'Glock 17', 'Pisau'],

  // ======================== MODE BOMB ============================
  bomb: {
    waktuPasang: 5,     // detik menanam bomb (harus diam)
    waktuJinak: 5,      // detik menjinakkan bomb (harus diam)
    waktuLedak: 40,     // detik dari tertanam sampai meledak
    waktuRonde: 100,    // detik waktu satu ronde sebelum tertanam
    jedaRonde: 3.5,     // detik jeda sebelum ronde berikutnya
    radiusSite: 60,     // jarak (px) dari pusat site untuk boleh menanam
    jarakJinak: 70,     // jarak (px) dari bomb untuk boleh menjinakkan
  },

  // ======================== LOMPAT DAN JONGKOK (PC) ==============
  loncat: {
    durasi: 0.6,        // detik lama lompatan
    jeda: 1.3,          // detik jeda sebelum bisa lompat lagi
    tinggi: 22,         // tinggi gambar lompatan (px)
  },
  jongkok: {
    kecepatanKali: 0.5, // kecepatan saat jongkok (0.5 = setengah)
  },

  // ======================== ITEM DI MAP ==========================
  item: {
    lamaSenjataJatuh: 25,   // detik senjata jatuh bertahan di tanah
  },
  buff: {
    durasi: 8,              // detik lama buff
    jedaMuncul: 9,          // tiap berapa detik item buff muncul
    maksimalDiMap: 3,       // jumlah item buff maksimal di map
    kecepatanKali: 1.4,     // buff S: kecepatan x
    damageKali: 1.5,        // buff D: damage x
    perisaiKali: 0.5,       // buff P: damage yang diterima x
    regenPerDetik: 12,      // buff H: HP pulih per detik
    jenis: {                // nama, huruf di bulatan, dan warna
      speed:  { nama:'Kecepatan', huruf:'S', warna:'#5ad1ff' },
      dmg:    { nama:'Damage',    huruf:'D', warna:'#ff6a4a' },
      shield: { nama:'Perisai',   huruf:'P', warna:'#9ab4ff' },
      regen:  { nama:'Regen',     huruf:'H', warna:'#5aff8a' },
    },
  },

  // ======================== PERLENGKAPAN =========================
  perlengkapan: {
    armor:     { harga:650,  poin:100, potong:0.40 },  // potong 0.40 = kurangi damage 40%
    armorHelm: { harga:1000, poin:150, potong:0.55 },  // Armor + Helmet: kurangi damage 55%
    defuseKit: { harga:400 },                           // wajib dimiliki CT untuk menjinakkan bomb
    peluangBotPunyaArmor: 0.6,                          // 0.6 = 60%
    peluangBotPunyaKit: 0.8,
  },

  // ======================== GRANAT ===============================
  // harga       : harga di toko         maks   : jumlah maksimal yang boleh dibawa
  // sumbu       : detik sampai meledak  durasi : detik asap / api bertahan
  // radius      : jangkauan efek (px)   damage : damage ledakan di titik pusat
  granat: {
    jarakLempar: 350,       // jarak lempar maksimal (px)
    he:     { nama:'M67',     namaLengkap:'M67 Hand Grenade', harga:300, maks:2, sumbu:1.6, radius:110, damage:110, warna:'#4a6a45' },
    smoke:  { nama:'Smoke',   namaLengkap:'Smoke',            harga:300, maks:2, durasi:8,  radius:60,  warna:'#aab' },
    bsmoke: { nama:'S.Bomb',  namaLengkap:'Smoke Bomb',       harga:350, maks:2, durasi:12, radius:100, warna:'#778' },
    flash:  { nama:'Flash',   namaLengkap:'Flashbang',        harga:200, maks:2, sumbu:1.2, radius:260, butaMin:1, butaMaks:3.5, warna:'#f4f4f4' },
    molo:   { nama:'Molotov', namaLengkap:'Molotov',          harga:400, maks:2, sumbu:0.5, durasi:5, radius:80, damagePerDetik:30, warna:'#ff8a30' },
    c4:     { nama:'C4',      namaLengkap:'C4',               harga:300, maks:1, sumbu:4,   radius:130, damage:160, warna:'#d94a3a' },
  },
  // Granat yang dimiliki di awal mode FFA (tidak ada toko di FFA)
  granatAwalFFA: { he:1, smoke:1, bsmoke:0, flash:1, molo:1, c4:0 },

  // ======================== TINGKAT KESULITAN BOT ================
  // akurasiBot     : sebaran peluru bot (makin KECIL = makin akurat)
  // jedaTembakBot  : pengali jeda tembak bot (makin BESAR = makin jarang menembak)
  // kecepatanBot   : kecepatan jalan bot
  // damageKeKamu   : pengali damage bot ke pemain (0.5 = setengah)
  // pulihHP        : HP pemain pulih per detik kalau 3 detik tidak kena tembak
  kesulitan: [
    { nama:'Mudah',  akurasiBot:0.18, jedaTembakBot:3.4, kecepatanBot:100, damageKeKamu:0.5,  pulihHP:10 },
    { nama:'Normal', akurasiBot:0.12, jedaTembakBot:2.5, kecepatanBot:118, damageKeKamu:0.75, pulihHP:6 },
    { nama:'Sulit',  akurasiBot:0.07, jedaTembakBot:1.8, kecepatanBot:140, damageKeKamu:1,    pulihHP:0 },
  ],
};

// ==========================================================================
//  JANGAN UBAH DI BAWAH GARIS INI.
//  Bagian ini menerjemahkan pengaturan di atas ke format yang dipakai game.
// ==========================================================================
const BUY_TIME = MEKANIK.uang.waktuBeli;
const DFS = MEKANIK.kesulitan.map(k => ({ n:k.nama, acc:k.akurasiBot, iv:k.jedaTembakBot, spd:k.kecepatanBot, dmg:k.damageKeKamu, reg:k.pulihHP }));
const _P = MEKANIK.perlengkapan;
const EQP = { armor:_P.armor.harga, armorh:_P.armorHelm.harga, kit:_P.defuseKit.harga };
const EQN = { armor:'Armor', armorh:'Armor + Helmet', kit:'Defuse Kit' };
const EQD = {
  armor:  'kurangi damage ' + Math.round(_P.armor.potong * 100) + '% (' + _P.armor.poin + ' poin)',
  armorh: 'kurangi damage ' + Math.round(_P.armorHelm.potong * 100) + '% (' + _P.armorHelm.poin + ' poin)',
  kit:    'wajib CT untuk jinakkan bomb',
};
const GT = ['he', 'smoke', 'bsmoke', 'flash', 'molo', 'c4'];
const GRP = {}, GN = {}, GN2 = {}, GCOL = {}, GRAD = {};
for (const k of GT) {
  const g = MEKANIK.granat[k];
  GRP[k] = g.harga; GN[k] = g.nama; GN2[k] = g.namaLengkap; GCOL[k] = g.warna;
  if (k !== 'c4') GRAD[k] = g.radius;
}
const BUFFC = {}, BUFFL = {}, BUFFN = {};
for (const k in MEKANIK.buff.jenis) {
  const b = MEKANIK.buff.jenis[k];
  BUFFC[k] = b.warna; BUFFL[k] = b.huruf; BUFFN[k] = b.nama;
}
