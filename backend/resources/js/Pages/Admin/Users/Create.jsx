import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Users, ArrowLeft, Sparkles, Shield, User } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '', role: 'client',
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
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/20">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Create User</h2>
                        <p className="text-xs text-obsidian-500 mt-0.5">Add a new user to the platform</p>
                    </div>
                </div>
            }
        >
            <Head title="Create User" />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.users.index')} className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-6 opacity-0 animate-reveal">
                        <ArrowLeft className="h-4 w-4" />
                        Back to users
                    </Link>

                    <div className="max-w-2xl opacity-0 animate-reveal" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 sm:p-8">
                            <form onSubmit={submit} className="space-y-5 sm:space-y-6">
                                <div>
                                    <label className="label-premium flex items-center gap-2">
                                        <User className="h-3.5 w-3.5 text-emerald-400" />
                                        Name
                                    </label>
                                    <input type="text" name="name" value={data.name} className="input-premium" placeholder="Enter full name" autoFocus onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium flex items-center gap-2">
                                        <Users className="h-3.5 w-3.5 text-emerald-400" />
                                        Email
                                    </label>
                                    <input type="email" name="email" value={data.email} className="input-premium" placeholder="user@example.com" onChange={(e) => setData('email', e.target.value)} />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium flex items-center gap-2">
                                        <Shield className="h-3.5 w-3.5 text-emerald-400" />
                                        Password
                                    </label>
                                    <input type="password" name="password" value={data.password} className="input-premium" placeholder="Minimum 8 characters" onChange={(e) => setData('password', e.target.value)} />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium flex items-center gap-2">
                                        <Shield className="h-3.5 w-3.5 text-emerald-400" />
                                        Confirm Password
                                    </label>
                                    <input type="password" name="password_confirmation" value={data.password_confirmation} className="input-premium" placeholder="Repeat password" onChange={(e) => setData('password_confirmation', e.target.value)} />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Role</label>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setData('role', 'client')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${data.role === 'client' ? 'bg-electric-500/10 border-electric-500/30 text-electric-400' : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'}`}>
                                            <User className="h-4 w-4" />
                                            Client
                                        </button>
                                        <button type="button" onClick={() => setData('role', 'admin')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${data.role === 'admin' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-obsidian-800/50 border-obsidian-600/20 text-obsidian-400 hover:border-obsidian-600/40'}`}>
                                            <Shield className="h-4 w-4" />
                                            Admin
                                        </button>
                                    </div>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-obsidian-600/20">
                                    <button type="submit" disabled={processing} className="btn-premium justify-center">
                                        <Sparkles className="h-4 w-4" />
                                        {processing ? 'Creating...' : 'Create User'}
                                    </button>
                                    <Link href={route('admin.users.index')} className="btn-ghost justify-center">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
