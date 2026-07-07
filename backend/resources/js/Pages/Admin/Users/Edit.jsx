import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import {
    Users, ArrowLeft, Save, Shield, User, Camera, Trash2, ToggleLeft, ToggleRight,
    Upload, Mail, Key, Loader2, BadgeCheck, XCircle
} from 'lucide-react';

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
    });

    const [photoUploading, setPhotoUploading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(user.profile_photo_url || null);
    const fileInputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPhotoPreview(URL.createObjectURL(file));
        setPhotoUploading(true);
        const formData = new FormData();
        formData.append('photo', file);
        router.post(route('admin.users.upload-photo', user.id), formData, {
            preserveScroll: true,
            onFinish: () => setPhotoUploading(false),
            onError: () => { setPhotoUploading(false); setPhotoPreview(user.profile_photo_url || null); },
        });
    };

    const handleRemovePhoto = () => {
        if (!window.confirm('Remove profile picture?')) return;
        setPhotoUploading(true);
        router.delete(route('admin.users.remove-photo', user.id), {
            preserveScroll: true,
            onFinish: () => { setPhotoPreview(null); setPhotoUploading(false); },
        });
    };

    const handleToggleActive = () => {
        if (!window.confirm(`Are you sure you want to ${user.is_active ? 'deactivate' : 'activate'} ${user.name}?`)) return;
        router.put(route('admin.users.toggle-active', user.id), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/20">
                        <Users className="h-5 w-5 text-electric-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Edit User</h2>
                        <p className="text-xs text-obsidian-500 mt-0.5">Manage user profile and permissions</p>
                    </div>
                </div>
            }
        >
            <Head title={`Edit ${user.name}`} />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-electric-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/4 via-transparent to-transparent blur-3xl animate-aurora-2" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.users.index')} className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-6 opacity-0 animate-reveal">
                        <ArrowLeft className="h-4 w-4" />
                        Back to users
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* ─── Profile Card (sidebar) ─── */}
                        <div className="opacity-0 animate-reveal" style={{ animationDelay: '0.1s' }}>
                            <div className="md:sticky md:top-24 space-y-4">
                                <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 sm:p-6 overflow-hidden group hover:border-electric-500/25 transition-all duration-300">
                                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-electric-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            {photoPreview ? (
                                                <div className="relative group">
                                                    <img src={photoPreview} alt={user.name} className="h-28 w-28 rounded-2xl object-cover border-2 border-obsidian-600/30" />
                                                    <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                                            <Camera className="h-4 w-4 text-white" />
                                                        </button>
                                                        {user.profile_picture && (
                                                            <button onClick={handleRemovePhoto} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors">
                                                                <Trash2 className="h-4 w-4 text-red-400" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    {photoUploading && (
                                                        <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center">
                                                            <Loader2 className="h-7 w-7 text-electric-400 animate-spin" />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-obsidian-700 to-obsidian-800 border-2 border-dashed border-obsidian-600/30 flex items-center justify-center group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <Upload className="h-6 w-6 text-obsidian-500 group-hover:text-electric-400 transition-colors" />
                                                        <span className="text-[10px] text-obsidian-500 group-hover:text-electric-400 transition-colors">Upload photo</span>
                                                    </div>
                                                </div>
                                            )}
                                            {photoUploading && !photoPreview && (
                                                <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center">
                                                    <Loader2 className="h-7 w-7 text-electric-400 animate-spin" />
                                                </div>
                                            )}
                                        </div>

                                        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={handlePhotoSelect} />

                                        <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
                                        <p className="text-xs text-obsidian-400 mb-4">{user.email}</p>

                                        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                                            {user.role === 'admin'
                                                ? <span className="badge-admin"><Shield className="h-3 w-3" /> Admin</span>
                                                : <span className="badge-client"><User className="h-3 w-3" /> Client</span>
                                            }
                                            {user.verified
                                                ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><BadgeCheck className="h-3 w-3" /> Verified</span>
                                                : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><XCircle className="h-3 w-3" /> Unverified</span>
                                            }
                                        </div>

                                        <button onClick={handleToggleActive} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 w-full justify-center ${
                                            user.is_active
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30'
                                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30'
                                        }`}>
                                            {user.is_active ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
                                            {user.is_active ? 'Deactivate User' : 'Activate User'}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-obsidian-500">User ID</span>
                                        <span className="text-obsidian-300 font-mono">#{user.id}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs mt-2">
                                        <span className="text-obsidian-500">Joined</span>
                                        <span className="text-obsidian-300">{user.created_at || '—'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Form ─── */}
                        <div className="md:col-span-2 opacity-0 animate-reveal" style={{ animationDelay: '0.15s' }}>
                            <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 sm:p-8">
                                <form onSubmit={submit} className="space-y-5 sm:space-y-6">
                                    <div>
                                        <label className="label-premium flex items-center gap-2">
                                            <User className="h-3.5 w-3.5 text-electric-400" />
                                            Name
                                        </label>
                                        <input type="text" name="name" value={data.name} className="input-premium" autoFocus onChange={(e) => setData('name', e.target.value)} />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="label-premium flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-electric-400" />
                                            Email
                                        </label>
                                        <input type="email" name="email" value={data.email} className="input-premium" onChange={(e) => setData('email', e.target.value)} />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label-premium flex items-center gap-2">
                                                <Key className="h-3.5 w-3.5 text-electric-400" />
                                                New Password
                                            </label>
                                            <input type="password" name="password" value={data.password} className="input-premium" placeholder="Leave blank to keep" onChange={(e) => setData('password', e.target.value)} />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div>
                                            <label className="label-premium flex items-center gap-2">
                                                <Key className="h-3.5 w-3.5 text-electric-400" />
                                                Confirm Password
                                            </label>
                                            <input type="password" name="password_confirmation" value={data.password_confirmation} className="input-premium" placeholder="Repeat new password" onChange={(e) => setData('password_confirmation', e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label-premium">Role</label>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => setData('role', 'client')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                                data.role === 'client' ? 'bg-electric-500/10 border-electric-500/30 text-electric-400' : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'
                                            }`}>
                                                <User className="h-4 w-4" /> Client
                                            </button>
                                            <button type="button" onClick={() => setData('role', 'admin')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                                data.role === 'admin' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'
                                            }`}>
                                                <Shield className="h-4 w-4" /> Admin
                                            </button>
                                        </div>
                                        <InputError message={errors.role} className="mt-2" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-obsidian-600/20">
                                        <button type="submit" disabled={processing} className="btn-premium justify-center">
                                            <Save className="h-4 w-4" />
                                            {processing ? 'Saving...' : 'Update User'}
                                        </button>
                                        <Link href={route('admin.users.index')} className="btn-ghost justify-center">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
