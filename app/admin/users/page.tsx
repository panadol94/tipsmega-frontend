"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface User {
    _id: string;
    username: string;
    phone?: string;
    email?: string;
    stars: number;
    createdAt: string;
    isBanned?: boolean;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleBan = async (id: string, isBanned: boolean) => {
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_BASE}/api/admin/users/${id}/ban`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isBanned: !isBanned })
            });
            setUsers(users.map(u => u._id === id ? { ...u, isBanned: !isBanned } : u));
        } catch (err) {
            console.error("Failed to toggle ban:", err);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

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
                    <h1 className="text-2xl font-bold text-white">👥 Users</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage registered users</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-400">
                        Total: <span className="text-white font-bold">{users.length}</span>
                    </span>
                </div>
            </div>

            {/* Search */}
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="🔍 Search by username, phone, or email..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
                />
            </div>

            {/* Users Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 bg-slate-700/30">
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">User</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Contact</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Stars</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Joined</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Status</th>
                                <th className="text-right text-xs font-bold text-slate-400 uppercase p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-white">{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {user.phone || user.email || "-"}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-yellow-400">⭐ {user.stars || 0}</span>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            {user.isBanned ? (
                                                <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs">Banned</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs">Active</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/users/detail?id=${user._id}`} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">👁️</Link>
                                                <button onClick={() => toggleBan(user._id, user.isBanned || false)} className={`p-2 rounded-lg ${user.isBanned ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                                                    {user.isBanned ? "✅" : "🚫"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        <div className="text-4xl mb-2">👥</div>
                                        <div>No users found</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
