import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Users, ArrowLeft, Sparkles, Shield, User } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'client',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Create User</h2>
                </div>
            }
        >
            <Head title="Create User" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <Link href={route('admin.users.index')} className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft className="h-4 w-4" />
                            Back to users
                        </Link>

                        <div className="premium-card p-8 opacity-0 animate-slide-up">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="label-premium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="input-premium"
                                        placeholder="Enter full name"
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="input-premium"
                                        placeholder="user@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="input-premium"
                                        placeholder="Minimum 8 characters"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="input-premium"
                                        placeholder="Repeat password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Role</label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setData('role', 'client')}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                                data.role === 'client'
                                                    ? 'bg-electric-500/10 border-electric-500/30 text-electric-400'
                                                    : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'
                                            }`}
                                        >
                                            <User className="h-4 w-4" />
                                            Client
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('role', 'admin')}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                                data.role === 'admin'
                                                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                                                    : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'
                                            }`}
                                        >
                                            <Shield className="h-4 w-4" />
                                            Admin
                                        </button>
                                    </div>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <button type="submit" disabled={processing} className="btn-premium">
                                        <Sparkles className="h-4 w-4" />
                                        {processing ? 'Creating...' : 'Create User'}
                                    </button>
                                    <Link href={route('admin.users.index')} className="btn-ghost">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
