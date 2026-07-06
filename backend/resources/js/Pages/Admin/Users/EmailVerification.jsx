import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { BadgeCheck, XCircle, Mail, Search, Shield, User } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function EmailVerification({ users }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [togglingId, setTogglingId] = useState(null);

    const stats = useMemo(() => {
        const all = users.data;
        return {
            total: all.length,
            verified: all.filter((u) => u.verified).length,
            unverified: all.filter((u) => !u.verified).length,
        };
    }, [users.data]);

    const filteredUsers = users.data.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
            statusFilter === 'all' ||
            (statusFilter === 'verified' && u.verified) ||
            (statusFilter === 'unverified' && !u.verified);
        return matchesSearch && matchesFilter;
    });

    const handleToggle = (user) => {
        const action = user.verified ? 'unverify' : 'verify';
        const label = user.verified ? 'mark as unverified' : 'verify';
        if (!window.confirm(`Are you sure you want to ${label} ${user.name}'s email (${user.email})?`)) return;

        setTogglingId(user.id);
        router.put(route('admin.users.verify', user.id), {}, {
            preserveScroll: true,
            onSuccess: () => setTogglingId(null),
            onError: () => setTogglingId(null),
        });
    };

    const tabs = [
        { key: 'all', label: 'All', count: stats.total },
        { key: 'verified', label: 'Verified', count: stats.verified },
        { key: 'unverified', label: 'Unverified', count: stats.unverified },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Email Verification</h2>
                </div>
            }
        >
            <Head title="Email Verification" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="stat-card">
                            <div className="stat-icon bg-obsidian-800/60 border border-obsidian-600/20">
                                <Mail className="h-5 w-5 text-obsidian-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">Total Users</p>
                                <p className="text-2xl font-bold text-white mt-0.5">{stats.total}</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon bg-emerald-500/10 border border-emerald-500/20">
                                <BadgeCheck className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Verified</p>
                                <p className="text-2xl font-bold text-emerald-400 mt-0.5">{stats.verified}</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon bg-amber-500/10 border border-amber-500/20">
                                <XCircle className="h-5 w-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Unverified</p>
                                <p className="text-2xl font-bold text-amber-400 mt-0.5">{stats.unverified}</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex gap-1 p-1 rounded-xl bg-obsidian-800/60 border border-obsidian-600/20 w-fit">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setStatusFilter(tab.key)}
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                                        statusFilter === tab.key
                                            ? 'bg-obsidian-700 text-white shadow-sm'
                                            : 'text-obsidian-400 hover:text-obsidian-200'
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] ${
                                        statusFilter === tab.key
                                            ? 'bg-obsidian-600 text-obsidian-300'
                                            : 'bg-obsidian-700/50 text-obsidian-500'
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="relative max-w-xs w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-premium pl-10 w-full"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="premium-card overflow-hidden">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className={`opacity-0 animate-slide-up stagger-${Math.min(index + 1, 5)} group`}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br border flex items-center justify-center group-hover:border-electric-500/30 transition-all duration-200 ${
                                                    user.verified
                                                        ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/15'
                                                        : 'from-amber-500/20 to-amber-600/20 border-amber-500/15'
                                                }`}>
                                                    <span className={`text-sm font-bold ${
                                                        user.verified ? 'text-emerald-400' : 'text-amber-400'
                                                    }`}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-obsidian-500" />
                                                <span className="text-obsidian-400">{user.email}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <span className="badge-admin">
                                                    <Shield className="h-3 w-3" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="badge-client">
                                                    <User className="h-3 w-3" />
                                                    Client
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {user.verified ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <BadgeCheck className="h-3.5 w-3.5" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                    <XCircle className="h-3.5 w-3.5" />
                                                    Unverified
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-right">
                                            {togglingId === user.id ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-obsidian-400">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Updating...
                                                </span>
                                            ) : user.verified ? (
                                                <button
                                                    onClick={() => handleToggle(user)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200"
                                                >
                                                    <XCircle className="h-3 w-3" />
                                                    Unverify
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggle(user)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200"
                                                >
                                                    <BadgeCheck className="h-3 w-3" />
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20">
                                                    <BadgeCheck className="h-8 w-8 text-obsidian-500" />
                                                </div>
                                                <p className="text-obsidian-400">
                                                    {search
                                                        ? 'No users match your search.'
                                                        : statusFilter === 'verified'
                                                            ? 'No verified users found.'
                                                            : statusFilter === 'unverified'
                                                                ? 'All users have verified emails.'
                                                                : 'No users found.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {users.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-obsidian-600/20 flex items-center justify-between">
                                <p className="text-sm text-obsidian-400">
                                    Page <span className="font-semibold text-white">{users.current_page}</span> of{' '}
                                    <span className="font-semibold text-white">{users.last_page}</span>
                                </p>
                                <div className="flex gap-2">
                                    {users.current_page > 1 && (
                                        <a href={users.prev_page_url} className="pagination-link">
                                            ‹
                                        </a>
                                    )}
                                    {users.current_page < users.last_page && (
                                        <a href={users.next_page_url} className="pagination-link">
                                            ›
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
