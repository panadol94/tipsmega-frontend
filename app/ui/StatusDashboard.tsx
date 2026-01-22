"use client";

export default function StatusDashboard() {
    return (
        <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Server</div>
                <div className="text-xs font-bold text-emerald-400">98% ON</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[10px] text-white/50 uppercase tracking-wider">AI Model</div>
                <div className="text-xs font-bold text-amber-400">V.4.2</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Scans</div>
                <div className="text-xs font-bold text-blue-400">14k+</div>
            </div>
        </div>
    );
}
