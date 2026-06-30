import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, Shield, User, Search } from 'lucide-react';
import { useState } from 'react';

export default function Index({ users }) {
    const [search, setSearch] = useState('');

    const filteredUsers = users.data.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

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
                    {/* Search */}
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
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="empty-state">
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
