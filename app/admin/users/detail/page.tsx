"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../lib/adminApiUtils";
import { showToast } from "../../../ui/AdminToast";

interface UserDetail {
    _id: string;
    username: string;
    phone?: string;
    email?: string;
    stars: number;
    createdAt: string;
    isBanned?: boolean;
    lastLogin?: string;
}

function UserDetailContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id") || "";
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [starsToAdd, setStarsToAdd] = useState(10);

    const fetchUser = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const res = await adminFetch(`/api/admin/users/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
            showToast("Failed to load user", "error");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const toggleBan = async () => {
        if (!user) return;
        try {
            await adminFetch(`/api/admin/users/${userId}/ban`, {
                method: "PUT",
                body: JSON.stringify({ isBanned: !user.isBanned })
            });
            setUser({ ...user, isBanned: !user.isBanned });
            showToast(user.isBanned ? "User unbanned" : "User banned", "success");
        } catch (err) {
            console.error("Failed to toggle ban:", err);
            showToast("Failed to update ban", "error");
        }
    };

    const addStars = async () => {
        if (!user) return;
        try {
            await adminFetch(`/api/admin/users/${userId}/stars`, {
                method: "PUT",
                body: JSON.stringify({ stars: starsToAdd })
            });
            setUser({ ...user, stars: user.stars + starsToAdd });
            showToast(`Added ${starsToAdd} stars`, "success");
        } catch (err) {
            console.error("Failed to add stars:", err);
            showToast("Failed to add stars", "error");
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;
    }

    if (!user) {
        return <div className="text-center py-12 text-slate-500"><div className="text-4xl mb-2">❌</div><div>User not found</div></div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/users" className="p-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">👤 User Details</h1>
                    <p className="text-slate-500 text-sm">{user.username}</p>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user.username}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            {user.isBanned ? (
                                <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs">🚫 Banned</span>
                            ) : (
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs">✅ Active</span>
                            )}
                            <span className="text-red-400 text-sm">⭐ {user.stars}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-xl p-4"><div className="text-xs text-slate-500">Phone</div><div className="text-white font-medium">{user.phone || "-"}</div></div>
                    <div className="bg-slate-700/30 rounded-xl p-4"><div className="text-xs text-slate-500">Email</div><div className="text-white font-medium">{user.email || "-"}</div></div>
                    <div className="bg-slate-700/30 rounded-xl p-4"><div className="text-xs text-slate-500">Joined</div><div className="text-white font-medium">{new Date(user.createdAt).toLocaleDateString()}</div></div>
                    <div className="bg-slate-700/30 rounded-xl p-4"><div className="text-xs text-slate-500">Last Login</div><div className="text-white font-medium">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "-"}</div></div>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">⚡ Actions</h3>

                <div className="flex items-center gap-3">
                    <input type="number" value={starsToAdd} onChange={(e) => setStarsToAdd(parseInt(e.target.value) || 0)} className="w-24 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white text-center" min={1} />
                    <button onClick={addStars} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-xl font-bold hover:bg-red-500/30 transition-colors">⭐ Add Stars</button>
                </div>

                <button onClick={toggleBan} className={`w-full py-3 rounded-xl font-bold transition-colors ${user.isBanned ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}>
                    {user.isBanned ? "✅ Unban User" : "🚫 Ban User"}
                </button>

                <button className="w-full py-3 bg-slate-700 text-slate-300 rounded-xl font-bold hover:bg-slate-600 transition-colors">🔑 Reset Password</button>
            </div>
        </div>
    );
}

export default function UserDetailPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
            <UserDetailContent />
        </Suspense>
    );
}
