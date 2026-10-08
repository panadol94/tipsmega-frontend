import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function PermissionsGuide() {
 return <section id="semak-permission" aria-labelledby="permissions-title">
  <span className={styles.kicker}>AKSES PERANTI / 8 OKTOBER 2026</span>
  <h1 id="permissions-title" style={{fontSize:"clamp(26px,5vw,40px)",lineHeight:1.2,fontWeight:800,color:"white",margin:"24px 0"}}>Mega888 minta permission: semak akses sebelum tekan Allow</h1>
  <p>Permintaan kamera, mikrofon atau lokasi bukan perkara yang sama dengan mesej login gagal. Jangan beri semua akses hanya kerana mahu melepasi skrin pemasangan. Mulakan dengan tiga soalan: app mana yang meminta, akses apa yang diminta, dan fungsi apa yang sedang anda gunakan?</p>
  <p>Panduan ini menerangkan kawalan umum Android dan iPhone. Kami tidak menguji fail Mega888 tertentu atau mengesahkan senarai permission wajibnya. Nama, logo, saiz fail atau ketiadaan amaran sahaja tidak membuktikan sesuatu app selamat atau rasmi.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-app-permissions-20260926.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep telefon arang gelap dengan pintu akses berasingan untuk kamera, mikrofon dan lokasi serta gelang pemilih merah" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: akses peranti dipilih satu demi satu. Bukan screenshot tetapan, keputusan audit atau jaminan keselamatan.</figcaption>
  </figure>
  <h3>Bezakan tiga jenis permintaan</h3>
  <div className={styles.grid}>
   <article><h3>Akses ciri atau data</h3><p>Contohnya kamera, mikrofon, lokasi, foto atau kenalan. Semak sama ada permintaan berkaitan dengan tindakan yang anda sendiri mulakan. Jika tujuannya tidak jelas, pilih jangan benarkan atau batalkan dahulu dan minta penjelasan.</p></article>
   <article><h3>Kebenaran pemasangan atau profil</h3><p>Arahan membenarkan sumber pemasangan, mempercayai pembangun atau memasang profil bukan sekadar akses kamera. Jangan menganggapnya bukti fail itu sah. Hentikan proses jika sumber atau tujuan tidak dapat disahkan; jangan memasang profil tidak dikenali untuk menyelesaikan ralat biasa.</p></article>
   <article><h3>Amaran perlindungan</h3><p>Amaran Play Protect atau sistem keselamatan bukan arahan untuk menekan Allow. Kekalkan perlindungan aktif, catat mesej tepat dan ikut panduan keselamatan pengeluar. Jangan memintas amaran untuk mencuba APK lain daripada pautan rawak.</p></article>
  </div>
  <h3>Android: semak satu app, satu akses</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Buka Settings → Apps.</strong> Pilih app yang betul; jika perlu, buka See all apps. Kemudian pilih Permissions. Nama menu boleh berbeza mengikut jenama dan versi Android.</li>
   <li><strong>Baca senarai dibenarkan dan ditolak.</strong> Jangan ubah semua sekali. Pilih satu permission untuk melihat pilihan yang benar-benar tersedia pada peranti anda.</li>
   <li><strong>Pilih skop paling terhad yang memenuhi tujuan anda.</strong> Google menerangkan pilihan seperti Don’t allow, Ask every time atau Allow only while using the app untuk akses tertentu. Pilihan tidak seragam bagi setiap permission; All the time yang dirujuk Google ialah pilihan lokasi, bukan semua akses.</li>
   <li><strong>Catat hasil, bukan andaikan punca.</strong> Menolak akses mungkin menghadkan fungsi berkaitan. Jika app gagal selepas itu, rekod permission dan mesejnya; jangan terus membenarkan SMS, kenalan atau akses lain yang tidak dapat dijelaskan sebagai “fix login”.</li>
  </ol>
  <h3>iPhone: semak mengikut kategori privasi</h3>
  <p>Buka Settings → Privacy &amp; Security, kemudian pilih kategori seperti Contacts, Photos, Camera atau Microphone. Semak app yang tersenarai dan ubah akses yang berkenaan. Pilihan terperinci bergantung pada kategori serta versi iOS. Jika app tidak muncul, itu bukan bukti bahawa ia sudah diaudit atau bebas mengakses semua jenis data.</p>
  <p>Jika menu tidak sepadan, rujuk panduan Apple untuk versi peranti anda. Jangan memasang profil baharu atau memberi kawalan jauh kepada orang tidak dikenali semata-mata untuk mendapatkan menu yang dicadangkan.</p>
  <h3>Apa yang patut ditanya untuk setiap akses?</h3>
  <div className={styles.grid}>
   <article><h3>Kamera / mikrofon</h3><p>Adakah anda baru memulakan fungsi yang mengambil gambar atau merakam audio? Jika permintaan muncul ketika membuka app tanpa konteks, tangguhkan dan minta sebabnya. Kehadiran permission sahaja tidak membuktikan penyalahgunaan, tetapi bukan alasan untuk meluluskannya secara automatik.</p></article>
   <article><h3>Lokasi / foto</h3><p>Apakah data yang diperlukan, untuk tujuan apa dan selama mana? Baca pilihan terhad yang dipaparkan sistem jika ada. Jangan anggap semua foto atau akses lokasi berterusan diperlukan hanya kerana satu fungsi meminta akses.</p></article>
   <article><h3>Kenalan / SMS pada Android</h3><p>Google menerangkan bahawa Contacts memberi akses kepada kenalan, manakala SMS membolehkan penghantaran dan semakan mesej. Minta penjelasan khusus jika tujuan tidak jelas; jangan beri akses untuk “mempercepat login” berdasarkan janji chat sahaja.</p></article>
  </div>
  <section id="akses-kebolehcapaian" aria-labelledby="akses-kebolehcapaian-title">
   <h2 id="akses-kebolehcapaian-title">Diminta hidupkan Accessibility untuk “baiki login”? Semak kuasa akses dahulu</h2>
   <p>Arahan bantuan yang membawa anda daripada skrin login ke tetapan Accessibility / Kebolehcapaian perlu dinilai berasingan daripada permission kamera atau foto. Menurut Google, app yang diberi akses kebolehcapaian boleh membaca kandungan pada skrin dan berinteraksi dengan app bagi pihak anda. Oleh itu, pertanyaan penting bukan sekadar “boleh tekan Allow?”, tetapi “app mana yang akan menerima kuasa ini dan untuk fungsi apa?”.</p>
   <p>Ciri kebolehcapaian mempunyai kegunaan sah, termasuk membantu pengguna kurang upaya. Kehadirannya bukan bukti app berbahaya. Namun, dakwaan seseorang dalam chat bahawa akses itu “wajib untuk login” bukan bukti keperluan teknikal. Kami tidak mengesahkan bahawa mana-mana versi Mega888 memerlukan akses ini; tiada ujian APK atau pemeriksaan peranti dilakukan.</p>
   <figure className={styles.figure}>
    <img src="/hub/mega888-akses-kebolehcapaian-sempadan-20261008.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep telefon grafit dengan panel pantulan skrin dan lengan mekanikal merah yang berhenti di belakang palang sempadan" style={{ maxHeight: "none", objectFit: "contain" }} />
    <figcaption>Ilustrasi konsep dijana AI: membaca skrin dan bertindak pada peranti ialah dua kuasa yang perlu difahami sebelum memberi akses. Bukan screenshot tetapan atau bukti sesuatu app menyalahgunakan data.</figcaption>
   </figure>
   <h3>Bezakan permintaan biasa, akses kebolehcapaian dan amaran sekatan</h3>
   <div className={styles.grid}>
    <article><h4>Permission biasa</h4><p>Contohnya akses kamera untuk tindakan mengambil gambar yang anda mulakan sendiri. Semak nama app, tujuan dan pilihan skop seperti langkah Android di atas. Membenarkan satu kategori tidak bermaksud semua akses lain patut diluluskan.</p></article>
    <article><h4>Accessibility / Kebolehcapaian</h4><p>Ini bukan sekadar kebenaran menyimpan gambar ralat. Baca penerangan sistem tentang akses membaca skrin dan tindakan bagi pihak pengguna. Jangan beri akses hanya untuk membolehkan orang lain melihat mesej ralat; laporan teks atau screenshot terpilih mungkin mencukupi.</p></article>
    <article><h4>Restricted settings / tetapan disekat</h4><p>Google menerangkan bahawa sesetengah tetapan boleh disekat ketika pemasangan untuk melindungi maklumat sensitif. Panduannya menyebut sebahagian langkah hanya tersedia pada Android 13 dan ke atas. Nama menu serta kelakuannya tidak semestinya sama pada semua telefon. Sekatan itu bukan ralat password atau bukti akaun telah disekat.</p></article>
   </div>
   <h3>Checklist sebelum menjawab arahan sokongan</h3>
   <ol className={styles.checkSteps}>
    <li><strong>Berhenti sebelum mengubah tetapan.</strong> Kekalkan perlindungan aktif. Jika sistem memaparkan amaran atau tetapan disekat, catat teksnya; jangan mencari jalan memintasnya, memasang “helper APK” atau mengikut arahan membuka sekatan daripada chat.</li>
    <li><strong>Kenal pasti penerima akses.</strong> Tulis nama app yang muncul pada skrin sistem, bukan hanya nama permainan yang sedang bermasalah. Jika arahan membawa kepada app bantuan lain yang tidak anda kenali, jangan teruskan. Nama atau logo serupa tidak mengesahkan pembangun.</li>
    <li><strong>Pisahkan tujuan daripada janji.</strong> Tanya fungsi khusus yang memerlukan pembacaan skrin atau tindakan automatik, sebab laporan teks tidak mencukupi dan sama ada bantuan tanpa akses itu tersedia. “Biar kami urus semuanya” tidak menerangkan skop akses.</li>
    <li><strong>Sahkan melalui saluran berasingan.</strong> Gunakan rekod sokongan yang anda sudah kenal pasti, bukan nombor baharu dalam mesej tersebut. Jika identiti atau keperluan tidak dapat disahkan, tangguhkan. Jangan beri OTP, password, kelulusan transaksi atau deposit sebagai ujian.</li>
    <li><strong>Rujuk pengeluar apabila menu berbeza.</strong> Catat model dan versi Android, kemudian gunakan panduan pengeluar yang sepadan. Pada peranti organisasi, rujuk pentadbir; jangan mengubah polisi pengurusan. Pengguna iPhone tidak perlu mencari menu Android ini atau memasang profil untuk menirunya.</li>
   </ol>
   <h3>Jika akses sudah diberikan</h3>
   <p>Hentikan sesi bantuan yang meragukan dan jangan masukkan rahsia atau membuka urusan pembayaran semasa pihak itu masih mempunyai akses. Semak akses app berkenaan melalui panduan pengeluar. Jangan mematikan semua perkhidmatan kebolehcapaian secara pukal: anda mungkin bergantung pada alat bantuan yang sah untuk menggunakan telefon. Jika anda tidak dapat membezakan perkhidmatan tersebut, dapatkan bantuan teknikal yang dikenali sebelum membuat perubahan.</p>
   <p>Menarik balik akses tidak membuktikan data yang telah dilihat atau dihantar sudah dipadam, dan bukan pengesahan peranti bebas malware. Jika password, kod atau transaksi turut terdedah, gunakan <Link href="/panduan/mega888-pautan-reset-login">tindakan mengikut jenis pendedahan</Link>; gunakan peranti lain yang anda percayai untuk urusan akaun jika bimbang peranti ini terjejas. Jangan terus mengulang login untuk menguji keselamatannya.</p>
   <h3>Rekod bantuan tanpa rahsia</h3>
   <p className={styles.note}>“Model / versi Android: __. Masalah asal: __. Nama app penerima akses: __. Teks permintaan atau amaran: __. Fungsi yang dikatakan memerlukan akses: __. Akses belum diberi / sudah diberi / tidak pasti: __. Masa dan zon waktu: __. Saluran yang disahkan secara berasingan: __.” Jangan sertakan kod, password, pautan sesi atau keseluruhan skrin akaun.</p>
   <p>Untuk lampiran minimum, rujuk <Link href="/panduan/mega888-screenshot-ralat">cara menyediakan screenshot ralat</Link>. Jika isu sebenarnya amaran pemasangan, gunakan <Link href="/panduan/mega888-ralat-pemasangan">panduan ralat dan amaran Android</Link>. Google menerangkan fungsi sistem secara umum; sumber itu tidak mengesahkan identiti agent, keselamatan fail atau keperluan akses Mega888.</p>
  </section>
  <h3>Jika anda sudah tertekan Allow</h3>
  <p>Kembali ke tetapan permission dan semak semula akses yang telah diberikan. Menarik balik permission bukan pemadaman akaun, dan tidak boleh dianggap menarik balik salinan data yang mungkin sudah dihantar. Jika sistem memberi amaran app berbahaya, ikut panduan perlindungan peranti; semakan permission sahaja bukan pembersihan malware.</p>
  <p className={styles.note}><strong>Berhenti dan dapatkan penjelasan</strong> apabila diminta mematikan Play Protect, memberikan kata laluan atau OTP, memasang profil tidak dikenali, atau membenarkan kawalan jauh. Jangan membuat deposit atau scan berbayar untuk “menguji” sama ada permission sudah betul.</p>
  <h3>Rekod ringkas untuk sokongan</h3>
  <p>“Peranti/versi sistem: __. Versi app: __. Tindakan sebelum permintaan: __. Nama permission dan pilihan yang muncul: __. Pilihan saya: __. Mesej selepas itu: __. Mengapa akses ini diperlukan, dan adakah fungsi boleh digunakan dengan akses lebih terhad?”</p>
  <p>Padam ID penuh, nombor telefon, baki dan butiran transaksi daripada salinan screenshot yang dikongsi. Jangan sertakan kata laluan, OTP atau kod pemulihan. Gunakan saluran sokongan yang telah dikenal pasti, bukan akaun yang tiba-tiba menawarkan bantuan.</p>
  <div className={styles.actions}><Link href="/mega888#problem-solver">Pilih gejala dalam Problem Solver →</Link><Link href="/panduan/mega888-connection-failed">Jika mesejnya connection failed →</Link><Link href="/panduan/mega888-cache-dan-data">Sebelum padam data app →</Link></div>
  <p>Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan alat mengimbas keselamatan APK, membaca permission telefon atau menyemak akaun operator. Lihat <Link href="/info">metodologi scanner</Link> atau <Link href="/help">bantuan laman ini</Link>.</p>
  <h3>Rujukan utama dan had panduan</h3>
  <ul>
   <li><a href="https://support.google.com/android/answer/12623953?hl=en">Google Android Help: Learn about restricted settings</a> — kuasa akses kebolehcapaian, maklumat sensitif dan tanda permintaan yang perlu disemak; panduan ini tidak mengajar cara memintas sekatan.</li>
   <li><a href="https://support.google.com/android/answer/9431959?hl=en">Google Android Help: Change app permissions</a> — laluan tetapan, jenis akses dan pilihan skop.</li>
   <li><a href="https://support.google.com/googleplay/answer/2812853?hl=en">Google Play Help: Google Play Protect</a> — fungsi amaran serta saranan mengekalkan perlindungan aktif.</li>
   <li><a href="https://support.apple.com/guide/iphone/control-access-to-information-in-apps-iph251e92810/ios">Apple iPhone User Guide: kawal akses maklumat dalam app</a> — semakan mengikut kategori privasi.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-10-08">8 Oktober 2026</time>. Rujukan ini menyokong fungsi sistem peranti, bukan pengesahan Mega888 oleh Google atau Apple. Tiada audit APK, ujian permission app sebenar atau jaminan pemulihan akaun dibuat untuk artikel ini.</p>
 </section>;
}
