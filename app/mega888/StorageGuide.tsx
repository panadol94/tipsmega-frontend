import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function StorageGuide() {
 return <section id="cache-dan-data" aria-labelledby="storage-title">
  <span className={styles.kicker}>PANDUAN STORAN / 25 SEPTEMBER 2026</span>
  <h1 id="storage-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 tak boleh dibuka: beza clear cache, padam data dan offload</h1>
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
   <li><strong>Bezakan gejala dahulu.</strong> Jika mesejnya connection failed, gunakan <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link>. Jika login ditolak tetapi app terbuka, gunakan <Link href="/mega888#problem-solver">Problem Solver</Link>. Mengosongkan storan tidak mengesahkan atau menyelesaikan status akaun pada server.</li>
   <li><strong>Simpan rekod yang tidak sensitif.</strong> Catat model telefon, versi sistem dan app, ruang storan tersedia serta mesej ralat sebelum perubahan. Simpan saluran pemulihan akaun yang sudah dikenal pasti. Jangan hantar kata laluan, OTP atau kod pemulihan kepada sesiapa.</li>
   <li><strong>Cuba langkah tanpa memadam data.</strong> Tutup dan buka semula app, restart telefon, kemudian semak kemas kini daripada sumber yang dipercayai. Buat satu perubahan pada satu masa supaya hasilnya boleh dibandingkan.</li>
   <li><strong>Android: baca label sebenar.</strong> Dalam Settings/Tetapan, buka maklumat app yang betul dan bahagian storannya; laluan serta label berbeza mengikut pengeluar. Jika anda memilih untuk mencuba clear cache, pilih hanya pilihan cache yang jelas. Jangan tersalah memilih Clear storage atau Clear data. Buka semula sekali dan rekod hasil tanpa bermain atau membuat transaksi ujian.</li>
   <li><strong>iPhone/iPad: semak penggunaan dahulu.</strong> Buka Settings → General → iPhone Storage atau iPad Storage, kemudian pilih app. Baca perbezaan Offload App dan Delete App sebelum membuat keputusan. Jangan mengikuti arahan menu Android pada iPhone, memasang profil tidak dikenali atau memintas amaran keselamatan.</li>
  </ol>
  <p className={styles.note}><strong>Berhenti sebelum padam data, offload atau uninstall</strong> jika anda tidak pasti cara mendapatkan semula akses, sumber pemasangan atau status sandaran. Dapatkan penjelasan sokongan terlebih dahulu. Offload mengekalkan dokumen menurut fungsi iOS, tetapi bukan jaminan app boleh dimuat turun semula atau akaun dipulihkan.</p>
  <h3>Soalan ringkas untuk sokongan</h3>
  <p>“App saya masih gagal selepas restart dan semakan versi. Adakah arahan anda bermaksud clear cache, clear data, offload atau uninstall? Apakah data setempat yang terjejas, bagaimana akses dipulihkan, dan bagaimana saya mengesahkan sumber pemasangan semula?” Sertakan <Link href="/panduan/mega888-connection-failed">rekod ralat yang telah disunting</Link>, bukan rahsia akaun.</p>
  <p>Tiada jumlah storan minimum, tempoh pemulihan, keserasian versi atau jaminan baki akaun ditetapkan oleh panduan ini. Jika isu melibatkan laman TipsMega888, gunakan <Link href="/help">halaman bantuan kami</Link>; data app operator tidak boleh diperiksa melalui scanner kami.</p>
  <section id="storan-peranti-awan" aria-labelledby="device-storage-title">
   <h2 id="device-storage-title">Mega888 storan penuh: ruang telefon, iCloud atau RAM?</h2>
   <p>Apabila muat turun atau kemas kini terhenti, arahan “kosongkan ruang” belum cukup jelas. Lihat dahulu lokasi amaran: adakah pemasang menyebut storan peranti, tetapan iCloud menunjukkan kuota penuh, atau app hanya terasa perlahan? Tiga keadaan ini tidak sama. Jangan membeli ruang awan atau memadam data akaun sebagai jawapan automatik kepada semuanya.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-storan-peranti-awan-20261005.webp" style={{maxHeight:"none"}} width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep telefon dengan blok storan padat dan arkib awan berasingan, dihubungkan oleh laluan optik merah" />
    <figcaption>Ilustrasi konsep dijana AI: storan fizikal telefon dan arkib awan ialah ruang berasingan. Bukan screenshot tetapan atau bukti sandaran berjaya.</figcaption>
   </figure>
   <div className={styles.grid}>
    <article><h3>Storan peranti</h3><p>Ruang untuk app dan fail pada telefon. Semak di Settings → General → iPhone Storage pada iPhone, atau Settings → Storage pada Android jika menu itu tersedia. Catat ruang yang digunakan dan tersedia, bukan hanya kapasiti keseluruhan telefon. Nama menu Android boleh berbeza mengikut pengeluar.</p></article>
    <article><h3>Storan iCloud</h3><p>Pada iPhone, Settings → nama anda → iCloud menunjukkan penggunaan awan. Apple membezakan kuota ini daripada kapasiti peranti. Menambah pelan iCloud tidak menambah kapasiti fizikal telefon; mengurus atau mengoptimumkan kandungan ialah langkah berasingan. Amaran iCloud penuh sahaja tidak membuktikan pemasang app kehabisan ruang peranti.</p></article>
    <article><h3>Memori / RAM</h3><p>Google membezakan storan yang menyimpan data daripada memori yang menjalankan program. Menutup app tidak sama dengan membuang fail daripada storan. Jika telefon lag tanpa amaran storan, rekod gejala dahulu; jangan menganggap butang “boost RAM” atau pembersih tambahan diperlukan.</p></article>
   </div>
   <h3>Checklist ruang kosong tanpa terus memadam data app</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Baca amaran dan catat bacaan awal.</strong> Simpan teks ralat, peringkat kegagalan (muat turun, pemasangan atau membuka app), model telefon, versi sistem dan angka storan tersedia. Jika perlu berkongsi gambar, ikut <Link href="/panduan/mega888-screenshot-ralat">panduan screenshot yang disunting</Link>; jangan tunjuk ID penuh, baki atau butiran peribadi dalam senarai fail.</li>
    <li><strong>Semak kategori terbesar, bukan padam secara pukal.</strong> Periksa video muat turun, fail Downloads atau media luar talian yang anda kenal. Google mencadangkan pengurusan kandungan melalui app yang memuat turunnya. Pilih hanya item yang tidak diperlukan atau salin dahulu ke tempat yang anda boleh akses. Jangan anggap semua fail bernama serupa ialah pendua yang selamat dibuang.</li>
    <li><strong>Sahkan sandaran sebelum mengeluarkan salinan tempatan.</strong> Jika menggunakan Google Photos, pastikan foto telah disandarkan dengan betul sebelum memilih fungsi “Free up space on this device”. Fungsi itu membuang salinan pada peranti; menurut Google, foto yang dikeluarkan tidak tersedia melalui galeri terbina dalam atau ketika luar talian. Jangan samakan fungsi khusus ini dengan sebarang butang Delete dalam app lain.</li>
    <li><strong>Kekalkan fail yang masih diperlukan tanpa internet.</strong> Jika screenshot ralat, dokumen atau foto perlu dibuka ketika sambungan gagal, simpan salinan yang boleh diakses secara luar talian. Menjadikan fail hanya tersedia dalam awan mungkin tidak sesuai untuk situasi sokongan anda. Sandaran foto juga bukan bukti bahawa data atau akses akaun Mega888 telah disandarkan.</li>
    <li><strong>Semak semula angka, kemudian buat satu percubaan.</strong> Selepas satu tindakan yang anda fahami, buka semula paparan storan dan catat ruang tersedia. Jika sumber pemasangan sudah disahkan dan tiada amaran keselamatan, cuba sekali lagi pada peringkat yang gagal. Jangan gabungkan pemadaman, reset rangkaian dan pemasangan fail lain dalam satu percubaan: hasilnya sukar ditafsir.</li>
   </ol>
   <p className={styles.note}><strong>Tiada ambang “1 GB pasti cukup”.</strong> Panduan ini tidak mempunyai spesifikasi sah bagi setiap pakej atau kemas kini Mega888. Saiz fail muat turun sahaja bukan pengesahan ruang pemasangan yang diperlukan. Minta keperluan untuk versi yang tepat melalui saluran yang sudah dikenal pasti; jangan menerima angka umum sebagai jaminan atau mematikan perlindungan telefon untuk meneruskan.</p>
   <h3>Cara membaca hasil dan bila perlu berhenti</h3>
   <p>Jika ruang tersedia meningkat tetapi ralat sama kekal, anda hanya telah mengesahkan perubahan storan — bukan bahawa akaun, fail pemasangan atau server berfungsi. Berhenti menghapuskan lebih banyak data secara rawak. Gunakan <Link href="/panduan/mega888-ralat-pemasangan">panduan ralat pemasangan</Link> apabila pemasang memberi amaran, atau <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link> apabila app terbuka tetapi gagal bersambung.</p>
   <p>Untuk sokongan, tulis: “Ralat berlaku pada [peringkat]. Storan peranti tersedia sebelum [bacaan], selepas [bacaan]. Saya hanya mengubah [tindakan]. Hasil percubaan seterusnya [mesej tepat]. Adakah terdapat keperluan ruang dan keserasian bagi versi ini?” Jangan sertakan kata laluan, OTP atau kod pemulihan. Jika tidak pasti sesuatu fail boleh dipulihkan, jangan padamnya untuk mengejar angka ruang kosong.</p>
   <p>Langkah ini ialah semakan sistem peranti, bukan diagnosis app sebenar, pengesahan sumber muat turun atau janji pemulihan baki. Tiada pemasangan atau transaksi percubaan diperlukan untuk merekod storan.</p>
  </section>
  <section id="android-app-diarkibkan" aria-labelledby="archive-title">
   <h2 id="archive-title">Ikon Mega888 malap di Android: app diarkibkan atau sudah dipadam?</h2>
   <p>Ikon yang masih kelihatan tidak semestinya bermaksud app sedia dibuka. Sebelum memilih uninstall, bezakan status peranti daripada ralat login. Semakan ini berguna apabila anda kembali kepada app selepas lama tidak menggunakannya. Ia tidak mengesahkan bahawa mana-mana pakej Mega888 menyokong fungsi arkib atau boleh dipulihkan melalui Google Play.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-arkib-app-slot-20261021.webp" width="1536" height="1024" loading="lazy" decoding="async" style={{maxHeight:"none",objectFit:"contain"}} alt="Ilustrasi konsep gelendong slot ceri, tujuh dan loceng dalam laci arkib baldu merah, dengan penanda emas di luar" />
    <figcaption>Ilustrasi konsep dijana AI: gelendong disimpan dengan penanda tempat dikekalkan. Bukan screenshot app, keputusan permainan atau bukti data boleh dipulihkan.</figcaption>
   </figure>
   <h3>Arkib bukan clear cache, dan ikon bukan sandaran</h3>
   <p>Menurut <a href="https://support.google.com/googleplay/answer/15523443?hl=en">Google Play Help tentang app diarkibkan</a>, arkib membuang perisian, permission dan fail sementara serta menghentikan notifikasi, tetapi mengekalkan ikon dan data app. Ikon menjadi malap dengan tanda arkib. Sebahagian langkah memerlukan Android 15 ke atas dan perkakasan yang menyokongnya. Jangan gunakan rupa ikon sahaja sebagai pengesahan; baca status dalam maklumat app.</p>
   <p>Pemulihan memerlukan gedung app berkaitan masih dipasang dan app masih tersedia untuk dimuat turun di situ. Ruang pemasangan juga diperlukan. Google menerangkan pemulihan melalui ikon malap, App info atau halaman butiran app dalam Play Store. Jika pilihan itu tiada, jangan anggap telefon rosak atau mencari APK rawak sebagai gantinya. Laluan sebenar bergantung pada peranti dan sokongan gedung.</p>
   <h3>Semakan sebelum sebarang pemasangan semula</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Catat di mana masalah bermula.</strong> Adakah anda belum sampai ke skrin login, menerima permintaan memulihkan app, atau sudah melihat mesej dalam app? Tulis perkataan tepat dan masa kejadian. “Ikon malap sebelum app dibuka” lebih berguna daripada “akaun hilang”.</li>
    <li><strong>Buka maklumat app secara baca sahaja.</strong> Cari app yang betul dalam Settings → Apps, jika menu tersedia. Catat label status dan pilihan yang dipaparkan, tanpa menekan Archive, Uninstall atau Clear storage untuk mencuba. Jika ada beberapa nama serupa, jangan meneka salinan mana yang menyimpan data anda.</li>
    <li><strong>Kenal pasti sumber asal.</strong> Rekod sama ada pemasangan dahulu melalui gedung atau fail luar, jika diketahui. Tulis “tidak pasti” apabila tiada rekod. Panduan Google tentang arkib tidak membuktikan bahawa fail yang dihantar melalui chat mempunyai saluran pemulihan yang serasi.</li>
    <li><strong>Semak prasyarat, bukan tukar banyak tetapan.</strong> Baca ruang tersedia dan status sambungan. Jika pemulihan yang anda kenal pasti meminta ruang, rujuk <Link href="/panduan/mega888-cache-dan-data#storan-peranti-awan">checklist storan peranti</Link>. Jangan gabungkan reset rangkaian, pemadaman data dan pemasangan fail lain dalam satu percubaan.</li>
    <li><strong>Hentikan percubaan apabila syarat tidak jelas.</strong> Jika gedung tidak lagi menawarkan app, sumber tidak dapat disahkan atau amaran keselamatan muncul, simpan mesej tersebut. Gunakan <Link href="/panduan/mega888-ralat-pemasangan">panduan ralat pemasangan</Link>; jangan matikan Play Protect atau perlindungan lain untuk memaksa proses.</li>
   </ol>
   <h3>“Unused apps” tidak semestinya bermaksud diarkibkan</h3>
   <p><a href="https://support.google.com/googleplay/answer/13627979?hl=en">Google menerangkan pengurusan app tidak digunakan</a> secara berasingan: fail sementara boleh dibuang, permission ditarik balik, aktiviti latar dan notifikasi dihentikan. Oleh itu, notifikasi yang senyap sahaja tidak membuktikan arkib atau sekatan akaun. Catat tetapan yang dilihat tanpa terus mematikan pengurusan app tidak digunakan. Jika app kemudian meminta akses, gunakan <Link href="/panduan/mega888-semak-permission">semakan permission</Link>, bukan beri semua akses sekaligus.</p>
   <p>Jika ikon langsung tiada, statusnya juga belum jelas. <a href="https://support.google.com/googleplay/answer/113410?hl=en">Panduan pemasangan semula Google Play</a> menerangkan senarai app bagi akaun Google yang sama dan pilihan app yang tidak dipasang. Itu ialah rekod gedung, bukan rekod akaun operator. Jangan tukar akaun secara rawak, berkongsi password Google atau menganggap app dengan logo sama ialah pakej asal.</p>
   <h3>Rekod ringkas apabila pemulihan gagal</h3>
   <p>“Peranti [model], Android [versi]. Ikon [masih ada/tiada]; App info menyebut [label]. Sumber asal [diketahui/tidak pasti]. Proses berhenti sebelum login pada [mesej]. Ruang tersedia [bacaan]. Saya belum uninstall atau padam data.” Minta sokongan menjelaskan status pakej dan pilihan pemulihan yang sesuai, bukan menjanjikan baki kembali.</p>
   <p>Sunting <Link href="/panduan/mega888-screenshot-ralat">screenshot laporan</Link> supaya alamat e-mel, ID penuh dan maklumat peribadi tidak terdedah. Jangan sertakan OTP, password atau kod pemulihan. Data yang dikekalkan oleh fungsi arkib bukan jaminan sesi login, baki operator atau keserasian versi baharu. Tiada pemulihan app sebenar diuji untuk panduan ini.</p>
   <p>Rujukan disemak pada <time dateTime="2026-10-21">21 Oktober 2026</time>. Ini penerangan fungsi Android, bukan pengesahan Google terhadap Mega888 atau sumber muat turunnya.</p>
  </section>
  <section id="android-private-space" aria-labelledby="private-space-title">
   <h2 id="private-space-title">Ikon Mega888 hilang: semak Private Space sebelum anggap app dipadam</h2>
   <p>Anda mencari app yang pernah dibuka, tetapi ikonnya tidak muncul. Ini belum cukup untuk menyimpulkan akaun hilang atau pemasangan rosak. Jika anda memang menggunakan Private Space Android, semak ruang tersebut dahulu. Jangan cipta ruang baharu semata-mata untuk mencuba penyelesaian ini. Panduan ini bukan pengesahan keserasian Mega888 dengan ciri tersebut.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-private-space-slot-20261022.webp" width="1536" height="1024" loading="lazy" decoding="async" style={{maxHeight:"none",objectFit:"contain"}} alt="Ilustrasi dua ruang gelendong slot merah hitam dan emas, satu terbuka dan satu di sebalik pintu kaca berkunci" />
    <figcaption>Ilustrasi konsep dijana AI: dua ruang berasingan, bukan screenshot Android, keputusan permainan atau bukti keselamatan app.</figcaption>
   </figure>
   <h3>Apa yang diterangkan oleh Android</h3>
   <p><a href="https://support.google.com/android/answer/15341885?hl=en">Google menerangkan Private Space</a> sebagai ruang app berasingan pada peranti Android 15 ke atas yang menyokongnya. Apabila dikunci, app di dalamnya dihentikan, tidak menghantar notifikasi dan disembunyikan daripada beberapa paparan termasuk carian. Ini berbeza daripada <Link href="/panduan/mega888-cache-dan-data#android-app-diarkibkan">app diarkibkan</Link>.</p>
   <p>Pemasangan dalam Private Space menghasilkan salinan app baharu; ia tidak menyalin atau mengubah pemasangan asal. Data app ruang utama tidak dipindahkan ke salinan itu. Memadam ruang memadam app dan data setempatnya; sandaran peranti tidak memulihkan Private Space. Jangan gunakan reset ruang sebagai langkah mencari ikon.</p>
   <h3>Checklist baca dahulu, bukan padam dahulu</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Rekod pemerhatian sebenar.</strong> Tulis “tidak muncul dalam carian” atau “ikon ada tetapi tidak terbuka”, bukan terus “akaun disekat”. Nyatakan masa terakhir app dilihat dan sama ada telefon baru direstart. Jangan ubah tetapan storan ketika mengumpulkan maklumat ini.</li>
    <li><strong>Pastikan ciri itu memang pernah digunakan.</strong> Pada telefon sendiri yang menyokongnya, Google menyediakan laluan Settings → Security &amp; privacy → Private space. Buka dengan pengesahan biasa milik anda jika ruang itu telah disediakan. Jangan berkongsi PIN, memintas kunci atau mengubah pengurusan telefon orang lain.</li>
    <li><strong>Bandingkan lokasi, bukan buat login berulang.</strong> Catat sama ada ikon ditemui di ruang utama atau ruang peribadi. Jika ada dua salinan, kenal pasti yang sedang diperiksa sebelum mengikuti arahan sokongan. Tidak perlu memasang salinan tambahan atau menjalankan transaksi ujian.</li>
    <li><strong>Asingkan masalah seterusnya.</strong> Jika ikon ditemui tetapi app menunjukkan ralat, simpan teks tepat. Gunakan <Link href="/panduan/mega888-login-autofill">panduan login dan autofill</Link> untuk borang login, atau <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link> untuk kegagalan rangkaian. Menemui ikon tidak mengesahkan status akaun.</li>
   </ol>
   <h3>Rekod sokongan tanpa mendedahkan ruang peribadi</h3>
   <p>Contoh: “Pada [model/versi Android], ikon tidak muncul di [paparan]. Saya pernah menggunakan Private Space: [ya/tidak pasti]. Selepas semakan biasa, ikon [ditemui/tidak ditemui]. Ralat seterusnya ialah [teks]. Tiada data dipadam.” Hantar melalui saluran yang sudah dikenal pasti. Jangan sertakan senarai app peribadi; rujuk <Link href="/panduan/mega888-screenshot-ralat">cara menyunting screenshot</Link> jika gambar diperlukan.</p>
   <p className={styles.note}>Jika anda tidak pernah menggunakan Private Space, menu tiada atau kunci tidak dapat dibuka, hentikan laluan ini. Jangan memilih Delete atau Reset untuk “memulihkan” app. Minta panduan pengeluar tentang paparan peranti; isu akaun kekal urusan sokongan akaun yang berkenaan. Ini semakan konteks, bukan diagnosis atau ujian app sebenar.</p>
   <p>Rujukan fungsi Android disemak pada <time dateTime="2026-10-22">22 Oktober 2026</time>. Tiada jaminan pemulihan data, notifikasi atau akses akaun.</p>
  </section>
  <h3>Rujukan utama dan had panduan</h3>
  <ul>
   <li><a href="https://support.apple.com/en-us/102670">Apple: beza storan iCloud dan storan peranti</a> — kapasiti berasingan dan menu semakan.</li>
   <li><a href="https://support.google.com/photos/answer/6128843?hl=en&amp;co=GENIE.Platform%3DAndroid">Google Photos: Free up space on your device</a> — syarat sandaran serta batas akses selepas salinan tempatan dikeluarkan.</li>
   <li><a href="https://support.google.com/android/answer/7431795?hl=en">Google Android Help: Free up storage</a> — perbezaan clear cache dan clear storage serta variasi tetapan telefon.</li>
   <li><a href="https://support.apple.com/en-us/108429">Apple Support: semak storan iPhone/iPad</a> — lokasi menu, Offload App dan Delete App.</li>
   <li><a href="https://support.apple.com/en-us/119876">Apple Support: app tidak boleh dibuka</a> dan <a href="https://support.google.com/android/answer/2668665">Google: app tidak berfungsi</a> — langkah awal sebelum pemadaman.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-10-21">21 Oktober 2026</time>. Rujukan ini menerangkan sistem peranti, bukan pengesahan Google atau Apple terhadap Mega888. Tiada ujian app sebenar atau pemulihan akaun dilakukan untuk artikel ini.</p>
 </section>;
}
