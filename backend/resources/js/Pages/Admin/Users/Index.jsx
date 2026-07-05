import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Users, Shield, User, Search, Check, X, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function Index({ users }) {
    const [search, setSearch] = useState('');
    const [changingUserId, setChangingUserId] = useState(null);

    const filteredUsers = users.data.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return;

        setChangingUserId(user.id);
        router.put(route('admin.users.role', user.id), { role: newRole }, {
            preserveScroll: true,
            onSuccess: () => setChangingUserId(null),
            onError: () => setChangingUserId(null),
        });
    };

    const confirmRoleChange = (user, newRole) => {
        const targetRole = newRole === 'admin' ? 'Admin' : 'Client';
        const currentRole = user.role === 'admin' ? 'Admin' : 'Client';
        if (window.confirm(`Change ${user.name}'s role from ${currentRole} to ${targetRole}?`)) {
            handleRoleChange(user, newRole);
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Users</h2>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-premium pl-11"
                        />
                    </div>

                    <div className="premium-card overflow-hidden">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className={`opacity-0 animate-slide-up stagger-${Math.min(index + 1, 5)} group`}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/15 flex items-center justify-center group-hover:border-electric-500/30 transition-all duration-200">
                                                    <span className="text-sm font-bold text-electric-400">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-white">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-obsidian-400">{user.email}</td>
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
                                        <td className="text-obsidian-400">{user.created_at}</td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {changingUserId === user.id ? (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-obsidian-400">
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Updating...
                                                    </span>
                                                ) : user.role === 'admin' ? (
                                                    <button
                                                        onClick={() => confirmRoleChange(user, 'client')}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200"
                                                    >
                                                        <ArrowUpDown className="h-3 w-3" />
                                                        Demote to Client
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => confirmRoleChange(user, 'admin')}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200"
                                                    >
                                                        <ArrowUpDown className="h-3 w-3" />
                                                        Promote to Admin
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20">
                                                    <Users className="h-8 w-8 text-obsidian-500" />
                                                </div>
                                                <p className="text-obsidian-400">No users found.</p>
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