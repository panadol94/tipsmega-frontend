"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalSettings } from "../context/GlobalSettingsContext";
import io, { Socket } from "socket.io-client";
import AddFriendModal from "./AddFriendModal";
import CreateGroupModal from "./CreateGroupModal";

type ChatItem = {
    id: string;
    name: string;
    type: "global" | "group" | "dm";
    lastMessage?: {
        content: string;
        sender: string;
        createdAt: string;
    };
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

export default function ChatList({
    onSelect,
    selectedIds
}: {
    onSelect: (id: string) => void,
    selectedIds?: string
}) {
    const { user } = useGlobalSettings();
    const [chats, setChats] = useState<ChatItem[]>([
        { id: "global", name: "Sembang Santai (Global)", type: "global" }
    ]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [friends, setFriends] = useState<string[]>([]);

    // Connect to Socket for List Updates
    useEffect(() => {
        if (!user) return;

        const s = io(API_BASE, { transports: ["websocket"] });
        setSocket(s);

        s.on("connect", () => {
            s.emit("join_self", user.username); // Join own room for notifications
        });

        // Listen for new groups
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        s.on("group_added", (group: any) => {
            setChats(prev => [...prev, {
                id: group._id,
                name: group.name,
                type: group.type.toLowerCase(),
                lastMessage: group.lastMessage
            }]);
        });

        // Listen for friend request accepted (to update friend list locally if needed)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        s.on("friend_request_accepted", (data: any) => {
            setFriends(prev => [...prev, data.friend]);
            alert(`You are now friends with ${data.friend}!`);
        });

        return () => { s.disconnect(); };
    }, [user]);

    // Load initial data (Mock for now, should fetch from API in real app)
    useEffect(() => {
        if (user && user.friends) {
            // In a real app we'd fetch the full friend objects
            // For now assuming we might get them from context or API
        }
    }, [user]);

    return (
        <div className="flex flex-col h-full bg-black/40 border-r border-white/10 w-full md:w-[320px] shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-white font-bold text-lg">Chats</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAddFriend(true)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                        title="Add Friend"
                    >
                        +👤
                    </button>
                    <button
                        onClick={() => setShowCreateGroup(true)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                        title="New Group"
                    >
                        +👥
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat, index) => (
                    <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.05,
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(chat.id)}
                        className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${selectedIds === chat.id
                                ? "bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border-l-4 border-l-emerald-500 shadow-lg shadow-emerald-500/10"
                                : "hover:border-l-2 hover:border-l-white/20"
                            }`}
                        style={{
                            backdropFilter: selectedIds === chat.id ? "blur(10px)" : "blur(5px)"
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <h3 className={`font-semibold text-sm ${selectedIds === chat.id ? "text-emerald-400" : "text-white"
                                }`}>
                                {chat.name}
                            </h3>
                            {chat.lastMessage && chat.lastMessage.createdAt && (
                                <span className="text-[10px] text-white/40">
                                    {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-white/60 truncate mt-1">
                            {chat.lastMessage
                                ? `${chat.lastMessage.sender}: ${chat.lastMessage.content}`
                                : "Tap to chat..."}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Modals */}
            <AddFriendModal
                isOpen={showAddFriend}
                onClose={() => setShowAddFriend(false)}
                socket={socket}
            />
            <CreateGroupModal
                isOpen={showCreateGroup}
                onClose={() => setShowCreateGroup(false)}
                socket={socket}
                friends={user?.friends || friends}
            />
        </div>
    );
}
