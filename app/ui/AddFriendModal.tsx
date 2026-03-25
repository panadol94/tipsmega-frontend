"use client";

import { useState } from "react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

export default function AddFriendModal({
    isOpen,
    onClose,
    socket
}: {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any;
}) {
    const { user } = useGlobalSettings(); // Assuming user is available in context now or passed down
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");

    if (!isOpen) return null;

    const handleAdd = () => {
        if (!username.trim() || !socket) return;

        setStatus("Sending request...");
        // Use the event we defined in server.js
        socket.emit("send_friend_request", { from: user?.username, to: username });

        // Listen for immediate feedback (optional, or just close)
        setTimeout(() => {
            setStatus("Request sent (if user exists)");
            setTimeout(onClose, 1500);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#1f2c34] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-white font-bold text-lg mb-4">Add New Contact</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-white/50 uppercase tracking-wider font-bold mb-1 block">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="Enter username..."
                        />
                    </div>

                    {status && <p className="text-xs text-red-400 text-center">{status}</p>}

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAdd}
                            disabled={!username.trim()}
                            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/20 hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add Friend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
