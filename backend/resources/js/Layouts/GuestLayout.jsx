import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-obsidian-950">
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
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">Product Admin</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Manage your<br />
                        <span className="gradient-text">product catalog</span>
                    </h1>
                    <p className="text-lg text-obsidian-300 leading-relaxed">
                        A premium administration portal for managing products, users, and system settings with full control.
                    </p>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            Secure Access
                        </div>
                        <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <div className="w-2 h-2 rounded-full bg-electric-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                            Real-time Updates
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel - Content */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-w-0">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-3 mb-8 sm:mb-10">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow flex-shrink-0">
                            <Shield className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Product Admin</span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
