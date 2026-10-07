import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function ConnectionChecklist() {
 return <section id="connection-failed" aria-labelledby="connection-title">
  <span className={styles.kicker}>CHECKLIST SAMBUNGAN & LAPORAN</span>
  <h1 id="connection-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 “connection failed”: apa perlu diperiksa dan dicatat?</h1>
  <p>Mesej “connection failed”, timeout atau loading berterusan belum menentukan puncanya. Tujuan checklist ini ialah membezakan masalah internet umum daripada masalah yang hanya muncul dalam aplikasi, kemudian menyediakan maklumat berguna untuk sokongan. Ia bukan pengesan server atau ujian langsung Mega888.</p>
  <p>Dikemas kini <time dateTime="2026-10-07">7 Oktober 2026</time>. Jika mesej menyebut kata laluan salah atau akaun disekat, terus rujuk <Link href="/mega888#problem-solver">Problem Solver</Link>; jangan ulang login untuk menguji rangkaian.</p>
  <figure className={styles.figure}><img src="/hub/mega888-panduan-visual.webp" alt="Ilustrasi konsep telefon dan alat semakan untuk panduan sambungan aplikasi" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption>Ilustrasi konsep AI daripada Hub, bukan screenshot atau ujian sambungan sebenar.</figcaption></figure>
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
  <section id="data-selular-app" aria-labelledby="data-selular-title">
   <span className={styles.kicker}>SEMAKAN LANJUTAN · DATA MUDAH ALIH</span>
   <h2 id="data-selular-title">Mega888 boleh buka di Wi-Fi tetapi gagal pada data mudah alih?</h2>
   <p>Semakan dua rangkaian belum lengkap jika akses data untuk aplikasi itu sendiri berbeza. Telefon yang boleh membuka laman web melalui data selular tidak semestinya membenarkan setiap aplikasi menggunakan sambungan yang sama. Sebaliknya, mod penjimatan data latar belakang tidak bermaksud semua aplikasi yang sedang dibuka disekat. Bezakan kedua-duanya sebelum menyimpulkan server bermasalah atau memasang semula aplikasi.</p>
   <figure className={styles.figure}><img src="/hub/mega888-data-selular-laluan-app-20261004.webp" alt="Ilustrasi konsep telefon grafit dengan dua rel data merah, jubin aplikasi dan pintu mekanikal pada laluan belakang yang berasingan" width="1536" height="1024" loading="lazy" decoding="async" style={{maxHeight:"none",objectFit:"contain"}} /><figcaption>Ilustrasi konsep AI: laluan data dan kawalan berasingan. Bukan paparan tetapan sebenar atau bukti ujian Mega888.</figcaption></figure>
   <h3>A. iPhone: semak suis data aplikasi, bukan hanya suis utama</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Buka Settings → Cellular atau Mobile Data.</strong> Nama menu mengikut bahasa, peranti dan pembawa. Semak sama ada data selular tersedia. Jika menggunakan lebih daripada satu SIM, catat label talian yang dipilih untuk data tanpa merekod nombor telefon penuh. Jangan tukar talian atau hidupkan roaming hanya untuk menguji aplikasi.</li>
    <li><strong>Tatal ke senarai aplikasi dan cari aplikasi yang dipasang.</strong> Apple menerangkan bahawa aplikasi dengan data selular dimatikan hanya menggunakan Wi-Fi untuk data. Oleh itu, laman web yang berfungsi melalui pelayar tidak membuktikan suis aplikasi lain juga dihidupkan. Jika aplikasi tidak disenaraikan atau pilihannya tidak boleh diubah, catat keadaan itu; jangan pasang profil atau aplikasi lain untuk mendapatkan suis tersebut.</li>
    <li><strong>Rekod dahulu sebelum memilih perubahan.</strong> Jika suis aplikasi memang dimatikan dan anda mahu membenarkan penggunaan data serta menerima kemungkinan caj, hidupkan suis aplikasi itu sahaja. Buka semula aplikasi dan ulang langkah yang gagal sekali, tanpa transaksi. Jika sekatan itu disengajakan untuk mengawal kos, kekalkan tetapan dan gunakan rangkaian Wi-Fi yang sesuai. Jangan ubah tetapan peranti terurus tanpa pentadbir.</li>
   </ol>
   <p>Rekod “suis dimatikan, kemudian dihidupkan; hasil percubaan …” lebih berguna daripada “internet sudah dibaiki”. Kejayaan selepas perubahan ialah petunjuk setempat, bukan pengesahan kesihatan server, status akaun atau keselamatan aplikasi. Angka penggunaan data dalam Settings juga bukan bukti aplikasi berjaya login; Apple mengesyorkan semakan dengan pembawa untuk penggunaan paling tepat.</p>
   <h3>B. Android: Data Saver bukan suis tutup semua internet aplikasi</h3>
   <p>Panduan Google Pixel menerangkan bahawa Data Saver mengehadkan data latar belakang bagi kebanyakan aplikasi dan perkhidmatan kepada Wi-Fi, manakala aplikasi serta perkhidmatan yang sedang aktif masih boleh menggunakan data mudah alih. Jadi, jika skrin login sedang terbuka tetapi tetap gagal, kewujudan ikon Data Saver sahaja belum menerangkan puncanya.</p>
   <ol className={styles.checkSteps}>
    <li><strong>Bezakan bila kegagalan berlaku.</strong> Adakah ia gagal semasa aplikasi terus berada di skrin, atau hanya selepas anda beralih ke aplikasi lain dan kembali? Jangan sengaja membuat deposit, membuka permainan atau meninggalkan transaksi berjalan untuk menghasilkan semula masalah.</li>
    <li><strong>Semak status Data Saver.</strong> Pada laluan yang diterangkan Google Pixel: Settings → Network &amp; internet → Data Saver. Catat hidup atau mati. Menu Android pengeluar lain boleh berbeza; gunakan bantuan pengeluar jika nama itu tiada, bukan menganggap telefonnya rosak.</li>
    <li><strong>Fahami “Unrestricted data” sebelum menyentuhnya.</strong> Dalam menu Data Saver pada Pixel, pilihan ini membenarkan aplikasi terpilih menggunakan data latar belakang ketika Data Saver hidup. Ia bukan kebenaran kamera, storan atau bukti aplikasi dipercayai. Tidak perlu menghidupkannya untuk semua aplikasi atau mematikan Data Saver secara menyeluruh.</li>
   </ol>
   <p>Kami tidak mengesahkan bahawa Mega888 memerlukan pengecualian data latar belakang. Jika masalah hanya berlaku selepas beralih aplikasi, laporkan corak dan status tetapan terlebih dahulu. Sekiranya bantuan pengeluar atau sokongan yang dikenal pasti mencadangkan ujian pengecualian yang relevan, fahami kesan penggunaan data, catat nilai asal dan ubah satu pilihan aplikasi sahaja. Pulihkan pilihan asal jika perubahan tidak membantu.</p>
   <h3>C. Catatan tambahan untuk laporan sokongan</h3>
   <div className={styles.note}><ul>
    <li>Keadaan: gagal semasa aplikasi aktif / selepas kembali ke aplikasi / tidak pasti.</li>
    <li>Wi-Fi: laman biasa […] / aplikasi […]. Data selular: laman biasa […] / aplikasi […] / belum diuji.</li>
    <li>iPhone: suis data aplikasi hidup / mati / tidak disenaraikan / tidak boleh diubah.</li>
    <li>Android: Data Saver hidup / mati / menu tidak ditemui; pengecualian aplikasi jika dapat dilihat […].</li>
    <li>Perubahan tunggal, waktu MYT dan hasil sebenar […]; dipulihkan kepada tetapan asal: ya / tidak berkenaan.</li>
   </ul></div>
   <p>Jika semua laman turut gagal pada data, semak pelan atau sambungan dengan pembawa; jangan terus menyalahkan akaun aplikasi. Jika hanya aplikasi gagal walaupun akses data tersedia, hantar rekod ringkas kepada sokongan yang telah dikenal pasti. Kegagalan selepas kembali ke aplikasi juga boleh melibatkan sesi atau tingkah laku aplikasi; jangan melabelnya sebagai masalah Data Saver tanpa bukti.</p>
   <p>Semakan ini tidak memerlukan reset rangkaian, perubahan APN/DNS, mematikan VPN organisasi atau perlindungan keselamatan. Untuk Wi-Fi awam, sambung ke <Link href="/panduan/mega888-wifi-portal-jam">panduan portal dan jam peranti</Link>. Untuk membezakan jenis akses, baca <Link href="/panduan/mega888-semak-permission">panduan permission</Link>; sebelum berkongsi imej tetapan, gunakan <Link href="/panduan/mega888-screenshot-ralat">checklist screenshot tanpa maklumat sensitif</Link>.</p>
   <p><strong>Batas panduan:</strong> langkah di atas berasaskan dokumentasi sistem peranti, bukan ujian aplikasi pada telefon sebenar. Ia tidak menjanjikan sambungan pulih atau menentukan kod ralat, sekatan akaun dan jadual maintenance.</p>
  </section>
  <section id="sebelum-reset-rangkaian" aria-labelledby="reset-rangkaian-title">
   <span className={styles.kicker}>SEBELUM RESET · SIMPAN AKSES &amp; REKOD</span>
   <h2 id="reset-rangkaian-title">Perlukah reset rangkaian apabila Mega888 masih connection failed?</h2>
   <p>Jangan jadikan reset rangkaian sebagai sambungan automatik kepada percubaan login yang gagal. Ia mengubah tetapan telefon, bukan menyemak akaun atau membaiki server aplikasi. Jika laman biasa berfungsi dan hanya aplikasi ini gagal, simpan hasil perbandingan di atas untuk sokongan dahulu. Apple meletakkan reset rangkaian selepas penyelesaian lain gagal; pada rangkaian kerja atau sekolah, rujuk pentadbir sebelum bertindak.</p>
   <figure className={styles.figure}><img src="/hub/mega888-reset-rangkaian-semak-dahulu-20261007.webp" alt="Ilustrasi konsep telefon grafit dengan kaset konfigurasi rangkaian berasingan, sambungan optik merah dan dulang komponen untuk pemasangan semula" width="1536" height="1024" loading="lazy" decoding="async" style={{maxHeight:"none",objectFit:"contain"}} /><figcaption>Ilustrasi konsep AI tentang menyemak persediaan sebelum reset; bukan screenshot tetapan, sandaran sebenar atau bukti pembaikan.</figcaption></figure>
   <h3>Bezakan empat tindakan yang namanya hampir sama</h3>
   <div className={styles.grid}>
    <article><h4>Restart telefon</h4><p>Menutup dan memulakan semula peranti ialah langkah semakan awal. Ia bukan arahan untuk memadam senarai rangkaian. Catat hasilnya sebelum mempertimbangkan tindakan lain.</p></article>
    <article><h4>Forget satu Wi-Fi</h4><p>Dalam panduan Pixel, Forget membuang rangkaian yang dipilih daripada senarai tersimpan. Untuk menambahnya semula, nama rangkaian dan butiran keselamatan mungkin diperlukan. Jangan melupakan rangkaian jika anda tidak tahu cara mendapatkan akses semula melalui pemiliknya.</p></article>
    <article><h4>Reset Network Settings</h4><p>Pada iPhone, kesannya lebih luas: rangkaian Wi-Fi dan kata laluan, tetapan selular serta tetapan VPN/APN terlibat. Panduan Apple membezakan tetapan VPN biasa daripada tetapan melalui profil atau MDM; reset bukan cara untuk membuang pengurusan organisasi.</p></article>
    <article><h4>Reset All Settings / Erase</h4><p>Ini bukan pilihan yang sama. Apple menyatakan Reset All Settings turut merangkumi tetapan privasi dan kad Apple Pay, manakala Erase All Content and Settings membuang kandungan. Jangan memilih pilihan yang lebih luas untuk mencuba nasib apabila arahan sokongan hanya menyebut rangkaian.</p></article>
   </div>
   <h3>Checklist persediaan sebelum mengikut arahan sokongan</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Pastikan masalah dan skopnya direkod.</strong> Tulis mesej tepat, masa MYT, hasil laman biasa dan aplikasi pada setiap sambungan yang sempat diuji. Tandakan perkara yang belum diuji. Rekod awal membantu membezakan masalah asal daripada kesukaran menyambung semula selepas perubahan.</li>
    <li><strong>Pastikan jalan untuk kembali online tersedia.</strong> Ketahui siapa pemilik Wi-Fi dan cara mendapatkan butiran sambungan secara selamat. Simpan panduan yang diperlukan untuk bacaan luar talian atau sediakan saluran bantuan lain yang anda dibenarkan guna. Jangan mengandaikan chat sokongan akan kekal tersedia ketika Wi-Fi terputus.</li>
    <li><strong>Kenal pasti peranti terurus.</strong> Jika telefon atau rangkaian milik majikan/sekolah, atau ada profil yang anda tidak fahami, hentikan perubahan dan tanya pentadbir. Jangan padam profil, sijil atau VPN organisasi untuk menjadikan ujian aplikasi berjaya. Rujuk <Link href="/panduan/mega888-iphone-verify-app">beza profil dan kepercayaan aplikasi iPhone</Link>.</li>
    <li><strong>Baca nama pilihan dan amaran pada telefon sendiri.</strong> Jangan ikut lokasi butang dalam gambar telefon lain. Pada iPhone, laluan Apple ialah Settings → General → Transfer or Reset iPhone → Reset; sampai ke menu tidak bermaksud anda perlu mengesahkan apa-apa. Jika amaran menyebut pemadaman kandungan atau eSIM, jangan teruskan sebagai ujian rangkaian.</li>
    <li><strong>Untuk Android, semak bantuan pengeluar.</strong> Panduan Pixel tidak menetapkan kesan reset bagi semua jenama dan versi Android. Berikan model, versi sistem dan nama pilihan kepada bantuan pengeluar; jangan meneka bahawa kesannya sama seperti iPhone. Lihat <a href="https://support.google.com/android/answer/3094742?hl=en">direktori bantuan pengeluar Google</a> jika perlu.</li>
   </ol>
   <p>Jika reset akhirnya disarankan bagi masalah rangkaian yang telah dikenal pasti, ikut dokumentasi pengeluar dan pelan pemulihan akses tersebut. Ubah satu perkara sahaja. Jangan gabungkan reset dengan menukar DNS, memasang APK lain atau <Link href="/panduan/mega888-cache-dan-data">memadam data aplikasi</Link>. Checklist ini tidak meminta anda mematikan perlindungan peranti.</p>
   <h3>Selepas perubahan: uji akses asas sebelum aplikasi</h3>
   <p>Sambung semula ke rangkaian yang dibenarkan dan buka satu laman yang dikenali. Jika internet asas masih gagal, berhenti mengulang login dan rujuk pemilik rangkaian, pembawa atau bantuan peranti. Jika internet pulih, cuba semula peringkat aplikasi yang gagal sekali tanpa transaksi. Catat hasil sebenar; kejayaan selepas reset tidak membuktikan DNS tertentu bersalah atau akaun telah dibuka sekatan.</p>
   <div className={styles.note}><p>Catatan ringkas: “Pilihan tepat: […]. Arahan dirujuk: […]. Masa MYT: […]. Rangkaian berjaya disambung semula: ya / tidak. Laman biasa: […]. Aplikasi: […] / belum diuji. Perubahan lain: tiada / […]. Bantuan seterusnya: […].” Jangan masukkan password Wi-Fi, OTP, butiran VPN, QR eSIM atau konfigurasi penuh organisasi.</p></div>
   <p><strong>Batas panduan:</strong> ini persediaan berasaskan dokumentasi Apple dan Google, bukan ujian reset pada Mega888 atau jaminan pemulihan. Jika masalah hanya portal Wi-Fi, gunakan <Link href="/panduan/mega888-wifi-portal-jam">semakan portal dan jam</Link>; reset seluruh rangkaian bukan pengganti mengenal pasti skrin yang sebenarnya gagal.</p>
  </section>
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
  <p>Reset rangkaian bukan langkah pertama: Apple menerangkan bahawa ia membuang tetapan rangkaian termasuk rangkaian Wi-Fi dan kata laluannya. Memadam aplikasi atau datanya juga bukan sebahagian daripada checklist ini. Gunakan <Link href="/mega888#panduan-peranti">panduan peranti</Link> untuk masalah aplikasi tidak terbuka dan <Link href="/help">halaman bantuan TipsMega888</Link> untuk isu laman ini; kami tidak boleh mengesahkan status akaun operator.</p>
  <h3>Rujukan teknikal utama</h3>
  <ul>
   <li><a href="https://support.apple.com/guide/iphone/reset-iphone-settings-iphea1c2fe48/ios">Apple: Reset iPhone settings to their defaults</a> — beza reset rangkaian, tetapan menyeluruh, pemadaman dan profil terurus.</li>
   <li><a href="https://support.google.com/pixelphone/answer/6183600?hl=en">Google Pixel: membaiki masalah Wi-Fi</a> — restart, Forget rangkaian terpilih dan butiran untuk menyambung semula.</li>
   <li><a href="https://support.apple.com/en-us/109323">Apple: Use cellular data on your iPhone or iPad</a> — suis data setiap aplikasi, pilihan talian dan penggunaan data.</li>
   <li><a href="https://support.google.com/pixelphone/answer/7055392?hl=en">Google Pixel: Use less mobile data with Data Saver</a> — beza aplikasi aktif, data latar belakang dan pengecualian aplikasi.</li>
   <li><a href="https://support.google.com/android/answer/3094742?hl=en">Google: bantuan pengeluar peranti atau pembawa</a> — saluran sesuai untuk isu tetapan dan data selular.</li>
   <li><a href="https://support.google.com/googleplay/answer/2651367?hl=en">Google: membaiki masalah sambungan internet Android</a> — restart dan perbandingan Wi-Fi/data.</li>
   <li><a href="https://support.apple.com/en-us/111786">Apple: iPhone/iPad tidak dapat menyambung Wi-Fi</a> — semakan peranti/rangkaian lain dan kesan reset rangkaian.</li>
  </ul>
  <p>Rujukan ini menyokong langkah umum peranti, bukan kod ralat, keserasian versi atau status server Mega888. Tiada pemetaan kod ralat atau jaminan masa pemulihan dibuat di sini.</p>
 </section>;
}
