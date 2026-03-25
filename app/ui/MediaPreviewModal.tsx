"use client";

import { useState, useEffect } from "react";

export default function MediaPreviewModal({
    file,
    isOpen,
    onClose,
    onSend
}: {
    file: File | null;
    isOpen: boolean;
    onClose: () => void;
    onSend: (file: File, caption: string) => void;
}) {
    const [caption, setCaption] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
                setPreviewUrl(null);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    if (!isOpen || !file) return null;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#1f2c34] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <h2 className="text-white font-bold text-lg">Send Media</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                </div>

                {/* Preview Area */}
                <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40">
                    {previewUrl && (
                        isImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewUrl} alt="Preview" className="max-w-full max-h-[60vh] rounded-lg shadow-lg object-contain" />
                        ) : isVideo ? (
                            <video src={previewUrl} controls className="max-w-full max-h-[60vh] rounded-lg shadow-lg" />
                        ) : (
                            <div className="text-white/50 flex flex-col items-center">
                                <span className="text-4xl mb-2">📄</span>
                                <span>{file.name}</span>
                            </div>
                        )
                    )}
                </div>

                {/* Caption Input */}
                <div className="p-4 bg-[#1f2c34] border-t border-white/10">
                    <input
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors mb-3"
                        placeholder="Add a caption..."
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSend(file, caption);
                            }
                        }}
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose} // Cancel just closes modal, doesn't clear file potentially (parent handles)
                            className="px-6 py-2 rounded-full text-white/70 hover:bg-white/5 font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSend(file, caption)}
                            className="px-6 py-2 rounded-full bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/20 hover:bg-red-500 transition-all flex items-center gap-2"
                        >
                            Send ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
