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
  <h3>Rujukan utama dan batas panduan</h3>
  <ul>
   <li><a href="https://support.apple.com/en-us/118431">Apple: iPhone atau iPad terlalu panas atau sejuk</a> — perubahan prestasi, suhu persekitaran dan tindakan ketika amaran suhu.</li>
   <li><a href="https://support.google.com/pixelphone/answer/3333708?hl=en">Google Pixel Help: telefon terasa terlalu hangat atau panas</a> — had fungsi, pengecasan, rehat dan eskalasi; skopnya Pixel, bukan semua Android.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-10-02">2 Oktober 2026</time>. Tiada ujian suhu, bateri atau aplikasi Mega888 dijalankan untuk artikel ini. Rujukan pengeluar bukan sokongan mereka terhadap Mega888. Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan termometer, diagnostik perkakasan atau data RTP langsung operator; baca <Link href="/info">metodologi dan limitasi</Link>.</p>
 </section>;
}
