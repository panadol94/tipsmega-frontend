"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./hub-guide.module.css";

const paths = {
 login: { name: "Tak boleh login", title: "Bezakan akaun dengan sambungan", steps: ["Catat mesej ralat; semak ejaan ID tanpa berkongsi kata laluan.", "Buka laman lain untuk semak sambungan. Jika internet berfungsi tetapi login sahaja gagal, jangan terus anggap server rosak.", "Jika mesej menyebut akaun dikunci atau butiran tidak sah, hentikan percubaan berulang dan hubungi sokongan akaun."], guide: "panduan-login" },
 install: { name: "Pemasangan gagal", title: "Semak keserasian dan sumber", steps: ["Semak ruang storan, versi sistem dan mesej ralat yang tepat.", "Sahkan sumber aplikasi serta keserasian dengan penyedia. Jangan anggap nama fail atau logo membuktikan fail itu sah.", "Jika peranti memberi amaran keselamatan, hentikan pemasangan sehingga sumber dapat disahkan; jangan matikan perlindungan untuk meneruskan."], guide: "panduan-peranti" },
 crash: { name: "App tertutup sendiri", title: "Mulakan dengan langkah tanpa padam data", steps: ["Tutup dan buka semula aplikasi, kemudian restart peranti.", "Semak kemas kini aplikasi dan sistem melalui sumber yang dipercayai.", "Jika masih berlaku, catat versi dan tindakan sebelum crash. Memadam aplikasi atau data boleh menghilangkan maklumat setempat; dapatkan arahan sokongan dahulu."], guide: "panduan-peranti" },
 withdraw: { name: "Withdraw pending", title: "Semak status dengan pengurus akaun", steps: ["Semak masa permintaan, status, nombor rujukan dan syarat pemprosesan yang diberikan.", "Hubungi saluran sokongan akaun yang telah disahkan; minta status dan sebab kelewatan secara bertulis.", "Jangan bayar pihak tidak dikenali yang menjanjikan pelepasan withdraw. Scanner tidak boleh meluluskan atau mempercepat transaksi."], guide: "masalah" },
};
type Issue = keyof typeof paths;
export default function ProblemSolver() {
 const [issue,setIssue] = useState<Issue>("login");
 const [device,setDevice] = useState("android");
 const result=paths[issue];
 return <section id="problem-solver" className={styles.solver}>
  <span className={styles.kicker}>BANTUAN INTERAKTIF</span><h2>Mega888 Problem Solver</h2>
  <p>Pilih masalah dan peranti untuk semakan awal. Alat ini tidak menyambung ke akaun atau mengesan status server anda.</p>
  <div className={styles.controls}>
   <label>Masalah<select value={issue} onChange={e=>setIssue(e.target.value as Issue)}>{Object.entries(paths).map(([key,value])=><option value={key} key={key}>{value.name}</option>)}</select></label>
   <label>Peranti<select value={device} onChange={e=>setDevice(e.target.value)}><option value="android">Android</option><option value="ios">iPhone / iPad</option><option value="other">Peranti lain / tidak pasti</option></select></label>
  </div>
  <div className={styles.result} aria-live="polite" aria-atomic="true"><h3>{result.title}</h3><ol>{result.steps.map(step=><li key={step}>{step}</li>)}</ol>
   <p><strong>Untuk {device==="android"?"Android":device==="ios"?"iPhone / iPad":"peranti anda"}:</strong> {device==="android"?"Catat versi Android melalui Tetapan → Perihal telefon (nama menu berbeza mengikut jenama).":device==="ios"?"Catat versi iOS/iPadOS melalui Settings → General → About. APK Android tidak boleh dipasang sebagai aplikasi iPhone.":"Sertakan model dan versi sistem dalam laporan supaya sokongan tidak memberi langkah untuk peranti yang salah."}</p>
   <a href={`#${result.guide}`}>Lihat panduan berkaitan ↓</a>
  </div><p>Tiada ID, kata laluan atau OTP diperlukan. Jika belum selesai, gunakan <Link href="/help">halaman bantuan</Link>; isu akaun dan transaksi perlu dirujuk kepada pengurus akaun.</p>
 </section>;
}
