"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

type Message = {
    id?: string;
    sender: string;
    senderLevel: "MEMBER" | "ADMIN";
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    createdAt?: string;
};

export default function ChatRoom() {
    const { isChatOpen, toggleChat, activeTheme, setTheme } = useGlobalSettings(); // Use Global State
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<{ username: string; token: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Theme Styles Map
    const themes: Record<string, any> = {
        cyber: {
            bg: "bg-[#0c1223] border-white/10",
            header: "bg-[#111827] border-white/5",
            me: "bg-blue-600/20 border-blue-500/30 text-blue-50",
            other: "bg-white/5 border-white/5 text-gray-200",
            admin: "bg-yellow-500/10 border-yellow-500/20 text-yellow-50",
            accent: "blue",
        },
        gold: {
            bg: "bg-black border-amber-500/30",
            header: "bg-gradient-to-r from-black to-amber-900/20 border-amber-500/30",
            me: "bg-amber-500/20 border-amber-500/50 text-amber-50",
            other: "bg-zinc-900 border-zinc-800 text-gray-300",
            admin: "bg-red-900/20 border-red-500/40 text-red-50",
            accent: "amber",
        },
        matrix: {
            bg: "bg-black border-green-500/30",
            header: "bg-black border-green-500/20",
            me: "bg-green-900/20 border-green-500/40 text-green-50 font-mono",
            other: "bg-zinc-900 border-zinc-800 text-green-200/70 font-mono",
            admin: "bg-green-950/50 border-green-400/50 text-white font-mono",
            accent: "green",
        },
        neon: {
            bg: "bg-[#1a0b2e] border-fuchsia-500/30",
            header: "bg-[#2d1b4e] border-fuchsia-500/20",
            me: "bg-fuchsia-600/20 border-fuchsia-500/50 text-fuchsia-50",
            other: "bg-white/5 border-white/5 text-gray-200",
            admin: "bg-cyan-500/10 border-cyan-500/20 text-cyan-50",
            accent: "fuchsia",
        },
    };

    const currentStyle = themes[activeTheme] || themes.cyber;

    // 1. Auth Check (Load User)
    useEffect(() => {
        const token = localStorage.getItem("tipsmega_token");
        if (token) {
            // Fetch user profile to get username
            fetch(`${API_BASE}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(r => r.json())
                .then(d => {
                    if (d.ok) {
                        setUser({ username: d.username, token });
                    } else {
                        setUser({ username: "Guest", token: "" });
                    }
                })
                .catch(() => setUser({ username: "Guest", token: "" }));
        } else {
            setUser({ username: "Guest", token: "" });
        }
    }, []);

    // 2. Socket Connection
    useEffect(() => {
        const s = io(API_BASE);
        setSocket(s);

        s.on("connect", () => {
            // console.log("Socket connected");
            s.emit("join_global");
        });

        s.on("history", (msgs: Message[]) => {
            setMessages(msgs);
            scrollToBottom();
        });

        s.on("new_message", (msg: Message) => {
            setMessages(prev => [...prev, msg].slice(-100)); // Keep last 100
            scrollToBottom();
        });

        return () => {
            s.disconnect();
        };
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const sendMessage = () => {
        if (!input.trim() || !socket) return;

        socket.emit("send_message", {
            sender: user?.username || "Guest",
            content: input,
        });
        setInput("");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate size (e.g. 50MB limit)
        if (file.size > 50 * 1024 * 1024) {
            alert("File too large (Max 50MB)");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(`${API_BASE}/api/chat/upload`, {
                method: "POST",
                body: formData,
            });
            const json = await res.json();

            if (json.ok && socket) {
                // Send message with media
                socket.emit("send_message", {
                    sender: user?.username || "Guest",
                    content: "",
                    mediaUrl: json.url,
                    mediaType: json.type
                });
            } else {
                alert("Upload Failed: " + (json.error || "Unknown"));
            }
        } catch (err) {
            alert("Upload Error");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isChatOpen && (
                <div className={`fixed inset-0 z-50 flex flex-col sm:inset-auto sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-[600px] sm:rounded-2xl sm:border sm:shadow-2xl overflow-hidden font-sans ${currentStyle.bg}`}>

                    {/* Header */}
                    <div className={`flex items-center justify-between p-3 ${currentStyle.header}`}>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-${currentStyle.accent}-500 animate-pulse`} />
                            <h3 className="font-black text-white text-sm tracking-wider uppercase">Global Chat</h3>
                        </div>

                        {/* Theme Selector (Mini) */}
                        <div className="flex items-center gap-1 mr-4">
                            {["cyber", "gold", "matrix", "neon"].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={`w-3 h-3 rounded-full border border-white/30 ${activeTheme === t ? "scale-125 ring-1 ring-white" : "opacity-50"} 
                                        ${t === 'cyber' ? 'bg-blue-600' : t === 'gold' ? 'bg-amber-500' : t === 'matrix' ? 'bg-green-500' : 'bg-fuchsia-500'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => toggleChat(false)}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin scrollbar-thumb-white/10">
                        {messages.map((m, i) => {
                            const isMe = m.sender === user?.username;
                            const isAdmin = m.senderLevel === "ADMIN";

                            return (
                                <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className={`text-[10px] font-bold ${isAdmin ? "text-yellow-400" : "text-white/40"}`}>
                                            {isAdmin && "⭐ "}{m.sender}
                                        </span>
                                    </div>

                                    <div className={`max-w-[85%] rounded-2xl p-3 ${isMe
                                        ? currentStyle.me
                                        : isAdmin
                                            ? currentStyle.admin
                                            : currentStyle.other
                                        }`}>
                                        {/* Media */}
                                        {m.mediaUrl && (
                                            <div className="mb-2 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                                                {m.mediaType === "video" ? (
                                                    <video src={`${API_BASE}${m.mediaUrl}`} controls className="w-full max-h-48 object-cover" />
                                                ) : (
                                                    <img src={`${API_BASE}${m.mediaUrl}`} alt="media" className="w-full max-h-48 object-cover" />
                                                )}
                                            </div>
                                        )}

                                        {/* Text */}
                                        {m.content && <p className="text-xs break-words leading-relaxed">{m.content}</p>}

                                        {/* Timestamp */}
                                        <div className="text-[9px] text-white/20 text-right mt-1">
                                            {new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className={`p-3 border-t border-white/5 ${currentStyle.bg}`}>
                        <div className="flex items-center gap-2">
                            {/* File Upload */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 transition-colors ${isUploading ? "animate-spin" : ""}`}
                                disabled={isUploading}
                            >
                                {isUploading ? "⏳" : "📎"}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                            />

                            <input
                                className="flex-1 bg-black/40 border border-white/10 rounded-full h-10 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                                placeholder={user?.username === "Guest" ? "Login to chat..." : "Type message..."}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && sendMessage()}
                                disabled={!user || user.username === "Guest"}
                            />

                            <button
                                onClick={sendMessage}
                                disabled={!user || user.username === "Guest" || !input.trim()}
                                className={`p-2 rounded-full text-white shadow-lg disabled:opacity-50 disabled:shadow-none bg-${currentStyle.accent}-600 shadow-${currentStyle.accent}-600/20`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>

                        {user?.username === "Guest" && (
                            <div className="text-center mt-2">
                                <span className="text-[9px] text-yellow-400/70">⚠ Login required to chat</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
