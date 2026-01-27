"use client";

import { useState, useEffect } from "react";

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

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${API_BASE}/api/admin/chat?room=${filter}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        } finally {
            setLoading(false);
        }
    };

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
                <button className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors">
                    <span className="text-2xl">📢</span>
                    <div className="font-bold text-white mt-2">Send Announcement</div>
                    <div className="text-xs text-slate-500">Broadcast to all</div>
                </button>
                <button className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors">
                    <span className="text-2xl">🧹</span>
                    <div className="font-bold text-white mt-2">Clear Old Messages</div>
                    <div className="text-xs text-slate-500">7+ days old</div>
                </button>
                <button className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors">
                    <span className="text-2xl">📥</span>
                    <div className="font-bold text-white mt-2">Export Logs</div>
                    <div className="text-xs text-slate-500">Download CSV</div>
                </button>
                <button className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-blue-500 transition-colors">
                    <span className="text-2xl">🚫</span>
                    <div className="font-bold text-white mt-2">Banned Words</div>
                    <div className="text-xs text-slate-500">Manage filter</div>
                </button>
            </div>
        </div>
    );
}
