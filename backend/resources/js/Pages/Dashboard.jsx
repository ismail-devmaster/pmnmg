import { Head, Link, router, usePage } from '@inertiajs/react';
import { Package, ShoppingBag, User, LogOut, ChevronDown, LayoutDashboard, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ products }) {
    const user = usePage().props.auth.user;
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => router.post(route('logout'));

    const statCards = [
        { label: 'Available Products', value: products.length, icon: Package, color: 'electric', gradient: 'from-electric-500/20 to-electric-600/10' },
        { label: 'Account Type', value: user.role.charAt(0).toUpperCase() + user.role.slice(1), icon: User, color: 'emerald', gradient: 'from-emerald-500/20 to-emerald-600/10' },
    ];

    return (
        <div className="min-h-screen bg-obsidian-950">
            <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0" />
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-electric-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/4 via-transparent to-transparent blur-3xl animate-aurora-2" />
            </div>

            <header className="sticky top-0 z-30 h-16 flex items-center justify-between border-b border-obsidian-600/15 bg-obsidian-950/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 safe-area-padding">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow flex-shrink-0">
                        <ShoppingBag className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight truncate">Product Store</span>
                </div>

                <div className="relative flex-shrink-0">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 sm:gap-3 rounded-xl px-2 sm:px-3 py-2 text-sm text-obsidian-300 hover:bg-obsidian-800/50 hover:text-white transition-all duration-200 focus:outline-none touch-target"
                    >
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-electric-400">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="hidden sm:inline font-medium truncate max-w-[100px]">{user.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                            <div className="absolute right-0 sm:right-0 left-auto sm:left-auto mt-2 w-56 py-2 rounded-xl bg-obsidian-800/95 backdrop-blur-xl border border-obsidian-600/20 shadow-glass z-50 animate-slide-up">
                                <div className="px-4 py-2 border-b border-obsidian-600/20">
                                    <p className="text-sm font-semibold text-white">{user.name}</p>
                                    <p className="text-xs text-obsidian-400 truncate">{user.email}</p>
                                </div>
                                <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-colors" onClick={() => setProfileOpen(false)}>
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                    <LogOut className="h-4 w-4" />
                                    Log Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </header>

            {usePage().props.flash?.success && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="flash-success animate-slide-up">{usePage().props.flash.success}</div>
                </div>
            )}

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Greeting */}
                    <div className="mb-8 opacity-0 animate-reveal">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400">{user.name.split(' ')[0]}</span>
                        </h1>
                        <p className="mt-1 text-sm text-obsidian-400">Browse our product catalog</p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                        {statCards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div key={card.label} className="opacity-0 animate-reveal" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                                    <div className="relative bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 hover:border-electric-500/25 transition-all duration-300 overflow-hidden group">
                                        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full blur-2xl pointer-events-none`} />
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} border border-white/5`}>
                                                <Icon className={`h-5 w-5 ${card.color === 'emerald' ? 'text-emerald-400' : 'text-electric-400'}`} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">{card.label}</p>
                                                <p className="text-2xl font-bold text-white mt-0.5">{card.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Products table (md+) */}
                    <div className="hidden md:block opacity-0 animate-reveal" style={{ animationDelay: '0.3s' }}>
                        <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card overflow-hidden">
                            <div className="px-4 sm:px-6 py-5 border-b border-obsidian-600/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/15">
                                            <TrendingUp className="h-4 w-4 text-electric-400" />
                                        </div>
                                        <h3 className="text-sm font-bold text-white">Product Catalog</h3>
                                    </div>
                                    <span className="text-xs text-obsidian-500">{products.length} items</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table-premium">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th className="hidden lg:table-cell">Description</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id} className="group">
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-lg bg-obsidian-700/50 border border-obsidian-600/20 flex items-center justify-center group-hover:border-electric-500/20 transition-colors flex-shrink-0">
                                                            <Package className="h-4 w-4 text-obsidian-400 group-hover:text-electric-400 transition-colors" />
                                                        </div>
                                                        <span className="font-semibold text-white">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="text-obsidian-400 max-w-xs truncate text-sm hidden lg:table-cell">
                                                    {product.description || <span className="text-obsidian-600 italic">No description</span>}
                                                </td>
                                                <td>
                                                    <span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400">
                                                        ${parseFloat(product.price).toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="empty-state">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <Package className="h-8 w-8 text-obsidian-500" />
                                                        <p className="text-obsidian-400">No products available.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Products mobile cards (< md) */}
                    <div className="md:hidden space-y-3 opacity-0 animate-reveal" style={{ animationDelay: '0.3s' }}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="table-card">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="h-9 w-9 rounded-lg bg-obsidian-700/50 border border-obsidian-600/20 flex items-center justify-center flex-shrink-0">
                                                <Package className="h-4 w-4 text-electric-400" />
                                            </div>
                                            <span className="font-semibold text-white truncate">{product.name}</span>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400 flex-shrink-0">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </span>
                                    </div>
                                    {product.description && (
                                        <p className="text-xs text-obsidian-400 line-clamp-2">{product.description}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-12 text-obsidian-500">
                                <Package className="h-8 w-8 text-obsidian-500" />
                                <p className="text-obsidian-400">No products available.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
