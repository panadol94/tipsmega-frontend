import Link from "next/link";
import PermissionsGuide from "./PermissionsGuide";
import StorageGuide from "./StorageGuide";
import ConnectionChecklist from "./ConnectionChecklist";
import ProblemSolver from "./ProblemSolver";
import VisualGuides from "./VisualGuides";
import styles from "./hub-guide.module.css";

const issues = [
  { title: "Mega888 tak boleh login", steps: "Semak ejaan ID dan mesej ralat. Pastikan sambungan internet berfungsi. Jika akaun terkunci, hentikan percubaan berulang dan hubungi sokongan yang mengurus akaun anda. Jangan beri kata laluan atau OTP kepada pihak lain.", href: "/blog/mega888-register-akaun-baru-2026", label: "Panduan login dan akaun" },
  { title: "APK gagal dipasang", steps: "Catat versi Android, ruang storan dan mesej ralat pemasangan. Semak keserasian serta sumber fail sebelum cuba semula. Jangan mematikan perlindungan peranti semata-mata untuk memasang fail yang tidak dikenali.", href: "/blog/mega888-download-android-apk-terbaru-2026", label: "Panduan Android" },
  { title: "Aplikasi tertutup atau tak boleh dibuka", steps: "Tutup dan buka semula aplikasi, kemudian restart telefon. Semak kemas kini aplikasi dan sistem daripada sumber yang dipercayai. Jangan terus padam aplikasi atau datanya: maklumat yang disimpan pada peranti mungkin hilang.", href: "/blog/mega888-download-ios-terbaru-2026", label: "Panduan iPhone dan iPad" },
  { title: "Akaun disekat", steps: "Simpan mesej ralat dan masa kejadian. Minta penjelasan bertulis daripada sokongan akaun. Elakkan individu yang menawarkan buka sekatan dengan bayaran tambahan tanpa proses yang dapat disahkan.", href: "/blog/mega888-akaun-kena-block", label: "Semakan akaun disekat" },
  { title: "Withdraw masih pending", steps: "Semak status permintaan, syarat yang dinyatakan dan nombor rujukan. Simpan rekod komunikasi. Tempoh sebenar bergantung pada pihak yang memproses transaksi; panduan ini tidak menjamin kelulusan atau masa pembayaran.", href: "/blog/mega888-withdraw-cepat-malaysia-2026", label: "Panduan status withdraw" },
];

