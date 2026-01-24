"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import dynamic from "next/dynamic";
import { useSwipeable } from "react-swipeable";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalSettings } from "../context/GlobalSettingsContext";
import MediaPreviewModal from "./MediaPreviewModal";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

// --- Avatar Helpers ---
const AVATAR_COLORS = [
    "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
    "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
    "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500"
];

function getAvatarColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

function getAvatarInitials(name: string) {
    return name.substring(0, 2).toUpperCase();
}

// --- Linkify Component ---
// --- Linkify Component ---
const Linkify = ({ text }: { text: string }) => {
    // Improved Regex:
    // 1. Protocol (http/s) OR
    // 2. www. OR
    // 3. Domain-like (something.com, net, org, etc) - simplified to word.word
    // Note: This regex is greedy for [^\s]*, so it includes trailing dots. We handle that in href cleanup.
    const splitRegex = /((?:https?:\/\/|www\.|[\w-]+\.[\w]{2,})[^\s]*)/g;
    const parts = text.split(splitRegex);

    return (
        <>
            {parts.map((part, i) => {
                // Check if part looks like a url
                if (part.match(/^(?:https?:\/\/|www\.|[\w-]+\.[\w]{2,})/)) {
                    let href = part;
                    // Remove trailing punctuation (.,!?) from href usually found in chat
                    href = href.replace(/[.,!?]+$/, "");

                    // Ensure protocol
                    if (!href.startsWith("http")) {
                        href = "https://" + href;
                    }
                    return (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300 break-all relative z-50 cursor-pointer"
                            style={{ pointerEvents: 'auto' }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                        >
                            {part}
                        </a>
                    );
                }
                return part;
            })}
        </>
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

// --- Sub-Component for Swipable Message ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const MessageItem = ({ m, isMe, isAdmin, currentStyle, user, onReply, onDelete, groupPosition }: any) => {
    const handlers = useSwipeable({
        onSwipedRight: () => onReply(m),
        trackMouse: true,
        preventScrollOnSwipe: true,
        delta: 50,
    });

    const [showMenu, setShowMenu] = useState(false);

    const onContextMenu = (e: React.MouseEvent) => {
        if (isMe) {
            e.preventDefault();
            setShowMenu(true);
        }
    };

    // Grouping Logic for Border Radius
    // single: rounded all
    // start: rounded top, flat bottom-side
    // middle: flat side
    // end: flat top-side, rounded bottom (with tail)

    let borderRadiusClass = "rounded-2xl"; // default single
    if (isMe) {
        if (groupPosition === "start") borderRadiusClass = "rounded-2xl rounded-br-none";
        else if (groupPosition === "middle") borderRadiusClass = "rounded-2xl rounded-r-none";
        else if (groupPosition === "end") borderRadiusClass = "rounded-2xl rounded-tr-none";
    } else {
        if (groupPosition === "start") borderRadiusClass = "rounded-2xl rounded-bl-none";
        else if (groupPosition === "middle") borderRadiusClass = "rounded-2xl rounded-l-none";
        else if (groupPosition === "end") borderRadiusClass = "rounded-2xl rounded-tl-none";
    }

    const showAvatar = !isMe && (groupPosition === "end" || groupPosition === "single");
    const showName = !isMe && (groupPosition === "start" || groupPosition === "single");

    return (
        <div
            {...handlers}
            onContextMenu={onContextMenu}
            className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 animate-in slide-in-from-bottom-1 duration-200 relative group w-full ${groupPosition === "middle" ? "mb-0.5" : "mb-2"}`}
        >
            {/* Context Menu Overlay */}
            {showMenu && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                    <div className="absolute top-0 right-0 z-50 bg-[#233138] border border-white/5 shadow-2xl rounded-lg overflow-hidden py-1 min-w-[120px] animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={() => { onReply(m); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-white hover:bg-white/5 text-xs font-medium">Reply</button>
                        {isMe && m.status !== "DELETED" && (
                            <button onClick={() => { onDelete(m); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/5 text-xs font-medium">Delete</button>
                        )}
                    </div>
                </>
            )}

            {/* Avatar Column (Left side only) */}
            {!isMe && (
                <div className="w-8 shrink-0 flex flex-col justify-end">
                    {showAvatar ? (
                        <div className={`w-8 h-8 rounded-full ${getAvatarColor(m.sender)} flex items-center justify-center text-[10px] font-black text-white border border-white/10 shadow-sm`}>
                            {getAvatarInitials(m.sender)}
                        </div>
                    ) : <div className="w-8" />}
                </div>
            )}

            <div className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>

                {showName && (
                    <span className={`text-[10px] font-bold tracking-wide mb-1 px-1 ${isAdmin ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" : "text-white/40"}`}>
                        {isAdmin && "👑 "}{m.sender}
                    </span>
                )}

                <div className={`relative border ${currentStyle.bubble} ${isMe ? currentStyle.me : isAdmin ? currentStyle.admin : currentStyle.other} ${borderRadiusClass} transition-all active:scale-[0.98] overflow-hidden`}>

                    {/* Tail Pseudo-element simulation */}
                    {(groupPosition === "end" || groupPosition === "single") && (
                        <div className={`absolute bottom-0 w-3 h-3 ${isMe ? "-right-1.5 bg-[#c5a028]" : "-left-1.5 bg-[#1e293b]"} clip-tail hidden`} />
                        // Note: Real tail needs complex CSS masking, stick to rounding logic for now for cleaner look
                    )}

                    {m.status === "DELETED" ? (
                        <div className="flex items-center gap-2 p-2 italic text-white/50 text-xs">
                            <span>🚫</span> Deleted
                        </div>
                    ) : (
                        <>
                            {m.mediaUrl && (
                                <div className="-mx-4 -mt-2 mb-2 border-b border-black/5">
                                    {m.mediaType === "video" ? (
                                        <video src={`${API_BASE}${m.mediaUrl}`} controls className="w-full h-auto object-cover max-h-[350px]" />
                                    ) : m.mediaType === "audio" ? (
                                        <div className="p-3 flex items-center gap-3 w-[200px]">
                                            <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-xl">🎤</div>
                                            <audio src={`${API_BASE}${m.mediaUrl}`} controls className="h-8 w-full" />
                                        </div>
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={`${API_BASE}${m.mediaUrl}`} alt="media" className="w-full h-auto object-cover max-h-[350px]" />
                                    )}
                                </div>
                            )}
                            {m.content && (
                                <div className="text-sm break-words leading-relaxed px-1">
                                    <Linkify text={m.content} />
                                </div>
                            )}
                        </>
                    )}

                    <div className={`text-[9px] text-right font-mono mt-1 opacity-60 flex justify-end items-center gap-1 leading-none ${m.mediaUrl && !m.content ? "absolute bottom-2 right-2 bg-black/40 text-white rounded px-1 py-0.5 backdrop-blur-sm" : ""}`}>
                        {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                        {isMe && <span>✓✓</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ChatRoom({ roomId = "global", onBack }: { roomId?: string; onBack?: () => void }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { activeTheme, setTheme } = useGlobalSettings();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<{ username: string; token: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [replyTo, setReplyTo] = useState<Message | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Updated NATIVE APP Theme (Lighter)
    type Theme = { bg: string; header: string; me: string; other: string; admin: string; accent: string; bubble: string };

    const currentStyle: Theme = {
        bg: "bg-[#111827]", // Gray-900 (Lighter than black)
        header: "bg-[#1f2937]/90 backdrop-blur-md border-b border-white/5 shadow-sm sticky top-0 z-30",
        me: "bg-emerald-600 text-white shadow-md font-medium border-emerald-500", // WhatsApp-like Green
        other: "bg-[#1f2937] border border-white/5 text-gray-200 shadow-md", // Standard dark bubble
        admin: "bg-amber-500/10 border border-amber-500/20 text-amber-200",
        accent: "emerald",
        bubble: "px-3 py-2 shadow-sm border-0",
    };

    // 1. Auth Check (Load User)
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
    }, []); // Re-check on mount

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
            s.emit("join_room", { roomId, username: user?.username || "Guest" });
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        s.on("message_deleted", ({ messageId }: { messageId: string }) => {
            setMessages(prev => prev.map(m =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                m.id === messageId || (m as any)._id === messageId
                    ? { ...m, status: "DELETED", content: "", mediaUrl: "" }
                    : m
            ));
        });

        return () => {
            s.disconnect();
        };
    }, [user, roomId]);

    const scrollToBottom = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const sendMessage = () => {
        if (!input.trim() || !socket) return;
        socket.emit("send_message", {
            roomId,
            sender: user?.username || "Guest",
            content: input,
        });
        setInput("");
    };

    const deleteMessage = (m: Message) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!socket || !m.id && !(m as any)._id) return;
        if (confirm("Delete this message for everyone?")) {
            socket.emit("delete_message", {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    roomId,
                    sender: user?.username || "Guest",
                    content: "", // Voice message
                    mediaUrl: json.url,
                    mediaType: "audio",
                });
            } else {
                alert("Voice upload failed");
            }
        } catch (_e) { // eslint-disable-line @typescript-eslint/no-unused-vars
            alert("Voice error");
        } finally {
            setIsUploading(false);
        }
    };
    // -------------------

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 50 * 1024 * 1024) {
            alert("File too large (Max 50MB)");
            return;
        }
        setSelectedFile(file);
        setShowPreview(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMedia = async (file: File, caption: string) => {
        setIsUploading(true);
        setShowPreview(false);

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
                    roomId,
                    sender: user?.username || "Guest",
                    content: caption,
                    mediaUrl: json.url,
                    mediaType: json.type
                });
            } else {
                alert("Upload Failed: " + (json.error || "Unknown error"));
            }
        } catch (err: any) {
            console.error("Upload error:", err);
            alert("Upload Network Error");
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
        }
    };

    return (
        <div className={`flex flex-col w-full h-full font-sans border-opacity-50 relative ${currentStyle.bg}`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b shadow-lg ${currentStyle.header}`}>
                <div className="flex items-center gap-3">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mr-1 md:hidden p-2 -ml-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                    )}
                    <div className="relative">
                        {/* Status Indicator: Green=Connected, Red=Disconnected/Pulse */}
                        <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"}`} />
                        {isConnected && <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-50" />}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-white text-sm tracking-wide uppercase bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                            VVIP LOUNGE
                        </h3>
                        <div className="text-[10px] text-amber-500/60 font-mono tracking-widest">PREMIUM NETWORK</div>
                    </div>
                </div>

                {/* Removed Theme Switcher */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/20 font-mono">ENCRYPTED</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/img/noise.png')] bg-opacity-5 relative pb-28" onClick={() => setShowEmoji(false)}>
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-blue-900/5 pointer-events-none" />

                {messages.map((m, i) => {
                    const isMe = m.sender === user?.username;
                    const isAdmin = m.senderLevel === "ADMIN";

                    const prevM = messages[i - 1];
                    const nextM = messages[i + 1];

                    const currDate = new Date(m.createdAt || Date.now()).toDateString();
                    const prevDate = prevM ? new Date(prevM.createdAt || Date.now()).toDateString() : null;
                    const showDate = currDate !== prevDate;

                    // Grouping Logic
                    const isSameSenderPrev = prevM && prevM.sender === m.sender && !showDate;
                    const isSameSenderNext = nextM && nextM.sender === m.sender && (new Date(nextM.createdAt || Date.now()).toDateString() === currDate);

                    let pos = "single";
                    if (!isSameSenderPrev && isSameSenderNext) pos = "start";
                    else if (isSameSenderPrev && isSameSenderNext) pos = "middle";
                    else if (isSameSenderPrev && !isSameSenderNext) pos = "end";

                    let dateLabel = currDate;
                    if (new Date().toDateString() === currDate) dateLabel = "Today";

                    return (
                        <div key={i}>
                            {showDate && (
                                <div className="flex justify-center my-6 sticky top-2 z-20">
                                    <span className="text-[10px] font-bold bg-[#1f2937]/90 text-white/90 px-3 py-1 rounded-full border border-white/10 shadow-lg backdrop-blur-md">
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
                                groupPosition={pos}
                            />
                        </div>
                    );
                })}
                <div ref={bottomRef} className="pb-10" />
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
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            theme={"dark" as any}
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
            <div className={`p-3 border-t border-white/5 backdrop-blur-md ${currentStyle.bg} shrink-0`}>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowEmoji(!showEmoji)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-yellow-400 transition-colors"
                    >
                        😊
                    </button>

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
                        onChange={handleFileSelect}
                    />

                    <button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onTouchStart={startRecording}
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

                    <input
                        className="flex-1 bg-black/40 border border-white/10 rounded-full h-10 px-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                        placeholder={user?.username === "Guest" ? "Login to chat..." : isRecording ? "Recording..." : "Type message..."}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                        disabled={!user || user.username === "Guest" || isRecording}
                    />

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

            <MediaPreviewModal
                isOpen={showPreview}
                file={selectedFile}
                onClose={() => setShowPreview(false)}
                onSend={handleSendMedia}
            />
        </div>
    );
}
