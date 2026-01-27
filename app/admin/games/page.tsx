"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface Game {
    _id: string;
    name: string;
    icon: string;
    category: string;
    rtpMin: number;
    rtpMax: number;
    isHot: boolean;
    isNew: boolean;
    enabled: boolean;
    order: number;
}

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [deleteModal, setDeleteModal] = useState<string | null>(null);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/games`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setGames(data.games || []);
            }
        } catch (err) {
            console.error("Failed to fetch games:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleGame = async (id: string, enabled: boolean) => {
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_BASE}/api/admin/games/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ enabled: !enabled })
            });
            setGames(games.map(g => g._id === id ? { ...g, enabled: !enabled } : g));
        } catch (err) {
            console.error("Failed to toggle game:", err);
        }
    };

    const deleteGame = async (id: string) => {
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_BASE}/api/admin/games/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setGames(games.filter(g => g._id !== id));
            setDeleteModal(null);
        } catch (err) {
            console.error("Failed to delete game:", err);
        }
    };

    const filteredGames = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" ||
            (filter === "enabled" && game.enabled) ||
            (filter === "disabled" && !game.enabled) ||
            (filter === "hot" && game.isHot) ||
            (filter === "new" && game.isNew) ||
            (filter === game.category);
        return matchesSearch && matchesFilter;
    });

    const categories = [...new Set(games.map(g => g.category))];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">🎮 Game List Editor</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage games for scan results</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/games/new"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <span>➕</span> Add Game
                    </Link>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                        <span>📥</span> Import
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 Search games..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                >
                    <option value="all">All Games</option>
                    <option value="enabled">✅ Enabled</option>
                    <option value="disabled">❌ Disabled</option>
                    <option value="hot">🔥 Hot</option>
                    <option value="new">✨ New</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-4 text-sm">
                <span className="text-slate-400">
                    Total: <span className="text-white font-bold">{games.length}</span>
                </span>
                <span className="text-slate-400">
                    Enabled: <span className="text-emerald-400 font-bold">{games.filter(g => g.enabled).length}</span>
                </span>
                <span className="text-slate-400">
                    Showing: <span className="text-white font-bold">{filteredGames.length}</span>
                </span>
            </div>

            {/* Games Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 bg-slate-700/30">
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Game</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Category</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">RTP</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Tags</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Status</th>
                                <th className="text-right text-xs font-bold text-slate-400 uppercase p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.length > 0 ? (
                                filteredGames.map((game) => (
                                    <tr key={game._id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{game.icon || "🎰"}</span>
                                                <span className="font-medium text-white">{game.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-slate-700 rounded-lg text-xs text-slate-300">
                                                {game.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-300">
                                            {game.rtpMin}% - {game.rtpMax}%
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-1">
                                                {game.isHot && <span title="Hot">🔥</span>}
                                                {game.isNew && <span title="New">✨</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleGame(game._id, game.enabled)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${game.enabled
                                                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                    }`}
                                            >
                                                {game.enabled ? "✅ ON" : "❌ OFF"}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/games/edit?id=${game._id}`}
                                                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteModal(game._id)}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        <div className="text-4xl mb-2">🎮</div>
                                        <div>No games found</div>
                                        <Link href="/admin/games/new" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
                                            Add your first game →
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Delete Game?</h3>
                        <p className="text-slate-400 mb-6">
                            Are you sure you want to delete this game? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteGame(deleteModal)}
                                className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
