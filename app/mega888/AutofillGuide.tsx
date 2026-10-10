import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function AutofillGuide() {
 return <section id="login-autofill" aria-labelledby="autofill-title">
  <span className={styles.kicker}>LOGIN / REKOD TERSIMPAN</span>
  <h1 id="autofill-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 login gagal selepas reset: semak autofill dan akaun yang dipilih</h1>
  <p>Ruangan login yang sudah terisi tidak semestinya mengandungi maklumat terkini. Pengurus kata laluan mungkin menawarkan rekod lama atau ID lain yang pernah disimpan. Sebelum reset sekali lagi, bezakan apa yang telefon isikan daripada apa yang perkhidmatan terima. Ini ialah semakan umum isian automatik, bukan pengesahan bahawa setiap versi aplikasi Mega888 menyokong Google Password Manager atau Apple Passwords.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-autofill-rekod-login-20261003.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep arkib kad rekod login dengan rel pemilih merah, satu kad lama diasingkan dan telefon gelap pada pedestal berasingan" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: memilih rekod tersimpan berbeza daripada menukar kata laluan akaun. Bukan screenshot aplikasi atau bukti akses telah dipulihkan.</figcaption>
  </figure>
  <h3>Tiga perkara yang berbeza walaupun nampak seperti satu login</h3>
  <div className={styles.grid}>
   <article><h3>Rekod dalam pengurus kata laluan</h3><p>Salinan maklumat yang pernah anda simpan untuk laman atau app. Nama rekod membantu mencari entri, tetapi bukan pengesahan status akaun atau identiti pengendali. Rekod itu boleh merujuk kepada ID lain.</p></article>
   <article><h3>Maklumat dalam borang</h3><p>Autofill memasukkan maklumat yang dipilih ke ruangan login. Semak ID dan destinasi sebelum menghantar. Kemunculan cadangan bukan bukti kata laluan masih sah; ketiadaan cadangan pula bukan bukti akaun telah dipadam.</p></article>
   <article><h3>Kata laluan pada perkhidmatan</h3><p>Perubahan sebenar perlu diselesaikan melalui proses perubahan atau pemulihan perkhidmatan berkenaan. Mengedit teks dalam rekod tersimpan sahaja tidak melakukan reset pada pihak operator. Jika pengurus membuka aliran Change Password, proses di perkhidmatan masih perlu diselesaikan.</p></article>
  </div>
  <h3>Urutan semakan tanpa memadam rekod atau meneka password</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Pastikan destinasi dahulu.</strong> Gunakan app atau alamat yang telah anda sahkan secara berasingan, bukan pautan baharu daripada mesej bantuan. Bezakan akaun operator daripada akaun TipsMega888. Jika destinasi meragukan, berhenti dan gunakan <Link href="/panduan/mega888-pautan-reset-login">panduan pautan reset</Link>; jangan cuba password pada halaman itu.</li>
   <li><strong>Semak ID yang terisi.</strong> Padankan dengan rekod akaun anda sendiri. Jika ada beberapa pilihan tersimpan, pilih entri untuk akaun dan destinasi yang betul, bukan pilihan pertama semata-mata. Jangan menukar nama domain pada rekod untuk memaksa pengurus mengisi laman yang berlainan.</li>
   <li><strong>Semak konteks reset terakhir.</strong> Adakah proses perubahan benar-benar selesai, atau anda hanya menyunting rekod pada telefon? Catat masa dan pengesahan proses tanpa menyalin kata laluan. Jika anda tidak pasti kata laluan semasa, teruskan melalui saluran pemulihan yang sudah disahkan; jangan mencuba semua rekod lama satu demi satu.</li>
   <li><strong>Jika anda pasti maklumat semasa, semak satu percubaan terkawal.</strong> Pada destinasi yang disahkan dan tanpa amaran sekatan, gunakan ID serta kata laluan semasa, bukan cadangan lama. Lakukan secara peribadi tanpa rakaman atau perkongsian skrin. Jika masih ditolak, berhenti; tiada bilangan cubaan atau tempoh buka sekatan yang dijamin di sini.</li>
   <li><strong>Selaraskan rekod hanya selepas proses disahkan.</strong> Jika perubahan kata laluan berjaya, kemas kini entri yang sepadan melalui pengurus anda. Jangan padam semua password, eksport fail atau uninstall app sebagai cara membetulkan satu entri. Pada pengurus yang menyegerakkan rekod, suntingan atau pemadaman boleh memberi kesan pada peranti lain.</li>
  </ol>
  <h3>Di mana hendak menyemak rekod?</h3>
  <div className={styles.grid}>
   <article><h3>Android dengan Chrome</h3><p>Dalam Chrome, buka Settings → Google Password Manager. Pada borang laman yang pernah dilawati, Google menerangkan bahawa anda boleh memilih ruangan username untuk memilih maklumat login tersimpan. Pengesahan cap jari atau kod peranti mungkin diperlukan. Ini laluan Chrome, bukan menu yang dijamin wujud dalam app Mega888 atau semua pengurus Android.</p><p>Google membezakan password yang disimpan dalam Google Account dengan yang disimpan setempat pada peranti apabila tidak log masuk ke Chrome. Rekod yang tidak muncul pada telefon lain tidak semestinya hilang dari perkhidmatan. Semak konteks simpanan dahulu, bukan terus mengimport atau mengeksport semuanya.</p></article>
   <article><h3>iPhone</h3><p>Apple menerangkan penggunaan app Passwords pada iOS 18 atau lebih baharu; untuk iOS 17 atau terdahulu, buka Settings → Passwords. Buka kunci sendiri dan pilih laman atau app berkaitan. Jangan berikan kod buka kunci kepada sokongan.</p><p>Jika rekod tidak kelihatan, semak paparan All berbanding Shared Group, bahagian Deleted/Recently Deleted dan konteks iCloud Keychain mengikut versi sistem. Ini semakan lokasi rekod, bukan arahan memulihkan atau berkongsi semua password. Jangan padam entri hanya kerana terdapat lebih daripada satu pilihan.</p></article>
  </div>
  <h3>Bagaimana mentafsir hasil semakan?</h3>
  <ul>
   <li><strong>ID terisi berbeza:</strong> betulkan pilihan rekod sebelum menghantar. Ini menunjukkan isu pemilihan, bukan bukti akaun digodam.</li>
   <li><strong>Maklumat semasa diterima tetapi cadangan lama ditolak:</strong> semak entri tersimpan yang digunakan. Jangan menganggap clear cache akan menyegerakkan semua pengurus password.</li>
   <li><strong>Maklumat yang diyakini semasa masih ditolak:</strong> status akaun, proses reset atau sebab lain masih belum dapat dipastikan. Catat mesej sebenar dan hubungi sokongan melalui saluran yang telah dikenal pasti.</li>
   <li><strong>Tiada cadangan autofill:</strong> ia boleh berkaitan konteks simpanan atau sokongan borang/app; bukan alasan memasang keyboard, profil atau aplikasi bantuan daripada orang tidak dikenali.</li>
  </ul>
  <p className={styles.note}>Jangan hantar screenshot pengurus password, fail eksport, password, OTP atau kod pemulihan. Jika skrin menyatakan akaun terkunci, jangan terus mencuba. Jika gejalanya timeout atau connection failed, gunakan <Link href="/panduan/mega888-connection-failed">semakan rangkaian</Link> dan jangan andaikan password rosak.</p>
  <h3>Rekod ringkas untuk sokongan</h3>
  <p>“Masa dan zon waktu: __. Peranti/versi sistem: __. App atau pelayar: __. Mesej ralat tepat: __. Berlaku sebelum/selepas proses reset: __. Ruangan diisi secara manual/autofill: __. ID yang terpilih sepadan/tidak sepadan, tanpa menulis ID penuh: __. Langkah yang telah dibuat: __.” Jika perlu lampiran, ikut <Link href="/panduan/mega888-screenshot-ralat">panduan screenshot ralat</Link> dan jangan rakam semasa membuka rekod rahsia.</p>
  <p>TipsMega888 tidak boleh menyemak atau reset password operator. Scanner ialah simulasi/rujukan katalog indikatif, bukan pemeriksa login. Untuk isu akaun laman ini, gunakan <Link href="/help">bantuan TipsMega888</Link>; lihat <Link href="/info">metodologi scanner</Link> untuk had aksesnya.</p>
  <section id="sesi-pelayar-cookies" aria-labelledby="browser-session-title">
   <h2 id="browser-session-title">Mega888 login melalui pelayar: cookies, sesi dan batas Incognito</h2>
   <p>Jika borang login kembali muncul selepas anda menutup pelayar, itu tidak semestinya bermaksud password berubah. Rekod autofill mengisi borang; sesi laman pula membantu laman mengenali lawatan yang sedang berlangsung. Bahagian ini hanya untuk masalah pada halaman web yang anda sendiri sudah sahkan, bukan arahan bagi app Mega888 asli atau bukti kewujudan sesuatu portal web rasmi.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-sesi-pelayar-cookies-20261010.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep dua bingkai pelayar pada tapak berasingan, token sesi kekal dan sementara serta peti rekod kata laluan tertutup" style={{maxHeight:"none",objectFit:"contain"}} />
    <figcaption>Ilustrasi konsep dijana AI: sesi pelayar dan rekod password digambarkan berasingan. Bukan screenshot, bukti keselamatan laman atau jaminan login berjaya.</figcaption>
   </figure>
   <h3>Empat perkara yang perlu dibezakan</h3>
   <div className={styles.grid}>
    <article><h3>Autofill / password tersimpan</h3><p>Maklumat yang pengurus boleh isikan ke borang. Ia tidak membuktikan sesi masih aktif. Menyunting rekod password tidak memanjangkan sesi laman atau menukar polisi tamat sesi pada server.</p></article>
    <article><h3>Cookies dan data laman</h3><p>Google menerangkan bahawa cookies boleh membantu laman mengekalkan login dan pilihan pengguna. Memadamnya boleh menyebabkan anda log keluar serta kehilangan pilihan tersimpan. Ini berbeza daripada reset password atau menutup akaun.</p></article>
    <article><h3>Cache pelayar</h3><p>Salinan bahagian halaman, seperti imej, membantu pemuatan seterusnya. Kategori Cached images and files tidak sama dengan Cookies and other site data. Jangan anggap semua pilihan dalam dialog pemadaman mempunyai kesan yang serupa.</p></article>
    <article><h3>Sesi Incognito</h3><p>Dalam Chrome, sesi ini berasingan daripada tetingkap biasa. Cookies dan data laman digunakan sementara, kemudian dikeluarkan apabila semua tetingkap Incognito ditutup. Membuka satu lagi tetingkap Incognito ketika yang lama masih terbuka bukan semestinya memulakan sesi baharu.</p></article>
   </div>
   <h3>Checklist sebelum reset password atau padam data</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Kenal pasti tempat masalah berlaku.</strong> Catat nama dan versi pelayar, sistem peranti, mod biasa atau Incognito, serta sama ada halaman dibuka dalam pelayar penuh atau paparan di dalam app lain. Jangan samakan semua konteks itu. Jika masalah hanya berlaku dalam app asli, kembali kepada <Link href="/mega888#problem-solver">Problem Solver</Link>.</li>
    <li><strong>Semak destinasi tanpa berkongsi pautan rahsia.</strong> Bandingkan nama hos pada bar alamat dengan saluran yang telah anda sahkan secara berasingan. Jangan mengikuti pautan baharu semata-mata kerana ia mendakwa membetulkan sesi. Untuk laporan, catat domain dan peringkat kegagalan; jangan salin URL penuh jika mengandungi token reset atau maklumat akaun.</li>
    <li><strong>Rekod bila sesi hilang.</strong> Adakah borang muncul semula selepas semua tetingkap Incognito ditutup, selepas anda memadam cookies, atau ketika halaman masih terbuka? Rekod urutan ini sebelum mengubah tetapan. Satu contoh jelas lebih berguna daripada beberapa reset serentak.</li>
    <li><strong>Jika membandingkan mod pelayar, ubah satu perkara sahaja.</strong> Pada peranti peribadi, destinasi yang disahkan dan tanpa amaran akaun terkunci, bandingkan keadaan halaman dalam mod biasa dengan Incognito. Pemerhatian boleh berhenti pada paparan borang; tidak perlu menghantar login berulang atau membuat transaksi. Jangan matikan perlindungan pelayar untuk memaksa kedua-duanya memberi hasil sama.</li>
    <li><strong>Jangan terus memilih pemadaman menyeluruh.</strong> Pastikan anda boleh mendapatkan semula akses sebelum sebarang pemadaman cookies atau data laman. Baca kategori dan skop sebenar; data yang disimpan dalam Google Account juga boleh terjejas pada peranti lain apabila dipadam semasa log masuk ke Chrome. Jika tidak faham kesannya, simpan rekod ralat dan rujuk sokongan dahulu, bukannya menekan All time untuk semua kategori.</li>
   </ol>
   <h3>Apa yang keputusan itu boleh — dan tidak boleh — buktikan?</h3>
   <ul>
    <li><strong>Login diminta semula selepas sesi Incognito ditutup:</strong> ini selaras dengan data sesi sementara Chrome, bukan bukti password rosak atau akaun digodam. Tempoh sesi operator masih tidak diketahui.</li>
    <li><strong>Mod biasa dan Incognito memberi hasil berbeza:</strong> ia menunjukkan konteks pelayar berbeza, bukan diagnosis pasti cookies rosak. Chrome menyekat cookies pihak ketiga secara lalai dalam Incognito; sesetengah laman yang bergantung padanya boleh berkelakuan berbeza. Panduan ini tidak mengesahkan keperluan cookies mana-mana operator.</li>
    <li><strong>Kedua-duanya masih gagal:</strong> belum cukup untuk menyimpulkan server tergendala, password salah atau akaun disekat. Catat mesej sebenar; jika gejalanya timeout, gunakan <Link href="/panduan/mega888-connection-failed">checklist sambungan</Link>.</li>
   </ul>
   <p className={styles.note}><strong>Incognito bukan pengesahan keselamatan atau mod tanpa jejak.</strong> Laman dan pihak yang mengurus rangkaian masih boleh melihat aktiviti tertentu. Fail yang dimuat turun dan bookmark kekal selepas sesi ditutup. Jangan gunakan mod ini untuk mengabaikan amaran laman, memasang fail tidak dikenali atau berkongsi password dengan sokongan.</p>
   <h3>Contoh laporan sesi tanpa rahsia</h3>
   <p>“Pelayar/versi: __. Sistem: __. Domain tanpa token: __. Mod biasa/Incognito: __. Borang muncul semula selepas: __. Perubahan tunggal yang dibuat: __. Mesej tepat dan masa: __.” Jangan lampirkan cookies, token sesi, fail eksport password atau rakaman ketika menaip rahsia. Jika perlu gambar, gunakan <Link href="/panduan/mega888-screenshot-ralat">panduan screenshot ralat</Link>.</p>
   <p>Rujukan di bawah menerangkan Chrome, khususnya dokumentasi komputer; nama menu dan tingkah laku pelayar lain boleh berbeza. Tiada ujian login operator, tempoh sesi, sokongan Incognito atau pemulihan akaun yang disahkan di sini. TipsMega888 tidak boleh membaca atau memulihkan sesi operator melalui scanner.</p>
  </section>
  <h3>Rujukan utama dan batas panduan</h3>
  <ul>
   <li><a href="https://support.google.com/chrome/answer/95464?hl=en">Google Chrome: sesi Incognito dan batas privasi</a> — sesi berasingan, penutupan semua tetingkap dan fail yang kekal.</li>
   <li><a href="https://support.google.com/chrome/answer/95647?hl=en">Google Chrome: cookies dan data laman</a> — kesan pemadaman dan cookies pihak ketiga dalam Incognito.</li>
   <li><a href="https://support.google.com/chrome/answer/2392709?hl=en">Google Chrome: jenis data pelayaran yang dipadam</a> — beza cache, cookies dan kategori lain serta kesan data tersimpan pada akaun.</li>
   <li><a href="https://support.google.com/chrome/answer/95606?hl=en&amp;co=GENIE.Platform%3DAndroid">Google Chrome Android: urus password dan pilih maklumat login tersimpan</a> — konteks simpanan, autofill dan pengurus password.</li>
   <li><a href="https://support.apple.com/en-us/104955">Apple: cari password dan passkey tersimpan pada iPhone</a> — perbezaan versi sistem, paparan rekod dan iCloud Keychain.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-10-10">10 Oktober 2026</time>. Rujukan menerangkan fungsi Google dan Apple, bukan sokongan mereka terhadap Mega888. Tiada ujian akaun sebenar, keserasian autofill aplikasi, polisi sekatan atau kejayaan pemulihan yang disahkan untuk panduan ini.</p>
 </section>;
}
