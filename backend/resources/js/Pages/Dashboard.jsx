import { Head, Link, router, usePage } from '@inertiajs/react';
import { Package, ShoppingBag, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ products }) {
    const user = usePage().props.auth.user;
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-obsidian-950">
            <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0" />

            <header className="sticky top-0 z-30 h-16 flex items-center justify-between border-b border-obsidian-600/15 bg-obsidian-950/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow">
                        <ShoppingBag className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">Product Store</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-obsidian-300 hover:bg-obsidian-800/50 hover:text-white transition-all duration-200 focus:outline-none"
                    >
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-electric-400">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="hidden sm:inline font-medium">{user.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                            <div className="absolute right-0 mt-2 w-56 py-2 rounded-xl bg-obsidian-800/95 backdrop-blur-xl border border-obsidian-600/20 shadow-glass z-50 animate-slide-up">
                                <div className="px-4 py-2 border-b border-obsidian-600/20">
                                    <p className="text-sm font-semibold text-white">{user.name}</p>
                                    <p className="text-xs text-obsidian-400">{user.email}</p>
                                </div>
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-colors"
                                    onClick={() => setProfileOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                >
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

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
                            <LayoutDashboard className="h-5 w-5 text-electric-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Client Dashboard</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                        <div className="stat-card opacity-0 animate-slide-up stagger-1">
                            <div className="stat-icon bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/20">
                                <Package className="h-5 w-5 text-electric-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">Available Products</p>
                                <p className="text-2xl font-bold text-white mt-0.5">{products.length}</p>
                            </div>
                        </div>
                        <div className="stat-card opacity-0 animate-slide-up stagger-2">
                            <div className="stat-icon bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20">
                                <User className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">Account Type</p>
                                <p className="text-2xl font-bold text-white mt-0.5 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card opacity-0 animate-slide-up stagger-3">
                        <div className="px-6 py-5 border-b border-obsidian-600/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-electric-500/10">
                                    <Package className="h-4 w-4 text-electric-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Products</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-premium">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="group">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-lg bg-obsidian-700/50 border border-obsidian-600/20 flex items-center justify-center group-hover:border-electric-500/20 transition-colors">
                                                        <Package className="h-4 w-4 text-obsidian-400 group-hover:text-electric-400 transition-colors" />
                                                    </div>
                                                    <span className="font-semibold text-white">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-obsidian-400 max-w-xs truncate">{product.description}</td>
                                            <td>
                                                <span className="font-mono text-electric-300">${parseFloat(product.price).toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="empty-state">No products available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}