import Link from "next/link";
import { notFound } from "next/navigation";
import { HUB_GUIDES } from "../../data/hubGuides";
import SharedPageNav from "../../ui/SharedPageNav";
import styles from "../../mega888/hub-guide.module.css";
import ConnectionChecklist from "../../mega888/ConnectionChecklist";
import StorageGuide from "../../mega888/StorageGuide";
import PermissionsGuide from "../../mega888/PermissionsGuide";
import ResetLinkGuide from "../../mega888/ResetLinkGuide";
import InstallWarningGuide from "../../mega888/InstallWarningGuide";
import WifiPortalGuide from "../../mega888/WifiPortalGuide";
import ScreenshotGuide from "../../mega888/ScreenshotGuide";
import IphoneVerificationGuide from "../../mega888/IphoneVerificationGuide";
import HeatGuide from "../../mega888/HeatGuide";
import AutofillGuide from "../../mega888/AutofillGuide";
const components = {ConnectionChecklist, StorageGuide, PermissionsGuide, ResetLinkGuide, InstallWarningGuide, WifiPortalGuide, ScreenshotGuide, IphoneVerificationGuide, HeatGuide, AutofillGuide};
export const dynamicParams = false;
export function generateStaticParams() { return HUB_GUIDES.map(g => ({slug:g.slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {
 const {slug}=await params; const guide=HUB_GUIDES.find(g=>g.slug===slug); if(!guide) notFound();
 const url=`https://tipsmega888.com/panduan/${guide.slug}`;
 return {title:guide.title,description:guide.summary,alternates:{canonical:url},robots:{index:true,follow:true},
  openGraph:{title:guide.title,description:guide.summary,url,type:"article",images:[{url:guide.image,width:1536,height:1024,alt:guide.alt}]},
  twitter:{card:"summary_large_image",title:guide.title,description:guide.summary,images:[guide.image]}};
}
export default async function GuidePage({params}: {params:Promise<{slug:string}>}) {
 const {slug}=await params; const guide=HUB_GUIDES.find(g=>g.slug===slug);if(!guide) notFound();
 const Content=components[guide.component]; const url=`https://tipsmega888.com/panduan/${guide.slug}`;
 const schema=[{"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.summary,url,mainEntityOfPage:url,datePublished:guide.published,dateModified:guide.updated,inLanguage:"ms-MY",image:`https://tipsmega888.com${guide.image}`,author:{"@type":"Organization",name:"TipsMega888",url:"https://tipsmega888.com/about"}},
 {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Utama",item:"https://tipsmega888.com"},{"@type":"ListItem",position:2,name:"Mega888 Hub",item:"https://tipsmega888.com/mega888"},{"@type":"ListItem",position:3,name:guide.title,item:url}]}];
 return <SharedPageNav><main style={{maxWidth:960,margin:"0 auto",padding:"32px 20px 120px"}}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
  <div className={styles.guide}>
   <nav aria-label="Breadcrumb"><Link href="/">Utama</Link> / <Link href="/mega888">Mega888 Hub</Link> / Panduan</nav>
   <p>Oleh <Link href="/about">TipsMega888</Link> · Diterbitkan <time dateTime={guide.published}>{guide.published}</time> · Dikemas kini <time dateTime={guide.updated}>{guide.updated}</time></p>
   <Content />
   <section><h2>Panduan berkaitan</h2><ul>{HUB_GUIDES.filter(g=>g.slug!==slug).map(g=><li key={g.slug}><Link href={`/panduan/${g.slug}`}>{g.title}</Link></li>)}</ul></section>
   <div className={styles.actions}><Link href="/mega888#problem-solver">Problem Solver</Link><Link href="/">Buka Scanner</Link><Link href="/trusted">Trusted Company</Link></div>
  </div>
 </main></SharedPageNav>;
}
