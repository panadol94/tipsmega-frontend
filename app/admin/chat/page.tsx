"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface ChatMessage {
    _id: string;
    sender: string;
    content: string;
    roomId: string;
    createdAt: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("global");

    // Modal states
    const [announceModal, setAnnounceModal] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const [bannedWordsModal, setBannedWordsModal] = useState(false);
    const [bannedWords, setBannedWords] = useState<string[]>([]);
    const [newBannedWord, setNewBannedWord] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const fetchMessages = useCallback(async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/chat?room=${filter}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (e) {
            console.error("Failed to fetch messages:", e);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const deleteMessage = async (id: string) => {
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_BASE}/api/admin/chat/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(messages.filter(m => m._id !== id));
        } catch (err) {
            console.error("Failed to delete message:", err);
        }
    };

    const handleSendAnnouncement = async () => {
        if (!announcement.trim()) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/chat/announce`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: announcement })
            });
            if (res.ok) {
                alert("✅ Announcement sent!");
                setAnnouncement("");
                setAnnounceModal(false);
                fetchMessages();
            }
        } catch {
            alert("Failed to send announcement");
        } finally {
            setActionLoading(false);
        }
    };

    const handleClearOld = async () => {
        if (!confirm("Clear all messages older than 7 days?")) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/chat/clear-old`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                alert(`✅ Cleared ${data.cleared} old messages`);
                fetchMessages();
            }
        } catch {
            alert("Failed to clear old messages");
        } finally {
            setActionLoading(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Sender", "Content", "Room", "Date"];
        const rows = messages.map(m => [
            m._id,
            m.sender,
            `"${m.content.replace(/"/g, '""')}"`,
            m.roomId,
            new Date(m.createdAt).toISOString()
        ]);

        const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `chat_logs_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const fetchBannedWords = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/settings/banned-words`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setBannedWords(data.bannedWords || []);
            }
        } catch (err) {
            console.error("Failed to fetch banned words:", err);
        }
    };

    const handleAddBannedWord = async () => {
        if (!newBannedWord.trim()) return;
        const updated = [...bannedWords, newBannedWord.trim().toLowerCase()];
        await saveBannedWords(updated);
        setNewBannedWord("");
    };

    const handleRemoveBannedWord = async (word: string) => {
        const updated = bannedWords.filter(w => w !== word);
        await saveBannedWords(updated);
    };

    const saveBannedWords = async (words: string[]) => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/settings/banned-words`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ bannedWords: words })
            });
            if (res.ok) {
                const data = await res.json();
                setBannedWords(data.bannedWords);
            }
        } catch {
            alert("Failed to save banned words");
        }
    };

    const openBannedWordsModal = () => {
        fetchBannedWords();
        setBannedWordsModal(true);
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">💬 Chat Moderation</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor and moderate chat messages</p>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
                >
                    <option value="global">🌐 Global Chat</option>
                    <option value="all">📋 All Rooms</option>
                </select>
            </div>

            {/* Messages */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg._id} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-xl group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                                    {msg.sender.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white text-sm">{msg.sender}</span>
                                        <span className="text-xs text-slate-500">
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm mt-1 break-words">{msg.content}</p>
                                </div>
                                <button
                                    onClick={() => deleteMessage(msg._id)}
                                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                    title="Delete message"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <div className="text-4xl mb-2">💬</div>
                            <div>No messages to moderate</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                    onClick={() => setAnnounceModal(true)}
                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                    <span className="text-2xl">📢</span>
                    <div className="font-bold text-white mt-2">Send Announcement</div>
                    <div className="text-xs text-slate-500">Broadcast to all</div>
                </button>
                <button
                    onClick={handleClearOld}
                    disabled={actionLoading}
                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors disabled:opacity-50"
                >
                    <span className="text-2xl">🧹</span>
                    <div className="font-bold text-white mt-2">Clear Old Messages</div>
                    <div className="text-xs text-slate-500">7+ days old</div>
                </button>
                <button
                    onClick={handleExportCSV}
                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                    <span className="text-2xl">📥</span>
                    <div className="font-bold text-white mt-2">Export Logs</div>
                    <div className="text-xs text-slate-500">Download CSV</div>
                </button>
                <button
                    onClick={openBannedWordsModal}
                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors"
                >
                    <span className="text-2xl">🚫</span>
                    <div className="font-bold text-white mt-2">Banned Words</div>
                    <div className="text-xs text-slate-500">Manage filter</div>
                </button>
            </div>

            {/* Announcement Modal */}
            {announceModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-white mb-4">📢 Send Announcement</h3>
                        <textarea
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            placeholder="Type your announcement..."
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white min-h-[100px] focus:border-blue-500 outline-none"
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setAnnounceModal(false)}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendAnnouncement}
                                disabled={actionLoading || !announcement.trim()}
                                className="flex-1 py-2 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 disabled:opacity-50"
                            >
                                {actionLoading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Banned Words Modal */}
            {bannedWordsModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-white mb-4">🚫 Banned Words</h3>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newBannedWord}
                                onChange={(e) => setNewBannedWord(e.target.value)}
                                placeholder="Add word..."
                                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none"
                                onKeyDown={(e) => e.key === "Enter" && handleAddBannedWord()}
                            />
                            <button
                                onClick={handleAddBannedWord}
                                className="px-4 py-2 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500"
                            >
                                Add
                            </button>
                        </div>

                        <div className="max-h-[200px] overflow-y-auto space-y-2">
                            {bannedWords.length > 0 ? (
                                bannedWords.map((word, i) => (
                                    <div key={i} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                                        <span className="text-white">{word}</span>
                                        <button
                                            onClick={() => handleRemoveBannedWord(word)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-slate-500">No banned words</div>
                            )}
                        </div>

                        <button
                            onClick={() => setBannedWordsModal(false)}
                            className="w-full mt-4 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
