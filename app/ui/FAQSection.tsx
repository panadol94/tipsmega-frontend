"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "Apa itu Mega888 RTP Scanner?",
        answer: "Mega888 RTP Scanner adalah sistem AI canggih yang menganalisis peratusan Return To Player (RTP) secara live untuk membantu anda membuat keputusan bermain yang lebih bijak. Scanner kami menggunakan teknologi machine learning untuk mengira kemenangan potensial."
    },
    {
        question: "Bagaimana cara menggunakan scanner ini?",
        answer: "Mudah sahaja! Masukkan ID Mega888 anda (12 digit bermula dengan 1, 2 atau 09), kemudian klik butang 'SCAN NETWORK'. Sistem AI kami akan menganalisis data RTP secara real-time dan memberikan tips kemenangan terbaik untuk anda."
    },
    {
        question: "Adakah TipsMega888 percuma?",
        answer: "Ya! TipsMega888 adalah percuma untuk digunakan. Setiap pengguna baru akan menerima bonus stars untuk memulakan scan. Anda boleh dapatkan lebih banyak stars dengan login setiap hari dan sertai komuniti kami."
    },
    {
        question: "Apakah maksud RTP dalam Mega888?",
        answer: "RTP (Return To Player) adalah peratusan yang menunjukkan jumlah wang yang akan dikembalikan kepada pemain dalam jangka masa panjang. Contohnya, RTP 96% bermaksud dari setiap RM100 yang dimainkan, secara purata RM96 akan dikembalikan kepada pemain."
    },
    {
        question: "Berapa kali saya boleh scan setiap hari?",
        answer: "Bilangan scan bergantung kepada stars yang anda ada. Pengguna yang login akan menerima bonus stars harian. Anda juga boleh dapatkan stars tambahan melalui sistem referral dan program bonus kami."
    },
    {
        question: "Adakah data saya selamat?",
        answer: "Keselamatan data anda adalah keutamaan kami. Semua data dienkripsi dan kami tidak menyimpan maklumat sensitif seperti kata laluan Mega888. Kami hanya menggunakan ID anda untuk analisis RTP dan tidak berkongsi maklumat peribadi anda dengan pihak ketiga."
    },
    {
        question: "Bolehkah saya guna TipsMega888 di telefon?",
        answer: "Sudah tentu! TipsMega888 dioptimumkan untuk semua peranti termasuk telefon pintar, tablet dan desktop. Anda juga boleh install sebagai PWA (Progressive Web App) untuk pengalaman yang lebih pantas dan mudah."
    },
    {
        question: "Apa kelebihan sistem AI TipsMega888?",
        answer: "Sistem AI kami menganalisis pola kemenangan secara real-time, memberikan tips berdasarkan data terkini, dan membantu anda pilih slot dengan RTP tertinggi. Dengan teknologi machine learning, accuracy tips kami semakin meningkat setiap hari."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            {/* FAQ Schema JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQ_DATA.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        }))
                    })
                }}
            />

            <section className="card p-5">
                <h2 className="text-2xl font-black tracking-wide mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    SOALAN LAZIM (FAQ)
                </h2>
                <p className="text-sm text-white/60 mb-6">Jawapan kepada soalan popular tentang Mega888 RTP Scanner</p>

                <div className="faq-list space-y-3">
                    {FAQ_DATA.map((item, index) => (
                        <div
                            key={index}
                            className="faq-item border border-white/10 rounded-xl overflow-hidden bg-black/20"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="faq-question w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-white/5 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-bold text-white/90 flex-1 leading-relaxed">
                                    {item.question}
                                </span>
                                <span
                                    className="faq-icon text-2xl text-amber-400 font-black transition-transform duration-300 flex-shrink-0"
                                    style={{
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                >
                                    ▼
                                </span>
                            </button>

                            <div
                                className="faq-answer overflow-hidden transition-all duration-300"
                                style={{
                                    maxHeight: openIndex === index ? '500px' : '0px',
                                    opacity: openIndex === index ? 1 : 0
                                }}
                            >
                                <div className="p-4 pt-0 text-white/75 leading-relaxed border-t border-white/5">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