export default function HubGuide() {
 return <div className={styles.guide}>
  <figure className={styles.figure}>
   <img src="/hub/mega888-panduan-visual.webp" width="1536" height="1024" alt="Ilustrasi telefon, alat semakan dan perisai untuk panduan aplikasi serta keselamatan akaun" loading="eager" />
   <figcaption>Ilustrasi konsep untuk panduan — bukan screenshot aplikasi atau bukti pengesahan company.</figcaption>
  </figure>
  <nav className={styles.jump} aria-label="Isi kandungan panduan">
   <a href="#problem-solver">Problem Solver</a><a href="#connection-failed">Connection failed</a><a href="#cache-dan-data">Cache, data & offload</a><a href="#semak-permission">Semak permission</a><a href="#panduan-visual">Panduan visual</a><a href="#kenali">Kenali Mega888</a><a href="#masalah">Selesaikan masalah</a><a href="#cara-scanner">Cara scanner</a><a href="#semakan-company">Semakan company</a><a href="#sumber">Sumber & kemas kini</a>
  </nav>
  <section id="kenali">
   <span className={styles.kicker}>01 / KENALI PERBEZAANNYA</span>
   <h2>Aplikasi, akaun, agent dan scanner: apa bezanya?</h2>
   <p>Nama Mega888 digunakan dalam carian berkaitan aplikasi permainan, akses akaun dan bantuan pengguna. Namun, aplikasi, pihak yang mengurus akaun dan alat scanner bukan perkara yang sama. Kenal pasti pihak yang bertanggungjawab sebelum memberikan maklumat atau meminta bantuan.</p>
   <div className={styles.grid}>
    <article><h3>Aplikasi & akaun</h3><p>Aplikasi ialah perisian pada peranti. ID akaun digunakan untuk akses; urusan akses dan transaksi perlu dirujuk kepada pihak yang mengurus akaun tersebut.</p></article>
    <article><h3>Agent / company</h3><p>Pihak yang menawarkan perkhidmatan berkaitan akaun. Nama yang sama atau logo yang serupa sahaja tidak membuktikan identiti atau hubungan rasmi.</p></article>
    <article><h3>TipsMega888 Scanner</h3><p>Alat rujukan berasingan pada website ini. Mengisi ID pada scanner bukan log masuk ke akaun operator dan tidak memberi akses kepada baki atau pengeluaran anda.</p></article>
   </div>
   <p>Hub ini diterbitkan oleh TipsMega888 sebagai panduan. Jangan anggap artikel, logo atau pautan di sini sebagai bukti pelantikan rasmi oleh pemilik jenama.</p>
  </section>
  <ProblemSolver />
  <ConnectionChecklist />
  <StorageGuide />
  <PermissionsGuide />
  <VisualGuides />
  <section id="masalah">
   <span className={styles.kicker}>02 / PUSAT BANTUAN</span>
   <h2>Penyelesaian masalah Mega888 yang biasa dicari</h2>
   <p>Pilih masalah yang sepadan. Langkah ini ialah semakan awal, bukan diagnosis akaun atau pengesahan bahawa server sedang terganggu.</p>
   <div className={styles.grid}>{issues.map(issue=><article key={issue.title}><h3>{issue.title}</h3><p>{issue.steps}</p><Link href={issue.href}>{issue.label} →</Link></article>)}</div>
   <p className={styles.note}>Untuk laporan: sertakan jenis peranti, versi sistem, masa kejadian dan mesej ralat. Tutup ID penuh, baki, nombor telefon dan maklumat transaksi pada screenshot yang hendak dikongsi secara umum.</p>
  </section>
  <section id="cara-scanner">
   <span className={styles.kicker}>03 / FAHAMI BACAAN</span>
   <h2>Cara scanner TipsMega888 berfungsi</h2>
   <p>Menurut <Link href="/info">panduan metodologi TipsMega888</Link>, scanner memaparkan bacaan indikatif berasaskan julat rujukan game yang dikonfigurasikan dalam katalog. Ia bukan sambungan kepada RNG atau sejarah pusingan operator.</p>
   <ol className={styles.flow}><li><b>01</b><strong>Masukkan ID</strong><span>Gunakan ruangan ID pada homepage. Kata laluan operator tidak diperlukan.</span></li><li><b>02</b><strong>Jalankan scan</strong><span>Tekan butang scan. Semak baki Stars dan status yang dipaparkan.</span></li><li><b>03</b><strong>Baca dengan konteks</strong><span>Output ialah rujukan indikatif, bukan ramalan pusingan atau jaminan menang.</span></li></ol>
   <p>RTP teori merujuk kepada pulangan jangka panjang, bukan pulangan yang dijanjikan untuk satu sesi. Bacaan yang berubah atau label “live” tidak dengan sendirinya membuktikan bekalan data langsung daripada operator. Formula terperinci dan sela kemas kini tetap tidak diterbitkan dalam metodologi yang dirujuk; jangan anggap angka tertentu telah diaudit secara bebas.</p>
   <div className={styles.actions}><Link href="/">Buka AI Scanner →</Link><Link href="/info">Baca metodologi & limitasi →</Link></div>
  </section>
  <section id="semakan-company">
   <span className={styles.kicker}>04 / SEMAK SEBELUM PERCAYA</span>
   <h2>Checklist menilai Trusted Company</h2>
   <p>Gunakan senarai ini untuk menilai maklumat pada setiap company. Ini ialah panduan semakan pengguna, bukan dakwaan bahawa semua company sudah lulus audit berikut.</p>
   <div className={styles.grid}>
    <article><h3>Identiti & saluran</h3><p>Padankan nama, domain dan saluran sokongan. Jika pautan bertukar atau akaun sokongan berbeza, sahkan semula melalui saluran yang sudah dikenali.</p></article>
    <article><h3>Syarat yang bertulis</h3><p>Baca syarat akaun, deposit, pengeluaran dan promosi. Simpan versi syarat yang diberikan; jangan bergantung pada janji dalam iklan sahaja.</p></article>
    <article><h3>Bukti & tarikh</h3><p>Cari sumber bukti, skop semakan dan tarikh sebenar. Screenshot payout tunggal atau badge “Verified” tidak menjamin transaksi seterusnya.</p></article>
    <article><h3>Hubungan komersial</h3><p>Semak sama ada pautan ialah referral, tajaan atau affiliate. Jika penjelasan tidak tersedia, tanya pengendali sebelum menganggap penyenaraian bebas daripada kepentingan komersial.</p></article>
   </div>
   <p>Hub ini tidak menyediakan laporan audit individu atau bukti pembayaran bagi setiap company. Jika maklumat belum disertakan pada sesuatu penyenaraian, status itu belum boleh disahkan melalui Hub sahaja.</p>
   <div className={styles.actions}><Link href="/trusted">Buka Trusted Company →</Link><Link href="/help">Bantuan & cara hubungi kami →</Link></div>
  </section>
  <section id="sumber">
   <span className={styles.kicker}>05 / SUMBER & REKOD</span>
   <h2>Rujukan dan kemas kini kandungan</h2>
   <p>Diterbitkan oleh TipsMega888. Dikemas kini pada <time dateTime="2026-09-26">26 September 2026</time>: ditambah panduan menyemak permission Android dan iPhone dengan ilustrasi konsep AI khusus. Panduan cache, padam data dan offload dikekalkan. Checklist connection failed, Problem Solver dan panduan terdahulu dikekalkan. Tarikh ini ialah tarikh kemas kini artikel, bukan tarikh audit company atau ujian setiap versi aplikasi.</p>
   <ul><li><a href="https://support.google.com/android/answer/2668665">Google Android Help: aplikasi tidak berfungsi</a></li><li><a href="https://support.apple.com/en-us/119876">Apple Support: aplikasi iPhone/iPad tidak boleh dibuka</a></li><li><Link href="/info">TipsMega888: metodologi dan limitasi scanner</Link></li></ul>
   <p>Panduan Google dan Apple menerangkan langkah umum peranti; ia bukan sokongan atau pengesahan mereka terhadap Mega888. Jika anda menemui maklumat yang berubah, gunakan <Link href="/help">halaman bantuan</Link> dan sertakan pautan serta butiran pembetulan tanpa rahsia akaun.</p>
  </section>
 </div>;
}
