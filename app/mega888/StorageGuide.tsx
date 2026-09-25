import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function StorageGuide() {
 return <section id="cache-dan-data" aria-labelledby="storage-title">
  <span className={styles.kicker}>PANDUAN STORAN / 25 SEPTEMBER 2026</span>
  <h2 id="storage-title">Mega888 tak boleh dibuka: beza clear cache, padam data dan offload</h2>
  <p>Arahan “bersihkan app” boleh merujuk kepada tindakan yang sangat berbeza. Sebelum menekan butang dalam tetapan telefon, kenal pasti apa yang akan dibuang. Panduan ini menerangkan fungsi umum Android dan iPhone; ia bukan pengesahan cara setiap versi Mega888 menyimpan akaun atau memulihkan data.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-cache-data-offload-20260925.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep telefon arang gelap dengan dulang fail sementara merah yang berasingan daripada teras arkib data" />
   <figcaption>Ilustrasi konsep dijana AI: fail sementara dan data tersimpan digambarkan berasingan. Bukan screenshot aplikasi atau bukti pemulihan data.</figcaption>
  </figure>
  <h3>Empat label yang tidak patut dianggap sama</h3>
  <div className={styles.grid}>
   <article><h3>Android: Clear cache</h3><p>Menurut Google, tindakan ini membuang data sementara. Pembukaan app seterusnya mungkin lebih perlahan. Ia bukan arahan untuk memadam semua data app, tetapi bukan juga jaminan ralat akan selesai atau sesi login akan kekal bagi setiap app.</p></article>
   <article><h3>Android: Clear storage / Clear data</h3><p>Ini bukan versi “lebih kuat” yang patut ditekan secara automatik selepas clear cache. Google menyatakan Clear storage memadam semua data app secara kekal pada peranti. Jika label tidak jelas, berhenti dan semak panduan pengeluar telefon.</p></article>
   <article><h3>iPhone/iPad: Offload App</h3><p>Apple menerangkan bahawa offload membebaskan storan yang digunakan app sambil mengekalkan dokumen dan datanya. Ia bukan butang clear cache Android. Sebelum memilihnya, pastikan app boleh dipasang semula daripada sumber yang dapat disahkan; panduan ini tidak mengesahkan ketersediaan pemasangan Mega888.</p></article>
   <article><h3>iPhone/iPad: Delete App</h3><p>Apple membezakan Delete App daripada offload: app dan data berkaitannya dibuang. Jangan andaikan data setempat boleh dipulihkan hanya kerana anda masih mengingati ID. Pemadaman pada telefon juga bukan bukti bahawa akaun pada server telah ditutup.</p></article>
  </div>
  <h3>Urutan semakan sebelum mengubah storan</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Bezakan gejala dahulu.</strong> Jika mesejnya connection failed, gunakan <a href="#connection-failed">checklist sambungan</a>. Jika login ditolak tetapi app terbuka, gunakan <a href="#problem-solver">Problem Solver</a>. Mengosongkan storan tidak mengesahkan atau menyelesaikan status akaun pada server.</li>
   <li><strong>Simpan rekod yang tidak sensitif.</strong> Catat model telefon, versi sistem dan app, ruang storan tersedia serta mesej ralat sebelum perubahan. Simpan saluran pemulihan akaun yang sudah dikenal pasti. Jangan hantar kata laluan, OTP atau kod pemulihan kepada sesiapa.</li>
   <li><strong>Cuba langkah tanpa memadam data.</strong> Tutup dan buka semula app, restart telefon, kemudian semak kemas kini daripada sumber yang dipercayai. Buat satu perubahan pada satu masa supaya hasilnya boleh dibandingkan.</li>
   <li><strong>Android: baca label sebenar.</strong> Dalam Settings/Tetapan, buka maklumat app yang betul dan bahagian storannya; laluan serta label berbeza mengikut pengeluar. Jika anda memilih untuk mencuba clear cache, pilih hanya pilihan cache yang jelas. Jangan tersalah memilih Clear storage atau Clear data. Buka semula sekali dan rekod hasil tanpa bermain atau membuat transaksi ujian.</li>
   <li><strong>iPhone/iPad: semak penggunaan dahulu.</strong> Buka Settings → General → iPhone Storage atau iPad Storage, kemudian pilih app. Baca perbezaan Offload App dan Delete App sebelum membuat keputusan. Jangan mengikuti arahan menu Android pada iPhone, memasang profil tidak dikenali atau memintas amaran keselamatan.</li>
  </ol>
  <p className={styles.note}><strong>Berhenti sebelum padam data, offload atau uninstall</strong> jika anda tidak pasti cara mendapatkan semula akses, sumber pemasangan atau status sandaran. Dapatkan penjelasan sokongan terlebih dahulu. Offload mengekalkan dokumen menurut fungsi iOS, tetapi bukan jaminan app boleh dimuat turun semula atau akaun dipulihkan.</p>
  <h3>Soalan ringkas untuk sokongan</h3>
  <p>“App saya masih gagal selepas restart dan semakan versi. Adakah arahan anda bermaksud clear cache, clear data, offload atau uninstall? Apakah data setempat yang terjejas, bagaimana akses dipulihkan, dan bagaimana saya mengesahkan sumber pemasangan semula?” Sertakan <a href="#connection-failed">rekod ralat yang telah disunting</a>, bukan rahsia akaun.</p>
  <p>Tiada jumlah storan minimum, tempoh pemulihan, keserasian versi atau jaminan baki akaun ditetapkan oleh panduan ini. Jika isu melibatkan laman TipsMega888, gunakan <Link href="/help">halaman bantuan kami</Link>; data app operator tidak boleh diperiksa melalui scanner kami.</p>
  <h3>Rujukan utama dan had panduan</h3>
  <ul>
   <li><a href="https://support.google.com/android/answer/7431795?hl=en">Google Android Help: Free up storage</a> — perbezaan clear cache dan clear storage serta variasi tetapan telefon.</li>
   <li><a href="https://support.apple.com/en-us/108429">Apple Support: semak storan iPhone/iPad</a> — lokasi menu, Offload App dan Delete App.</li>
   <li><a href="https://support.apple.com/en-us/119876">Apple Support: app tidak boleh dibuka</a> dan <a href="https://support.google.com/android/answer/2668665">Google: app tidak berfungsi</a> — langkah awal sebelum pemadaman.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-09-25">25 September 2026</time>. Rujukan ini menerangkan sistem peranti, bukan pengesahan Google atau Apple terhadap Mega888. Tiada ujian app sebenar atau pemulihan akaun dilakukan untuk artikel ini.</p>
 </section>;
}
