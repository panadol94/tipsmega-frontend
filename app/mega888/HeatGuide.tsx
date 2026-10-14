import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function HeatGuide() {
 return <section id="telefon-panas" aria-labelledby="heat-title">
  <span className={styles.kicker}>SUHU PERANTI / 2 OKTOBER 2026</span>
  <h1 id="heat-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 lag dan telefon panas: bila perlu berhenti, bukan terus reinstall</h1>
  <p>Telefon terasa panas, skrin menjadi malap dan app perlahan boleh berlaku serentak. Itu belum membuktikan Mega888 rosak, server terganggu atau akaun disekat. Semak amaran sistem dahulu: sesetengah telefon mengehadkan prestasi apabila suhunya meningkat. Panduan ini membantu anda merekod gejala dan mengutamakan keadaan peranti, bukan memaksa permainan terus berjalan.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-telefon-panas-rehat-20261002.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi telefon arang gelap direhatkan di atas tapak terbuka, kabel pengecas merah terputus sambungan dan jalur haba beransur hilang" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI tentang merehatkan peranti panas. Bukan screenshot aplikasi, bacaan suhu atau keputusan ujian telefon.</figcaption>
  </figure>
  <h3>1. Bezakan rasa hangat, amaran suhu dan ralat app</h3>
  <div className={styles.grid}>
   <article><h3>Hangat tanpa amaran</h3><p>Apple dan Google menyenaraikan aktiviti seperti permainan, pemulihan sandaran atau penggunaan semasa mengecas sebagai keadaan yang boleh memanaskan telefon. Rasa hangat sahaja tidak mengesahkan kerosakan. Namun, anda boleh berhenti dan berehat; tidak perlu meneruskan sesi untuk membuktikan app masih berfungsi.</p></article>
   <article><h3>Amaran atau perubahan sistem</h3><p>Apple menerangkan bahawa suhu dalaman tinggi boleh menyebabkan skrin malap, pengecasan perlahan atau berhenti, dan prestasi menurun. Google menyatakan Pixel boleh mengehadkan CPU serta sambungan data atau Wi-Fi. Gejala ini bukan pemetaan kod ralat Mega888 dan tidak semestinya sama pada setiap Android.</p></article>
   <article><h3>Ralat app tanpa bukti suhu</h3><p>Jika hanya app tertutup tanpa amaran suhu, jangan terus menamakan puncanya “overheat”. Catat apa yang benar-benar berlaku. Selepas peranti kembali selesa digunakan, rujuk <Link href="/mega888#problem-solver">Problem Solver</Link> atau <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link> mengikut mesej sebenar.</p></article>
  </div>
  <h3>2. Dahulukan rehat apabila ada amaran</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Hentikan aktiviti berat.</strong> Jangan ulang membuka app, merakam video atau menjalankan scan untuk “uji ketahanan”. Catat amaran kemudian jika perlu; mendapatkan screenshot bukan alasan untuk terus menggunakan telefon yang sedang memberi amaran.</li>
   <li><strong>iPhone atau iPad dengan amaran suhu:</strong> Apple mengesyorkan mematikan peranti, memindahkannya ke tempat lebih sejuk jauh daripada cahaya matahari terus, dan membiarkannya sejuk. Ikut arahan pada skrin serta panduan model anda.</li>
   <li><strong>Pixel yang terlalu panas:</strong> Google menyarankan memutuskan sambungan pengecas jika dipasang, memindahkan telefon ke tempat lebih sejuk dan tidak menggunakannya sehingga sejuk. Jika ia terpadam sendiri, biarkan sejuk sebelum restart. Untuk Android jenama lain, rujuk pengeluar; menu dan perlindungannya boleh berbeza.</li>
   <li><strong>Jangan lawan perlindungan sistem.</strong> Jangan gunakan app “booster”, ubah had haba, root telefon atau memintas amaran untuk mengekalkan prestasi. Panduan ini tidak menetapkan tempoh menunggu tertentu atau suhu sasaran untuk semua model.</li>
  </ol>
  <p className={styles.note}>Angka 0–35°C dalam rujukan Apple ialah julat suhu <strong>persekitaran penggunaan</strong> iPhone/iPad, bukan ambang suhu bateri yang patut dicari dalam app pihak ketiga. Ia juga bukan spesifikasi universal semua Android. Jangan membuat diagnosis daripada satu angka tanpa mengetahui apa yang diukur.</p>
  <h3>3. Selepas sejuk, asingkan pemerhatian daripada kesimpulan</h3>
  <p>Jika peranti sudah kembali normal dan tiada amaran, perhatikan sama ada masalah juga berlaku dalam penggunaan biasa di luar Mega888. Tidak perlu bermain, membuat deposit atau mengulang beban berat. Catat sama ada telefon sedang dicas, berada di bawah matahari atau baru selesai kemas kini ketika kejadian asal. Jangan menukar banyak tetapan serentak.</p>
  <p>Jika gejala hilang selepas rehat, rekodkan perubahan itu sahaja. Ia tidak membuktikan punca tunggal, keadaan bateri atau bahawa aplikasi selamat. Jika amaran berulang atau telefon kerap terpadam sendiri, hentikan percubaan dan rujuk sokongan pengeluar. Google secara khusus mengarahkan pengguna Pixel yang terus mengalami pemadaman untuk menghubungi sokongan Pixel.</p>
  <p>Jika hanya app masih gagal ketika peranti normal, gunakan langkah awal tanpa pemadaman dalam <Link href="/panduan/mega888-cache-dan-data">panduan cache, data dan offload</Link>. Reinstall atau clear storage bukan kaedah menyejukkan telefon. Jangan padam data sebelum memahami kesan serta cara mendapatkan semula akses.</p>
  <h3>4. Rekod ringkas untuk sokongan yang betul</h3>
  <p><strong>Templat:</strong> “Model dan versi sistem: __. Tarikh/masa: __. Aktiviti sebelum kejadian: __. Sedang mengecas: ya/tidak. Keadaan tempat: __. Teks amaran sistem: __ / tiada. Gejala: skrin malap/app tertutup/telefon terpadam/lain-lain. Selepas rehat: __. Berlaku di luar app juga: ya/tidak/belum diperhatikan.” Biarkan maklumat yang tidak diketahui kosong; jangan mereka bacaan suhu.</p>
  <p>Rujuk pengeluar untuk amaran suhu dan pemadaman peranti. Rujuk penyedia app melalui saluran yang disahkan untuk gejala khusus app; mereka tidak semestinya boleh menilai bateri telefon dari jauh. Jika perlu lampiran, gunakan <Link href="/panduan/mega888-screenshot-ralat">panduan screenshot minimum</Link>. Jangan sertakan kata laluan, OTP, ID penuh atau butiran transaksi. Untuk isu laman TipsMega888, gunakan <Link href="/help">bantuan laman</Link>.</p>
  <section id="mod-jimat-bateri" aria-labelledby="battery-mode-title">
   <h2 id="battery-mode-title">Mega888 lag: beza mod jimat bateri, app dijeda dan amaran suhu</h2>
   <p>Skrin malap atau maklumat yang lambat berubah tidak semestinya berpunca daripada telefon panas. Mod jimat bateri mengubah sebahagian fungsi untuk memanjangkan penggunaan; amaran suhu pula memerlukan tindakan mengikut pengeluar. Jangan terus mematikan semua penjimatan, memasang booster atau reinstall hanya kerana kedua-duanya boleh kelihatan seperti “lag”.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-mod-jimat-bateri-20261014.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep takungan kuasa dengan dua rel merah, satu jubin aktif dan tiga jubin di belakang palang jeda, serta arca sensor suhu berasingan" style={{maxHeight:"none",objectFit:"contain"}} />
    <figcaption>Ilustrasi konsep dijana AI: kawalan kuasa dan keadaan suhu ialah semakan berasingan. Bukan screenshot tetapan, bacaan bateri atau ujian prestasi Mega888.</figcaption>
   </figure>
   <h3>Kenal pasti keadaan sebelum menukar tetapan</h3>
   <ul>
    <li><strong>App masih terbuka tetapi animasi kurang lancar:</strong> catat sama ada seluruh telefon terasa perlahan atau hanya paparan tertentu. Ini belum menentukan punca rangkaian, suhu atau aplikasi.</li>
    <li><strong>Maklumat hanya berubah selepas app dibuka semula:</strong> bezakan kerja latar belakang daripada skrin yang sedang aktif. Pemerhatian ini berguna untuk laporan; ia bukan bukti akaun disekat.</li>
    <li><strong>App kelihatan dijeda oleh sistem:</strong> rekod nama mod dan mesej sistem. Jangan samakan app dijeda dengan app dipadam, akaun tamat atau pemasangan rosak.</li>
    <li><strong>Ada amaran suhu atau telefon terpadam:</strong> dahulukan langkah rehat di atas. Jangan menjalankan perbandingan mod kuasa semasa amaran masih berlaku.</li>
   </ul>
   <h3>iPhone: semak Low Power Mode, bukan warna skrin sahaja</h3>
   <p>Apple menerangkan bahawa Low Power Mode boleh mengurangkan kecerahan dan beberapa kesan visual serta mematikan Background App Refresh dan muat turun automatik. Ikon bateri berwarna kuning menunjukkan mod ini aktif. Itu bukan mesej ralat Mega888 atau ukuran kesihatan bateri.</p>
   <p>Dokumentasi Apple semasa meletakkan pilihan pada Settings → Battery → Power Mode untuk iPhone 15 dan lebih baharu; bagi iPhone 14 dan lebih lama, Settings → Battery → Low Power Mode. Paparan sebenar bergantung pada versi sistem. Baca status yang kelihatan dahulu; tidak perlu menukar pilihan untuk menyediakan laporan. Had kerja latar tidak membuktikan setiap permintaan pada skrin login yang sedang terbuka akan disekat.</p>
   <h3>Pixel: Standard dan Extreme bukan mod yang sama</h3>
   <p>Google membezakan Standard Battery Saver daripada Extreme Battery Saver. Dalam mod standard, kemas kini kandungan latar dihadkan dan notifikasi keutamaan rendah boleh lewat. Mod Extreme pada model yang menyokongnya pula menjeda kebanyakan app dan memperlahankan pemprosesan; app yang dijeda tidak menghantar notifikasi. Jadi, catat nama mod sebenar, bukan sekadar “battery saver on”.</p>
   <p>Pada Pixel, semak Settings → Battery → Battery Saver; tetapan Extreme berada dalam bahagian itu. Jadual boleh mengaktifkan mod berdasarkan paras bateri. Laluan serta tingkah laku ini bukan spesifikasi semua Android: bagi Samsung, Xiaomi atau jenama lain, gunakan panduan model sendiri. Jangan menganggap app perlu dikecualikan daripada semua pengoptimuman untuk boleh login.</p>
   <h3>Checklist pemerhatian dengan satu perubahan sahaja</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Rekod keadaan asal.</strong> Tulis model, versi sistem, nama mod kuasa, paras bateri yang dipaparkan, sama ada sedang dicas, dan sama ada masalah berlaku semasa app terbuka atau selepas kembali daripada latar. Jangan mereka bacaan suhu atau peratus prestasi.</li>
    <li><strong>Semak fungsi biasa dahulu.</strong> Apabila peranti normal tanpa amaran, lihat sama ada menu sistem juga perlahan. Tidak perlu membuka permainan, deposit atau menjalankan scan untuk membandingkan keadaan. Jika bateri hampir habis atau telefon diperlukan untuk urusan penting, kekalkan penjimatan dan tangguhkan semakan.</li>
    <li><strong>Perbandingan mod adalah pilihan, bukan syarat.</strong> Pada telefon peribadi yang normal dan mempunyai kuasa mencukupi, jika anda memahami kesan penggunaan bateri, ubah hanya mod kuasa melalui tetapan sistem dan perhatikan paparan biasa yang sama. Catat masa dan hasil; jangan serentak menukar rangkaian, memadam cache atau memasang semula. Pulihkan pilihan asal selepas pemerhatian jika penjimatan masih diperlukan.</li>
    <li><strong>Hentikan percubaan jika muncul amaran.</strong> Jangan mengubah perlindungan haba, memasang profil atau menggunakan alat pihak ketiga untuk memaksa prestasi. Jika login ditolak atau akaun terkunci, berhenti mengulang login; perubahan mod bateri bukan proses membuka sekatan akaun.</li>
   </ol>
   <p className={styles.note}><strong>Hasil yang berbeza hanya petunjuk.</strong> Paparan yang lebih lancar selepas perubahan mod tidak membuktikan bateri rosak atau server pulih. Jika tiada perubahan, jangan terus menyimpulkan app rosak. Tiada ujian peranti, keperluan mod kuasa atau kadar prestasi Mega888 disahkan untuk bahagian ini.</p>
   <h3>Laporan yang membantu tanpa menghantar rahsia</h3>
   <p>“Model / versi sistem: __. Nama mod kuasa: __. Paras bateri yang kelihatan: __. Sedang dicas: __. Amaran suhu: ada / tiada. Gejala ketika app terbuka / kembali daripada latar: __. Berlaku pada menu sistem juga: __. Satu perubahan dan hasil: __. Masa serta zon waktu: __.” Jangan sertakan ID penuh, password, OTP atau screenshot akaun. Jika gambar diperlukan, ikut <Link href="/panduan/mega888-screenshot-ralat">panduan lampiran ralat</Link>.</p>
   <p>Jika mesej sebenar menyebut timeout, gunakan <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link>. Jika akses data selular berbeza, baca <Link href="/panduan/mega888-connection-failed#data-selular-app">semakan Data Saver dan data aplikasi</Link>: penjimatan data bukan nama lain untuk penjimatan bateri. Untuk amaran suhu berulang atau pemadaman telefon, rujuk pengeluar; untuk gejala khusus app, sediakan laporan kepada saluran sokongan yang telah disahkan.</p>
   <p>Rujukan khusus: <a href="https://support.apple.com/en-us/101604">Apple: Low Power Mode pada iPhone dan iPad</a>; <a href="https://support.google.com/pixelphone/answer/6187458?hl=en">Google Pixel: Standard dan Extreme Battery Saver</a>. Kedua-duanya menerangkan fungsi sistem, bukan pengesahan keserasian atau sokongan terhadap Mega888.</p>
  </section>
  <h3>Rujukan utama dan batas panduan</h3>
  <ul>
   <li><a href="https://support.apple.com/en-us/118431">Apple: iPhone atau iPad terlalu panas atau sejuk</a> — perubahan prestasi, suhu persekitaran dan tindakan ketika amaran suhu.</li>
   <li><a href="https://support.google.com/pixelphone/answer/3333708?hl=en">Google Pixel Help: telefon terasa terlalu hangat atau panas</a> — had fungsi, pengecasan, rehat dan eskalasi; skopnya Pixel, bukan semua Android.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-10-14">14 Oktober 2026</time>. Tiada ujian suhu, bateri atau aplikasi Mega888 dijalankan untuk artikel ini. Rujukan pengeluar bukan sokongan mereka terhadap Mega888. Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan termometer, diagnostik perkakasan atau data RTP langsung operator; baca <Link href="/info">metodologi dan limitasi</Link>.</p>
 </section>;
}
