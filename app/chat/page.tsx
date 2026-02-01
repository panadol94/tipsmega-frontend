
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
    },
    alternates: {
        canonical: "https://tipsmega888.com/chat",
    },
};

export default function Page() {
    return <ChatClient />;
}
