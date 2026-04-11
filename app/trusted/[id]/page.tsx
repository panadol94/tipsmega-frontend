import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface Company {
  id: string;
  name: string;
  link?: string;
  caption?: string;
  status?: string;
  mediaType?: string;
  storageUrl?: string;
}

// Generate static params untuk semua company
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/api/companies`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const companies = data.companies || [];
    
    return companies
      .filter((c: Company) => c.status?.toUpperCase() !== "HIDDEN")
      .map((c: Company) => ({ id: c.id }));
  } catch {
    return [];
  }
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const res = await fetch(`${API_BASE}/api/companies`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const company = (data.companies || []).find((c: Company) => c.id === id);
    
    if (!company) {
      return {
        title: "Company Not Found | TipsMega888",
      };
    }
    
    const cleanName = company.name.replace(/[^a-zA-Z0-9]/g, "");
    
    return {
      title: `${company.name} Mega888 | Trusted Company Malaysia 2026 | TipsMega888`,
      description: `${company.name} adalah platform Mega888 trusted Malaysia. ${company.caption || "Daftar dan claim bonus"}. Review, rating, dan link rasmi ${company.name}. TipsMega888 senaraikan company Mega888 berlesen sahaja.`,
      keywords: [
        `${company.name.toLowerCase()} mega888`,
        `${company.name.toLowerCase()} trusted`,
        `daftar ${company.name.toLowerCase()}`,
        `${company.name.toLowerCase()} login`,
        `${company.name.toLowerCase()} download`,
        "mega888 trusted company",
        "company mega888 malaysia",
        "platform mega888 berlesen",
        "tipsmega888 trusted",
        `${cleanName.toLowerCase()} slot`,
        `${cleanName.toLowerCase()} casino`,
      ],
      openGraph: {
        title: `${company.name} Mega888 | Trusted Company Malaysia 2026`,
        description: `${company.name} platform Mega888 trusted. ${company.caption || "Daftar dan main sekarang"}.`,
        url: `https://tipsmega888.com/trusted/${id}`,
        siteName: "TipsMega888",
        type: "website",
      },
      alternates: {
        canonical: `https://tipsmega888.com/trusted/${id}`,
      },
    };
  } catch {
    return {
      title: `${id} | TipsMega888 Trusted`,
    };
  }
}

