export default function MegaLogo() {
    return (
        <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Glow */}
            <circle cx="32" cy="32" r="30" fill="url(#blue_grad)" stroke="#00c4b0" strokeWidth="2" />

            {/* Inner Gloss */}
            <circle cx="32" cy="32" r="24" fill="url(#inner_glow)" />

            {/* Text "MEGA" */}
            <text x="32" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" fill="white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                MEGA
            </text>

            {/* Text "888" */}
            <text x="32" y="44" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="url(#gold_grad)" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.8))" }}>
                888
            </text>

            {/* Definitions */}
            <defs>
                <linearGradient id="blue_grad" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1a5cff" />
                    <stop offset="1" stopColor="#001a4d" />
                </linearGradient>
                <radialGradient id="inner_glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 20) rotate(90) scale(40)">
                    <stop stopColor="white" stopOpacity="0.15" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="gold_grad" x1="32" y1="30" x2="32" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffd700" />
                    <stop offset="0.5" stopColor="#ffaa00" />
                    <stop offset="1" stopColor="#ffd700" />
                </linearGradient>
            </defs>
        </svg>
    );
}
