import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Users, Shield, User, Search, BadgeCheck, XCircle, ArrowUpDown, Plus, Pencil,
    Trash2, AlertCircle, ToggleLeft, ToggleRight, ChevronUp, ChevronDown, Filter,
    UserCheck, UserCog, Activity
} from 'lucide-react';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [changingUserId, setChangingUserId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [activatingId, setActivatingId] = useState(null);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const sortField = filters.sort || 'created_at';
    const sortDir = filters.dir || 'desc';

    const handleSearch = (value) => {
        setSearch(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => {
            router.get(route('admin.users.index'), {
                search: value || '',
                role: roleFilter || '',
                status: statusFilter || '',
                per_page: perPage,
                sort: sortField,
                dir: sortDir,
            }, { preserveState: true, preserveScroll: true });
        }, 400));
    };

    useEffect(() => {
        return () => { if (searchTimeout) clearTimeout(searchTimeout); };
    }, [searchTimeout]);

    const applyFilters = (overrides = {}) => {
        const params = {
            search: overrides.search !== undefined ? overrides.search : search,
            role: overrides.role !== undefined ? overrides.role : roleFilter,
            status: overrides.status !== undefined ? overrides.status : statusFilter,
            per_page: overrides.per_page || perPage,
            sort: overrides.sort || sortField,
            dir: overrides.dir || sortDir,
        };
        Object.keys(params).forEach(k => !params[k] && delete params[k]);
        router.get(route('admin.users.index'), params, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field) => {
        applyFilters({ sort: field, dir: sortField === field && sortDir === 'asc' ? 'desc' : 'asc' });
    };

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return;
        setChangingUserId(user.id);
        router.put(route('admin.users.role', user.id), { role: newRole }, {
            preserveScroll: true, onFinish: () => setChangingUserId(null),
        });
    };

    const confirmRoleChange = (user, newRole) => {
        const targetRole = newRole === 'admin' ? 'Admin' : 'Client';
        const currentRole = user.role === 'admin' ? 'Admin' : 'Client';
        if (window.confirm(`Change ${user.name}'s role from ${currentRole} to ${targetRole}?`)) {
            handleRoleChange(user, newRole);
        }
    };

    const handleVerifyToggle = (user) => {
        const label = user.verified ? 'mark as unverified' : 'verify';
        if (!window.confirm(`Are you sure you want to ${label} ${user.name}'s email (${user.email})?`)) return;
        setTogglingId(user.id);
        router.put(route('admin.users.verify', user.id), {}, {
            preserveScroll: true, onFinish: () => setTogglingId(null),
        });
    };

    const handleToggleActive = (user) => {
        const label = user.is_active ? 'deactivate' : 'activate';
        if (!window.confirm(`Are you sure you want to ${label} ${user.name}?`)) return;
        setActivatingId(user.id);
        router.put(route('admin.users.toggle-active', user.id), {}, {
            preserveScroll: true, onFinish: () => setActivatingId(null),
        });
    };

    const confirmDeletion = (user) => { setUserToDelete(user); setConfirmingDeletion(true); };

    const deleteUser = () => {
        router.delete(route('admin.users.destroy', userToDelete.id), {
            onSuccess: () => { setConfirmingDeletion(false); setUserToDelete(null); },
        });
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <ChevronUp className="h-3 w-3 text-obsidian-500" />;
        return sortDir === 'asc'
            ? <ChevronUp className="h-3 w-3 text-electric-400" />
            : <ChevronDown className="h-3 w-3 text-electric-400" />;
    };

    const activeUsers = users.data.filter(u => u.is_active).length;
    const verifiedUsers = users.data.filter(u => u.verified).length;

    const statCards = [
        { label: 'Total Users', value: users.total, icon: Users, color: 'text-purple-400', gradient: 'from-purple-500/20 to-purple-600/10' },
        { label: 'Active', value: activeUsers, icon: Activity, color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-emerald-600/10' },
        { label: 'Verified', value: verifiedUsers, icon: BadgeCheck, color: 'text-electric-400', gradient: 'from-electric-500/20 to-electric-600/10' },
        { label: 'Inactive', value: users.total - activeUsers, icon: UserCog, color: 'text-amber-400', gradient: 'from-amber-500/20 to-amber-600/10' },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/15 to-purple-600/10 border border-purple-500/20">
                            <Users className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Users</h2>
                            <p className="text-xs text-obsidian-500 mt-0.5">{users.total} registered users</p>
                        </div>
                    </div>
                    <Link href={route('admin.users.create')} className="btn-premium">
                        <Plus className="h-4 w-4" />
                        Add User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-electric-500/4 via-transparent to-transparent blur-3xl animate-aurora-2" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* ─── Stat row ─── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {statCards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div key={card.label} className="opacity-0 animate-reveal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                                    <div className="relative bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-4 hover:border-purple-500/25 transition-all duration-300 overflow-hidden">
                                        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full blur-2xl pointer-events-none`} />
                                        <div className="relative z-10 flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} border border-white/5`}>
                                                <Icon className={`h-4 w-4 ${card.color}`} />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-obsidian-500 uppercase tracking-wider">{card.label}</p>
                                                <p className="text-sm font-bold text-white mt-0.5">{card.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ─── Search & Filters ─── */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 opacity-0 animate-reveal" style={{ animationDelay: '0.35s' }}>
                        <div className="relative flex-1 min-w-0 w-full sm:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="input-premium pl-11"
                            />
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button onClick={() => setShowFilters(!showFilters)} className={`btn-ghost text-xs px-3 py-2.5 ${showFilters ? 'border-purple-500/40 text-purple-400' : ''}`}>
                                <Filter className="h-3.5 w-3.5" />
                                Filters
                            </button>
                            {showFilters && (
                                <>
                                    <select value={roleFilter} onChange={(e) => applyFilters({ role: e.target.value, status: statusFilter })} className="input-premium w-auto min-w-[110px]">
                                        <option value="">All Roles</option>
                                        <option value="admin">Admin</option>
                                        <option value="client">Client</option>
                                    </select>
                                    <select value={statusFilter} onChange={(e) => applyFilters({ status: e.target.value, role: roleFilter })} className="input-premium w-auto min-w-[120px]">
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="verified">Verified</option>
                                        <option value="unverified">Unverified</option>
                                    </select>
                                    <select value={perPage} onChange={(e) => applyFilters({ per_page: e.target.value })} className="input-premium w-auto min-w-[90px]">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                    </select>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ─── Users Table (md+) ─── */}
                    <div className="hidden md:block opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table-premium">
                                    <thead>
                                        <tr>
                                            <th><button onClick={() => handleSort('name')} className="inline-flex items-center gap-1 hover:text-white transition-colors">User <SortIcon field="name" /></button></th>
                                            <th className="hidden lg:table-cell">Email</th>
                                            <th><button onClick={() => handleSort('role')} className="inline-flex items-center gap-1 hover:text-white transition-colors">Role <SortIcon field="role" /></button></th>
                                            <th className="hidden lg:table-cell">Status</th>
                                            <th className="hidden lg:table-cell"><button onClick={() => handleSort('is_active')} className="inline-flex items-center gap-1 hover:text-white transition-colors">Account <SortIcon field="is_active" /></button></th>
                                            <th className="hidden lg:table-cell"><button onClick={() => handleSort('created_at')} className="inline-flex items-center gap-1 hover:text-white transition-colors">Joined <SortIcon field="created_at" /></button></th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user, index) => (
                                            <tr key={user.id} className="group opacity-0 animate-reveal" style={{ animationDelay: `${0.45 + index * 0.04}s` }}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        {user.profile_photo_url ? (
                                                            <img src={user.profile_photo_url} alt={user.name} className="h-10 w-10 rounded-xl object-cover border border-obsidian-600/30 flex-shrink-0" />
                                                        ) : (
                                                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br border flex items-center justify-center group-hover:border-purple-500/30 transition-all duration-200 flex-shrink-0 ${
                                                                user.verified
                                                                    ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/15'
                                                                    : 'from-amber-500/20 to-amber-600/20 border-amber-500/15'
                                                            }`}>
                                                                <span className={`text-sm font-bold ${user.verified ? 'text-emerald-400' : 'text-amber-400'}`}>{user.name.charAt(0).toUpperCase()}</span>
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <span className="font-semibold text-white group-hover:text-purple-200 transition-colors truncate block">{user.name}</span>
                                                            {!user.is_active && (
                                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">Inactive</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-obsidian-400 text-sm hidden lg:table-cell">{user.email}</td>
                                                <td>
                                                    {user.role === 'admin' ? (
                                                        <span className="badge-admin"><Shield className="h-3 w-3" /> Admin</span>
                                                    ) : (
                                                        <span className="badge-client"><User className="h-3 w-3" /> Client</span>
                                                    )}
                                                </td>
                                                <td className="hidden lg:table-cell">
                                                    {user.verified ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <BadgeCheck className="h-3.5 w-3.5" /> Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                            <XCircle className="h-3.5 w-3.5" /> Unverified
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="hidden lg:table-cell">
                                                    <button
                                                        onClick={() => handleToggleActive(user)}
                                                        disabled={activatingId === user.id}
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                                                            user.is_active
                                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                                : 'bg-obsidian-700/30 text-obsidian-400 border-obsidian-600/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                                                        }`}>
                                                        {activatingId === user.id ? (
                                                            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                            </svg>
                                                        ) : user.is_active ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                                                        {user.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="text-obsidian-400 text-sm hidden lg:table-cell">{user.created_at}</td>
                                                <td className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {togglingId === user.id || changingUserId === user.id ? (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-obsidian-400">
                                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                                Updating...
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <Link href={route('admin.users.edit', user.id)} className="btn-ghost text-xs px-2.5 lg:px-3 py-1.5 touch-target">
                                                                    <Pencil className="h-3.5 w-3.5" />
                                                                    <span className="hidden sm:inline">Edit</span>
                                                                </Link>
                                                                <button onClick={() => handleVerifyToggle(user)} className={`py-1.5 px-2.5 lg:px-3 rounded-lg text-xs font-semibold uppercase tracking-wide border transition-all duration-200 touch-target flex-shrink-0 ${
                                                                    user.verified
                                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                                }`} title={user.verified ? 'Unverify' : 'Verify'}>
                                                                    {user.verified ? <XCircle className="h-3 w-3" /> : <BadgeCheck className="h-3 w-3" />}
                                                                </button>
                                                                <button onClick={() => confirmRoleChange(user, user.role === 'admin' ? 'client' : 'admin')} className={`py-1.5 px-2.5 lg:px-3 rounded-lg text-xs font-semibold uppercase tracking-wide border transition-all duration-200 touch-target flex-shrink-0 ${
                                                                    user.role === 'admin'
                                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                                                                }`} title={user.role === 'admin' ? 'Demote' : 'Promote'}>
                                                                    <ArrowUpDown className="h-3 w-3" />
                                                                </button>
                                                                <button onClick={() => confirmDeletion(user)} className="btn-danger text-xs px-2.5 lg:px-3 py-1.5 touch-target" title="Delete">
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.data.length === 0 && (
                                            <tr><td colSpan="7" className="empty-state">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20"><Users className="h-8 w-8 text-obsidian-500" /></div>
                                                    <p className="text-obsidian-400">No users found.</p>
                                                </div>
                                            </td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {users.last_page > 1 && (
                                <div className="px-4 sm:px-6 py-4 border-t border-obsidian-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <p className="text-sm text-obsidian-400">
                                        Showing <span className="font-semibold text-white">{users.from}</span> to{' '}
                                        <span className="font-semibold text-white">{users.to}</span> of{' '}
                                        <span className="font-semibold text-white">{users.total}</span>
                                    </p>
                                    <div className="flex gap-1.5 flex-wrap justify-center">
                                        {users.links.filter(l => !l.label.includes('Previous') && !l.label.includes('Next')).map((link) => (
                                            <button key={link.label} onClick={() => router.get(link.url, {
                                                search, role: roleFilter, status: statusFilter, sort: sortField, dir: sortDir, per_page: perPage,
                                            }, { preserveState: true, preserveScroll: true })}
                                                className={`pagination-link ${link.active ? 'pagination-link-active' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ─── Users Mobile Cards (< md) ─── */}
                    <div className="md:hidden space-y-3 opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        {users.data.length > 0 ? (
                            users.data.map((user, index) => (
                                <div key={user.id} className="table-card" style={{ animationDelay: `${0.45 + index * 0.04}s` }}>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            {user.profile_photo_url ? (
                                                <img src={user.profile_photo_url} alt={user.name} className="h-10 w-10 rounded-xl object-cover border border-obsidian-600/30 flex-shrink-0" />
                                            ) : (
                                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0 ${
                                                    user.verified
                                                        ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/15'
                                                        : 'from-amber-500/20 to-amber-600/20 border-amber-500/15'
                                                }`}>
                                                    <span className={`text-sm font-bold ${user.verified ? 'text-emerald-400' : 'text-amber-400'}`}>{user.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <span className="font-semibold text-white truncate block">{user.name}</span>
                                                <span className="text-xs text-obsidian-400 truncate block">{user.email}</span>
                                            </div>
                                        </div>
                                        {user.role === 'admin' ? (
                                            <span className="badge-admin flex-shrink-0"><Shield className="h-3 w-3" /> Admin</span>
                                        ) : (
                                            <span className="badge-client flex-shrink-0"><User className="h-3 w-3" /> Client</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        {user.verified ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <BadgeCheck className="h-3 w-3" /> Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                <XCircle className="h-3 w-3" /> Unverified
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleToggleActive(user)}
                                            disabled={activatingId === user.id}
                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border transition-all duration-200 ${
                                                user.is_active
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : 'bg-obsidian-700/30 text-obsidian-400 border-obsidian-600/30'
                                            }`}>
                                            {activatingId === user.id ? (
                                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            ) : user.is_active ? <ToggleRight className="h-3 w-3" /> : <ToggleLeft className="h-3 w-3" />}
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                        <span className="text-[10px] text-obsidian-500">{user.created_at}</span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2 border-t border-obsidian-600/15 overflow-x-auto scrollbar-hide">
                                        {togglingId === user.id || changingUserId === user.id ? (
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-obsidian-400">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                Updating...
                                            </span>
                                        ) : (
                                            <>
                                                <Link href={route('admin.users.edit', user.id)} className="btn-ghost text-xs px-3 py-1.5 touch-target flex-shrink-0">
                                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                                </Link>
                                                <button onClick={() => handleVerifyToggle(user)} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 touch-target flex-shrink-0 ${
                                                    user.verified
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                }`}>
                                                    {user.verified ? <><XCircle className="h-3 w-3" /> Unverify</> : <><BadgeCheck className="h-3 w-3" /> Verify</>}
                                                </button>
                                                <button onClick={() => confirmRoleChange(user, user.role === 'admin' ? 'client' : 'admin')} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 touch-target flex-shrink-0 ${
                                                    user.role === 'admin'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                                                }`}>
                                                    <ArrowUpDown className="h-3 w-3" />
                                                    {user.role === 'admin' ? 'Demote' : 'Promote'}
                                                </button>
                                                <button onClick={() => confirmDeletion(user)} className="btn-danger text-xs px-3 py-1.5 touch-target flex-shrink-0">
                                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-12 text-obsidian-500">
                                <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20"><Users className="h-8 w-8 text-obsidian-500" /></div>
                                <p className="text-obsidian-400">No users found.</p>
                            </div>
                        )}

                        {users.last_page > 1 && (
                            <div className="flex flex-col items-center gap-3 pt-4">
                                <p className="text-sm text-obsidian-400">
                                    Showing <span className="font-semibold text-white">{users.from}</span> to{' '}
                                    <span className="font-semibold text-white">{users.to}</span> of{' '}
                                    <span className="font-semibold text-white">{users.total}</span>
                                </p>
                                <div className="flex gap-1.5 flex-wrap justify-center">
                                    {users.links.filter(l => !l.label.includes('Previous') && !l.label.includes('Next')).map((link) => (
                                        <button key={link.label} onClick={() => router.get(link.url, {
                                            search, role: roleFilter, status: statusFilter, sort: sortField, dir: sortDir, per_page: perPage,
                                        }, { preserveState: true, preserveScroll: true })}
                                            className={`pagination-link ${link.active ? 'pagination-link-active' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {confirmingDeletion && (
                <div className="modal-backdrop flex items-center justify-center" onClick={() => setConfirmingDeletion(false)}>
                    <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20"><AlertCircle className="h-5 w-5 text-red-400" /></div>
                            <h3 className="text-lg font-bold text-white">Delete User</h3>
                        </div>
                        <p className="text-sm text-obsidian-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">{userToDelete?.name}</span> ({userToDelete?.email})? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button onClick={() => setConfirmingDeletion(false)} className="btn-ghost">Cancel</button>
                            <button onClick={deleteUser} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
