"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import dynamic from "next/dynamic";
import { useSwipeable } from "react-swipeable";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

// --- Sub-Component for Swipable Message ---
const MessageItem = ({ m, isMe, isAdmin, currentStyle, user, onReply, onDelete }: any) => {
    // Swipe to Reply Logic
    const handlers = useSwipeable({
        onSwipedRight: () => onReply(m),
        trackMouse: true, // Enable mouse swipe for desktop testing
        preventScrollOnSwipe: true,
        delta: 50, // Min distance
    });

    const [showMenu, setShowMenu] = useState(false);

    const onContextMenu = (e: React.MouseEvent) => {
        if (isMe) {
            e.preventDefault();
            setShowMenu(true);
        }
    };

    return (
        <div
            {...handlers}
            onContextMenu={onContextMenu}
            className={`flex flex-col ${isMe ? "items-end" : "items-start"} animate-in slide-in-from-bottom-2 duration-300 relative group`}
        >
            {/* Context Menu */}
            {showMenu && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                    <div className="absolute top-8 right-0 z-50 bg-[#233138] border border-white/5 shadow-2xl rounded-lg overflow-hidden py-1 min-w-[120px] animate-in fade-in zoom-in-95 duration-100">
                        <button
                            onClick={() => { onReply(m); setShowMenu(false); }}
                            className="w-full text-left px-4 py-3 text-white hover:bg-white/5 text-xs font-medium"
                        >
                            Reply
                        </button>
                        {isMe && m.status !== "DELETED" && (
                            <button
                                onClick={() => { onDelete(m); setShowMenu(false); }}
                                className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/5 text-xs font-medium"
                            >
                                Delete Message
                            </button>
                        )}
                    </div>
                </>
            )}

            <div className="flex items-baseline gap-2 mb-1 px-1">
                <span className={`text-[10px] font-bold tracking-wide ${isAdmin ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" : "text-white/40"}`}>
                    {isAdmin && "👑 "}{m.sender}
                </span>
            </div>

            <div className={`relative max-w-[85%] border ${currentStyle.bubble} ${isMe ? currentStyle.me : isAdmin ? currentStyle.admin : currentStyle.other} transition-transform active:scale-[0.98]`}>

                {/* DELETED MESSAGE UI */}
                {m.status === "DELETED" ? (
                    <div className="flex items-center gap-2 p-2 italic text-white/50 text-xs">
                        <span>🚫</span> This message was deleted
                    </div>
                ) : (
                    <>
                        {/* Media Content */}
                        {m.mediaUrl && (
                            <div className="rounded-t-lg overflow-hidden border-b border-black/5 -mx-[1px] -mt-[1px]">
                                {m.mediaType === "video" ? (
                                    <video src={`${API_BASE}${m.mediaUrl}`} controls className="w-full h-auto object-cover max-h-[400px]" />
                                ) : m.mediaType === "audio" ? (
                                    <div className="p-3 flex items-center gap-3 min-w-[200px]">
                                        <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-xl">🎤</div>
                                        <audio src={`${API_BASE}${m.mediaUrl}`} controls className="h-8 w-full max-w-[180px]" />
                                    </div>
                                ) : (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={`${API_BASE}${m.mediaUrl}`} alt="media" className="w-full h-auto object-cover max-h-[400px]" />
                                )}
                            </div>
                        )}

                        {/* Text Content */}
                        {m.content && <p className={`text-sm break-words leading-relaxed px-2 pt-1 ${m.mediaUrl ? '' : 'pb-1'}`}>{m.content}</p>}
                    </>
                )}

                {/* Time & Ticks */}
                <div className={`text-[9px] text-right font-mono px-2 pb-1 opacity-60 flex justify-end items-center gap-1 leading-none ${m.mediaUrl && !m.content ? "absolute bottom-1 right-1 bg-black/30 text-white rounded px-1" : "mt-0.5"}`}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                    {isMe && <span>✓✓</span>}
                </div>
            </div>
        </div>
    );
};

type Message = {
    id?: string;
    sender: string;
    senderLevel: "MEMBER" | "ADMIN";
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "video" | "audio";
    createdAt?: string;
    status?: "ACTIVE" | "DELETED";
};

