"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">⚙️ Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure system settings</p>
            </div>

            {success && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 text-emerald-400 text-sm">
                    ✅ Settings saved successfully!
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
                            defaultValue="TipsMega888"
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">API Base URL</label>
                        <input
                            type="text"
                            defaultValue="https://api.tipsmega888.com"
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
                        { label: "Enable Chat", desc: "Allow users to access chat room", enabled: true },
                        { label: "Enable Scanner", desc: "Allow game scanning feature", enabled: true },
                        { label: "Enable Registration", desc: "Allow new user registration", enabled: true },
                        { label: "Maintenance Mode", desc: "Show maintenance page to users", enabled: false },
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                            <div>
                                <div className="font-bold text-white">{feature.label}</div>
                                <div className="text-xs text-slate-500">{feature.desc}</div>
                            </div>
                            <button className={`w-12 h-6 rounded-full transition-colors ${feature.enabled ? "bg-emerald-500" : "bg-slate-600"}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${feature.enabled ? "translate-x-6" : "translate-x-0.5"}`} />
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
                            defaultValue={85}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Default RTP Max (%)</label>
                        <input
                            type="number"
                            defaultValue={98}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Games Per Scan Result</label>
                        <input
                            type="number"
                            defaultValue={10}
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-red-400 mb-4">⚠️ Danger Zone</h2>
                <div className="space-y-4">
                    <button className="w-full py-3 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-left px-4">
                        <div className="font-bold">Clear All Chat Messages</div>
                        <div className="text-xs opacity-70">This will permanently delete all chat history</div>
                    </button>
                    <button className="w-full py-3 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-left px-4">
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
        </div>
    );
}
