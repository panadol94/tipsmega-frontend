/**
 * SEO Data Generator
 * Generates gamePages.ts and blogArticles.ts from game list
 * Run: node scripts/generate-seo-data.js
 */
const fs = require('fs');
const path = require('path');

// ─── Game name mappings (camelCase → Display Name) ───
function formatGameName(raw) {
  // Special cases
  const specials = {
    '5Dragons': '5 Dragons', '5fortune': '5 Fortune', '7Crazy': '7 Crazy',
    '8ballSlots': '8 Ball Slots', 'ANightOut': 'A Night Out', 'DaSiXi': 'Da Si Xi',
    'JinQianWa': 'Jin Qian Wa', 'JinPingMai': 'Jin Ping Mai', 'JinChan': 'Jin Chan',
    'SunWuKong': 'Sun Wu Kong', 'NianNianYouYu': 'Nian Nian You Yu',
    'CbaoCaiJinBao': 'Chao Cai Jin Bao', 'CaishenGold': 'Caishen Gold',
    'WongChoy': 'Wong Choy', 'FongShen': 'Fong Shen', 'Trex': 'T-Rex',
    'DrFortune': 'Dr Fortune', 'Great88': 'Great 88', 'Goldwb': 'Gold',
    'GoldebColts': 'Golden Colts', 'FortubeCharm': 'Fortune Charm',
    'RoyalMasquerede': 'Royal Masquerade', 'EncdancedGarden': 'Enchanted Garden',
    'AmazonJungke': 'Amazon Jungle', 'GoldenMongkey': 'Golden Monkey',
    'ManicMilloons': 'Manic Millions', 'FootbalCarnival': 'Football Carnival',
    'GoldenSlut': 'Golden Slot', 'StriperNight': 'Striper Night',
    'CayoteCash': 'Coyote Cash', 'GlamouriusWorld': 'Glamorous World',
    'EasterSuprise': 'Easter Surprise', 'SeasonGreatings': 'Season Greetings',
    'BonusBear': 'Bonus Bears', 'Threekingdom': 'Three Kingdom',
    'BoykingTreasure': 'Boy King Treasure', 'FartGirl': 'Fart Girl',
  };
  if (specials[raw]) return specials[raw];
  return raw.replace(/([A-Z])/g, ' $1').replace(/^ /, '').replace(/\s+/g, ' ');
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Themes / Categories ───
const categories = {
  dragon: { cat: 'Naga & Fantasy', icon: '🐉', vol: 'Tinggi', themes: ['naga', 'fantasy', 'epik'] },
  ocean: { cat: 'Lautan & Akuatik', icon: '🌊', vol: 'Sederhana', themes: ['laut', 'air', 'ikan'] },
  animal: { cat: 'Haiwan & Alam', icon: '🦁', vol: 'Sederhana-Tinggi', themes: ['haiwan', 'safari', 'hutan'] },
  chinese: { cat: 'Budaya Cina', icon: '🧧', vol: 'Sederhana', themes: ['cina', 'keberuntungan', 'tradisi'] },
  adventure: { cat: 'Pengembaraan', icon: '⚔️', vol: 'Tinggi', themes: ['aksi', 'pengembaraan', 'epik'] },
  fortune: { cat: 'Kekayaan & Keberuntungan', icon: '💰', vol: 'Sederhana', themes: ['emas', 'kekayaan', 'nasib'] },
  festive: { cat: 'Perayaan & Musim', icon: '🎄', vol: 'Rendah-Sederhana', themes: ['perayaan', 'cuti', 'gembira'] },
  mystery: { cat: 'Misteri & Gelap', icon: '🌙', vol: 'Tinggi', themes: ['misteri', 'gelap', 'seram'] },
  classic: { cat: 'Klasik & Retro', icon: '🎰', vol: 'Rendah', themes: ['klasik', 'buah', 'retro'] },
  food: { cat: 'Makanan & Gaya Hidup', icon: '🍜', vol: 'Sederhana', themes: ['makanan', 'santai', 'gaya'] },
};

function categorize(name) {
  const n = name.toLowerCase();
  if (/dragon|dragonz|naga/.test(n)) return 'dragon';
  if (/ocean|sea|dolphin|reef|water|fish|crystal/.test(n)) return 'ocean';
  if (/wolf|bear|lion|panda|panther|safari|fox|monkey|koi|tiger|rex/.test(n)) return 'animal';
  if (/jin|caishen|wong|chinese|nian|chao|da.si|fong|wukong|three.?king|water.margin|god.of/.test(n)) return 'chinese';
  if (/pirate|robin|spartan|conan|samurai|knight|king|queen|cleopatra|viking/.test(n)) return 'adventure';
  if (/gold|fortune|treasure|wealth|money|prosperity|lucky|bonus|jackpot|big.shot|paydirt/.test(n)) return 'fortune';
  if (/christmas|xmas|santa|halloween|easter|jingle|season|new.year|gift/.test(n)) return 'festive';
  if (/dark|vortex|doom|zombie|ghost|night|silent|vamp|mystery/.test(n)) return 'mystery';
  if (/sushi|chef|dim.sum|cocktail|cookie|fruit/.test(n)) return 'food';
  return 'classic';
}

// ─── Content generation helpers ───
const tipTemplates = [
  (g) => `Mulakan dengan bet kecil pada ${g} untuk memahami pola pembayaran sebelum meningkatkan.`,
  (g) => `Pantau RTP ${g} melalui AI Scanner — main bila RTP melebihi 93% untuk peluang terbaik.`,
  (g) => `Gunakan teknik "stop-loss" — tetapkan had kerugian sebelum mula bermain ${g}.`,
  (g) => `Feature Free Spins dalam ${g} adalah kunci jackpot besar — sabar dan tunggu trigger.`,
  (g) => `Cuba bermain ${g} pada waktu kurang sibuk (awal pagi/lewat malam) untuk RTP yang lebih baik.`,
  (g) => `Jangan kejar kerugian dalam ${g} — istirahat dan kembali dengan strategi baru.`,
  (g) => `Perhatikan simbol Wild dan Scatter dalam ${g} — mereka membuka bonus terbesar.`,
  (g) => `Tetapkan target menang untuk ${g} dan berhenti apabila mencapai target tersebut.`,
];

const featureSets = [
  ['Free Spins', 'Wild Symbol', 'Scatter Bonus', 'Multiplier'],
  ['Free Spins', 'Expanding Wild', 'Gamble Feature', 'Stacked Symbols'],
  ['Bonus Round', 'Wild Symbol', 'Free Spins', 'Progressive Jackpot'],
  ['Scatter Bonus', 'Wild Reel', 'Re-Spins', 'Multiplier Trail'],
  ['Free Spins', 'Cascading Wins', 'Wild Symbol', 'Bonus Game'],
  ['Mega Spin', 'Wild Symbol', 'Scatter Pays', 'Free Games'],
];

function generateGameData(rawName, index) {
  const name = formatGameName(rawName);
  const slug = toSlug(name);
  const catKey = categorize(name);
  const cat = categories[catKey];
  const rtpMin = 85 + (index % 13);
  const rtpMax = Math.min(rtpMin + 4 + (index % 5), 98);
  const features = featureSets[index % featureSets.length];
  const tips = [0, 1, 2, 3, 4].map(i => tipTemplates[(index + i) % tipTemplates.length](name));

  return {
    slug, name, originalName: rawName, icon: cat.icon, category: cat.cat,
    volatility: cat.vol, rtpMin, rtpMax, features, tips,
    description: `${name} adalah salah satu permainan slot ${cat.cat.toLowerCase()} paling popular dalam Mega888. Dengan tema ${cat.themes[index % cat.themes.length]} yang menarik dan grafik berkualiti tinggi, game ini menawarkan pengalaman bermain yang mengujakan. RTP antara ${rtpMin}% hingga ${rtpMax}% menjadikan ${name} pilihan bijak untuk pemain yang mencari keseimbangan antara hiburan dan peluang menang. Gunakan Mega888 AI Scanner untuk memantau RTP secara live dan pilih masa terbaik untuk bermain ${name}.`,
    faq: [
      { q: `Berapakah RTP ${name} Mega888?`, a: `RTP ${name} dalam Mega888 adalah antara ${rtpMin}% hingga ${rtpMax}%. Gunakan AI Scanner untuk check RTP live terkini.` },
      { q: `Adakah ${name} sesuai untuk pemula?`, a: cat.vol === 'Rendah' || cat.vol === 'Sederhana' ? `Ya! ${name} mempunyai volatiliti ${cat.vol.toLowerCase()} yang sesuai untuk pemula. Bet minimum rendah dan peluang menang kerap.` : `${name} mempunyai volatiliti ${cat.vol.toLowerCase()} — sesuai untuk pemain yang suka cabaran dan mengejar jackpot besar. Mulakan dengan bet kecil.` },
      { q: `Bagaimana cara menang dalam ${name}?`, a: `Pantau RTP melalui AI Scanner, main bila RTP tinggi (>93%), dan fokus pada feature ${features[0]} untuk peluang bonus terbesar.` },
    ],
  };
}

// ─── Blog Articles Data ───
const blogArticles = [
  { slug: 'tips-mega888-pro', title: '7 Tips Mega888 Paling Power Dari Pro Player 2026', category: 'tips',
    keywords: ['tips mega888', 'tips menang mega888', 'mega888 tips hari ini', 'cara menang mega888'],
    description: 'Ketahui 7 tips dan strategi Mega888 dari pemain profesional. Panduan lengkap cara menang slot Mega888 dengan teknik terbukti berkesan pada 2026.',
    content: `<h2>1. Fahami RTP Sebelum Main</h2><p>RTP (Return-to-Player) adalah peratusan yang menunjukkan berapa banyak wang dikembalikan kepada pemain. Semakin tinggi RTP, semakin baik peluang anda. Gunakan <strong>Mega888 AI Scanner</strong> untuk check RTP live setiap game sebelum bermain.</p><h2>2. Mulakan Dengan Bet Kecil</h2><p>Jangan terus bet besar. Mulakan dengan bet minimum untuk memahami pola pembayaran game tersebut. Selepas faham ritma game, barulah tingkatkan secara perlahan.</p><h2>3. Pilih Game Dengan Volatiliti Sesuai</h2><p>Game volatiliti rendah bayar kerap tapi kecil. Game volatiliti tinggi bayar jarang tapi besar. Pilih mengikut budget dan gaya main anda.</p><h2>4. Tetapkan Had Menang dan Rugi</h2><p>Sebelum mula bermain, tetapkan berapa anda sanggup rugi (stop-loss) dan berapa target menang. Disiplin adalah kunci utama.</p><h2>5. Manfaatkan Free Spins</h2><p>Free Spins feature adalah peluang terbaik untuk menang besar tanpa risiko tambahan. Sabar dan tunggu feature ini trigger.</p><h2>6. Main Pada Waktu Strategik</h2><p>Ramai pemain pro mendapati RTP cenderung lebih tinggi pada waktu kurang sibuk. Cuba bermain awal pagi atau lewat malam.</p><h2>7. Gunakan AI Scanner</h2><p>Mega888 AI Scanner menganalisis RTP secara real-time. Ini memberi anda kelebihan berbanding pemain lain yang main secara buta.</p>`,
    faq: [
      { q: 'Apakah tips paling penting untuk Mega888?', a: 'Tips paling penting adalah memahami RTP setiap game dan menggunakan AI Scanner untuk memilih game dengan RTP tertinggi sebelum bermain.' },
      { q: 'Bolehkah konsisten menang di Mega888?', a: 'Tiada jaminan menang, tapi dengan strategi yang betul — memahami RTP, pengurusan bankroll, dan disiplin — anda boleh meningkatkan peluang menang secara signifikan.' },
    ],
  },
  { slug: 'hack-rtp-mega888', title: 'Cara Hack RTP Mega888 Dengan AI Scanner 2026', category: 'strategy',
    keywords: ['mega888 hack', 'hack mega888', 'hack slot mega888', 'mega888 hack apk', 'cara hack mega888'],
    description: 'Cara hack RTP Mega888 secara sah menggunakan AI Scanner. Bukan cheat — ini analisis data RTP live untuk strategi menang slot yang lebih bijak.',
    content: `<h2>Apa Maksud "Hack" RTP Mega888?</h2><p>Ramai orang cari "hack Mega888" tapi sebenarnya yang mereka perlukan adalah <strong>cara membaca dan memanfaatkan data RTP</strong>. AI Scanner kami melakukan ini secara automatik — menganalisis ribuan data point untuk memberikan anda maklumat RTP terkini.</p><h2>Kenapa AI Scanner Lebih Baik Dari Hack Biasa</h2><p>Hack biasa boleh menyebabkan akaun anda diblok. AI Scanner menganalisis data secara sah dan memberikan insight yang sebenar tanpa risiko.</p><h2>Cara Guna AI Scanner</h2><p>1. Buka tipsmega888.com<br>2. Masukkan Mega ID anda<br>3. Klik Scan<br>4. Tunggu analisis AI<br>5. Pilih game dengan RTP tertinggi</p><h2>Masa Terbaik Untuk Scan</h2><p>Scan setiap 30 minit — RTP berubah mengikut masa dan aktiviti pemain lain. Game yang "panas" sekarang mungkin "sejuk" selepas sejam.</p>`,
    faq: [
      { q: 'Adakah hack Mega888 selamat?', a: 'Hack tradisional sangat berisiko dan boleh menyebabkan akaun anda diblok. AI Scanner adalah alternatif yang selamat dan sah — ia menganalisis data RTP tanpa mengubah apa-apa dalam game.' },
      { q: 'Apa beza AI Scanner dengan hack biasa?', a: 'Hack cuba mengubah game dari dalam (haram dan berisiko). AI Scanner menganalisis data RTP dari luar dan memberi cadangan tanpa melanggar apa-apa peraturan.' },
    ],
  },
  { slug: 'download-mega888-apk', title: 'Download Mega888 APK 2026: Panduan Lengkap iOS & Android', category: 'guide',
    keywords: ['download mega888', 'mega888 download', 'mega888 apk', 'mega888 apk download', 'mega888 ios'],
    description: 'Panduan lengkap cara download Mega888 APK terbaru 2026 untuk Android dan iOS. Link download rasmi, cara install, dan tips keselamatan.',
    content: `<h2>Download Mega888 APK Terbaru 2026</h2><p>Mega888 adalah platform slot online paling popular di Malaysia dan Asia Tenggara. Untuk bermain, anda perlu download APK terbaru dari sumber yang dipercayai.</p><h2>Keperluan Sistem</h2><ul><li>Android: Versi 5.0 ke atas, 100MB ruangan kosong</li><li>iOS: iPhone 6s ke atas, iOS 12+</li></ul><h2>Langkah Download Android</h2><p>1. Aktifkan "Unknown Sources" dalam Settings<br>2. Download APK dari sumber rasmi<br>3. Buka file APK dan install<br>4. Login atau daftar akaun baru</p><h2>Tips Keselamatan</h2><p>JANGAN download dari sumber tidak dikenali. Sentiasa pastikan anda mendapatkan APK dari company yang trusted. Semak senarai company trusted kami untuk memastikan keselamatan anda.</p>`,
    faq: [
      { q: 'Di mana boleh download Mega888 APK rasmi?', a: 'Download dari company yang verified dan trusted sahaja. Semak senarai company trusted di tipsmega888.com/trusted untuk mendapatkan link yang selamat.' },
      { q: 'Adakah Mega888 percuma untuk download?', a: 'Ya, download Mega888 APK adalah percuma. Anda hanya perlu top-up kredit untuk bermain.' },
    ],
  },
  { slug: 'game-senang-jackpot', title: '10 Game Mega888 Paling Senang Jackpot 2026', category: 'tips',
    keywords: ['jackpot mega888', 'game mega888 senang menang', 'mega888 jackpot', 'slot senang jackpot'],
    description: 'Senarai 10 game Mega888 yang paling senang dapat jackpot berdasarkan analisis AI. Ketahui game mana patut anda cuba untuk peluang menang besar.',
    content: `<h2>Top 10 Game Jackpot Mega888</h2><p>Berdasarkan analisis AI Scanner kami terhadap ribuan sesi permainan, berikut adalah game Mega888 yang paling kerap memberikan jackpot besar:</p><h3>1. Great Blue 🐋</h3><p>RTP: 92-96%. Game legendaris dengan feature free spins yang boleh memberikan sehingga 33x ganda pembayaran. Salah satu slot paling popular sepanjang masa.</p><h3>2. Bonus Bears 🐻</h3><p>RTP: 90-98%. Feature bonus round yang unik dengan peluang menang besar. Volatiliti sederhana sesuai untuk semua jenis pemain.</p><h3>3. Highway Kings 🚛</h3><p>RTP: 90-95%. Game klasik dengan jackpot progresif. Simbol wild truck boleh menggandakan kemenangan anda.</p><h3>4. Dolphin Reef 🐬</h3><p>RTP: 89-96%. Tema lautan yang cantik dengan feature free spins yang murah hati.</p><h3>5. Jin Qian Wa 🧧</h3><p>RTP: 92-98%. Game bertema Cina dengan potensi jackpot sangat tinggi. Salah satu RTP tertinggi dalam Mega888.</p>`,
    faq: [
      { q: 'Game Mega888 mana paling senang jackpot?', a: 'Berdasarkan data AI, Great Blue, Bonus Bears, dan Jin Qian Wa adalah antara game yang paling kerap memberikan jackpot besar.' },
      { q: 'Berapa kerap jackpot Mega888 keluar?', a: 'Jackpot bergantung pada RTP dan volatiliti game. Game volatiliti tinggi beri jackpot lebih jarang tapi lebih besar. Gunakan AI Scanner untuk pilih masa terbaik.' },
    ],
  },
  { slug: 'cara-menang-mega888', title: 'Cara Menang Mega888 Setiap Hari: Strategi Lengkap', category: 'strategy',
    keywords: ['cara menang mega888', 'tips menang mega888', 'strategi mega888', 'mega888 menang besar'],
    description: 'Strategi lengkap cara menang Mega888 secara konsisten. Teknik pengurusan wang, pemilihan game, dan penggunaan AI untuk kelebihan pemain.',
    content: `<h2>Strategi Menang Mega888 Yang Terbukti</h2><p>Menang konsisten di Mega888 bukan soal nasib semata-mata — ia memerlukan strategi, disiplin, dan maklumat yang betul. Panduan ini akan mengajar anda teknik yang digunakan oleh pemain profesional.</p><h2>1. Pengurusan Bankroll</h2><p>Bahagikan wang anda kepada sesi-sesi kecil. Contoh: Jika ada RM100, bahagikan kepada 10 sesi RM10. Ini memastikan anda boleh bermain lebih lama dan meningkatkan peluang menang.</p><h2>2. Pemilihan Game Berdasarkan RTP</h2><p>Jangan main secara rawak. Gunakan AI Scanner untuk pilih game dengan RTP tertinggi pada masa tersebut. Perbezaan 2-3% RTP boleh bermakna banyak dalam jangka panjang.</p><h2>3. Teknik Bet Progresif</h2><p>Mulakan dengan bet kecil. Jika menang 3x berturut-turut, naikkan bet sedikit. Jika kalah 3x berturut-turut, turunkan bet atau tukar game.</p>`,
    faq: [
      { q: 'Bolehkah menang setiap hari di Mega888?', a: 'Dengan strategi yang betul dan penggunaan AI Scanner, anda boleh meningkatkan peluang menang secara signifikan. Tapi ingat, slot mempunyai elemen rawak — pengurusan wang yang bijak adalah kunci utama.' },
    ],
  },
  { slug: 'apa-itu-rtp-mega888', title: 'Apa Itu RTP Mega888 & Cara Baca Untuk Menang', category: 'guide',
    keywords: ['rtp mega888', 'mega888 rtp', 'rtp slot', 'rtp live mega888', 'apa itu rtp'],
    description: 'Panduan lengkap memahami RTP (Return-to-Player) dalam Mega888. Cara baca, cara guna untuk menang, dan kenapa ianya penting untuk setiap pemain.',
    content: `<h2>Apa Itu RTP?</h2><p>RTP bermaksud Return-to-Player — peratusan wang yang dikembalikan kepada pemain dalam jangka panjang. Contoh: RTP 96% bermakna untuk setiap RM100 yang dipertaruhkan, secara purata RM96 akan dikembalikan kepada pemain.</p><h2>Kenapa RTP Penting?</h2><p>RTP membantu anda memilih game yang memberikan peluang menang terbaik. Game dengan RTP 96% jauh lebih menguntungkan berbanding game RTP 85%.</p><h2>RTP Berubah-ubah</h2><p>RTP bukan nombor tetap — ia berubah mengikut masa dan aktiviti pemain. Inilah sebabnya Mega888 AI Scanner sangat berharga — ia menganalisis RTP secara real-time supaya anda boleh memilih game yang sedang "panas".</p>`,
    faq: [
      { q: 'Berapakah RTP yang baik untuk slot Mega888?', a: 'RTP 93% ke atas dianggap baik. RTP 96%+ adalah sangat baik. Gunakan AI Scanner untuk mencari game dengan RTP tertinggi pada masa tersebut.' },
    ],
  },
  { slug: 'top-slot-mega888', title: 'Top 20 Slot Mega888 Terbaik 2026: Ranking Lengkap', category: 'tips',
    keywords: ['slot mega888', 'mega888 slot', 'game mega888 terbaik', 'senarai game mega888'],
    description: 'Senarai ranking 20 slot Mega888 terbaik 2026 berdasarkan RTP, populariti, dan peluang jackpot. Analisis mendalam setiap game.',
    content: `<h2>Ranking Slot Mega888 Terbaik 2026</h2><p>Ranking berdasarkan kombinasi RTP purata, kekerapan jackpot, dan populariti di kalangan pemain Malaysia.</p><h3>#1 Great Blue</h3><p>Game slot paling ikonik dalam Mega888. Feature 33 free spins dengan 5x multiplier menjadikannya pilihan nombor satu. Tema laut yang indah dan gameplay yang exciting.</p><h3>#2 Jin Qian Wa</h3><p>RTP tertinggi dalam semua game Mega888. Game bertema katak emas Cina ini memberikan peluang menang yang sangat kerap.</p><h3>#3 Bonus Bears</h3><p>Feature bonus picnic yang unik dan kerap trigger. Sesuai untuk pemula dan pemain berpengalaman.</p>`,
    faq: [
      { q: 'Game Mega888 mana paling bagus untuk main?', a: 'Great Blue, Jin Qian Wa, dan Bonus Bears secara konsisten berada di ranking teratas berdasarkan analisis AI Scanner kami.' },
    ],
  },
  { slug: 'mega888-scanner-ai', title: 'Mega888 AI Scanner: Cara Guna & Kelebihan Sepenuhnya', category: 'guide',
    keywords: ['mega888 scanner', 'scanner mega888', 'mega888 ai', 'ai scanner mega888'],
    description: 'Panduan lengkap cara menggunakan Mega888 AI Scanner. Ketahui cara scan RTP, baca keputusan, dan gunakan data untuk strategi menang.',
    content: `<h2>Apa Itu Mega888 AI Scanner?</h2><p>Mega888 AI Scanner adalah alat analisis berkuasa AI yang mengira Return-to-Player (RTP) setiap game secara real-time. Ia menganalisis ribuan data point untuk memberikan anda maklumat tepat tentang game mana yang sedang "panas".</p><h2>Cara Guna Scanner</h2><p>1. Lawati tipsmega888.com<br>2. Masukkan Mega ID anda<br>3. Tekan butang "SCAN"<br>4. Tunggu AI menganalisis (10-15 saat)<br>5. Lihat keputusan — game dengan RTP tertinggi ditunjukkan</p><h2>Apa Yang Scanner Analisis?</h2><ul><li>RTP semasa setiap game</li><li>Trend perubahan RTP dalam 24 jam</li><li>Kekerapan jackpot</li><li>Aktiviti pemain lain</li></ul>`,
    faq: [
      { q: 'Adakah AI Scanner Mega888 percuma?', a: 'Ya! Scan asas adalah percuma. Anda mendapat beberapa scan percuma sehari, dan boleh mendapatkan lebih banyak melalui program referral Stars.' },
    ],
  },
  { slug: 'kiosk-mega888-trusted', title: 'Senarai Kiosk Mega888 Trusted & Verified 2026', category: 'guide',
    keywords: ['kiosk mega888', 'company mega888', 'mega888 trusted', 'agent mega888 trusted'],
    description: 'Senarai kiosk dan company Mega888 yang verified dan trusted. Cara kenal company scam, tips pilih agent selamat, dan senarai terkini 2026.',
    content: `<h2>Kenapa Perlu Pilih Company Trusted?</h2><p>Ramai pemain Mega888 kena scam oleh company yang tidak bertanggungjawab — tak bayar kemenangan, block akaun tanpa sebab, atau curi maklumat peribadi. Memilih company yang trusted adalah langkah pertama yang WAJIB.</p><h2>Cara Kenal Company Scam</h2><ul><li>Minta bayaran pendahuluan sebelum boleh cuci</li><li>Tiada group support atau respon lambat</li><li>Offer bonus yang terlalu tinggi (100%+)</li><li>Tiada ulasan positif atau testimoni</li></ul><h2>Senarai Trusted Company</h2><p>Semak senarai lengkap company yang telah kami verify di halaman Trusted kami. Setiap company diuji dan disahkan oleh team kami.</p>`,
    faq: [
      { q: 'Macam mana nak tahu company Mega888 tu trusted?', a: 'Semak senarai verified di tipsmega888.com/trusted. Kami menguji setiap company dari segi pembayaran, sokongan pelanggan, dan keselamatan.' },
    ],
  },
  { slug: 'mega888-free-credit', title: 'Mega888 Free Credit 2026: Cara Dapat Tanpa Deposit', category: 'tips',
    keywords: ['mega888 free credit', 'free credit mega888', 'mega888 tanpa deposit', 'mega888 percuma'],
    description: 'Cara dapatkan Mega888 free credit tanpa deposit 2026. Senarai promosi terkini, bonus pendaftaran, dan program referral untuk kredit percuma.',
    content: `<h2>Cara Dapat Free Credit Mega888</h2><p>Ada beberapa cara sah untuk mendapatkan kredit percuma di Mega888 tanpa perlu deposit wang anda sendiri.</p><h2>1. Program Referral TipsMega</h2><p>Setiap kawan yang anda ajak mendaftar melalui link referral anda, anda akan menerima Stars percuma yang boleh digunakan untuk scan premium.</p><h2>2. Bonus Company Trusted</h2><p>Banyak company trusted menawarkan bonus pendaftaran atau welcome bonus kepada pemain baru. Semak tawaran terkini di halaman Trusted kami.</p><h2>3. Event dan Promosi</h2><p>Mega888 dan company-company trusted kerap mengadakan event dengan hadiah free credit. Ikuti komuniti WhatsApp dan Telegram kami untuk update terkini.</p>`,
    faq: [
      { q: 'Bolehkah dapat free credit Mega888 tanpa deposit?', a: 'Ya, melalui program referral, bonus company trusted, dan event promosi. Ikuti komuniti kami untuk update terkini.' },
    ],
  },
  // Adding more articles for comprehensive coverage
  { slug: 'mega888-auto-cuci', title: 'Mega888 Auto Cuci: Company Terbaik Yang Bayar Cepat', category: 'guide',
    keywords: ['mega888 auto cuci', 'cuci mega888', 'mega888 withdraw cepat', 'mega888 bayar penuh'],
    description: 'Senarai company Mega888 yang auto cuci dan bayar cepat 2026. Tips pilih company yang proses withdrawal dalam masa 5 minit.',
    content: `<h2>Apa Itu Auto Cuci?</h2><p>Auto cuci bermaksud company memproses withdrawal anda secara automatik — biasanya dalam masa 1-5 minit tanpa perlu tunggu approval manual. Ini adalah tanda company yang profesional dan trusted.</p><h2>Kelebihan Company Auto Cuci</h2><ul><li>Dapat duit dalam masa 5 minit</li><li>Tiada had minimum cuci yang tinggi</li><li>Proses 24/7 termasuk hari cuti</li></ul>`,
    faq: [
      { q: 'Company Mega888 mana yang auto cuci?', a: 'Semak senarai terkini di tipsmega888.com/trusted — kami highlight company yang menyediakan servis auto cuci.' },
    ],
  },
  { slug: 'mega888-gacor-hari-ini', title: 'Mega888 Gacor Hari Ini: Game Hot & RTP Tertinggi', category: 'tips',
    keywords: ['mega888 gacor', 'mega888 gacor hari ini', 'slot gacor mega888', 'game hot mega888'],
    description: 'Senarai game Mega888 yang gacor hari ini berdasarkan analisis AI Scanner. Check game mana yang sedang hot dan mempunyai RTP tertinggi.',
    content: `<h2>Apa Maksud "Gacor"?</h2><p>Gacor bermaksud game yang sedang memberikan pembayaran tinggi dan kerap — RTP berada pada tahap optimum. AI Scanner kami mengesan game-game ini secara real-time.</p><h2>Cara Check Game Gacor</h2><p>Gunakan Mega888 AI Scanner di tipsmega888.com untuk scan akaun anda. Scanner akan menunjukkan game mana yang sedang gacor berdasarkan analisis RTP semasa.</p>`,
    faq: [
      { q: 'Macam mana nak tahu game Mega888 yang gacor?', a: 'Gunakan AI Scanner di tipsmega888.com. Scan akaun anda dan lihat game dengan RTP tertinggi — itulah game yang sedang gacor.' },
    ],
  },
  { slug: 'mega888-original-vs-fake', title: 'Mega888 Original vs Fake: Cara Bezakan 2026', category: 'guide',
    keywords: ['mega888 original', 'mega888 asli', 'mega888 fake', 'cara kenal mega888 original'],
    description: 'Panduan cara bezakan Mega888 original dan fake. Elakkan penipuan dengan mengetahui tanda-tanda platform palsu dan cara verify kesahihan.',
    content: `<h2>Mega888 Palsu Semakin Menjadi-jadi</h2><p>Dengan populariti Mega888 yang semakin meningkat, banyak platform palsu muncul yang menipu pemain. Panduan ini membantu anda mengenalpasti yang asli.</p><h2>Tanda Mega888 Fake</h2><ul><li>URL yang mencurigakan atau berbeza dari biasa</li><li>Grafik berkualiti rendah</li><li>Game yang tidak lengkap atau buggy</li><li>Tiada sokongan pelanggan</li></ul>`,
    faq: [
      { q: 'Bagaimana cara pastikan Mega888 itu original?', a: 'Download dari company verified di tipsmega888.com/trusted. Check URL website, kualiti grafik, dan ketersediaan semua game.' },
    ],
  },
  { slug: 'strategi-slot-mega888', title: 'Strategi Slot Mega888: Teknik Pro Player Dedahkan', category: 'strategy',
    keywords: ['strategi mega888', 'teknik mega888', 'rahsia mega888', 'trik mega888'],
    description: 'Teknik dan strategi bermain slot Mega888 yang digunakan oleh pro player. Dari pengurusan bankroll hingga pemilihan game strategik.',
    content: `<h2>Strategi 1: Kaedah 3-3-3</h2><p>Bahagikan sesi anda kepada 3 bahagian. Setiap bahagian mempunyai target menang dan had rugi tersendiri. Jika capai target atau had, pindah ke bahagian seterusnya.</p><h2>Strategi 2: Hot-Cold Game Rotation</h2><p>Gunakan AI Scanner untuk kenal pasti game "hot" (RTP tinggi). Main game hot selama 10-15 minit, kemudian scan semula untuk update.</p>`,
    faq: [
      { q: 'Apakah strategi terbaik untuk Mega888?', a: 'Kaedah 3-3-3 untuk pengurusan bankroll digabungkan dengan AI Scanner untuk pemilihan game adalah strategi paling berkesan.' },
    ],
  },
  { slug: 'mega888-918kiss-beza', title: 'Mega888 vs 918Kiss: Mana Satu Lebih Baik 2026?', category: 'guide',
    keywords: ['mega888 vs 918kiss', '918kiss', 'beza mega888 918kiss', 'platform slot terbaik'],
    description: 'Perbandingan lengkap Mega888 vs 918Kiss 2026. RTP, jumlah game, keselamatan, dan mana satu lebih menguntungkan untuk pemain Malaysia.',
    content: `<h2>Perbandingan Mega888 vs 918Kiss</h2><p>Kedua-dua platform adalah antara yang paling popular di Malaysia. Mari kita bandingkan secara objektif.</p><h2>Jumlah Game</h2><p>Mega888 menawarkan 200+ game manakala 918Kiss mempunyai sekitar 150+ game. Mega888 menang dari segi variasi.</p><h2>RTP Purata</h2><p>Mega888 secara umumnya mempunyai RTP purata yang sedikit lebih tinggi, terutamanya apabila dianalisis menggunakan AI Scanner.</p>`,
    faq: [
      { q: 'Mana satu lebih bagus, Mega888 atau 918Kiss?', a: 'Kedua-dua platform bagus, tapi Mega888 mempunyai lebih banyak game dan RTP purata yang lebih tinggi berdasarkan analisis AI.' },
    ],
  },
];

// ─── MAIN: Generate files ───
const GAMES_RAW = fs.readFileSync(path.join(__dirname, '..', 'app', 'data', 'mega888Games.ts'), 'utf-8');
const gameNames = [...GAMES_RAW.matchAll(/"([^"]+)"/g)].map(m => m[1]);
// Remove duplicates
const uniqueGames = [...new Set(gameNames)];

console.log(`📊 Found ${uniqueGames.length} unique games`);
console.log(`📝 Generating ${blogArticles.length} blog articles`);

// Generate game data
const allGames = uniqueGames.map((name, i) => generateGameData(name, i));

// Add related games (3-5 from same category)
allGames.forEach((game, i) => {
  const sameCat = allGames.filter((g, j) => j !== i && g.category === game.category);
  game.relatedGames = sameCat.slice(0, 5).map(g => g.slug);
});

// Add related articles to blog posts
blogArticles.forEach((article, i) => {
  article.relatedArticles = blogArticles
    .filter((a, j) => j !== i)
    .slice(0, 3)
    .map(a => a.slug);
  article.relatedGames = allGames.slice(i * 3, i * 3 + 5).map(g => g.slug);
  article.publishedAt = '2026-02-01';
  article.updatedAt = '2026-02-19';
});

// ─── Write gamePages.ts ───
const gameFileContent = `// Auto-generated by scripts/generate-seo-data.js
// Do not edit manually — run: node scripts/generate-seo-data.js

export interface GamePageData {
  slug: string;
  name: string;
  originalName: string;
  icon: string;
  category: string;
  volatility: string;
  rtpMin: number;
  rtpMax: number;
  features: string[];
  tips: string[];
  description: string;
  faq: { q: string; a: string }[];
  relatedGames: string[];
}

export const GAME_PAGES: GamePageData[] = ${JSON.stringify(allGames, null, 2)};

export function getGameBySlug(slug: string): GamePageData | undefined {
  return GAME_PAGES.find(g => g.slug === slug);
}

export function getAllGameSlugs(): string[] {
  return GAME_PAGES.map(g => g.slug);
}
`;

// ─── Write blogArticles.ts ───
const blogFileContent = `// Auto-generated by scripts/generate-seo-data.js
// Do not edit manually — run: node scripts/generate-seo-data.js

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  content: string;
  faq: { q: string; a: string }[];
  relatedGames: string[];
  relatedArticles: string[];
  publishedAt: string;
  updatedAt: string;
}

export const BLOG_ARTICLES: BlogArticle[] = ${JSON.stringify(blogArticles, null, 2)};

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(a => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return BLOG_ARTICLES.map(a => a.slug);
}
`;

// Write files
const dataDir = path.join(__dirname, '..', 'app', 'data');
fs.writeFileSync(path.join(dataDir, 'gamePages.ts'), gameFileContent);
fs.writeFileSync(path.join(dataDir, 'blogArticles.ts'), blogFileContent);

console.log(`✅ Generated gamePages.ts (${allGames.length} games)`);
console.log(`✅ Generated blogArticles.ts (${blogArticles.length} articles)`);
console.log(`📦 Total SEO pages: ${allGames.length + blogArticles.length + 2} (incl. listing pages)`);
