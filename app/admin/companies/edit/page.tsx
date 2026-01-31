"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminFetch } from "../../../lib/adminApiUtils";
import { showToast } from "../../../ui/AdminToast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

function EditCompanyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get("id") || "";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        caption: "",
        media: "",
        mediaType: "video",
        link: "",
        priority: 1
    });

    const fetchCompany = useCallback(async () => {
        if (!companyId) {
            setLoading(false);
            setError("No company ID provided");
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/companies/${companyId}`);
            if (res.ok) {
                const data = await res.json();
                setForm({
                    name: data.company.name || "",
                    caption: data.company.caption || "",
                    media: data.company.media || "",
                    mediaType: data.company.mediaType || "video",
                    link: data.company.link || "",
                    priority: data.company.priority || 1
                });
            }
        } catch (err) {
            console.error("Failed to fetch company:", err);
        } finally {
            setLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchCompany();
    }, [fetchCompany]);

    const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "companies");

            const res = await fetch(`${API_BASE}/api/upload`, { method: "POST", body: formData });

            if (res.ok) {
                const data = await res.json();
                setForm({ ...form, media: data.url, mediaType: file.type.startsWith("video") ? "video" : "image" });
            }
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const res = await adminFetch(`/api/admin/companies/${companyId}`, {
                method: "PUT",
                body: JSON.stringify(form)
            });

            if (res.ok) {
                showToast("Company updated!", "success");
                router.push("/admin/companies");
            } else {
                const data = await res.json();
                const msg = data.message || "Failed to update company";
                setError(msg);
                showToast(msg, "error");
            }
        } catch (err) {
            console.error("Failed to update company:", err);
            const msg = "Connection failed";
            setError(msg);
            showToast(msg, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/companies" className="p-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors">←</Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">✏️ Edit Company</h1>
                    <p className="text-slate-500 text-sm">Update company details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
                {error && <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Company Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" required />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Caption</label>
                    <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none" rows={3} />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">🎬 Media Upload (Video / Photo)</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center">
                        {form.media ? (
                            <div className="space-y-4">
                                {form.mediaType === "video" ? (
                                    <div>
                                        <div className="text-green-400 text-xs font-bold mb-2">✅ VIDEO UPLOADED</div>
                                        <video src={form.media} className="max-h-40 mx-auto rounded-lg" controls />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-blue-400 text-xs font-bold mb-2">✅ PHOTO UPLOADED</div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={form.media} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
                                    </div>
                                )}
                                <button type="button" onClick={() => setForm({ ...form, media: "", mediaType: "video" })} className="text-red-400 text-sm hover:underline">🗑️ Remove & Upload New</button>
                            </div>
                        ) : (
                            <label className="cursor-pointer">
                                <input type="file" accept="video/*,image/*" onChange={handleMediaUpload} className="hidden" />
                                <div className="text-4xl mb-2">{uploading ? "⏳" : "🎬📸"}</div>
                                <div className="text-slate-400 font-bold">{uploading ? "Uploading..." : "Click to Upload VIDEO or PHOTO"}</div>
                                <div className="text-xs text-amber-400 mt-2 font-medium">✅ Supports: MP4, MOV, WebM (Video) | JPG, PNG, WebP (Photo)</div>
                            </label>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Link</label>
                    <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Priority</label>
                    <input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) })} className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" min={1} />
                </div>

                <div className="flex gap-4 pt-4">
                    <Link href="/admin/companies" className="flex-1 py-3 border border-slate-600 rounded-xl text-center text-slate-300 hover:bg-slate-700 transition-colors">Cancel</Link>
                    <button type="submit" disabled={saving || !form.name.trim()} className="flex-1 py-3 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
                </div>
            </form>
        </div>
    );
}

export default function EditCompanyPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
            <EditCompanyContent />
        </Suspense>
    );
}
