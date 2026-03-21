

import ChatClient from "./ChatClient";

export const metadata = {
    title: "Live Chat Community | Mega888 AI Tips",
    description: "Join the Mega888 AI Community Chat. Discuss winning strategies, share RTP findings, and connect with other commanders.",
    openGraph: {
        title: "Live Chat Community | Mega888 AI Tips",
        description: "Join the Mega888 AI Community Chat. Connect with other players instantly.",
        url: "https://tipsmega888.com/chat",
        siteName: "TipsMega AI Scanner",
        locale: "ms_MY",
        type: "website",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Mega888 AI Community Chat",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Live Chat Community | Mega888 AI Tips",
        description: "Join the Mega888 AI Community Chat. Connect with other players instantly.",
        images: ["/og-image.webp"],
    },
    alternates: {
        canonical: "https://tipsmega888.com/chat",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return <ChatClient />;
}
