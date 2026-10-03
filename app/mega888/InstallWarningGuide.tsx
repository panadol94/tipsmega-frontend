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
  <h3>Rujukan utama dan batas semakan</h3>
  <ul>
   <li><a href="https://support.google.com/googleplay/answer/2812853?hl=en">Google: fungsi Google Play Protect</a> — amaran, pemeriksaan app dan saranan mengekalkan perlindungan aktif.</li>
   <li><a href="https://support.google.com/android/answer/7165974?hl=en">Google: semak dan baiki status Play Protect certification</a> — perbezaan pensijilan peranti, laluan menu dan rujukan pengeluar.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-09-28">28 September 2026</time>. Rujukan ini menerangkan Android secara umum, bukan pengesahan Mega888 oleh Google. Tiada pemetaan kod ralat, pemeriksaan APK sebenar atau jaminan pemasangan diberikan. Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan pengimbas malware atau alat pensijilan; lihat <Link href="/info">metodologi</Link> dan <Link href="/help">bantuan laman</Link>.</p>
 </section>;
}
