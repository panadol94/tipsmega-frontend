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
    mediaType?: "image" | "video" | "audio";
    createdAt?: string;
};

export default function ChatRoom() {
    const { isChatOpen, toggleChat, activeTheme, setTheme } = useGlobalSettings();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<{ username: string; token: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Voice Chat State
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

    const bottomRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    type Theme = { bg: string; header: string; me: string; other: string; admin: string; accent: string; bubble: string };

    const themes: Record<string, Theme> = {
        cyber: {
            bg: "bg-[#0c1223] border-white/10 shadow-blue-500/20",
            header: "bg-gradient-to-r from-[#111827] to-[#0c1223] border-white/5",
            me: "bg-blue-600/20 border-blue-500/30 text-blue-50 shadow-[0_0_15px_rgba(37,99,235,0.2)]",
            other: "bg-white/5 border-white/5 text-gray-200",
            admin: "bg-yellow-500/10 border-yellow-500/20 text-yellow-50 shadow-[0_0_15px_rgba(234,179,8,0.1)]",
            accent: "blue",
            bubble: "rounded-2xl backdrop-blur-sm",
        },
        gold: {
            bg: "bg-black border-amber-500/30 shadow-amber-500/20",
            header: "bg-gradient-to-r from-black via-amber-900/30 to-black border-amber-500/30",
            me: "bg-amber-500/20 border-amber-500/50 text-amber-50 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
            other: "bg-zinc-900 border-zinc-800 text-gray-300",
            admin: "bg-red-900/40 border-red-500/40 text-red-50 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
            accent: "amber",
            bubble: "rounded-xl",
        },
        matrix: {
            bg: "bg-black border-green-500/30 shadow-green-500/20",
            header: "bg-black border-green-500/20",
            me: "bg-green-900/30 border-green-500/50 text-green-50 font-mono shadow-[0_0_10px_rgba(34,197,94,0.3)]",
            other: "bg-zinc-900 border-zinc-800 text-green-200/70 font-mono",
            admin: "bg-green-950/80 border-green-400/50 text-white font-mono shadow-[0_0_20px_rgba(74,222,128,0.2)]",
            accent: "green",
            bubble: "rounded-none border-l-2",
        },
        neon: {
            bg: "bg-[#1a0b2e] border-fuchsia-500/40 shadow-fuchsia-500/30",
            header: "bg-gradient-to-r from-[#2d1b4e] to-[#1a0b2e] border-fuchsia-500/30",
            me: "bg-fuchsia-600/20 border-fuchsia-500/60 text-fuchsia-50 shadow-[0_0_15px_rgba(217,70,239,0.3)]",
            other: "bg-white/5 border-white/5 text-gray-200",
            admin: "bg-cyan-500/20 border-cyan-500/40 text-cyan-50 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
            accent: "fuchsia",
            bubble: "rounded-3xl rounded-br-none",
        },
        whatsapp: {
            bg: "bg-[#0b141a] border-[#005c4b]/30",
            header: "bg-[#1f2c34] border-white/5",
            me: "bg-[#005c4b] text-[#e9edef] shadow-sm",
            other: "bg-[#1f2c34] text-[#e9edef] shadow-sm",
            admin: "bg-[#1f2c34] text-yellow-400 border border-yellow-500/20",
            accent: "emerald",
            bubble: "rounded-lg shadow-sm",
        },
        telegram: {
            bg: "bg-[#0e1621] border-[#17212b]",
            header: "bg-[#17212b] border-white/5",
            me: "bg-[#2b5278] text-white shadow-sm",
            other: "bg-[#182533] text-white shadow-sm",
            admin: "bg-[#182533] text-blue-300 border border-blue-500/30",
            accent: "sky",
            bubble: "rounded-2xl rounded-tr-none rounded-bl-none",
        }
    };

    const currentStyle = themes[activeTheme] || themes.cyber;

    // 1. Auth Check (Load User) - Fixed Dependency Array
    useEffect(() => {
        const token = localStorage.getItem("tipsmega_token");
        if (token) {
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
    }, [isChatOpen]); // Re-check whenever chat opens

    // 2. Socket Connection
    useEffect(() => {
        const s = io(API_BASE);
        setSocket(s);

        s.on("connect", () => {
            s.emit("join_global");
        });

        s.on("history", (msgs: Message[]) => {
            setMessages(msgs);
            scrollToBottom();
        });

        s.on("new_message", (msg: Message) => {
            setMessages(prev => [...prev, msg].slice(-100));
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

    // --- VOICE LOGIC ---
    const startRecording = async () => {
        if (!navigator.mediaDevices) {
            alert("Mic not supported/allowed");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioChunks([]);
                uploadAudio(blob);
                stream.getTracks().forEach(t => t.stop()); // release mic
            };

            recorder.start();
            setIsRecording(true);
        } catch (e) {
            console.error("Mic error", e);
            alert("Cannot access microphone");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            setMediaRecorder(null);
        }
    };

    const uploadAudio = async (blob: Blob) => {
        setIsUploading(true);
        const formData = new FormData();
        // Create a dummy filename for audio
        const file = new File([blob], "voice.webm", { type: "audio/webm" });
        formData.append("file", file);

        try {
            const res = await fetch(`${API_BASE}/api/chat/upload`, {
                method: "POST",
                body: formData,
            });
            const json = await res.json();
            if (json.ok && socket) {
                socket.emit("send_message", {
                    sender: user?.username || "Guest",
                    content: "", // Voice message
                    mediaUrl: json.url,
                    mediaType: "audio",
                });
            } else {
                alert("Voice upload failed");
            }
        } catch (_e) {
            alert("Voice error");
        } finally {
            setIsUploading(false);
        }
    };
    // -------------------

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
                socket.emit("send_message", {
                    sender: user?.username || "Guest",
                    content: "",
                    mediaUrl: json.url,
                    mediaType: json.type
                });
            } else {
                alert("Upload Failed: " + (json.error || "Unknown"));
            }
        } catch (_err) {
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
                <div className={`fixed inset-0 z-50 flex flex-col sm:inset-auto sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-[600px] sm:rounded-2xl sm:border sm:shadow-2xl overflow-hidden font-sans border-opacity-50 ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300 ${currentStyle.bg}`}>

                    {/* Header */}
                    <div className={`flex items-center justify-between p-3 border-b shadow-lg ${currentStyle.header}`}>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className={`w-3 h-3 rounded-full bg-${currentStyle.accent}-500 animate-pulse`} />
                                <div className={`absolute inset-0 w-3 h-3 rounded-full bg-${currentStyle.accent}-500 animate-ping opacity-50`} />
                            </div>
                            <div>
                                <h3 className="font-black text-white text-xs tracking-widest uppercase bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                                    Sembang Santai
                                </h3>
                                <div className="text-[9px] text-white/50 tracking-wider">TIPS MEGA888</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mr-1">
                            {/* Theme Dots */}
                            <div className="flex gap-1.5 px-2 py-1 bg-black/40 rounded-full border border-white/5">
                                {["cyber", "gold", "matrix", "neon", "whatsapp", "telegram"].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTheme === t ? "scale-125 ring-2 ring-white shadow-[0_0_10px_white]" : "opacity-40 hover:opacity-100"} 
                                            ${t === 'cyber' ? 'bg-blue-600' :
                                                t === 'gold' ? 'bg-amber-500' :
                                                    t === 'matrix' ? 'bg-green-500' :
                                                        t === 'neon' ? 'bg-fuchsia-500' :
                                                            t === 'whatsapp' ? 'bg-emerald-600' :
                                                                'bg-sky-500'}`} // telegram
                                        title={t}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => toggleChat(false)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black/0 via-black/10 to-black/30 scrollbar-thin scrollbar-thumb-white/10">
                        {messages.map((m, i) => {
                            const isMe = m.sender === user?.username;
                            const isAdmin = m.senderLevel === "ADMIN";

                            return (
                                <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in slide-in-from-bottom-2 duration-300`}>
                                    <div className="flex items-baseline gap-2 mb-1 px-1">
                                        <span className={`text-[10px] font-bold tracking-wide ${isAdmin ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" : "text-white/40"}`}>
                                            {isAdmin && "👑 "}{m.sender}
                                        </span>
                                    </div>

                                    <div className={`max-w-[85%] p-3 border ${currentStyle.bubble} ${isMe
                                        ? currentStyle.me
                                        : isAdmin
                                            ? currentStyle.admin
                                            : currentStyle.other
                                        }`}>

                                        {/* Media Content */}
                                        {m.mediaUrl && (
                                            <div className="mb-2 rounded-lg overflow-hidden border border-white/10 bg-black/40 shadow-inner">
                                                {m.mediaType === "video" ? (
                                                    <video src={`${API_BASE}${m.mediaUrl}`} controls className="w-full max-h-48 object-cover" />
                                                ) : m.mediaType === "audio" ? (
                                                    <div className="p-2 flex items-center gap-2 min-w-[200px]">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">🎤</div>
                                                        <audio src={`${API_BASE}${m.mediaUrl}`} controls className="h-8 w-full max-w-[180px]" />
                                                    </div>
                                                ) : (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={`${API_BASE}${m.mediaUrl}`} alt="media" className="w-full max-h-48 object-cover hover:scale-105 transition-transform" />
                                                )}
                                            </div>
                                        )}

                                        {/* Text Content */}
                                        {m.content && <p className="text-xs break-words leading-relaxed font-medium">{m.content}</p>}

                                        {/* Time */}
                                        <div className="text-[9px] text-white/30 text-right mt-1 font-mono">
                                            {new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <div className={`p-3 border-t border-white/5 backdrop-blur-md ${currentStyle.bg}`}>
                        <div className="flex items-center gap-2">
                            {/* File Upload */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-blue-400 transition-colors ${isUploading ? "animate-spin" : ""}`}
                                disabled={isUploading}
                                title="Send Image/Video"
                            >
                                {isUploading ? "⏳" : "📷"}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                            />

                            {/* Voice Record */}
                            <button
                                onMouseDown={startRecording}
                                onMouseUp={stopRecording}
                                onTouchStart={startRecording} // Mobile support
                                onTouchEnd={stopRecording}
                                className={`p-2 rounded-full transition-all duration-200 ${isRecording
                                    ? "bg-red-500 text-white animate-pulse scale-110 shadow-[0_0_15px_red]"
                                    : "bg-white/5 text-white/50 hover:text-red-400 hover:bg-white/10"
                                    }`}
                                title="Hold to Record"
                                disabled={!user || user.username === "Guest"}
                            >
                                🎤
                            </button>

                            {/* Text Input */}
                            <input
                                className="flex-1 bg-black/40 border border-white/10 rounded-full h-10 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                                placeholder={user?.username === "Guest" ? "Login to chat..." : isRecording ? "Recording..." : "Type message..."}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && sendMessage()}
                                disabled={!user || user.username === "Guest" || isRecording}
                            />

                            {/* Send Button */}
                            <button
                                onClick={sendMessage}
                                disabled={!user || user.username === "Guest" || !input.trim()}
                                className={`p-2 rounded-full text-white shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:shadow-none bg-${currentStyle.accent}-600 shadow-${currentStyle.accent}-600/20 hover:shadow-${currentStyle.accent}-600/40`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>

                        {user?.username === "Guest" && (
                            <div className="text-center mt-2 animate-pulse">
                                <span className="text-[10px] text-yellow-400/90 font-semibold bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                                    🔒 Login required to join the conversation
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