// Fetch company data
async function getCompany(id: string): Promise<Company | null> {
  try {
    const res = await fetch(`${API_BASE}/api/companies`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.companies || []).find((c: Company) => c.id === id) || null;
  } catch {
    return null;
  }
}

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCompany(id);
  
  if (!company || company.status?.toUpperCase() === "HIDDEN") {
    notFound();
  }
  
  const waHref = `https://wa.me/60108691034?text=${encodeURIComponent(`Hi admin, saya nak minta link register untuk ${company.name}`)}`;
  const hasLink = !!company.link;
  
  // Schema data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${company.name} Mega888`,
    url: company.link || `https://tipsmega888.com/trusted/${id}`,
    logo: company.storageUrl ? `${API_BASE}${company.storageUrl}` : "https://tipsmega888.com/mega888.webp",
    description: `${company.name} adalah platform Mega888 trusted Malaysia yang disenaraikan di TipsMega888.`,
    sameAs: company.link ? [company.link] : [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1000",
      bestRating: "5",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MY",
    },
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tipsmega888.com" },
      { "@type": "ListItem", position: 2, name: "Trusted", item: "https://tipsmega888.com/trusted" },
      { "@type": "ListItem", position: 3, name: company.name, item: `https://tipsmega888.com/trusted/${id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#0d1320] text-white">
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      {/* Header */}
      <header className="px-4 py-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-red-400">TipsMega888</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link>
            <Link href="/trusted" className="text-white/70 hover:text-white">Trusted</Link>
            <Link href="/games" className="text-white/70 hover:text-white">Games</Link>
          </nav>
        </div>
      </header>
      
      {/* Breadcrumb */}
      <nav className="px-4 py-2 max-w-4xl mx-auto text-xs text-white/50">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/trusted" className="hover:text-white">Trusted</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{company.name}</span>
      </nav>
      
      {/* Main Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{company.name} Mega888 Malaysia 2026</h1>
        <p className="text-white/60 text-sm mb-6">Platform Mega888 Trusted | TipsMega888 Verified</p>
        
        {/* Company Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Media */}
            <div className="w-full md:w-1/3">
              <div className="aspect-video bg-black/30 rounded-xl overflow-hidden">
                {company.storageUrl ? (
                  company.mediaType === "video" || company.storageUrl.match(/\.(mp4|webm)$/i) ? (
                    <video
                      src={`${API_BASE}${company.storageUrl}`}
                      className="w-full h-full object-cover"
                      poster="/mega888.webp"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`${API_BASE}${company.storageUrl}`}
                      alt={`${company.name} Mega888`}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <img src="/mega888.webp" alt={company.name} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">✓ Verified</span>
                {company.caption && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">{company.caption}</span>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-2">{company.name}</h2>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
                <span className="text-white/60 text-sm ml-2">(4.9/5.0)</span>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasLink ? (
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white font-bold text-center hover:from-red-500 hover:to-red-400 transition-all"
                  >
                    🎮 PLAY NOW
                  </a>
                ) : (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 rounded-xl text-white font-bold text-center hover:from-green-500 hover:to-green-400 transition-all"
                  >
                    📱 GET LINK
                  </a>
                )}
                
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 rounded-xl text-white font-bold text-center hover:bg-white/5 transition-all"
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* SEO Content */}
        <article className="prose prose-sm prose-invert max-w-none">
          <h2>Tentang {company.name} Mega888 Malaysia</h2>
          <p>
            <strong>{company.name}</strong> adalah salah satu <strong>platform Mega888 trusted</strong> yang 
            disenaraikan di TipsMega888. Sebagai <strong>company Mega888 berlesen</strong>, {company.name} 
            menawarkan pengalaman permainan slot yang selamat dengan <strong>withdrawal cepat</strong> dan 
            <strong>customer support 24/7</strong>.
          </p>
          
          <h3>Mengapa Pilih {company.name}?</h3>
          <ul>
            <li>✅ Platform Mega888 trusted dan berlesen</li>
            <li>✅ Withdrawal cepat dalam masa 5-15 minit</li>
            <li>✅ Bonus {company.caption || "menarik"} untuk ahli baru</li>
            <li>✅ Support WhatsApp 24/7</li>
            <li>✅ Kompatibel dengan Android dan iOS</li>
          </ul>
          
          <h3>Cara Daftar {company.name}</h3>
          <p>
            Untuk <strong>daftar {company.name}</strong>, klik butang "PLAY NOW" atau "GET LINK" di atas. 
            Anda juga boleh hubungi admin kami melalui WhatsApp untuk bantuan pendaftaran. Minimum deposit 
            serendah RM10-20 melalui bank transfer atau e-wallet.
          </p>
          
          <h3>{company.name} Login dan Download</h3>
          <p>
            <strong>{company.name} login</strong> boleh dibuat melalui aplikasi Mega888 original. 
            Muat turun <strong>{company.name} download</strong> APK versi terkini untuk pengalaman 
            terbaik. Elakkan menggunakan APK hack atau mod yang boleh membahayakan akaun anda.
          </p>
          
          <p className="text-white/60 text-sm mt-6">
            <strong>Disclaimer:</strong> {company.name} disenaraikan di TipsMega888 sebagai rujukan sahaja. 
            Pastikan anda berumur 18+ dan berjudi dengan penuh tanggungjawab. TipsMega888 bukan ejen 
            judi dan tidak bertanggungjawab ke atas sebarang kerugian.
          </p>
        </article>
        
        {/* Back to Trusted */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <Link 
            href="/trusted" 
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            ← Kembali ke Trusted Companies
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-4 py-6 border-t border-white/10 mt-8">
        <div className="max-w-4xl mx-auto text-center text-white/40 text-xs">
          <p>© 2026 TipsMega888. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
