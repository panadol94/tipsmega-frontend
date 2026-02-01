"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AdminToast from "../ui/AdminToast";

const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/games", label: "Games", icon: "🎮" },
    { href: "/admin/companies", label: "Companies", icon: "🏢" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/chat", label: "Chat", icon: "💬" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Check if we're on login page
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        // Skip auth check for login page
        if (isLoginPage) {
            // Use setTimeout to avoid setState during render
            setTimeout(() => setIsLoading(false), 0);
            return;
        }

        // Simple client-side token check
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin/login");
            setTimeout(() => setIsLoading(false), 0);
            return;
        }

        // Token exists, allow access
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
        }, 0);
    }, [router, isLoginPage, pathname]);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Login page should render without admin layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-900 flex">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
            >
                {sidebarOpen ? "✕" : "☰"}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 bg-slate-800 border-r border-slate-700
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-slate-700">
                    <span className="text-xl font-bold text-white">
                        🎮 <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">TIPSMEGA</span>
                    </span>
                    <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase">Admin</span>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    ${isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                                    }
                                `}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <span>🚪</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                {/* Header */}
                <header className="h-16 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between px-6">
                    <h1 className="text-lg font-bold text-white md:ml-0 ml-12">
                        {NAV_ITEMS.find(item =>
                            pathname === item.href ||
                            (item.href !== "/admin" && pathname?.startsWith(item.href))
                        )?.label || "Admin"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-400">
                            Welcome, <span className="text-white font-medium">Admin</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>

            {/* Toast Notifications */}
            <AdminToast />
        </div>
    );
}
