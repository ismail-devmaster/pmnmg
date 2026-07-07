import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Send, ArrowLeft, Shield, KeyRound } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex bg-obsidian-950">
            <Head title="Forgot Password" />

            {/* Left panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-600/20 via-obsidian-900 to-obsidian-950" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                <div className="relative z-10 flex flex-col justify-center px-16 max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow-lg">
                            <KeyRound className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Product Admin</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Reset your<br />
                        <span className="gradient-text">account password</span>
                    </h1>
                    <p className="text-lg text-obsidian-300 leading-relaxed">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            Secure Reset
                        </div>
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-electric-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                            Email Notification
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow">
                            <KeyRound className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Product Admin</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Forgot password?</h2>
                        <p className="text-obsidian-400">No worries, we'll send you reset instructions.</p>
                    </div>

                    {status && (
                        <div className="mb-6 flash-success">{status}</div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="label-premium">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="input-premium pl-11"
                                    placeholder="you@example.com"
                                    autoFocus
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full btn-premium justify-center py-3 text-base"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending link...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Send Reset Link
                                </div>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-electric-400 transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
