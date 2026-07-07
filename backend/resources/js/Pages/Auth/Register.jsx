import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, Shield, ArrowRight, UserPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex bg-obsidian-950">
            <Head title="Register" />

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-obsidian-900 to-obsidian-950" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                <div className="relative z-10 flex flex-col justify-center px-16 max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-glow-lg">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Product Admin</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Create your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-electric-400">account</span>
                    </h1>
                    <p className="text-lg text-obsidian-300 leading-relaxed">
                        Join the platform to start managing products and accessing premium features.
                    </p>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            Free to join
                        </div>
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-electric-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                            Instant access
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-w-0">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-8 sm:mb-10">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-glow flex-shrink-0">
                            <Shield className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Product Admin</span>
                    </div>

                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Create account</h2>
                        <p className="text-sm sm:text-base text-obsidian-400">Fill in your details to get started</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="label-premium flex items-center gap-2">
                                <User className="h-3.5 w-3.5 text-emerald-400" />
                                Name
                            </label>
                            <input
                                type="text" name="name" value={data.name}
                                className="input-premium" placeholder="Full name" autoFocus
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)} required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <label className="label-premium flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                                <input
                                    type="email" name="email" value={data.email}
                                    className="input-premium pl-11" placeholder="you@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)} required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <label className="label-premium flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                                <input
                                    type="password" name="password" value={data.password}
                                    className="input-premium pl-11" placeholder="Minimum 8 characters"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)} required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <label className="label-premium flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                                <input
                                    type="password" name="password_confirmation" value={data.password_confirmation}
                                    className="input-premium pl-11" placeholder="Repeat password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)} required
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={processing} className="w-full btn-premium justify-center py-3 text-base">
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    Create Account
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </button>

                        <p className="text-center text-sm text-obsidian-400">
                            Already have an account?{' '}
                            <Link href={route('login')} className="text-electric-400 hover:text-electric-300 font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
