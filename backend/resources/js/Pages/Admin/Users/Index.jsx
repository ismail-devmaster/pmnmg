import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import {
    Users, Shield, User, Search, BadgeCheck, XCircle, ArrowUpDown, Plus, Pencil,
    Trash2, AlertCircle, ToggleLeft, ToggleRight, ChevronUp, ChevronDown, Filter
} from 'lucide-react';

export default function Index({ users, filters }) {
    const { url } = usePage();
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

    const applyFilters = useCallback((overrides = {}) => {
        const params = {};

        if (overrides.search !== undefined) params.search = overrides.search || '';
        else if (search) params.search = search;

        if (overrides.role !== undefined) params.role = overrides.role || '';
        else if (roleFilter) params.role = roleFilter;

        if (overrides.status !== undefined) params.status = overrides.status || '';
        else if (statusFilter) params.status = statusFilter;

        if (overrides.per_page !== undefined) params.per_page = overrides.per_page;
        else params.per_page = perPage;

        if (overrides.sort !== undefined) params.sort = overrides.sort;
        else params.sort = sortField;

        if (overrides.dir !== undefined) params.dir = overrides.dir;
        else params.dir = sortDir;

        Object.keys(params).forEach(k => !params[k] && delete params[k]);

        router.get(route('admin.users.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [search, roleFilter, statusFilter, perPage, sortField, sortDir]);

    const handleSearch = (value) => {
        setSearch(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const t = setTimeout(() => {
            router.get(route('admin.users.index'), {
                search: value || '',
                role: roleFilter || '',
                status: statusFilter || '',
                per_page: perPage,
                sort: sortField,
                dir: sortDir,
            }, { preserveState: true, preserveScroll: true });
        }, 400);
        setSearchTimeout(t);
    };

    useEffect(() => {
        return () => { if (searchTimeout) clearTimeout(searchTimeout); };
    }, [searchTimeout]);

    const handleSort = (field) => {
        const dir = sortField === field && sortDir === 'asc' ? 'desc' : 'asc';
        applyFilters({ sort: field, dir });
    };

    const handleRoleFilter = (value) => {
        setRoleFilter(value);
        applyFilters({ role: value, status: statusFilter });
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        applyFilters({ status: value, role: roleFilter });
    };

    const handlePerPage = (value) => {
        setPerPage(value);
        applyFilters({ per_page: value });
    };

    const handleRoleChange = (user, newRole) => {
        if (user.role === newRole) return;
        setChangingUserId(user.id);
        router.put(route('admin.users.role', user.id), { role: newRole }, {
            preserveScroll: true,
            onFinish: () => setChangingUserId(null),
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
        const action = user.verified ? 'unverify' : 'verify';
        const label = user.verified ? 'mark as unverified' : 'verify';
        if (!window.confirm(`Are you sure you want to ${label} ${user.name}'s email (${user.email})?`)) return;
        setTogglingId(user.id);
        router.put(route('admin.users.verify', user.id), {}, {
            preserveScroll: true,
            onFinish: () => setTogglingId(null),
        });
    };

    const handleToggleActive = (user) => {
        const label = user.is_active ? 'deactivate' : 'activate';
        if (!window.confirm(`Are you sure you want to ${label} ${user.name}?`)) return;
        setActivatingId(user.id);
        router.put(route('admin.users.toggle-active', user.id), {}, {
            preserveScroll: true,
            onFinish: () => setActivatingId(null),
        });
    };

    const confirmDeletion = (user) => {
        setUserToDelete(user);
        setConfirmingDeletion(true);
    };

    const deleteUser = () => {
        router.delete(route('admin.users.destroy', userToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setUserToDelete(null);
            },
        });
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <ChevronUp className="h-3 w-3 text-obsidian-500" />;
        return sortDir === 'asc'
            ? <ChevronUp className="h-3 w-3 text-electric-400" />
            : <ChevronDown className="h-3 w-3 text-electric-400" />;
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Users className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Users</h2>
                            <p className="text-sm text-obsidian-400 mt-0.5">
                                {users.total} total users
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`btn-ghost text-xs px-3 py-2 ${showFilters ? 'border-electric-500/40 text-electric-400' : ''}`}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            Filters
                        </button>
                        <Link href={route('admin.users.create')} className="btn-premium">
                            <Plus className="h-4 w-4" />
                            Add User
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="relative flex-1 min-w-[200px] max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="input-premium pl-11"
                            />
                        </div>

                        {showFilters && (
                            <>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => handleRoleFilter(e.target.value)}
                                    className="input-premium w-auto min-w-[140px]"
                                >
                                    <option value="">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="client">Client</option>
                                </select>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => handleStatusFilter(e.target.value)}
                                    className="input-premium w-auto min-w-[150px]"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="verified">Verified</option>
                                    <option value="unverified">Unverified</option>
                                </select>
                                <select
                                    value={perPage}
                                    onChange={(e) => handlePerPage(e.target.value)}
                                    className="input-premium w-auto min-w-[100px]"
                                >
                                    <option value="10">10 / page</option>
                                    <option value="25">25 / page</option>
                                    <option value="50">50 / page</option>
                                </select>
                            </>
                        )}
                    </div>

                    <div className="premium-card overflow-hidden">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>
                                        <button onClick={() => handleSort('name')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                            User <SortIcon field="name" />
                                        </button>
                                    </th>
                                    <th>Email</th>
                                    <th>
                                        <button onClick={() => handleSort('role')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                            Role <SortIcon field="role" />
                                        </button>
                                    </th>
                                    <th>Status</th>
                                    <th>
                                        <button onClick={() => handleSort('is_active')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                            Account <SortIcon field="is_active" />
                                        </button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleSort('created_at')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                            Joined <SortIcon field="created_at" />
                                        </button>
                                    </th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr key={user.id} className={`opacity-0 animate-slide-up stagger-${Math.min(index + 1, 5)} group`}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {user.profile_photo_url ? (
                                                    <img
                                                        src={user.profile_photo_url}
                                                        alt={user.name}
                                                        className="h-10 w-10 rounded-xl object-cover border border-obsidian-600/30"
                                                    />
                                                ) : (
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
                                                )}
                                                <div>
                                                    <span className="font-semibold text-white">{user.name}</span>
                                                    {!user.is_active && (
                                                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </div>
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
                                        <td>
                                            <button
                                                onClick={() => handleToggleActive(user)}
                                                disabled={activatingId === user.id}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                                                    user.is_active
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                        : 'bg-obsidian-700/30 text-obsidian-400 border-obsidian-600/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                                                }`}
                                            >
                                                {activatingId === user.id ? (
                                                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                ) : user.is_active ? (
                                                    <ToggleRight className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ToggleLeft className="h-3.5 w-3.5" />
                                                )}
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="text-obsidian-400">{user.created_at}</td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {togglingId === user.id || changingUserId === user.id ? (
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-obsidian-400">
                                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Updating...
                                                    </span>
                                                ) : (
                                                    <>
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="btn-ghost text-xs px-3 py-1.5"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                        {user.verified ? (
                                                            <button
                                                                onClick={() => handleVerifyToggle(user)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200"
                                                            >
                                                                <XCircle className="h-3 w-3" />
                                                                Unverify
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleVerifyToggle(user)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200"
                                                            >
                                                                <BadgeCheck className="h-3 w-3" />
                                                                Verify
                                                            </button>
                                                        )}
                                                        {user.role === 'admin' ? (
                                                            <button
                                                                onClick={() => confirmRoleChange(user, 'client')}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200"
                                                            >
                                                                <ArrowUpDown className="h-3 w-3" />
                                                                Demote
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => confirmRoleChange(user, 'admin')}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-200"
                                                            >
                                                                <ArrowUpDown className="h-3 w-3" />
                                                                Promote
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => confirmDeletion(user)}
                                                            className="btn-danger text-xs px-3 py-1.5"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="empty-state">
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
                                    Showing <span className="font-semibold text-white">{users.from}</span> to{' '}
                                    <span className="font-semibold text-white">{users.to}</span> of{' '}
                                    <span className="font-semibold text-white">{users.total}</span>
                                </p>
                                <div className="flex gap-2">
                                    {users.links.filter(l => !l.label.includes('Previous') && !l.label.includes('Next')).map((link) => (
                                        <button
                                            key={link.label}
                                            onClick={() => router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
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

            {confirmingDeletion && (
                <div className="modal-backdrop flex items-center justify-center" onClick={() => setConfirmingDeletion(false)}>
                    <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Delete User</h3>
                        </div>
                        <p className="text-sm text-obsidian-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">{userToDelete?.name}</span> ({userToDelete?.email})? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button onClick={() => setConfirmingDeletion(false)} className="btn-ghost">Cancel</button>
                            <button onClick={deleteUser} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
