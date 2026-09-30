import Link from "next/link";
import styles from "./hub-guide.module.css";

export default function ScreenshotGuide() {
 return <section id="screenshot-ralat" aria-labelledby="screenshot-title">
  <span className={styles.kicker}>LAPORAN SOKONGAN / MINIMUMKAN DATA</span>
  <h3 id="screenshot-title">Screenshot ralat Mega888: apa perlu ditunjukkan, dipotong dan disemak?</h3>
  <p>Screenshot boleh membantu menjelaskan mesej ralat, tetapi satu skrin penuh mungkin turut menunjukkan ID, baki, notifikasi atau pautan peribadi. Mulakan dengan soalan mudah: adakah teks ralat dan catatan masa sudah mencukupi? Jika ya, hantar laporan teks dahulu. Gambar bukan syarat wajib dalam checklist ini, dan bukan bukti bahawa akaun atau company telah disahkan.</p>
  <p>Dikemas kini <time dateTime="2026-09-30">30 September 2026</time>. Panduan ini melengkapkan <a href="#connection-failed">templat laporan connection failed</a>; ia tidak mengumpul screenshot, mengakses galeri atau menghantar laporan bagi pihak anda.</p>
  <figure className={styles.figure}>
   <img src="/hub/mega888-support-screenshot-privacy-20260930.webp" width="1536" height="1024" loading="lazy" decoding="async" alt="Ilustrasi bingkai pemotong merah mengasingkan jubin ralat daripada panel arang gelap, dengan kad salinan dan kanta pemeriksa di sisi" style={{ maxHeight: "none", objectFit: "contain" }} />
   <figcaption>Ilustrasi konsep dijana AI: asingkan maklumat yang diperlukan dan periksa salinan sebelum berkongsi. Bukan screenshot aplikasi, ujian redaksi atau jaminan privasi.</figcaption>
  </figure>
  <h4 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>1. Pilih bukti minimum, bukan seluruh aktiviti telefon</h4>
  <div className={styles.grid}>
   <article><h4><strong>Kekalkan konteks ralat</strong></h4><p>Tunjukkan teks ralat yang relevan dan bahagian skrin yang menerangkan tahap kegagalan. Tulis model peranti, versi sistem, masa serta zon masa dalam mesej berasingan; jangan mengambil gambar seluruh halaman maklumat telefon semata-mata untuk satu nombor versi.</p></article>
   <article><h4><strong>Keluarkan data yang tidak diperlukan</strong></h4><p>Potong ID penuh, nama, nombor telefon, e-mel, baki, sejarah transaksi, notifikasi dan kandungan chat. Jangan sertakan password, OTP, PIN, kod pemulihan, QR login atau pautan sesi/reset peribadi. Jika rahsia berada dalam mesej ralat itu sendiri, salin teks dengan bahagian tersebut diganti “[dipadam]”.</p></article>
   <article><h4><strong>Bezakan laporan awam dan bantuan peribadi</strong></h4><p>Komuniti awam tidak memerlukan identiti akaun anda. Jika sokongan meminta pengecam tertentu, sahkan saluran dan tujuan permintaan dahulu; berikan hanya butiran yang perlu melalui saluran peribadi itu. Label “support” atau “trusted” sahaja bukan pengesahan identiti.</p></article>
  </div>
  <h4 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>2. Ambil satu tangkapan yang relevan</h4>
  <p><strong>Android:</strong> Google menerangkan kaedah biasa Power + Volume down; kaedah lain bergantung pada pengeluar. Buka imej dalam editor telefon dan gunakan Crop untuk menghadkan kawasan. Jika menggunakan Google Photos, pilih Edit dan alat Crop yang tersedia. Jangan pilih “Capture more” jika satu mesej ralat sudah cukup: tangkapan panjang boleh memasukkan kandungan tambahan di luar skrin pertama.</p>
  <p><strong>iPhone:</strong> pada model Face ID, tekan butang sisi dan Volume up, kemudian lepaskan. Model dengan butang Home menggunakan gabungan berbeza; rujuk panduan Apple di bawah. Buka pratonton dan potong gambar sebelum menyimpan. Paparan editor dan butang simpan berbeza mengikut versi iOS. Semak hasil sebenar pada peranti, bukan menganggap semua menu sama.</p>
  <p>Jangan sengaja membuka baki, resit bank atau halaman password untuk menghasilkan “bukti lebih lengkap”. Jika aplikasi menyekat tangkapan atau hasilnya kosong, jangan memintas sekatan itu. Catat teks yang dapat dibaca dan beritahu sokongan bahawa screenshot tidak tersedia. Tidak perlu menjalankan scan berbayar, bermain atau membuat transaksi untuk melengkapkan laporan.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>3. Simpan salinan dan periksa fail yang akan dihantar</h4>
  <ol className={styles.checkSteps}>
   <li><strong>Utamakan crop.</strong> Buang kawasan sensitif daripada salinan. Jangan menganggap garisan nipis, pen sorot lut sinar atau kesan blur sebagai bukti maklumat sudah tidak boleh dibaca. Jika data tidak dapat dipisahkan daripada ralat dengan yakin, gunakan laporan teks sahaja.</li>
   <li><strong>Bezakan asal dengan salinan.</strong> Google Photos menyediakan “Save as copy” untuk membuat foto baharu tanpa mengubah asal. Simpan bahan asal secara peribadi jika diperlukan untuk rekod; jangan lampirkan kedua-dua versi. Pilihan simpan editor lain mungkin berbeza. Menyunting satu salinan tidak memadam semua salinan asal atau sandaran awan.</li>
   <li><strong>Buka semula hasil simpanan.</strong> Besarkan gambar dan periksa tepi, notifikasi, QR serta bahagian yang disunting. Pastikan teks ralat masih tepat dan boleh dibaca. Jangan gunakan penjanaan AI atau alat yang menulis semula mesej ralat: sokongan memerlukan pemerhatian sebenar, bukan gambar yang dibina semula.</li>
   <li><strong>Semak lampiran terakhir.</strong> Dalam pratonton mesej, pastikan hanya fail yang telah diperiksa dipilih, bukan imej asal bersebelahan atau satu album. Semak penerima dan nama fail; jangan letakkan ID atau nombor telefon dalam nama fail. Jika ragu tentang apa yang akan dikongsi, batalkan lampiran dan hantar teks.</li>
  </ol>
  <p className={styles.note}>Semakan visual ini mengurangkan pendedahan yang jelas, bukan audit forensik fail. Panduan ini tidak menjamin pembuangan metadata, sejarah suntingan atau semua maklumat tersembunyi bagi setiap editor dan format. Jangan muat naik bahan sensitif ke alat redaksi atau semakan awam yang tidak dikenal pasti.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>4. Sertakan konteks tanpa menambah rahsia</h4>
  <p>Gunakan ayat ringkas ini dan isi pemerhatian sebenar: “Ralat berlaku pada [tarikh/masa/zon masa], ketika [tahap kegagalan]. Mesej: [teks tanpa rahsia]. Peranti/sistem: […]. Langkah yang sudah dicuba: […]. Lampiran ialah salinan dipotong; maklumat peribadi tidak disertakan.” Jika masa hanya anggaran atau versi app tidak diketahui, nyatakan begitu. Jangan mengubah mesej untuk menyesuaikannya dengan kod ralat daripada laman lain.</p>
  <p>Jika tersalah menghantar bahan sensitif, jangan anggap memadam mesej menarik balik semua salinan. Hentikan perkongsian lanjut dan gunakan <a href="#pautan-reset-login">langkah mengikut jenis pendedahan</a> jika password atau kod telah terdedah. Untuk masalah laman TipsMega888, rujuk <Link href="/help">halaman bantuan</Link>; untuk akaun operator, gunakan saluran akaun yang telah disahkan secara berasingan.</p>
  <h4 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>Rujukan utama dan batas panduan</h4>
  <ul>
   <li><a href="https://support.google.com/android/answer/9075928?hl=en">Google Android: screenshot, tangkapan panjang dan kaedah mengikut peranti</a>.</li>
   <li><a href="https://support.google.com/photos/answer/6128850?hl=en&amp;co=GENIE.Platform%3DAndroid">Google Photos Android: Crop, Save dan Save as copy</a>.</li>
   <li><a href="https://support.apple.com/en-us/102616">Apple: tangkapan skrin iPhone, crop dan simpan</a>.</li>
  </ul>
  <p>Sumber tersebut menyokong fungsi umum peranti, bukan proses bantuan Mega888, pensijilan redaksi atau pengesahan mana-mana agent. Kami tidak menjalankan ujian semua telefon, editor atau saluran penghantaran. Screenshot yang kemas juga tidak membuktikan punca ralat, status server atau keselamatan penerima.</p>
 </section>;
}
