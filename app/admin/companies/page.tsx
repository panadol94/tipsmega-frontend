"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.tipsmega888.com";

interface Company {
    _id: string;
    name: string;
    caption?: string;
    media?: string;
    mediaType?: string;
    link?: string;
    priority: number;
    enabled: boolean;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/companies`);
            if (res.ok) {
                const data = await res.json();
                setCompanies(data.companies || []);
            }
        } catch (err) {
            console.error("Failed to fetch companies:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCompany = async (id: string) => {
        try {
            const token = localStorage.getItem("admin_token");
            await fetch(`${API_BASE}/api/admin/companies/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setCompanies(companies.filter(c => c._id !== id));
            setDeleteModal(null);
        } catch (err) {
            console.error("Failed to delete company:", err);
        }
    };

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
                    <h1 className="text-2xl font-bold text-white">🏢 Companies</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage trusted companies</p>
                </div>
                <Link
                    href="/admin/companies/new"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 w-fit"
                >
                    <span>➕</span> Add Company
                </Link>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.length > 0 ? (
                    companies.map((company) => (
                        <div key={company._id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group">
                            {/* Media Preview */}
                            <div className="h-32 bg-slate-700 flex items-center justify-center">
                                {company.media ? (
                                    company.mediaType === "video" ? (
                                        <video src={company.media} className="w-full h-full object-cover" muted />
                                    ) : (
                                        <img src={company.media} alt={company.name} className="w-full h-full object-cover" />
                                    )
                                ) : (
                                    <span className="text-4xl">🏢</span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-white text-lg">{company.name}</h3>
                                {company.caption && (
                                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{company.caption}</p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 mt-4">
                                    <Link
                                        href={`/admin/companies/edit?id=${company._id}`}
                                        className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-xl text-center text-sm font-bold hover:bg-blue-500/30 transition-colors"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button
                                        onClick={() => setDeleteModal(company._id)}
                                        className="py-2 px-4 bg-red-500/20 text-red-400 rounded-xl text-sm font-bold hover:bg-red-500/30 transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        <div className="text-4xl mb-2">🏢</div>
                        <div>No companies yet</div>
                        <Link href="/admin/companies/new" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
                            Add your first company →
                        </Link>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold text-white mb-4">⚠️ Delete Company?</h3>
                        <p className="text-slate-400 mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteModal(null)} className="flex-1 py-2 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-700">Cancel</button>
                            <button onClick={() => deleteCompany(deleteModal)} className="flex-1 py-2 bg-red-600 rounded-xl text-white font-bold hover:bg-red-500">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
