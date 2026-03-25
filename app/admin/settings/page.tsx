"use client";

import { useState, useEffect } from "react";
import { adminFetch, validateNumber } from "../../lib/adminApiUtils";
import { showToast } from "../../ui/AdminToast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface Settings {
    siteName: string;
    enableChat: boolean;
    enableScanner: boolean;
    enableRegistration: boolean;
    maintenanceMode: boolean;
    rtpMin: number;
    rtpMax: number;
    gamesPerScan: number;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        siteName: "TipsMega888",
        enableChat: true,
        enableScanner: true,
        enableRegistration: true,
        maintenanceMode: false,
        rtpMin: 85,
        rtpMax: 98,
        gamesPerScan: 10
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Danger zone states
    const [clearChatModal, setClearChatModal] = useState(false);
    const [resetGamesModal, setResetGamesModal] = useState(false);
    const [dangerLoading, setDangerLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await adminFetch("/api/admin/settings");
            if (res.ok) {
                const data = await res.json();
                if (data.settings) {
                    setSettings({
                        siteName: data.settings.siteName || "TipsMega888",
                        enableChat: data.settings.enableChat ?? true,
                        enableScanner: data.settings.enableScanner ?? true,
                        enableRegistration: data.settings.enableRegistration ?? true,
                        maintenanceMode: data.settings.maintenanceMode ?? false,
                        rtpMin: data.settings.rtpMin || 85,
                        rtpMax: data.settings.rtpMax || 98,
                        gamesPerScan: data.settings.gamesPerScan || 10
                    });
                }
            }
        } catch (err) {
            console.error("Failed to fetch settings:", err);
            showToast("Failed to load settings", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        // Validate
        if (!validateNumber(settings.rtpMin, 50, 100)) {
            showToast("RTP Min must be 50-100", "error");
            return;
        }
        if (!validateNumber(settings.rtpMax, 50, 100)) {
            showToast("RTP Max must be 50-100", "error");
            return;
        }
        if (settings.rtpMin > settings.rtpMax) {
            showToast("RTP Min cannot exceed Max", "error");
            return;
        }
        if (!validateNumber(settings.gamesPerScan, 1, 50)) {
            showToast("Games per scan: 1-50", "error");
            return;
        }

        setSaving(true);
        setError("");
        try {
            const res = await adminFetch("/api/admin/settings", {
                method: "PUT",
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                showToast("Settings saved", "success");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save");
                showToast(data.error || "Failed to save", "error");
            }
        } catch (err) {
            setError("Network error");
            showToast("Failed to save settings", "error");
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleClearChat = async () => {
        setDangerLoading(true);
        try {
            const res = await adminFetch("/api/admin/settings/clear-chat", {
                method: "POST"
            });
            if (res.ok) {
                const data = await res.json();
                showToast(`Cleared ${data.deleted} messages`, "success");
            }
        } catch {
            showToast("Failed to clear chat", "error");
        } finally {
            setDangerLoading(false);
            setClearChatModal(false);
        }
    };

    const handleResetGames = async () => {
        setDangerLoading(true);
        try {
            const res = await adminFetch("/api/admin/settings/reset-games", {
                method: "POST"
            });
            if (res.ok) {
                const data = await res.json();
                showToast(`Deleted ${data.deleted} games`, "success");
            }
        } catch {
            showToast("Failed to reset games", "error");
        } finally {
            setDangerLoading(false);
            setResetGamesModal(false);
        }
    };

    const toggleFeature = (key: keyof Settings) => {
        if (typeof settings[key] === "boolean") {
            setSettings({ ...settings, [key]: !settings[key] });
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
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">⚙️ Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure system settings</p>
            </div>

            {success && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
                    ✅ Settings saved successfully!
                </div>
            )}

            {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
                    ❌ {error}
                </div>
            )}

            {/* General Settings */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">🌐 General</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Site Name</label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">API Base URL</label>
                        <input
                            type="text"
                            value={API_BASE}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                            disabled
                        />
                    </div>
                </div>
            </div>

            {/* Feature Toggles */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">🎚️ Feature Toggles</h2>
                <div className="space-y-4">
                    {[
                        { key: "enableChat" as const, label: "Enable Chat", desc: "Allow users to access chat room" },
                        { key: "enableScanner" as const, label: "Enable Scanner", desc: "Allow game scanning feature" },
                        { key: "enableRegistration" as const, label: "Enable Registration", desc: "Allow new user registration" },
                        { key: "maintenanceMode" as const, label: "Maintenance Mode", desc: "Show maintenance page to users" },
                    ].map((feature) => (
                        <div key={feature.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                            <div>
                                <div className="font-bold text-white">{feature.label}</div>
                                <div className="text-xs text-slate-500">{feature.desc}</div>
                            </div>
                            <button
                                onClick={() => toggleFeature(feature.key)}
                                className={`w-12 h-6 rounded-full transition-colors ${settings[feature.key] ? "bg-red-500" : "bg-slate-600"}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings[feature.key] ? "translate-x-6" : "translate-x-0.5"}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scan Settings */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">🔍 Scan Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Default RTP Min (%)</label>
                        <input
                            type="number"
                            value={settings.rtpMin}
                            onChange={(e) => setSettings({ ...settings, rtpMin: Number(e.target.value) })}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Default RTP Max (%)</label>
                        <input
                            type="number"
                            value={settings.rtpMax}
                            onChange={(e) => setSettings({ ...settings, rtpMax: Number(e.target.value) })}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Games Per Scan Result</label>
                        <input
                            type="number"
                            value={settings.gamesPerScan}
                            onChange={(e) => setSettings({ ...settings, gamesPerScan: Number(e.target.value) })}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-red-400 mb-4">⚠️ Danger Zone</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => setClearChatModal(true)}
                        className="w-full py-3 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-left px-4"
                    >
                        <div className="font-bold">Clear All Chat Messages</div>
                        <div className="text-xs opacity-70">This will permanently delete all chat history</div>
                    </button>
                    <button
                        onClick={() => setResetGamesModal(true)}
                        className="w-full py-3 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-left px-4"
                    >
                        <div className="font-bold">Reset All Games</div>
                        <div className="text-xs opacity-70">This will delete all games from the database</div>
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
                {saving ? "Saving..." : "💾 Save Settings"}
            </button>

            {/* Clear Chat Modal */}
            {clearChatModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Clear All Chat?</h3>
                        <p className="text-slate-400 mb-6">This will permanently delete ALL chat messages. This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setClearChatModal(false)}
                                disabled={dangerLoading}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearChat}
                                disabled={dangerLoading}
                                className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500 disabled:opacity-50"
                            >
                                {dangerLoading ? "Deleting..." : "Delete All"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Games Modal */}
            {resetGamesModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Reset All Games?</h3>
                        <p className="text-slate-400 mb-6">This will permanently delete ALL games. You&apos;ll need to re-seed or re-import them.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setResetGamesModal(false)}
                                disabled={dangerLoading}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetGames}
                                disabled={dangerLoading}
                                className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500 disabled:opacity-50"
                            >
                                {dangerLoading ? "Deleting..." : "Delete All"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
