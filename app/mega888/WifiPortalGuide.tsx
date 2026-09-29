import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function WifiPortalGuide() {
 return <section id="wifi-portal-jam" aria-labelledby="wifi-portal-title">
  <span className={styles.kicker}>SEMAKAN LANJUT SAMBUNGAN / 29 SEPTEMBER 2026</span>
  <h3 id="wifi-portal-title">Mega888 connection error di Wi-Fi awam: portal, amaran pelayar atau jam peranti?</h3>
  <p>Ikon Wi-Fi yang bersambung belum bermaksud akses internet sudah tersedia. Di hotel, kafe atau lapangan terbang, rangkaian mungkin memerlukan log masuk portal terlebih dahulu. Pada masa yang sama, amaran sambungan peribadi dalam pelayar ialah gejala berbeza daripada mesej gagal menyambung di dalam app. Bezakan tempat mesej muncul sebelum mengubah apa-apa.</p>
  <p>Semakan lanjutan ini melengkapkan checklist di atas. Ia tidak menentukan status server Mega888, tidak mengesahkan identiti sesuatu hotspot dan tidak menganggap setiap amaran sijil berpunca daripada Wi-Fi. Tiada akaun atau aplikasi operator diuji untuk panduan ini.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-wifi-portal-clock-20260929.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi konsep laluan merah terhenti di pintu rangkaian kaca gelap, bersama mekanisme jam tanpa nombor dan prisma amaran" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: kenal pasti pintu akses rangkaian, masa peranti dan amaran sebelum bertindak. Bukan screenshot, ujian sambungan atau sijil keselamatan.</figcaption>
  </figure>
  <h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>1. Bezakan tiga paparan yang nampak hampir sama</h4>
  <div className={styles.grid}>
   <article><h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>Portal rangkaian</h4><p>Skrin menyambut pengguna Wi-Fi dan meminta persetujuan terma atau maklumat akses rangkaian. Apple menerangkan bahawa rangkaian captive boleh memerlukan langkah ini sebelum internet boleh digunakan. Log masuk Wi-Fi bukan log masuk akaun Mega888.</p></article>
   <article><h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>Amaran dalam pelayar</h4><p>Teks seperti “Your connection is not private” perlu dicatat bersama nama pelayar dan domain yang dibuka. Jangan tekan pilihan untuk meneruskan walaupun tidak selamat. Amaran ini bukan bukti akaun disekat, dan bukan arahan untuk mempercayai profil baharu.</p></article>
   <article><h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>Mesej dalam aplikasi</h4><p>Jika teks hanya muncul selepas app dibuka, catat sebagai mesej app. Jangan memindahkan maksud kod Chrome kepada kod Mega888 yang kelihatan serupa. Gunakan keputusan perbandingan Wi-Fi/data dalam checklist asal untuk laporan sokongan.</p></article>
  </div>
  <h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>2. Semak portal tanpa menyerahkan rahsia akaun</h4>
  <ol className={styles.checkSteps}>
   <li><strong>Sahkan rangkaian dengan pengendalinya.</strong> Tanya petugas premis nama Wi-Fi dan cara akses yang sepatutnya. Nama hotspot sahaja tidak membuktikan siapa pemiliknya. Semak caj atau syarat rangkaian terlebih dahulu; jangan memasukkan kata laluan permainan, OTP bank atau kod pemulihan pada portal.</li>
   <li><strong>Pada iPhone/iPad:</strong> buka Settings → Wi-Fi, pilih rangkaian dan tunggu skrin log masuk. Apple turut menerangkan pilihan butang maklumat di sebelah rangkaian → Join Network. Menu bergantung pada versi sistem. Masukkan hanya maklumat akses yang memang diperlukan oleh penyedia rangkaian yang telah dikenal pasti.</li>
   <li><strong>Pada peranti dengan Chrome:</strong> perhatikan pemberitahuan atau gesaan log masuk rangkaian. Google menerangkan bahawa portal Wi-Fi awam boleh dikesan oleh Chrome. Jika gesaan tidak muncul atau halaman meragukan, minta bantuan pengendali; jangan memasang sijil, profil atau app tambahan daripada pautan rawak sebagai jalan pintas.</li>
   <li><strong>Jika tidak mahu meneruskan:</strong> putuskan sambungan Wi-Fi tersebut. Pada iPhone, pilihan “Without Internet” boleh mengekalkan sambungan ke rangkaian tanpa akses internet; ia bukan bukti portal berjaya diselesaikan. Jika perlu, gunakan sambungan lain yang dibenarkan dan diketahui, dengan mengambil kira caj data.</li>
  </ol>
  <p>Selepas akses rangkaian selesai, buka laman biasa yang anda kenali dahulu. Catat sama ada internet boleh digunakan dan sama ada amaran masih muncul. Jangan membuat deposit, permainan atau scan berbayar untuk menguji sambungan. Jika laman lain berfungsi tetapi app masih gagal, kembali kepada <a href="#connection-failed">tafsiran keputusan checklist</a>; itu masih belum membuktikan maintenance.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>3. Jika amaran menyebut jam atau tarikh</h4>
  <p>Google menyatakan bahawa “Your clock is behind”, “Your clock is ahead” atau “NET::ERR_CERT_DATE_INVALID” boleh muncul apabila tarikh dan masa komputer atau telefon tidak tepat. Semak tarikh, tahun, masa dan zon masa dalam tetapan peranti. Betulkan kepada masa sebenar; jangan sengaja mengundurkan tarikh untuk cuba melepasi sijil tamat tempoh. Jika peranti diurus organisasi atau tetapan tidak boleh diubah, rujuk pentadbir.</p>
  <p>Selepas pembetulan yang memang diperlukan, buka semula halaman sekali. Jika jam sudah betul tetapi amaran kekal, hentikan cubaan pada halaman itu dan laporkan kepada pemilik laman atau sokongan peranti/rangkaian. Jam salah ialah satu kemungkinan, bukan diagnosis automatik bagi semua ralat sijil. Jangan nyahaktif perlindungan, ubah DNS secara rawak atau mempercayai sijil tidak dikenali.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>4. Tambah empat butiran pada laporan sambungan</h4>
  <ul>
   <li><strong>Tempat mesej:</strong> portal Wi-Fi, Chrome/Safari atau app; sertakan teks penuh tanpa meneka maksud.</li>
   <li><strong>Keadaan portal:</strong> belum muncul, belum selesai, selesai atau tidak pasti. Catat keputusan laman biasa selepas itu.</li>
   <li><strong>Semakan masa:</strong> tarikh/zon masa yang dipaparkan dan sama ada pembetulan dibuat; catat masa kejadian sebenar jika diketahui.</li>
   <li><strong>Skop kegagalan:</strong> satu domain atau beberapa laman, Wi-Fi sahaja atau sambungan lain juga. Kongsi domain tanpa parameter pautan peribadi atau token sesi.</li>
  </ul>
  <p>Masalah portal pergi kepada pengendali rangkaian; amaran yang kekal pada satu laman pergi kepada pemilik laman; masalah app pergi kepada saluran bantuan akaun yang disahkan secara berasingan. Tutup notifikasi, ID penuh dan data peribadi pada salinan screenshot. Jika seseorang menghantar pautan “baiki login”, gunakan <a href="#pautan-reset-login">panduan semakan pautan reset</a> sebelum bertindak.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", margin: "20px 0 10px", lineHeight: 1.4 }}>Rujukan utama dan batas panduan</h4>
  <ul>
   <li><a href="https://support.apple.com/en-us/102554">Apple: menggunakan captive Wi-Fi pada iPhone/iPad</a> — portal, caj dan maksud pilihan tanpa internet.</li>
   <li><a href="https://support.google.com/chrome/answer/6098869?hl=en">Google: masalah sambungan dan pemuatan Chrome</a> — gesaan portal Wi-Fi awam.</li>
   <li><a href="https://support.google.com/chrome/answer/95669?hl=en">Google: mesej ralat Chrome</a> — amaran jam/tarikh dan bantuan pentadbir bagi isu sijil.</li>
  </ul>
  <p>Disemak pada <time dateTime="2026-09-29">29 September 2026</time>. Sumber menerangkan fungsi umum Apple/Chrome, bukan pengesahan aplikasi atau hotspot. Panduan ini tidak mengarahkan anda memintas amaran atau mematikan perlindungan. Scanner TipsMega888 ialah simulasi/rujukan katalog indikatif, bukan alat ujian rangkaian atau status server operator; lihat <Link href="/info">metodologi</Link>. Untuk masalah laman ini, gunakan <Link href="/help">bantuan TipsMega888</Link>.</p>
 </section>;
}