export default function ChatRoom() {
    const { isChatOpen, toggleChat, activeTheme, setTheme } = useGlobalSettings();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<{ username: string; token: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // WhatsApp Interactions
    const [showEmoji, setShowEmoji] = useState(false);
    const [replyTo, setReplyTo] = useState<Message | null>(null);

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
            bg: "bg-[#0b141a] border-[#0b141a]", // Dark background (almost black)
            header: "bg-[#1f2c34] border-white/5",
            me: "bg-[#005c4b] text-[#e9edef] shadow-sm rounded-tr-none min-w-[120px]", // Dark Green
            other: "bg-[#202c33] text-[#e9edef] shadow-sm rounded-tl-none min-w-[120px]", // Dark Grey
            admin: "bg-[#202c33] text-yellow-400 border border-yellow-500/20",
            accent: "emerald",
            bubble: "rounded-lg pb-1", // Reduced padding bottom
        },
        telegram: {
            bg: "bg-[#0e1621] border-[#17212b]",
            header: "bg-[#17212b] border-white/5",
            me: "bg-[#2b5278] text-white shadow-sm rounded-tr-none min-w-[120px]",
            other: "bg-[#182533] text-white shadow-sm rounded-tl-none min-w-[120px]",
            admin: "bg-[#182533] text-blue-300 border border-blue-500/30",
            accent: "sky",
            bubble: "rounded-2xl",
        },
        telegram_light: {
            bg: "bg-[#8eafd3] border-[#517da2]",
            header: "bg-[#517da2] border-[#517da2] shadow-md",
            me: "bg-[#eeffde] text-black shadow-sm rounded-tr-none min-w-[120px]",
            other: "bg-white text-black shadow-sm rounded-tl-none min-w-[120px]",
            admin: "bg-white text-blue-600 border border-blue-500/20",
            accent: "sky",
            bubble: "rounded-2xl",
        },
        whatsapp_light: {
            bg: "bg-[#efe7dd] border-[#d1d7db]", // Beige
            header: "bg-[#008069] border-[#008069] shadow-md",
            me: "bg-[#d9fdd3] text-[#111b21] shadow-sm rounded-tr-none min-w-[120px]", // Light Green
            other: "bg-white text-[#111b21] shadow-sm rounded-tl-none min-w-[120px]", // White
            admin: "bg-white text-orange-600 border border-orange-500/20",
            accent: "emerald",
            bubble: "rounded-lg pb-1",
        },
        sakura: {
            bg: "bg-[#fff0f5] border-pink-300/50",
            header: "bg-gradient-to-r from-pink-400 to-rose-400 border-pink-400 shadow-lg",
            me: "bg-[#ffe4e1] text-pink-900 shadow-sm border border-pink-100",
            other: "bg-white text-gray-800 shadow-sm",
            admin: "bg-white text-rose-600 border border-rose-200",
            accent: "pink",
            bubble: "rounded-2xl rounded-br-none",
        },
        sky: {
            bg: "bg-[#e0f2fe] border-sky-300/50",
            header: "bg-gradient-to-r from-sky-500 to-blue-500 border-sky-500 shadow-lg",
            me: "bg-[#dbeafe] text-blue-900 shadow-sm border border-blue-100",
            other: "bg-white text-gray-800 shadow-sm",
            admin: "bg-white text-blue-600 border border-blue-200",
            accent: "cyan",
            bubble: "rounded-2xl rounded-tr-none",
        }
    };

    const currentStyle = themes[activeTheme] || themes.cyber;

    // 1. Auth Check (Load User) - Fixed Dependency Array
    useEffect(() => {
        console.log("🔌 ChatRoom mounted. API_BASE:", API_BASE);
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

    const [isConnected, setIsConnected] = useState(false);

    // 2. Socket Connection
    useEffect(() => {
        // Force websocket transport to avoid polling issues & CORS preflight complexity
        const s = io(API_BASE, {
            transports: ["websocket"],
            reconnectionAttempts: 5,
        });
        setSocket(s);

        s.on("connect", () => {
            console.log("✅ Socket connected:", s.id);
            setIsConnected(true);
            s.emit("join_global");
        });

        s.on("connect_error", (err) => {
            console.error("❌ Socket connection error:", err);
            setIsConnected(false);
            // alert("Connection Error: " + err.message); // Too noisy if retrying
        });

        s.on("disconnect", (reason) => {
            console.warn("⚠️ Socket disconnected:", reason);
            setIsConnected(false);
        });

        s.on("error", (err: any) => {
            console.error("Socket error:", err);
            alert("Chat Error: " + err);
        });

        s.on("history", (msgs: Message[]) => {
            setMessages(msgs);
            scrollToBottom();
        });

        s.on("new_message", (msg: Message) => {
            setMessages(prev => [...prev, msg].slice(-100));
            scrollToBottom();
        });

        s.on("message_deleted", ({ messageId }: { messageId: string }) => {
            setMessages(prev => prev.map(m =>
                m.id === messageId || (m as any)._id === messageId
                    ? { ...m, status: "DELETED", content: "", mediaUrl: "" }
                    : m
            ));
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

    const deleteMessage = (m: Message) => {
        if (!socket || !m.id && !(m as any)._id) return;
        if (confirm("Delete this message for everyone?")) {
            socket.emit("delete_message", {
                messageId: m.id || (m as any)._id,
                sender: user?.username
            });
        }
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
                console.error("Upload failed server response:", json);
                alert("Upload Failed: " + (json.error || "Unknown error from server"));
            }
        } catch (err: any) {
            console.error("Upload fetch error:", err);
            alert("Upload Network Error: " + (err.message || String(err)));
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isChatOpen && (
                <div className={`fixed inset-x-0 top-0 bottom-24 z-50 flex flex-col sm:inset-auto sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-[600px] sm:rounded-2xl sm:border sm:shadow-2xl overflow-hidden font-sans border-opacity-50 ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300 ${currentStyle.bg}`}>

                    {/* Header */}
                    <div className={`flex items-center justify-between p-3 border-b shadow-lg ${currentStyle.header}`}>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {/* Status Indicator: Green=Connected, Red=Disconnected/Pulse */}
                                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"}`} />
                                {isConnected && <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-50" />}
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
                            <div className="flex gap-1.5 px-2 py-1 bg-black/40 rounded-full border border-white/5 overflow-x-auto max-w-[150px] scrollbar-hide">
                                {["cyber", "gold", "matrix", "neon", "whatsapp", "whatsapp_light", "telegram", "telegram_light", "sakura", "sky"].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`w-3 h-3 shrink-0 rounded-full transition-all duration-300 ${activeTheme === t ? "scale-125 ring-2 ring-white shadow-[0_0_10px_white]" : "opacity-40 hover:opacity-100"} 
                                            ${t === 'cyber' ? 'bg-blue-600' :
                                                t === 'gold' ? 'bg-amber-500' :
                                                    t === 'matrix' ? 'bg-green-500' :
                                                        t === 'neon' ? 'bg-fuchsia-500' :
                                                            t === 'whatsapp' ? 'bg-[#005c4b]' :
                                                                t === 'whatsapp_light' ? 'bg-[#25D366]' :
                                                                    t === 'telegram' ? 'bg-[#2b5278]' :
                                                                        t === 'telegram_light' ? 'bg-[#517da2]' :
                                                                            t === 'sakura' ? 'bg-pink-400' :
                                                                                'bg-sky-400'}`}
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black/0 via-black/10 to-black/30 scrollbar-thin scrollbar-thumb-white/10 relative" onClick={() => setShowEmoji(false)}>
                        {messages.map((m, i) => {
                            const isMe = m.sender === user?.username;
                            const isAdmin = m.senderLevel === "ADMIN";

                            // Date Divider Logic
                            const prevM = messages[i - 1];
                            const currDate = new Date(m.createdAt || Date.now()).toDateString();
                            const prevDate = prevM ? new Date(prevM.createdAt || Date.now()).toDateString() : null;
                            const showDate = currDate !== prevDate;

                            let dateLabel = currDate;
                            if (new Date().toDateString() === currDate) dateLabel = "Today";

                            return (
                                <div key={i}>
                                    {showDate && (
                                        <div className="flex justify-center my-4 opacity-60">
                                            <span className="text-[10px] font-bold bg-black/20 text-white/80 px-3 py-1 rounded-lg border border-white/5 backdrop-blur-sm shadow-sm">
                                                {dateLabel}
                                            </span>
                                        </div>
                                    )}
                                    <MessageItem
                                        m={m}
                                        isMe={isMe}
                                        isAdmin={isAdmin}
                                        currentStyle={currentStyle}
                                        user={user}
                                        onReply={setReplyTo}
                                        onDelete={deleteMessage}
                                    />
                                </div>
                            );
                        })}
                        <div ref={bottomRef} />
                    </div>

                    {/* Reply Preview Bar */}
                    <AnimatePresence>
                        {replyTo && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-[#1f2c34] border-l-4 border-emerald-500 flex justify-between items-center px-4 py-2 border-t border-white/5 relative z-10"
                            >
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[10px] font-bold text-emerald-400">Replying to {replyTo.sender}</span>
                                    <span className="text-xs text-white/60 truncate max-w-[250px]">{replyTo.content || "Media"}</span>
                                </div>
                                <button onClick={() => setReplyTo(null)} className="text-white/40 hover:text-white">✕</button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Emoji Picker */}
                    <AnimatePresence>
                        {showEmoji && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                className="absolute bottom-20 left-4 right-4 sm:right-auto sm:w-[320px] z-50 shadow-2xl rounded-2xl overflow-hidden border border-white/10"
                            >
                                <EmojiPicker
                                    theme={"dark" as EmojiTheme}
                                    onEmojiClick={(e) => setInput(prev => prev + e.emoji)}
                                    width="100%"
                                    height={350}
                                    searchDisabled
                                    skinTonesDisabled
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Area */}
                    <div className={`p-3 border-t border-white/5 backdrop-blur-md ${currentStyle.bg}`}>
                        <div className="flex items-center gap-2">
                            {/* Emoji Toggle */}
                            <button
                                onClick={() => setShowEmoji(!showEmoji)}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-yellow-400 transition-colors"
                            >
                                😊
                            </button>

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
