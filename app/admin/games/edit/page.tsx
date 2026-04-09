"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../lib/adminApiUtils";
import { showToast } from "../../../ui/AdminToast";

const CATEGORIES = ["slots", "table", "live", "fishing", "arcade", "sports"];
const ICONS = ["🎰", "🃏", "🎲", "🎯", "🎮", "🐟", "⚽", "🏀", "🎱", "💎", "🌟", "👑", "🔥", "💰", "🍀"];

function EditGameContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const gameId = searchParams.get("id") || "";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        icon: "🎰",
        category: "slots",
        rtpMin: 85,
        rtpMax: 98,
        isHot: false,
        isNew: false,
        enabled: true
    });

    const fetchGame = useCallback(async () => {
        if (!gameId) {
            setLoading(false);
            setError("No game ID provided");
            return;
        }
        try {
            const res = await adminFetch(`/api/admin/games/${gameId}`);
            if (res.ok) {
                const data = await res.json();
                setForm({
                    name: data.game.name || "",
                    icon: data.game.icon || "🎰",
                    category: data.game.category || "slots",
                    rtpMin: data.game.rtpMin || 85,
                    rtpMax: data.game.rtpMax || 98,
                    isHot: data.game.isHot || false,
                    isNew: data.game.isNew || false,
                    enabled: data.game.enabled !== false
                });
            } else {
                setError("Game not found");
            }
        } catch (err) {
            console.error("Failed to fetch game:", err);
            setError("Failed to load game");
            showToast("Failed to load game", "error");
        } finally {
            setLoading(false);
        }
    }, [gameId]);

    useEffect(() => {
        fetchGame();
    }, [fetchGame]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const res = await adminFetch(`/api/admin/games/${gameId}`, {
                method: "PUT",
                body: JSON.stringify(form)
            });

            if (res.ok) {
                showToast("Game updated!", "success");
                router.push("/admin/games");
            } else {
                const data = await res.json();
                const msg = data.message || "Failed to update game";
                setError(msg);
                showToast(msg, "error");
            }
        } catch (err) {
            console.error("Failed to update game:", err);
            const msg = "Connection failed. Please try again.";
            setError(msg);
            showToast(msg, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/games" className="p-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">✏️ Edit Game</h1>
                    <p className="text-slate-500 text-sm">Update game details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">{error}</div>
                )}

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Game Name *</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        placeholder="e.g. Aztec Gems"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Icon</label>
                    <div className="flex flex-wrap gap-2">
                        {ICONS.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => setForm({ ...form, icon })}
                                className={`w-12 h-12 text-2xl rounded-xl border transition-all ${form.icon === icon ? "bg-blue-600 border-blue-500 scale-110" : "bg-slate-700 border-slate-600 hover:border-slate-500"}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setForm({ ...form, category: cat })}
                                className={`px-4 py-2 rounded-xl border capitalize transition-all ${form.category === cat ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">RTP Min (%)</label>
                        <input type="number" value={form.rtpMin} onChange={(e) => setForm({ ...form, rtpMin: parseInt(e.target.value) })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" min={0} max={100} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">RTP Max (%)</label>
                        <input type="number" value={form.rtpMax} onChange={(e) => setForm({ ...form, rtpMax: parseInt(e.target.value) })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" min={0} max={100} />
                    </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-2">RTP Range Preview</div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-slate-600 rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 via-red-500 to-red-500 h-full" style={{ width: `${form.rtpMax}%`, marginLeft: `${form.rtpMin}%` }} />
                        </div>
                        <span className="text-white font-mono text-sm">{form.rtpMin}% - {form.rtpMax}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <button type="button" onClick={() => setForm({ ...form, isHot: !form.isHot })} className={`p-4 rounded-xl border text-center transition-all ${form.isHot ? "bg-orange-500/20 border-orange-500 text-orange-400" : "bg-slate-700 border-slate-600 text-slate-400"}`}>
                        <div className="text-2xl mb-1">🔥</div>
                        <div className="text-xs font-bold">Hot</div>
                    </button>
                    <button type="button" onClick={() => setForm({ ...form, isNew: !form.isNew })} className={`p-4 rounded-xl border text-center transition-all ${form.isNew ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-slate-700 border-slate-600 text-slate-400"}`}>
                        <div className="text-2xl mb-1">✨</div>
                        <div className="text-xs font-bold">New</div>
                    </button>
                    <button type="button" onClick={() => setForm({ ...form, enabled: !form.enabled })} className={`p-4 rounded-xl border text-center transition-all ${form.enabled ? "bg-red-500/20 border-red-500 text-red-400" : "bg-slate-700 border-slate-600 text-slate-400"}`}>
                        <div className="text-2xl mb-1">{form.enabled ? "✅" : "❌"}</div>
                        <div className="text-xs font-bold">Enabled</div>
                    </button>
                </div>

                <div className="flex gap-4 pt-4">
                    <Link href="/admin/games" className="flex-1 py-3 border border-slate-600 rounded-xl text-center text-slate-300 hover:bg-slate-700 transition-colors">Cancel</Link>
                    <button type="submit" disabled={saving || !form.name.trim()} className="flex-1 py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function EditGamePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
            <EditGameContent />
        </Suspense>
    );
}
