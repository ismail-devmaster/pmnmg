import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Shield, ArrowRight, KeyRound } from 'lucide-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex bg-obsidian-950">
            <Head title="Confirm Password" />

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
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Product Admin</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Secure<br />
                        <span className="gradient-text">verification</span>
                    </h1>
                    <p className="text-lg text-obsidian-300 leading-relaxed">
                        This is a secure area. Please confirm your password before continuing.
                    </p>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            Encrypted
                        </div>
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-electric-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                            Verified
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow">
                            <KeyRound className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Product Admin</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Confirm password</h2>
                        <p className="text-obsidian-400">Enter your password to continue</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="label-premium flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-electric-400" />
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                                <input
                                    type="password" name="password" value={data.password}
                                    className="input-premium pl-11" placeholder="Enter your password"
                                    autoFocus autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <button type="submit" disabled={processing} className="w-full btn-premium justify-center py-3 text-base">
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <KeyRound className="h-4 w-4" />
                                    Confirm
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
