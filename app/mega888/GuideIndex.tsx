import Link from "next/link";
import { HUB_GUIDES } from "../data/hubGuides";
import styles from "./hub-guide.module.css";
export default function GuideIndex() {
 return <section aria-labelledby="guides-heading">
  <h2 id="guides-heading">Panduan masalah mengikut topik</h2>
  <p>Pilih panduan lengkap di bawah. Pautan lama masih membawa anda ke ringkasan topik yang sama; langkah, gambar dan rujukan penuh tersedia pada halaman khusus.</p>
  <div className={styles.grid}>{HUB_GUIDES.map(guide => <article id={guide.id} key={guide.id} style={{scrollMarginTop: 90}}>
   <h3><Link href={`/panduan/${guide.slug}`}>{guide.title}</Link></h3>
   <img src={guide.image} alt={guide.alt} width="1536" height="1024" loading="lazy" decoding="async" style={{width:"100%",height:"auto",borderRadius:8}} />
   <p><small>Ilustrasi konsep AI, bukan screenshot aplikasi.</small></p>
   <p>{guide.summary}</p>
   <Link href={`/panduan/${guide.slug}`}>Baca panduan lengkap →</Link>
  </article>)}</div>
 </section>;
}
