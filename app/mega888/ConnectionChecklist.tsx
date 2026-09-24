import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function ConnectionChecklist() {
 return <section id="connection-failed" aria-labelledby="connection-title">
  <span className={styles.kicker}>CHECKLIST SAMBUNGAN & LAPORAN</span>
  <h2 id="connection-title">Mega888 “connection failed”: apa perlu diperiksa dan dicatat?</h2>
  <p>Mesej “connection failed”, timeout atau loading berterusan belum menentukan puncanya. Tujuan checklist ini ialah membezakan masalah internet umum daripada masalah yang hanya muncul dalam aplikasi, kemudian menyediakan maklumat berguna untuk sokongan. Ia bukan pengesan server atau ujian langsung Mega888.</p>
  <p>Dikemas kini <time dateTime="2026-09-24">24 September 2026</time>. Jika mesej menyebut kata laluan salah atau akaun disekat, terus rujuk <a href="#problem-solver">Problem Solver</a>; jangan ulang login untuk menguji rangkaian.</p>
  <h3>1. Simpan keadaan asal sebelum mengubah tetapan</h3>
  <p>Catat waktu beserta zon masa (Malaysia: MYT, UTC+8), teks ralat tepat dan tahap kegagalan: sebelum skrin login, selepas menekan login, atau selepas aplikasi terbuka. Catat model telefon, versi Android/iOS dan versi aplikasi jika boleh dilihat. Jika versi tidak dapat dibuka, tulis “tidak dapat disemak”, bukan meneka.</p>
  <h3>2. Bandingkan dua sambungan, satu perubahan pada satu masa</h3>
  <ol className={styles.checkSteps}>
   <li>Buka laman web biasa yang anda kenali. Catat sama ada ia boleh dimuatkan pada rangkaian yang sama. Jangan gunakan scanner sebagai ujian kesihatan server aplikasi.</li>
   <li>Jika data mudah alih tersedia dan anda bersetuju dengan caj data, bandingkan Wi-Fi dengan data pada telefon yang sama. Ulang tindakan yang sama dalam aplikasi sekali, tanpa membuat transaksi atau bermain untuk tujuan ujian. Jika tiada rangkaian kedua, tandakan “belum diuji”.</li>
   <li>Tutup dan buka semula aplikasi. Jika perlu, restart telefon dan catat hasilnya. Jangan sekali gus tukar DNS, padam data dan pasang semula: perubahan serentak menyukarkan penentuan langkah yang memberi kesan.</li>
  </ol>
  <p>Android: menu biasanya Tetapan → Network & internet atau Connections. iPhone/iPad: semak Settings → Wi-Fi; data mudah alih memerlukan peranti dan pelan yang menyokongnya. Nama menu berbeza mengikut versi. Kekalkan perlindungan peranti; catat penggunaan VPN atau rangkaian tempat kerja untuk dibincangkan dengan pentadbir, bukan memintas sekatan.</p>
  <h3>3. Tafsir hasil sebagai petunjuk, bukan keputusan pasti</h3>
  <div className={styles.grid}>
   <article><h3>Laman lain juga gagal</h3><p>Mulakan dengan bantuan rangkaian/peranti. Jika peranti lain turut gagal menggunakan Wi-Fi yang sama, rujuk pemilik rangkaian atau ISP. Ini tidak membuktikan akaun Mega888 disekat.</p></article>
   <article><h3>Berfungsi pada data, gagal pada Wi-Fi</h3><p>Perbezaan laluan rangkaian ialah petunjuk untuk sokongan. Ia belum membuktikan DNS, router atau ISP tertentu bersalah. Simpan kedua-dua hasil sebelum meminta bantuan rangkaian.</p></article>
   <article><h3>Laman lain berfungsi, aplikasi masih gagal</h3><p>Simpan rekod dan hubungi sokongan aplikasi/akaun melalui saluran yang sudah dikenal pasti. Punca boleh melibatkan aplikasi, akaun atau perkhidmatan; dua rangkaian yang gagal sahaja bukan pengesahan maintenance.</p></article>
   <article><h3>Percubaan kemudian berjaya</h3><p>Catat masa pulih dan perubahan yang dibuat. Kejayaan sekali tidak mengesahkan punca asal atau menjamin masalah tidak berulang. Jangan padam rekod jika isu kerap berlaku.</p></article>
  </div>
  <h3>4. Salin templat laporan ini ke nota anda</h3>
  <p>Isi keputusan sebenar sahaja. Ini templat kosong, bukan contoh ujian yang telah kami jalankan. Tiada borang penghantaran atau pengumpulan ID pada bahagian ini.</p>
  <div className={styles.note}>
   <ul>
    <li>Tarikh, masa dan zon masa: […]</li>
    <li>Model peranti / versi sistem / versi aplikasi: […]</li>
    <li>Tahap kegagalan dan mesej tepat: […]</li>
    <li>Wi-Fi — laman lain: […] / aplikasi: […]</li>
    <li>Data mudah alih — laman lain: […] / aplikasi: […] / belum diuji</li>
    <li>Selepas buka semula atau restart: […]</li>
    <li>Bermula selepas perubahan/kemas kini: […] / tidak pasti</li>
    <li>Masa pulih, jika ada: […]</li>
   </ul>
  </div>
  <p>Potong atau tutup ID penuh, nombor telefon, baki dan transaksi pada screenshot. Jangan sertakan kata laluan, OTP, PIN, kod pemulihan atau pautan sesi. Hantar hanya butiran yang perlu melalui saluran sokongan yang telah anda sahkan, bukan kepada akaun yang tiba-tiba menghubungi anda.</p>
  <h3>Bila patut berhenti mencuba?</h3>
  <p>Berhenti jika muncul amaran keselamatan, akaun terkunci atau aktiviti transaksi yang tidak dikenali. Jangan bayar “fi baiki sambungan”, menerima APK pembaikan daripada orang asing, atau membuat deposit tambahan untuk menguji akses. Jika masalah berterusan selepas semakan asas, minta sokongan menyemak rekod masa dan mesej ralat; jangan anggap tempoh maintenance tertentu telah disahkan.</p>
  <p>Reset rangkaian bukan langkah pertama: Apple menerangkan bahawa ia membuang tetapan rangkaian termasuk rangkaian Wi-Fi dan kata laluannya. Memadam aplikasi atau datanya juga bukan sebahagian daripada checklist ini. Gunakan <a href="#panduan-peranti">panduan peranti</a> untuk masalah aplikasi tidak terbuka dan <Link href="/help">halaman bantuan TipsMega888</Link> untuk isu laman ini; kami tidak boleh mengesahkan status akaun operator.</p>
  <h3>Rujukan teknikal utama</h3>
  <ul>
   <li><a href="https://support.google.com/googleplay/answer/2651367?hl=en">Google: membaiki masalah sambungan internet Android</a> — restart dan perbandingan Wi-Fi/data.</li>
   <li><a href="https://support.apple.com/en-us/111786">Apple: iPhone/iPad tidak dapat menyambung Wi-Fi</a> — semakan peranti/rangkaian lain dan kesan reset rangkaian.</li>
  </ul>
  <p>Rujukan ini menyokong langkah umum peranti, bukan kod ralat, keserasian versi atau status server Mega888. Tiada pemetaan kod ralat atau jaminan masa pemulihan dibuat di sini.</p>
 </section>;
}
