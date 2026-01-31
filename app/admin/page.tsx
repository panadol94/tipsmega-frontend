"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { adminFetch } from "../lib/adminApiUtils";
import { showToast } from "../ui/AdminToast";

interface Stats {
    totalUsers: number;
    activeToday: number;
    totalScans: number;
    totalGames: number;
    totalCompanies: number;
    chatMessages24h: number;
}

interface RecentActivity {
    type: "user" | "scan" | "company" | "chat";
    message: string;
    time: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        activeToday: 0,
        totalScans: 0,
        totalGames: 0,
        totalCompanies: 0,
        chatMessages24h: 0
    });
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            const res = await adminFetch("/api/admin/stats");
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats || {
                    totalUsers: 0,
                    activeToday: 0,
                    totalScans: 0,
                    totalGames: 0,
                    totalCompanies: 0,
                    chatMessages24h: 0
                });
                setRecentActivity(data.recentActivity || []);
            }
        } catch (err) {
            console.error("Failed to fetch stats:", err);
            showToast("Failed to load dashboard stats", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const statCards = [
        { label: "Total Users", value: stats.totalUsers, icon: "👥", color: "blue", href: "/admin/users" },
        { label: "Active Today", value: stats.activeToday, icon: "🟢", color: "emerald", href: "/admin/users" },
        { label: "Total Scans", value: stats.totalScans, icon: "🔍", color: "purple", href: "/admin" },
        { label: "Total Games", value: stats.totalGames, icon: "🎮", color: "amber", href: "/admin/games" },
        { label: "Companies", value: stats.totalCompanies, icon: "🏢", color: "pink", href: "/admin/companies" },
        { label: "Chat (24h)", value: stats.chatMessages24h, icon: "💬", color: "cyan", href: "/admin/chat" },
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "user": return "👤";
            case "scan": return "🔍";
            case "company": return "🏢";
            case "chat": return "💬";
            default: return "📌";
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
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((stat) => {
                    const hoverClasses = {
                        blue: "hover:border-blue-500/50 hover:shadow-blue-500/10",
                        emerald: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
                        purple: "hover:border-purple-500/50 hover:shadow-purple-500/10",
                        amber: "hover:border-amber-500/50 hover:shadow-amber-500/10",
                        pink: "hover:border-pink-500/50 hover:shadow-pink-500/10",
                        cyan: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
                    }[stat.color] || "hover:border-slate-500/50";

                    const textColorClasses = {
                        blue: "text-blue-400",
                        emerald: "text-emerald-400",
                        purple: "text-purple-400",
                        amber: "text-amber-400",
                        pink: "text-pink-400",
                        cyan: "text-cyan-400",
                    }[stat.color] || "text-slate-400";

                    return (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className={`
                                bg-slate-800 border border-slate-700 rounded-2xl p-4
                                ${hoverClasses} hover:shadow-lg
                                transition-all duration-300 group
                            `}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{stat.icon}</span>
                                <span className={`text-xs font-bold uppercase ${textColorClasses}`}>
                                    {stat.label.split(" ")[0]}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                                {stat.value.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                    href="/admin/games/new"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white hover:shadow-lg hover:shadow-blue-600/20 transition-all"
                >
                    <span className="text-2xl">➕</span>
                    <div className="font-bold mt-2">Add New Game</div>
                    <div className="text-xs text-blue-200">Add to scan pool</div>
                </Link>
                <Link
                    href="/admin/companies/new"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white hover:shadow-lg hover:shadow-purple-600/20 transition-all"
                >
                    <span className="text-2xl">🏢</span>
                    <div className="font-bold mt-2">Add Company</div>
                    <div className="text-xs text-purple-200">Trusted agents</div>
                </Link>
                <Link
                    href="/admin/chat"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-4 text-white hover:shadow-lg hover:shadow-emerald-600/20 transition-all"
                >
                    <span className="text-2xl">💬</span>
                    <div className="font-bold mt-2">Moderate Chat</div>
                    <div className="text-xs text-emerald-200">View messages</div>
                </Link>
                <Link
                    href="/admin/settings"
                    className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl p-4 text-white hover:shadow-lg hover:shadow-slate-600/20 transition-all"
                >
                    <span className="text-2xl">⚙️</span>
                    <div className="font-bold mt-2">Settings</div>
                    <div className="text-xs text-slate-300">Configure system</div>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>📋</span> Recent Activity
                </h2>
                <div className="space-y-3">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl"
                            >
                                <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                <div className="flex-1">
                                    <div className="text-sm text-white">{activity.message}</div>
                                    <div className="text-xs text-slate-500">{activity.time}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            <div className="text-4xl mb-2">📭</div>
                            <div>No recent activity</div>
                        </div>
                    )}
                </div>
            </div>

            {/* System Status */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>🖥️</span> System Status
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                            <div className="text-sm font-medium text-white">API Server</div>
                            <div className="text-xs text-slate-500">Online</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                            <div className="text-sm font-medium text-white">Database</div>
                            <div className="text-xs text-slate-500">Connected</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                            <div className="text-sm font-medium text-white">WebSocket</div>
                            <div className="text-xs text-slate-500">Active</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                            <div className="text-sm font-medium text-white">Storage</div>
                            <div className="text-xs text-slate-500">Healthy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
