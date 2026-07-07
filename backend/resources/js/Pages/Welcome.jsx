import { Head, Link } from '@inertiajs/react';
import { Shield, ArrowRight, Package, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-obsidian-950 overflow-hidden">
                {/* Background effects */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-electric-500/8 via-transparent to-transparent blur-3xl animate-aurora" />
                    <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-emerald-500/6 via-transparent to-transparent blur-3xl animate-aurora-2" />
                    <div className="absolute inset-0 bg-noise opacity-20" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Navigation */}
                <nav className="relative z-10 border-b border-obsidian-600/15 bg-obsidian-950/80 backdrop-blur-xl">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow">
                                    <Shield className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white tracking-tight">Product Admin</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="btn-premium">
                                        Dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="btn-ghost">Sign In</Link>
                                        <Link href={route('register')} className="btn-premium">
                                            Get Started
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-reveal">
                                <Sparkles className="h-3 w-3" />
                                Premium Administration Portal
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 animate-reveal stagger-1">
                                Manage your products
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-electric-300 to-emerald-400">
                                    with precision
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-obsidian-300 leading-relaxed max-w-2xl mx-auto mb-10 animate-reveal stagger-2">
                                A premium dashboard for managing your product catalog, users, and system settings — all wrapped in a modern, intuitive interface.
                            </p>

                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-reveal stagger-3">
                                    <Link href={route('register')} className="btn-premium text-base px-8 py-3 w-full sm:w-auto justify-center">
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link href={route('login')} className="btn-ghost text-base px-8 py-3 w-full sm:w-auto justify-center">
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="relative z-10 pb-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Package,
                                    title: 'Product Management',
                                    desc: 'Full CRUD operations with search, sort, and pagination. Manage your catalog with ease.',
                                    gradient: 'from-electric-500/20 to-electric-600/10',
                                    border: 'border-electric-500/20',
                                    iconColor: 'text-electric-400'
                                },
                                {
                                    icon: Users,
                                    title: 'User Administration',
                                    desc: 'Manage users, roles, and permissions. Toggle verification and account status.',
                                    gradient: 'from-emerald-500/20 to-emerald-600/10',
                                    border: 'border-emerald-500/20',
                                    iconColor: 'text-emerald-400'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Platform Analytics',
                                    desc: 'Real-time dashboard with key metrics, activity charts, and recent product tracking.',
                                    gradient: 'from-amber-500/20 to-amber-600/10',
                                    border: 'border-amber-500/20',
                                    iconColor: 'text-amber-400'
                                }
                            ].map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.title} className="opacity-0 animate-reveal" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                                        <div className="h-full bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-8 hover:shadow-card-hover hover:border-electric-500/25 transition-all duration-300 group">
                                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.border} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-sm text-obsidian-400 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-obsidian-600/15">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-obsidian-500">
                            Product Administration Portal &mdash; Built with Laravel &amp; React
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
