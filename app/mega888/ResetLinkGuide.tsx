import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function ResetLinkGuide() {
 return <section id="pautan-reset-login" aria-labelledby="reset-link-title">
  <span className={styles.kicker}>LOGIN / SEMAK SALURAN DAHULU</span>
  <h2 id="reset-link-title">Mega888 reset password: apa perlu dibuat apabila pautan bantuan mencurigakan?</h2>
  <p>Apabila login gagal, mesej yang menawarkan “reset segera” boleh nampak seperti jalan paling mudah. Tetapi mengetahui ID anda, menggunakan logo yang sama atau muncul dalam hasil carian tidak membuktikan pengirim berhak mengurus akaun. Panduan ini membantu anda memilih tindakan tanpa menghantar rahsia kepada pihak yang salah.</p>
  <p>Ini bukan borang reset, direktori pautan rasmi atau pengesahan sesuatu agent. TipsMega888 tidak boleh menetapkan semula kata laluan operator. Proses, syarat pengesahan dan ciri pemulihan sebenar bergantung pada pihak yang mengurus akaun; kami tidak menjanjikan masa buka sekatan atau pemulihan baki.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-login-reset-link-20260927.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep sampul merah dengan laluan terputus dan laluan berasingan dari buku alamat menuju peti kunci arang gelap" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: hentikan laluan mesej yang meragukan dan semak melalui saluran berasingan. Bukan screenshot, sijil keselamatan atau bukti akaun telah dipulihkan.</figcaption>
  </figure>
  <h3>Bezakan masalah sebelum memilih bantuan</h3>
  <div className={styles.grid}>
   <article><h3>Login ditolak tanpa mesej luar</h3><p>Catat mesej ralat dan semak ejaan ID. Jangan meneka kata laluan berulang kali atau menganggap semua kegagalan ialah serangan. Gunakan <a href="#problem-solver">Problem Solver</a>; untuk gejala rangkaian, rujuk <a href="#connection-failed">checklist connection failed</a>.</p></article>
   <article><h3>Pautan reset yang tidak diminta</h3><p>Jangan buka pautan atau membalas dengan maklumat akaun. Mesej itu sendiri tidak membuktikan seseorang telah masuk ke akaun. Semak melalui saluran lain yang telah dikenal pasti, bukan nombor atau butang yang disertakan dalam mesej tersebut.</p></article>
   <article><h3>Ada maklumat atau akses terdedah</h3><p>Jika sudah memasukkan password, memberi kod atau memasang sesuatu atas arahan pengirim, terus gunakan langkah mengikut pendedahan di bawah. Jangan tunggu percubaan login seterusnya untuk “menguji” sama ada akaun masih selamat.</p></article>
  </div>
  <h3>Empat langkah mengesahkan saluran secara berasingan</h3>
  <ol className={styles.checkSteps}>
   <li><strong>Hentikan aliran mesej itu.</strong> Jangan tekan pautan, muat turun lampiran, imbas QR login atau sambung panggilan yang mendesak. Jangan pasang app kawalan jauh atau mematikan perlindungan untuk mendapatkan bantuan.</li>
   <li><strong>Kembali kepada rekod yang anda simpan sendiri.</strong> Cari saluran sokongan dalam rekod pendaftaran atau alamat yang pernah anda sahkan sebelum mesej tersebut diterima. Hubungi melalui rekod itu secara berasingan. Nama paparan, foto profil, logo dan sejarah chat sahaja bukan jaminan; akaun atau maklumat hubungan boleh berubah.</li>
   <li><strong>Minta penjelasan khusus tanpa rahsia.</strong> Tanya sama ada mereka mengeluarkan permintaan reset itu, akaun jenis apa yang terlibat dan proses pemulihan yang tersedia. Jika alamat atau nombor berubah, jangan menerima pengesahan daripada mesej mencurigakan yang sama. Jika tiada saluran dapat disahkan, berhenti dahulu; jangan pilih “support” rawak daripada iklan atau komen.</li>
   <li><strong>Mulakan sendiri proses yang telah disahkan.</strong> Jangan bacakan atau hantar password, OTP, PIN, kod pemulihan atau pautan sesi kepada orang lain. Jika perkhidmatan menggunakan kod pengesahan, masukkannya hanya dalam proses yang anda mulakan sendiri melalui saluran yang sudah disahkan, bukan halaman yang diarahkan oleh pengirim tidak dikenali.</li>
  </ol>
  <p className={styles.note}>Permintaan “bayar untuk unblock”, “deposit untuk sahkan identiti”, “kongsi skrin semasa masukkan OTP” atau “tutup perlindungan dahulu” ialah sebab untuk berhenti dan menyemak. Jangan buat transaksi atau scan berbayar sebagai ujian. Tiada satu tanda visual yang boleh mengesahkan keselamatan sesuatu pautan.</p>
  <h3>Jika sudah terlanjur: pilih mengikut apa yang berlaku</h3>
  <div className={styles.grid}>
   <article><h3>Hanya membaca atau membuka pautan</h3><p>Tutup halaman dan jangan masukkan maklumat lagi. Catat sama ada fail dimuat turun, permission diberi atau app/profil dipasang. Membuka halaman sahaja bukan bukti akaun telah diambil alih, tetapi kami juga tidak boleh mengisytiharkan peranti bersih melalui artikel ini.</p></article>
   <article><h3>Password sudah dimasukkan</h3><p>Melalui saluran yang disahkan, tukar kepada kata laluan baharu yang unik jika anda masih mempunyai akses dan fungsi itu tersedia. Tukar juga pada akaun lain yang menggunakan password sama. Jika tidak boleh masuk, minta proses pemulihan pihak berkenaan; jangan cuba lagi pada pautan asal. Aktifkan pengesahan berbilang faktor jika perkhidmatan menyediakannya.</p></article>
   <article><h3>OTP, kod atau kelulusan sudah diberi</h3><p>Hubungi penyedia akaun berkaitan segera melalui saluran yang disahkan. Nyatakan jenis kod, masa dan tindakan yang anda luluskan, bukan nilai kod tersebut. Tanya tentang sekatan sementara dan penamatan sesi jika tersedia. Jangan anggap menukar password semestinya membatalkan semua sesi.</p></article>
   <article><h3>App, profil atau kawalan jauh diberikan</h3><p>Hentikan interaksi dengan pihak itu dan dapatkan panduan keselamatan pengeluar peranti atau bantuan teknikal yang dikenali. Gunakan peranti lain yang anda percayai untuk urusan akaun jika bimbang peranti terjejas. Semak <a href="#semak-permission">akses yang diberi</a>, tetapi menarik balik permission atau memadam cache bukan bukti malware sudah dibuang.</p></article>
   <article><h3>Wang atau butiran pembayaran terlibat</h3><p>Hubungi bank atau penyedia pembayaran segera menggunakan app, nombor pada kad atau saluran yang telah disahkan secara berasingan. Beritahu apa yang berlaku dan minta pilihan sekatan atau pertikaian transaksi. Simpan nombor rujukan; jangan bayar pihak baharu yang menjanjikan pemulangan wang. Pemulangan tidak dijamin.</p></article>
  </div>
  <h3>Rekod insiden yang berguna tanpa membocorkan rahsia</h3>
  <p>Gunakan catatan ini untuk memisahkan fakta daripada andaian: “Masa dan zon waktu: __. Saluran mesej diterima: __. Permintaan pengirim: __. Tindakan saya (buka/isi/pasang/lulus/bayar): __. Jenis maklumat terdedah, tanpa nilainya: __. Mesej ralat: __. Saluran sokongan yang saya hubungi secara berasingan: __. Nombor rujukan laporan: __.”</p>
  <p>Simpan bukti asal secara peribadi. Untuk salinan yang dikongsi, tutup password, kod, pautan reset penuh yang mungkin mengandungi token, ID penuh, nombor telefon, baki dan butiran transaksi yang tidak diperlukan. Jangan siarkan screenshot sensitif dalam komuniti atau menghantar pautan reset peribadi ke alat semakan awam. Berikan hanya maklumat minimum melalui saluran laporan yang sesuai.</p>
  <p>Semakan identiti pihak yang menawarkan bantuan boleh disambung melalui <a href="#semakan-company">checklist company</a>. Untuk akaun laman TipsMega888, gunakan <Link href="/help">bantuan laman ini</Link>, bukan menganggap ia saluran pemulihan operator. Scanner kami ialah simulasi/rujukan katalog indikatif; ia tidak menyemak keselamatan pautan, memulihkan password atau membaca sesi akaun operator. Lihat <Link href="/info">metodologi dan limitasinya</Link>.</p>
  <h3>Rujukan utama dan had panduan</h3>
  <ul>
   <li><a href="https://support.apple.com/en-us/102568">Apple: kenal pasti social engineering dan mesej phishing</a> — peniruan identiti, tekanan masa dan semakan hubungan secara langsung.</li>
   <li><a href="https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams">FTC: mengenali dan mengelakkan phishing</a> — hubungi melalui nombor atau laman yang diketahui, bukan maklumat dalam mesej mencurigakan.</li>
   <li><a href="https://consumer.ftc.gov/articles/what-do-if-you-were-scammed">FTC: tindakan selepas maklumat, akses atau wang terdedah</a> — password unik, akaun yang berkongsi password dan hubungan segera dengan penyedia pembayaran.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-09-27">27 September 2026</time>. Sumber ini menerangkan prinsip keselamatan umum, bukan mengesahkan Mega888, mana-mana agent atau prosedur reset khusus. FTC ialah agensi Amerika Syarikat; saluran laporan dan hak undang-undang khusus AS tidak dianggap terpakai di Malaysia. Tiada ujian akaun, pemeriksaan peranti atau jaminan pemulihan dibuat.</p>
 </section>;
}
