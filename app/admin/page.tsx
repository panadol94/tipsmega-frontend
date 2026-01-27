"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

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

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats || stats);
                setRecentActivity(data.recentActivity || []);
            }
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        } finally {
            setLoading(false);
        }
    };

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
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className={`
                            bg-slate-800 border border-slate-700 rounded-2xl p-4
                            hover:border-${stat.color}-500/50 hover:shadow-lg hover:shadow-${stat.color}-500/10
                            transition-all duration-300 group
                        `}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-bold uppercase text-${stat.color}-400`}>
                                {stat.label.split(" ")[0]}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                            {stat.value.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                    </Link>
                ))}
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
