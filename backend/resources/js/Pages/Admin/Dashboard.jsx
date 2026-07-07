import { useState, useEffect, useRef, useCallback } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Package, Users, Shield, UserCheck, TrendingUp, ArrowRight,
    Sparkles, Clock, Activity, BarChart3, Zap, Orbit,
    ShoppingCart, UserPlus, LayoutDashboard
} from 'lucide-react';

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = '', duration = 1400 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(value);
        };
        requestAnimationFrame(step);
    }, [value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {display.toLocaleString()}{suffix}
        </span>
    );
}

/* ── Live Digital Clock ── */
function LiveClock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const fmt = (n) => String(n).padStart(2, '0');
    const h = time.getHours();
    const m = fmt(time.getMinutes());
    const s = fmt(time.getSeconds());
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-baseline gap-1 font-mono">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-widest">{fmt(h12)}</span>
                <span className="text-xl sm:text-2xl font-bold text-electric-400 animate-pulse-slow">:</span>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-widest">{m}</span>
                <span className="text-sm sm:text-lg font-semibold text-obsidian-400 ml-0.5 sm:ml-1">{ampm}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-obsidian-500 self-end mb-0.5 sm:mb-1">{s}</span>
        </div>
    );
}

/* ── Stat Card with orbital ring ── */
function StatCard({ label, value, icon: Icon, color, index, gradient }) {
    const ringColor = color === 'emerald' ? 'fill-emerald-400/40 stroke-emerald-400/20'
        : color === 'amber' ? 'fill-amber-400/40 stroke-amber-400/20'
        : color === 'purple' ? 'fill-purple-400/40 stroke-purple-400/20'
        : 'fill-electric-400/40 stroke-electric-400/20';

    const borderFrom = color === 'emerald' ? 'from-emerald-500/10'
        : color === 'amber' ? 'from-amber-500/10'
        : color === 'purple' ? 'from-purple-500/10'
        : 'from-electric-500/10';

    return (
        <div
            className="relative group opacity-0 animate-reveal"
            style={{ animationDelay: `${0.15 + index * 0.1}s` }}
        >
            {/* Orbital decoration ring */}
            <svg className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none z-0" viewBox="0 0 96 96">
                <circle
                    cx="48" cy="48" r="44"
                    fill="none" stroke="currentColor"
                    strokeWidth="0.5" opacity="0.08"
                />
                <circle
                    cx="48" cy="48" r="44"
                    fill="none" stroke="currentColor"
                    strokeWidth="1.5" opacity="0.15"
                    strokeDasharray="8 6"
                    className="animate-orbit-slow origin-center"
                    style={{ transformOrigin: '48px 48px' }}
                />
                <circle
                    cx="48" cy="48" r="33"
                    fill="none" stroke="currentColor"
                    strokeWidth="1" opacity="0.1"
                    strokeDasharray="4 8"
                    className="animate-orbit origin-center"
                    style={{ transformOrigin: '48px 48px' }}
                />
            </svg>

            {/* Card */}
            <div className="relative z-10 bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card transition-all duration-500 p-6 hover:shadow-card-hover overflow-hidden group-hover:border-electric-500/25">
                {/* Subtle gradient corner */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${borderFrom} to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-[0.15em]">
                            {label}
                        </p>
                        <p className="text-3xl font-bold text-white tracking-tight">
                            <AnimatedCounter value={value} />
                        </p>
                    </div>
                    <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} border border-white/5`}>
                        <Icon className={`h-5 w-5 ${color === 'emerald' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : color === 'purple' ? 'text-purple-400' : 'text-electric-400'}`} />
                        {/* Mini dot indicator */}
                        <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${color === 'emerald' ? 'bg-emerald-400' : color === 'amber' ? 'bg-amber-400' : color === 'purple' ? 'bg-purple-400' : 'bg-electric-400'} shadow-lg`} style={{ boxShadow: `0 0 8px 2px currentColor` }} />
                    </div>
                </div>

                {/* Micro progress bar at bottom */}
                <div className="relative z-10 mt-4 h-1 rounded-full bg-obsidian-700/50 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            color === 'emerald' ? 'bg-emerald-400/60' : color === 'amber' ? 'bg-amber-400/60' : color === 'purple' ? 'bg-purple-400/60' : 'bg-electric-400/60'
                        }`}
                        style={{
                            width: `${Math.min((value / 50) * 100, 100)}%`,
                            boxShadow: `0 0 8px ${color === 'emerald' ? 'rgba(52,211,153,0.3)' : color === 'amber' ? 'rgba(251,191,36,0.3)' : color === 'purple' ? 'rgba(192,132,252,0.3)' : 'rgba(129,140,248,0.3)'}`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ── Bar Chart ── */
function ActivityChart({ stats }) {
    const bars = [
        { label: 'Products', value: stats.total_products, color: 'bg-electric-400', delay: 0.1 },
        { label: 'Users', value: stats.total_users, color: 'bg-emerald-400', delay: 0.2 },
        { label: 'Admins', value: stats.total_admins, color: 'bg-amber-400', delay: 0.3 },
        { label: 'Clients', value: stats.total_clients, color: 'bg-purple-400', delay: 0.4 },
    ];
    const maxVal = Math.max(...bars.map(b => b.value), 1);

    return (
        <div className="premium-card p-6 opacity-0 animate-reveal" style={{ animationDelay: '0.55s' }}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/15">
                        <Activity className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Platform Pulse</h3>
                        <p className="text-[11px] text-obsidian-500 mt-0.5">Live composition overview</p>
                    </div>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-obsidian-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                    Live
                </span>
            </div>

            <div className="flex items-end justify-between gap-4 h-44">
                {bars.map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className="text-sm font-bold text-white tabular-nums">{bar.value}</span>
                        <div className="w-full rounded-lg bg-obsidian-800/60 relative overflow-hidden" style={{ height: '70%' }}>
                            <div
                                className={`absolute bottom-0 left-0 right-0 rounded-lg ${bar.color} animate-bar opacity-90`}
                                style={{
                                    height: `${(bar.value / maxVal) * 100}%`,
                                    animationDelay: `${bar.delay}s`,
                                    transformOrigin: 'bottom',
                                    boxShadow: `0 0 12px ${bar.color.replace('bg-', 'rgba(').replace('-400', ', 0.25)')}`
                                }}
                            />
                        </div>
                        <span className="text-[11px] font-medium text-obsidian-400 uppercase tracking-wider">{bar.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Quick Actions ── */
function QuickActions() {
    const actions = [
        {
            label: 'Manage Products',
            href: route('admin.products.index'),
            icon: Package,
            gradient: 'from-electric-500/15 to-electric-600/10',
            border: 'border-electric-500/20',
            text: 'text-electric-400',
            desc: 'View and manage your product catalog',
        },
        {
            label: 'Manage Users',
            href: route('admin.users.index'),
            icon: Users,
            gradient: 'from-emerald-500/15 to-emerald-600/10',
            border: 'border-emerald-500/20',
            text: 'text-emerald-400',
            desc: 'Oversee platform users and roles',
        },
        {
            label: 'Create Product',
            href: route('admin.products.create'),
            icon: ShoppingCart,
            gradient: 'from-amber-500/15 to-amber-600/10',
            border: 'border-amber-500/20',
            text: 'text-amber-400',
            desc: 'Add a new product to inventory',
        },
    ];

    return (
        <div className="premium-card p-6 opacity-0 animate-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/15">
                    <Zap className="h-4 w-4 text-electric-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">Quick Actions</h3>
                    <p className="text-[11px] text-obsidian-500 mt-0.5">Frequent operations</p>
                </div>
            </div>

            <div className="space-y-2.5">
                {actions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="group flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-obsidian-800/40 to-obsidian-900/30 border border-obsidian-600/15 hover:border-obsidian-500/30 hover:from-obsidian-800/60 transition-all duration-300"
                            style={{ animationDelay: `${0.65 + i * 0.08}s` }}
                        >
                            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} border ${action.border} group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className={`h-4 w-4 ${action.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white group-hover:text-electric-300 transition-colors">{action.label}</p>
                                <p className="text-xs text-obsidian-500 truncate">{action.desc}</p>
                            </div>
                            <ArrowRight className={`h-4 w-4 ${action.text} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Product Carousel Card ── */
function ProductCard({ product, index }) {
    const gradients = [
        'from-violet-500/10 via-fuchsia-500/5 to-transparent',
        'from-emerald-500/10 via-teal-500/5 to-transparent',
        'from-amber-500/10 via-orange-500/5 to-transparent',
        'from-sky-500/10 via-blue-500/5 to-transparent',
        'from-rose-500/10 via-pink-500/5 to-transparent',
    ];

    return (
        <div
            className="flex-shrink-0 w-56 group opacity-0 animate-reveal"
            style={{ animationDelay: `${0.7 + index * 0.08}s` }}
        >
            <div className="relative premium-card p-5 h-full overflow-hidden hover:-translate-y-1 transition-all duration-400 cursor-default">
                {/* Gradient mesh */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} pointer-events-none`} />
                {/* Glow corner */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-electric-500/10 rounded-full blur-xl group-hover:bg-electric-500/20 transition-all duration-500" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="p-2 rounded-lg bg-obsidian-800/60 border border-obsidian-600/20 group-hover:border-electric-500/25 transition-colors">
                            <Package className="h-3.5 w-3.5 text-electric-400 group-hover:text-electric-300 transition-colors" />
                        </div>
                        <span className="text-[11px] font-medium text-obsidian-500">{product.created_at}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-electric-200 transition-colors">
                        {product.name}
                    </h4>

                    <div className="flex items-center justify-between pt-3 border-t border-obsidian-600/20">
                        <span className="text-lg font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400">
                            ${Number(product.price).toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-obsidian-500">
                            <BarChart3 className="h-3 w-3" />
                            Product
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Main Dashboard ── */
export default function Dashboard({ stats, recent_products }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const userName = user?.name || 'Admin';
    const greeting = (() => {
        const h = new Date().getHours();
        if (h < 12) return 'Good morning';
        if (h < 17) return 'Good afternoon';
        return 'Good evening';
    })();

    const statCards = [
        { label: 'Total Products', value: stats.total_products, icon: Package, color: 'electric', gradient: 'from-electric-500/20 to-electric-600/10' },
        { label: 'Total Users', value: stats.total_users, icon: Users, color: 'emerald', gradient: 'from-emerald-500/20 to-emerald-600/10' },
        { label: 'Admins', value: stats.total_admins, icon: Shield, color: 'amber', gradient: 'from-amber-500/20 to-amber-600/10' },
        { label: 'Clients', value: stats.total_clients, icon: UserCheck, color: 'purple', gradient: 'from-purple-500/20 to-purple-600/10' },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/20 flex-shrink-0">
                            <LayoutDashboard className="h-5 w-5 text-electric-400" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-white">Dashboard</h2>
                            <p className="text-xs text-obsidian-500 mt-0.5">Platform overview & analytics</p>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <LiveClock />
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Aurora background decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-electric-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent blur-3xl animate-aurora-2" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* ─── Hero section ─── */}
                    <div className="flex items-end justify-between mb-10 opacity-0 animate-reveal" style={{ animationDelay: '0.05s' }}>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-electric-300 to-emerald-400">{userName.split(' ')[0]}</span>
                                <Sparkles className="inline h-6 w-6 ml-2 text-amber-400/70 -translate-y-1" />
                            </h1>
                            <p className="mt-2 text-sm text-obsidian-400 max-w-lg">
                                Your platform is running smoothly. Here's what's happening today.
                            </p>
                        </div>
                    </div>

                    {/* ─── Stat Galaxy ─── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {statCards.map((card, i) => (
                            <StatCard key={card.label} {...card} index={i} />
                        ))}
                    </div>

                    {/* ─── Middle row ─── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                        <div className="lg:col-span-2">
                            <ActivityChart stats={stats} />
                        </div>
                        <div>
                            <QuickActions />
                        </div>
                    </div>

                    {/* ─── Recent Products Carousel ─── */}
                    <div className="opacity-0 animate-reveal" style={{ animationDelay: '0.65s' }}>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/15">
                                    <TrendingUp className="h-4 w-4 text-electric-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Recent Products</h3>
                                    <p className="text-[11px] text-obsidian-500 mt-0.5">{recent_products.length} latest additions</p>
                                </div>
                            </div>
                            <Link href={route('admin.products.index')} className="flex items-center gap-1.5 text-xs font-semibold text-electric-400 hover:text-electric-300 transition-colors">
                                View all <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                            <div className="flex gap-4 pb-2">
                                {recent_products.length > 0 ? (
                                    recent_products.map((product, i) => (
                                        <ProductCard key={product.id} product={product} index={i} />
                                    ))
                                ) : (
                                    <div className="flex items-center gap-4 py-12 text-obsidian-500">
                                        <Package className="h-6 w-6" />
                                        <span className="text-sm">No products yet.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
