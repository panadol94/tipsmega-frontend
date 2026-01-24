"use client";

import { useState } from "react";
import ChatRoom from "../ui/ChatRoom";
import ChatList from "../ui/ChatList";

export default function ChatPage() {
    // Mobile View Logic:
    // If selectedId is null -> Show List
    // If selectedId is present -> Show Room
    // Desktop: Always show both
    const [selectedId, setSelectedId] = useState<string | null>("global");

    return (
        <main className="w-full flex flex-row h-[calc(100vh-140px)] min-h-[500px]">
            {/* Sidebar (List) - Hidden on mobile if chat selected */}
            <div className={`${selectedId ? "hidden md:flex" : "flex"} w-full md:w-[320px] shrink-0 border-r border-white/10`}>
                <ChatList
                    selectedIds={selectedId || ""}
                    onSelect={(id) => setSelectedId(id)}
                />
            </div>

            {/* Chat Room Area - Hidden on mobile if no chat selected */}
            <div className={`${!selectedId ? "hidden md:flex" : "flex"} flex-1 relative`}>
                {selectedId ? (
                    <div className="w-full h-full flex flex-col">
                        <ChatRoom
                            roomId={selectedId}
                            onBack={() => setSelectedId(null)}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 hidden md:flex">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </main>
    );
}
