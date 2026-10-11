import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function InstallWarningGuide() {
 return <section id="ralat-pemasangan" aria-labelledby="install-warning-title">
  <span className={styles.kicker}>RALAT PEMASANGAN / 28 SEPTEMBER 2026</span>
  <h1 id="install-warning-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 App Not Installed: bezakan ralat, amaran dan status peranti</h1>
  <p>Jika pemasangan berhenti, jangan terus menganggap fail rosak atau telefon perlu direset. Mesej pemasang, amaran Google Play Protect dan status “Device is not certified” merujuk kepada perkara berbeza. Langkah berguna pertama ialah mengenal pasti siapa yang memaparkan mesej dan pada peringkat mana ia muncul.</p>
  <p>Panduan ini menambah semakan khusus Android kepada <Link href="/panduan/mega888-semak-permission">panduan permission</Link>. Ia bukan pautan muat turun atau cara memaksa APK dipasang. Tiada fail Mega888 diuji di sini; keserasian, versi terkini dan punca ralat tertentu tidak dapat disahkan daripada nama app sahaja.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-install-warning-triage-20260928.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep pakej perisian di meja pemeriksaan arang gelap dengan tolok mekanikal, prisma amaran dan rangka peranti berasingan" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: tiga jenis semakan sebelum bertindak. Bukan screenshot Android, keputusan imbasan atau bukti pensijilan.</figcaption>
  </figure>
  <h3>1. Kenal pasti kategori sebelum mencari penyelesaian</h3>
  <div className={styles.grid}>
   <article><h3>Ralat pemasang umum</h3><p>Contohnya teks “App not installed” tanpa penjelasan lanjut. Catat teks penuh, model telefon, versi Android dan sama ada ini pemasangan pertama atau kemas kini. Mesej ringkas itu sendiri tidak membuktikan masalah storan, konflik versi atau malware. Jangan menukar fail secara rawak untuk mencari satu yang boleh melepasi pemasang.</p></article>
   <article><h3>Amaran Google Play Protect</h3><p>Google menerangkan bahawa Play Protect menyemak app ketika dipasang dan mengimbas peranti secara berkala. Ia boleh memberi amaran, menyekat pemasangan, menyahaktifkan atau membuang app berbahaya. Kekalkan perlindungan aktif dan baca arahan keselamatan sistem; jangan menganggap amaran itu sekadar gangguan pemasangan.</p></article>
   <article><h3>“Device is not certified”</h3><p>Ini berkaitan status pensijilan peranti, bukan keputusan audit APK Mega888. Google menyatakan pensijilan peranti berasingan daripada Play Protect. Mematikan Play Protect tidak membetulkan status ini. Rujuk pengeluar peranti jika status atau arahan pembaikannya tidak jelas.</p></article>
  </div>
  <h3>2. Rekod peringkat yang gagal tanpa mengulang pemasangan</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Sebelum fail selesai dimuat turun:</strong> catat sama ada mesej datang daripada pelayar atau sistem keselamatan. Pemasang mungkin belum berjalan. Jika internet juga bermasalah, gunakan <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link>; jangan menafsirkan kegagalan muat turun sebagai akaun disekat.</li>
   <li><strong>Ketika membuka fail atau memasang:</strong> simpan teks amaran yang tepat dan nama komponen yang memaparkannya. Nama fail serta saiz boleh direkod untuk membezakan cubaan, tetapi bukan bukti keaslian. Jangan tekan pilihan untuk meneruskan walaupun diberi amaran semata-mata sebagai ujian.</li>
   <li><strong>Selepas pemasangan, ketika membuka app:</strong> ini sudah menjadi gejala app tidak terbuka atau crash, bukan semestinya pemasangan gagal. Pilih gejala yang sesuai dalam <Link href="/mega888#problem-solver">Problem Solver</Link>. Jika sistem telah menyahaktifkan app, ikut panduan keselamatan sistem dan bukannya memasang semula salinan sama.</li>
   <li><strong>Semasa kemas kini app yang masih ada:</strong> rekod versi sedia ada jika dapat dilihat melalui maklumat app. Jangan padam versi lama, clear storage atau factory reset sebagai percubaan pertama. Baca <Link href="/panduan/mega888-cache-dan-data">kesan pemadaman data</Link> dan pastikan cara pemulihan akses diketahui dahulu.</li>
  </ol>
  <h3>3. Semak status pensijilan di tempat yang betul</h3>
  <p>Jika mesej benar-benar menyebut pensijilan peranti, Google memberikan laluan: buka Google Play Store → ikon profil → Settings → About → Play Protect certification. Catat status sebagaimana dipaparkan; susunan menu boleh berbeza. Jangan menggantikan semakan ini dengan screenshot “selamat” yang dihantar penjual APK.</p>
  <p>Jika tiada Play Store atau anda tidak dapat membuka menu tersebut, gunakan rujukan Google di bawah atau sokongan pengeluar. Jangan memasang komponen Google daripada pautan chat semata-mata untuk memunculkan menu. Status peranti yang diperakui tidak bermaksud setiap app yang dipasang padanya selamat, rasmi atau serasi.</p>
  <p className={styles.note}>Berhenti jika cadangan “fix” memerlukan mematikan perlindungan, menggunakan APK diubah suai, memasang profil tidak dikenali atau memberi kawalan jauh. Jangan mengubah bootloader, melakukan root atau memadam seluruh telefon hanya untuk mencuba app. Isu sistem yang memerlukan pemulihan peranti perlu dibincangkan dengan pengeluar serta mengambil kira sandaran data.</p>
  <h3>4. Hantar laporan kepada pihak yang sesuai</h3>
  <p>Untuk status pensijilan atau menu sistem, mulakan dengan sokongan pengeluar. Untuk penjelasan pakej dan keserasian, minta maklumat bertulis daripada penyedia melalui saluran yang anda sahkan secara berasingan. Janji “semua telefon boleh” atau “abaikan amaran” bukan bukti teknikal. Gunakan <Link href="/panduan/mega888-pautan-reset-login">kaedah semak saluran bantuan</Link> jika pautan baharu dihantar melalui chat.</p>
  <p><strong>Templat laporan:</strong> “Model/Android: __. Pemasangan pertama atau kemas kini: __. Peringkat gagal: __. Teks penuh mesej: __. Komponen yang memaparkan mesej: __. Tarikh dan masa: __. Status pensijilan jika berkaitan: __. Perubahan yang telah dibuat: __. Apakah penjelasan dan langkah tanpa mematikan perlindungan?”</p>
  <p>Hantar hanya maklumat yang relevan. Tutup ID penuh, alamat e-mel, nombor telefon dan notifikasi peribadi pada salinan screenshot. Jangan sertakan kata laluan, OTP, kod pemulihan atau pautan muat turun peribadi yang mengandungi token. Tiada deposit atau scan berbayar diperlukan untuk menyediakan laporan.</p>
  <section id="amaran-muat-turun-chrome" aria-labelledby="download-warning-title">
   <h2 id="download-warning-title">Muat turun Mega888 disekat Chrome: fail belum sampai ke pemasang</h2>
   <p>Jika Chrome memaparkan amaran ketika anda cuba mendapatkan APK, jangan terus mencari cara membaiki “App Not Installed”. Muat turun, pemasangan dan pembukaan app ialah tiga peringkat berasingan. Amaran pada peringkat pertama tidak membuktikan akaun disekat, telefon tidak serasi atau server Mega888 sedang diselenggara. Kenal pasti aplikasi yang mengeluarkan mesej sebelum memilih langkah seterusnya.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-amaran-muat-turun-chrome-20261011.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep pakej perisian dihentikan palang merah di bingkai pelayar sebelum sampai ke telefon, dengan prisma amaran dan buku catatan" style={{ maxHeight: "none", objectFit: "contain" }} />
    <figcaption>Ilustrasi konsep dijana AI: amaran muat turun berlaku sebelum pemasangan. Bukan screenshot Chrome, keputusan pemeriksaan APK atau bukti fail berbahaya.</figcaption>
   </figure>
   <h3>Baca kategori amaran, bukan hanya perkataan “blocked”</h3>
   <p>Dokumentasi Chrome membezakan beberapa sebab muat turun disekat. Nama dan paparan mesej boleh berubah mengikut bahasa, versi serta peranti; senarai ini membantu memahami kategori, bukan memetakan setiap kod ralat Mega888.</p>
   <div className={styles.grid}>
    <article><h3>Dangerous / berbahaya</h3><p>Google menyenaraikan malware dan perisian mengelirukan yang boleh membuat perubahan tidak diingini. Hentikan muat turun dan baca butiran amaran. Jangan cuba mendapatkan salinan sama melalui pelayar lain untuk melepasi sekatan.</p></article>
    <article><h3>Suspicious / mencurigakan</h3><p>Antara sebab yang dinyatakan ialah fail kurang dikenali atau fail yang mungkin cuba mengelakkan pengesanan. Ini bukan lesen untuk meneruskan, dan bukan bukti khusus bahawa semua fail dengan nama tersebut ialah malware. Jangan anggap arkib berpassword daripada chat sebagai jalan pemasangan yang lebih selamat.</p></article>
    <article><h3>Unverified / belum disahkan</h3><p>Dalam rujukan Chrome ini, kategori tersebut merujuk kepada fail yang dimuat turun ketika Safe Browsing dimatikan. Ia bukan status pensijilan Play Protect bagi telefon. Rujuk panduan Chrome untuk mengaktifkan semula perlindungan; jangan mematikannya sebagai penyelesaian.</p></article>
    <article><h3>Insecure / tidak selamat</h3><p>Google menjelaskan bahawa halaman asal boleh menggunakan HTTPS sedangkan muat turun disediakan melalui sambungan tidak selamat. HTTPS pada halaman sahaja tidak menyelesaikan amaran fail. Minta pemilik laman menyiasat pautan tersebut tanpa meminta anda mengabaikan sekatan.</p></article>
   </div>
   <h3>Urutan semakan tanpa memaksa fail dibuka</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Berhenti pada amaran pertama.</strong> Jangan buka fail, tekan pilihan meneruskan atau mengulang muat turun melalui pautan cermin. Google menyatakan bahawa apabila Chrome menyekat muat turun, anda dilindungi dan tidak perlu mengambil tindakan lanjut untuk meneruskannya.</li>
    <li><strong>Catat konteks yang kelihatan.</strong> Rekod teks penuh, nama pelayar, model peranti, versi sistem dan masa. Bezakan mesej Chrome daripada notifikasi Play Protect atau pemasang Android. Nama serta saiz fail hanya membezakan cubaan; kedua-duanya bukan pengesahan ketulenan.</li>
    <li><strong>Asingkan amaran keselamatan daripada ralat pemindahan.</strong> Jika tiada amaran keselamatan dan sambungan internet turut gagal, gunakan <Link href="/panduan/mega888-connection-failed">checklist connection failed</Link>. Rujukan ralat muat turun Chrome juga membincangkan fail hilang, ruang tidak cukup dan akses pelayan ditolak. Jangan menggunakan penjelasan Chrome Web Store atau Windows sebagai diagnosis APK Android.</li>
    <li><strong>Pilih bantuan mengikut peringkat.</strong> Untuk pautan rosak atau penghantaran fail tidak selamat, minta penjelasan pemilik laman melalui saluran yang disahkan secara berasingan. Untuk mesej perlindungan peranti, rujuk dokumentasi Google atau pengeluar. Jangan padam app sedia ada atau datanya bagi membaiki amaran pelayar; baca dahulu <Link href="/panduan/mega888-cache-dan-data">kesan pemadaman data dan semakan storan</Link>.</li>
    <li><strong>Simpan laporan, bukan salinan fail untuk diedarkan.</strong> Jika perlu berkongsi bukti, gunakan <Link href="/panduan/mega888-screenshot-ralat">screenshot ralat yang telah disemak</Link>. Jangan hantar APK mencurigakan, keseluruhan sejarah muat turun atau pautan peribadi bertoken kepada kumpulan chat.</li>
   </ol>
   <h3>Contoh laporan yang membezakan masalah sebenar</h3>
   <p>“Pada __, Chrome versi __ di peranti __ memaparkan ‘__’ semasa muat turun, sebelum pemasang dibuka. Domain yang kelihatan: __. Fail belum dibuka; perlindungan tidak dimatikan. Adakah anda boleh menjelaskan amaran ini dan menyemak pautan tanpa meminta saya memintas perlindungan?” Nyatakan hanya perkara yang benar-benar diperhatikan. Jika fail sudah dibuka, beritahu keadaan sebenar kepada sokongan keselamatan peranti, bukan menyalin ayat contoh itu seolah-olah ia masih belum dibuka.</p>
   <p>Gunakan domain sahaja apabila URL penuh mengandungi token, ID atau maklumat peribadi. Tiada kata laluan, OTP, kod pemulihan atau bayaran diperlukan untuk mencatat ralat. Pihak yang menjawab “semua amaran itu biasa” tanpa penjelasan belum memberikan bukti keselamatan; lihat <Link href="/panduan/mega888-pautan-reset-login">cara mengesahkan saluran bantuan</Link>.</p>
   <p className={styles.note}>Batas penting: panduan ini tidak menguji mana-mana fail Mega888, mengesahkan penyedia muat turun atau menjamin bahawa fail tanpa amaran selamat. Safe Browsing, Play Protect dan pensijilan peranti mempunyai skop berbeza. Scanner TipsMega888 pula ialah simulasi/rujukan katalog indikatif, bukan alat untuk menilai keselamatan APK.</p>
   <h3>Rujukan untuk amaran muat turun</h3>
   <ul>
    <li><a href="https://support.google.com/chrome/answer/6261569?hl=en">Google Chrome: sebab sesetengah muat turun disekat</a> — kategori dangerous, suspicious, unverified dan insecure serta peringatan mengambil serius amaran.</li>
    <li><a href="https://support.google.com/chrome/answer/2898334?hl=en">Google Chrome: ralat muat turun fail</a> — bezakan masalah sambungan, fail dan akses; sebahagian arahan khusus komputer, bukan semua telefon.</li>
   </ul>
   <p>Bahagian amaran muat turun disemak pada <time dateTime="2026-10-11">11 Oktober 2026</time>. Panduan editorial ini tidak menggantikan arahan keselamatan yang dipaparkan pada peranti anda.</p>
  </section>
  <h3>Rujukan utama dan batas semakan</h3>
  <ul>
   <li><a href="https://support.google.com/googleplay/answer/2812853?hl=en">Google: fungsi Google Play Protect</a> — amaran, pemeriksaan app dan saranan mengekalkan perlindungan aktif.</li>
   <li><a href="https://support.google.com/android/answer/7165974?hl=en">Google: semak dan baiki status Play Protect certification</a> — perbezaan pensijilan peranti, laluan menu dan rujukan pengeluar.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-09-28">28 September 2026</time>. Rujukan ini menerangkan Android secara umum, bukan pengesahan Mega888 oleh Google. Tiada pemetaan kod ralat, pemeriksaan APK sebenar atau jaminan pemasangan diberikan. Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan pengimbas malware atau alat pensijilan; lihat <Link href="/info">metodologi</Link> dan <Link href="/help">bantuan laman</Link>.</p>
 </section>;
}
