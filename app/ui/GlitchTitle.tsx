export default function GlitchTitle({ text = "MEGA888" }: { text?: string }) {
    // "Fierce" Glitch Effect
    return (
        <div className="relative inline-block select-none">
            <h1 className="glitch-wrapper title-font text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl">
                <span className="glitch" data-text={text}>
                    {text}
                </span>
            </h1>
            <div className="mt-1 flex justify-center">
                <span className="bg-gradient-to-r from-red-600 via-[#ffd98a] to-red-600 bg-clip-text text-xs font-bold tracking-widest text-transparent sm:text-lg animate-pulse whitespace-nowrap">
                    CONTROL PANEL
                </span>
            </div>
        </div>
    );
}
