"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminFetch, validateInput } from "../../lib/adminApiUtils";
import { showToast } from "../../ui/AdminToast";

interface Game {
    _id: string;
    name: string;
    icon: string;
    category: string;
    rtpMin: number;
    rtpMax: number;
    isHot: boolean;
    isNew: boolean;
    enabled: boolean;
    order: number;
}

interface ImportGame {
    name: string;
    icon?: string;
    category?: string;
    rtpMin?: number;
    rtpMax?: number;
    isHot?: boolean;
    isNew?: boolean;
    enabled?: boolean;
}

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [deleteModal, setDeleteModal] = useState<string | null>(null);

    // Import states
    const [importModal, setImportModal] = useState(false);
    const [importData, setImportData] = useState<ImportGame[]>([]);
    const [importing, setImporting] = useState(false);

    // Auto-sync state
    const [syncing, setSyncing] = useState(false);

    // Rename states
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renamingValue, setRenamingValue] = useState("");

    // Bulk operation states
    const [selectedGames, setSelectedGames] = useState<string[]>([]);
    const [bulkAction, setBulkAction] = useState("");
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const res = await adminFetch("/api/admin/games");
            const data = await res.json();
            setGames(data.games || []);
        } catch (err) {
            console.error("Failed to fetch games:", err);
            showToast("Failed to load games", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleGame = async (id: string, enabled: boolean) => {
        const previousGames = [...games];
        setGames(games.map(g => g._id === id ? { ...g, enabled: !enabled } : g));

        try {
            await adminFetch(`/api/admin/games/${id}`, {
                method: "PUT",
                body: JSON.stringify({ enabled: !enabled })
            });
            showToast(`Game ${!enabled ? "enabled" : "disabled"}`, "success");
        } catch (err) {
            console.error("Failed to toggle game:", err);
            setGames(previousGames); // Rollback
            showToast("Failed to update game", "error");
        }
    };

    const deleteGame = async (id: string) => {
        const previousGames = [...games];
        setGames(games.filter(g => g._id !== id));

        try {
            await adminFetch(`/api/admin/games/${id}`, { method: "DELETE" });
            setDeleteModal(null);
            showToast("Game deleted", "success");
        } catch (err) {
            console.error("Failed to delete game:", err);
            setGames(previousGames);
            showToast("Failed to delete game", "error");
        }
    };

    // Import functionality - TXT file (one game name per line)
    const [importFileName, setImportFileName] = useState("");
    const [duplicateCount, setDuplicateCount] = useState(0);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImportFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                // Parse TXT: one game name per line
                const lines = text.split('\n')
                    .map(l => l.trim())
                    .filter(l => l.length > 0);

                // Check for duplicates against existing games
                const existingNames = new Set(games.map(g => g.name.toLowerCase()));
                const uniqueGames: ImportGame[] = [];
                let dupes = 0;

                lines.forEach(name => {
                    if (existingNames.has(name.toLowerCase())) {
                        dupes++;
                    } else {
                        uniqueGames.push({ name, category: "slots" });
                        existingNames.add(name.toLowerCase()); // prevent duplicates within file
                    }
                });

                setDuplicateCount(dupes);
                setImportData(uniqueGames);
            } catch (err) {
                console.error('Parse error:', err);
                alert('Failed to parse file. Make sure its TXT with one game per line.');
            }
        };
        reader.readAsText(file);
    };

    const handleImport = async () => {
        setImporting(true);
        try {
            await adminFetch('/api/admin/games/import', {
                method: 'POST',
                body: JSON.stringify({ games: importData })
            });

            await fetchGames();
            setImportModal(false);
            setImportData([]);
            showToast('Games imported successfully!', 'success');
        } catch (err) {
            console.error('Import error:', err);
            showToast('Import failed. Please check your data.', 'error');
        } finally {
            setImporting(false);
        }
    };

    // Auto-sync from mega888.txt
    const handleSyncFromTxt = async () => {
        if (!confirm('Sync all games from mega888.txt?\n\nThis will add new games while preserving existing game settings.')) {
            return;
        }

        setSyncing(true);
        try {
            const res = await adminFetch('/api/admin/games/sync-from-txt', {
                method: 'POST'
            });
            const data = await res.json();
            showToast(`Sync complete! ${data.added} new, ${data.existing} existing`, 'success');
            await fetchGames();
        } catch (err) {
            console.error('Sync error:', err);
            showToast('Sync failed', 'error');
        } finally {
            setSyncing(false);
        }
    };

    // Rename functionality
    const startRename = (game: Game) => {
        setRenamingId(game._id);
        setRenamingValue(game.name);
    };

    const handleRename = async (id: string) => {
        const trimmed = validateInput(renamingValue, 2, 100);
        if (!trimmed) {
            showToast("Name must be 2-100 characters", "error");
            return;
        }

        const previousGames = [...games];
        setGames(games.map(g => g._id === id ? { ...g, name: trimmed } : g));

        try {
            await adminFetch(`/api/admin/games/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: trimmed })
            });

            setRenamingId(null);
            setRenamingValue("");
            showToast("Game renamed", "success");
        } catch (err) {
            console.error('Rename failed:', err);
            setGames(previousGames);
            showToast("Rename failed", "error");
        }
    };

    // Bulk operations
    const toggleSelectAll = () => {
        if (selectedGames.length === filteredGames.length) {
            setSelectedGames([]);
        } else {
            setSelectedGames(filteredGames.map(g => g._id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedGames(prev =>
            prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
        );
    };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedGames.length === 0) return;

        try {
            if (bulkAction === 'delete') {
                setBulkDeleteModal(true);
                return;
            }

            const updates: Partial<Game> = {};
            if (bulkAction === 'enable') updates.enabled = true;
            if (bulkAction === 'disable') updates.enabled = false;

            await adminFetch('/api/admin/games/bulk', {
                method: 'PUT',
                body: JSON.stringify({ ids: selectedGames, updates })
            });

            await fetchGames();
            setSelectedGames([]);
            setBulkAction("");
            showToast(`${selectedGames.length} games updated`, 'success');
        } catch (err) {
            console.error('Bulk action failed:', err);
            showToast('Bulk action failed', 'error');
        }
    };

    const confirmBulkDelete = async () => {
        const previousGames = [...games];
        setGames(games.filter(g => !selectedGames.includes(g._id)));

        try {
            await adminFetch('/api/admin/games/bulk', {
                method: 'DELETE',
                body: JSON.stringify({ ids: selectedGames })
            });

            setSelectedGames([]);
            setBulkDeleteModal(false);
            setBulkAction("");
            showToast(`${selectedGames.length} games deleted`, 'success');
        } catch (err) {
            console.error('Bulk delete failed:', err);
            setGames(previousGames);
            showToast('Bulk delete failed', 'error');
        }
    };

    const filteredGames = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" ||
            (filter === "enabled" && game.enabled) ||
            (filter === "disabled" && !game.enabled) ||
            (filter === "hot" && game.isHot) ||
            (filter === "new" && game.isNew) ||
            (filter === game.category);
        return matchesSearch && matchesFilter;
    });

    const categories = [...new Set(games.map(g => g.category))];

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
                    <h1 className="text-2xl font-bold text-white">🎮 Game List Editor</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage games for scan results</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/games/new"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <span>➕</span> Add Game
                    </Link>
                    <button
                        onClick={handleSyncFromTxt}
                        disabled={syncing}
                        className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <span>{syncing ? '⏳' : '🔄'}</span> {syncing ? 'Syncing...' : 'Auto-Sync TXT'}
                    </button>
                    <button
                        onClick={() => setImportModal(true)}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <span>📥</span> Import
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 Search games..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                >
                    <option value="all">All Games</option>
                    <option value="enabled">✅ Enabled</option>
                    <option value="disabled">❌ Disabled</option>
                    <option value="hot">🔥 Hot</option>
                    <option value="new">✨ New</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Bulk Actions Bar */}
            {selectedGames.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-xl p-4 flex items-center gap-4">
                    <span className="text-blue-400 font-bold">{selectedGames.length} selected</span>
                    <select
                        value={bulkAction}
                        onChange={(e) => setBulkAction(e.target.value)}
                        className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                    >
                        <option value="">Select Action</option>
                        <option value="enable">✅ Enable All</option>
                        <option value="disable">❌ Disable All</option>
                        <option value="delete">🗑️ Delete All</option>
                    </select>
                    <button
                        onClick={handleBulkAction}
                        disabled={!bulkAction}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white font-bold text-sm"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => { setSelectedGames([]); setBulkAction(""); }}
                        className="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 text-sm"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Stats Bar */}
            <div className="flex gap-4 text-sm">
                <span className="text-slate-400">
                    Total: <span className="text-white font-bold">{games.length}</span>
                </span>
                <span className="text-slate-400">
                    Enabled: <span className="text-emerald-400 font-bold">{games.filter(g => g.enabled).length}</span>
                </span>
                <span className="text-slate-400">
                    Showing: <span className="text-white font-bold">{filteredGames.length}</span>
                </span>
            </div>

            {/* Games Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 bg-slate-700/30">
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4 w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedGames.length === filteredGames.length && filteredGames.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 checked:bg-blue-600"
                                    />
                                </th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Game</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">Category</th>
                                <th className="text-left text-xs font-bold text-slate-400 uppercase p-4">RTP</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Tags</th>
                                <th className="text-center text-xs font-bold text-slate-400 uppercase p-4">Status</th>
                                <th className="text-right text-xs font-bold text-slate-400 uppercase p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.length > 0 ? (
                                filteredGames.map((game) => (
                                    <tr key={game._id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedGames.includes(game._id)}
                                                onChange={() => toggleSelect(game._id)}
                                                className="w-4 h-4 rounded border-slate-600 bg-slate-700 checked:bg-blue-600"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{game.icon || "🎰"}</span>
                                                {renamingId === game._id ? (
                                                    <input
                                                        type="text"
                                                        value={renamingValue}
                                                        onChange={(e) => setRenamingValue(e.target.value)}
                                                        onBlur={() => handleRename(game._id)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleRename(game._id)}
                                                        autoFocus
                                                        className="bg-slate-700 border border-blue-500 rounded px-2 py-1 text-white text-sm focus:outline-none"
                                                    />
                                                ) : (
                                                    <span
                                                        className="font-medium text-white cursor-pointer hover:text-blue-400"
                                                        onDoubleClick={() => startRename(game)}
                                                        title="Double-click to rename"
                                                    >
                                                        {game.name}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-slate-700 rounded-lg text-xs text-slate-300">
                                                {game.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-300">
                                            {game.rtpMin}% - {game.rtpMax}%
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-1">
                                                {game.isHot && <span title="Hot">🔥</span>}
                                                {game.isNew && <span title="New">✨</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleGame(game._id, game.enabled)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${game.enabled
                                                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                                    }`}
                                            >
                                                {game.enabled ? "✅ ON" : "❌ OFF"}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => startRename(game)}
                                                    className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                                    title="Rename"
                                                >
                                                    ✏️
                                                </button>
                                                <Link
                                                    href={`/admin/games/edit?id=${game._id}`}
                                                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                                    title="Edit Full"
                                                >
                                                    📝
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteModal(game._id)}
                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        <div className="text-4xl mb-2">🎮</div>
                                        <div>No games found</div>
                                        <Link href="/admin/games/new" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
                                            Add your first game →
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {importModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => { setImportModal(false); setImportData([]); setImportFileName(""); setDuplicateCount(0); }}>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={() => { setImportModal(false); setImportData([]); setImportFileName(""); setDuplicateCount(0); }}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold text-white mb-4">📥 Import Games from TXT</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Upload TXT File (satu game per line)</label>
                                <label className="block w-full cursor-pointer">
                                    <div className="flex items-center gap-4 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 hover:bg-slate-700 transition-colors">
                                        <span className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-bold text-sm">Choose File</span>
                                        <span className="text-slate-400 text-sm">{importFileName || "No file chosen"}</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".txt"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-slate-500 mt-2">Format: TXT file dengan satu nama game per baris</p>
                            </div>

                            {(importData.length > 0 || duplicateCount > 0) && (
                                <>
                                    <div className="bg-slate-700/30 rounded-xl p-4">
                                        <div className="flex items-center gap-4 mb-3">
                                            <p className="text-sm">
                                                ✅ New games: <span className="font-bold text-emerald-400">{importData.length}</span>
                                            </p>
                                            {duplicateCount > 0 && (
                                                <p className="text-sm">
                                                    ⏭️ Skipped (duplicate): <span className="font-bold text-amber-400">{duplicateCount}</span>
                                                </p>
                                            )}
                                        </div>
                                        {importData.length > 0 && (
                                            <div className="mt-2 max-h-48 overflow-y-auto">
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    {importData.slice(0, 15).map((g, i) => (
                                                        <div key={i} className="bg-slate-700 px-2 py-1 rounded text-white truncate">
                                                            {g.name}
                                                        </div>
                                                    ))}
                                                </div>
                                                {importData.length > 15 && (
                                                    <p className="text-xs text-slate-500 mt-2 text-center">...dan {importData.length - 15} lagi</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => { setImportModal(false); setImportData([]); setImportFileName(""); setDuplicateCount(0); }}
                                            className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleImport}
                                            disabled={importing}
                                            className="flex-1 py-2 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors disabled:opacity-50"
                                        >
                                            {importing ? 'Importing...' : `Import ${importData.length} Games`}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Delete Confirmation Modal */}
            {bulkDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Delete {selectedGames.length} Games?</h3>
                        <p className="text-slate-400 mb-6">
                            This will permanently delete {selectedGames.length} selected games. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setBulkDeleteModal(false)}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBulkDelete}
                                className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500 transition-colors"
                            >
                                Delete All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Delete Game?</h3>
                        <p className="text-slate-400 mb-6">
                            Are you sure you want to delete this game? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteGame(deleteModal)}
                                className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
