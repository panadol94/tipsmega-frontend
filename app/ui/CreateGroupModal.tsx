"use client";

import { useState } from "react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

export default function CreateGroupModal({
    isOpen,
    onClose,
    socket,
    friends = [] // List of friends to select from
}: {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: any;
    friends?: string[];
}) {
    const { user } = useGlobalSettings();

    // Prefer friends prop if passed, otherwise fallback to user context friends
    const effectiveFriends = friends.length > 0 ? friends : (user?.friends || []);
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    if (!isOpen) return null;

    const toggleMember = (friend: string) => {
        if (selectedMembers.includes(friend)) {
            setSelectedMembers(prev => prev.filter(m => m !== friend));
        } else {
            setSelectedMembers(prev => [...prev, friend]);
        }
    };

    const handleCreate = () => {
        if (!groupName.trim() || !socket) return;

        // Allow creating groups with or without members
        const members = selectedMembers.length > 0
            ? [...selectedMembers, user?.username]
            : [user?.username];

        socket.emit("create_group", {
            name: groupName,
            members,
            admins: [user?.username]
        });
        onClose();
        setGroupName("");
        setSelectedMembers([]);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#1f2c34] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">
                <h2 className="text-white font-bold text-lg mb-4">Create New Group</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-white/50 uppercase tracking-wider font-bold mb-1 block">Group Name</label>
                        <input
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="My Awesome Group"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-white/50 uppercase tracking-wider font-bold mb-2 block">Select Members (Optional)</label>
                        <div className="max-h-[150px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                            {effectiveFriends.length === 0 ? (
                                <p className="text-white/30 text-sm italic text-center py-4">No friends yet. You can create a group anyway!</p>
                            ) : (
                                effectiveFriends.map(friend => (
                                    <div
                                        key={friend}
                                        onClick={() => toggleMember(friend)}
                                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${selectedMembers.includes(friend)
                                            ? "bg-red-500/20 border-red-500/50"
                                            : "bg-black/20 border-white/5 hover:bg-white/5"
                                            }`}
                                    >
                                        <span className="text-sm font-bold text-white">{friend}</span>
                                        {selectedMembers.includes(friend) && <span className="text-red-400">✓</span>}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!groupName.trim()}
                            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/20 hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
