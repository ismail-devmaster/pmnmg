import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingBag, Package, User, LogOut, ChevronDown, LayoutDashboard, Menu, X } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => router.post(route('logout'));

    const isClient = user?.role === 'client';

    return (
        <div className="min-h-screen bg-obsidian-950">
            <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0" />

            {/* Top navigation */}
            <header className="sticky top-0 z-30 border-b border-obsidian-600/15 bg-obsidian-950/80 backdrop-blur-xl safe-area-padding">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left side */}
                        <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
                            <Link href={isClient ? route('dashboard') : route('admin.dashboard')} className="flex items-center gap-3 group flex-shrink-0">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                                    <ShoppingBag className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                                    {isClient ? 'Product Store' : 'Product Admin'}
                                </span>
                            </Link>

                            {/* Desktop nav */}
                            <nav className="hidden sm:flex items-center gap-1 ml-2 lg:ml-4 flex-shrink-0">
                                {isClient ? (
                                    <Link
                                        href={route('dashboard')}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            route().current('dashboard')
                                                ? 'bg-electric-600/15 text-electric-400'
                                                : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('admin.dashboard')} className={`px-2.5 lg:px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${route().current('admin.dashboard') ? 'bg-electric-600/15 text-electric-400' : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white'}`}>Dashboard</Link>
                                        <Link href={route('admin.products.index')} className={`px-2.5 lg:px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${route().current('admin.products.*') ? 'bg-electric-600/15 text-electric-400' : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white'}`}>Products</Link>
                                        <Link href={route('admin.users.index')} className={`px-2.5 lg:px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${route().current('admin.users.*') ? 'bg-electric-600/15 text-electric-400' : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white'}`}>Users</Link>
                                    </>
                                )}
                            </nav>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            {/* Profile dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 sm:gap-3 rounded-xl px-2 sm:px-3 py-2 text-sm text-obsidian-300 hover:bg-obsidian-800/50 hover:text-white transition-all duration-200 focus:outline-none touch-target"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-electric-400">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <span className="hidden sm:inline font-medium truncate max-w-[120px]">{user.name}</span>
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
                                                <User className="h-4 w-4" />
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

                            {/* Mobile menu button */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-2 text-obsidian-400 hover:text-white transition-colors touch-target">
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile nav */}
                {mobileMenuOpen && (
                    <div className="sm:hidden border-t border-obsidian-600/15 bg-obsidian-900/95 backdrop-blur-xl animate-slide-up">
                        <div className="space-y-1 px-4 py-3">
                            {isClient ? (
                                <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-all touch-target" onClick={() => setMobileMenuOpen(false)}>
                                    <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('admin.dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-all touch-target" onClick={() => setMobileMenuOpen(false)}>
                                        <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                                        Dashboard
                                    </Link>
                                    <Link href={route('admin.products.index')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-all touch-target" onClick={() => setMobileMenuOpen(false)}>
                                        <Package className="h-4 w-4 flex-shrink-0" />
                                        Products
                                    </Link>
                                    <Link href={route('admin.users.index')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white transition-all touch-target" onClick={() => setMobileMenuOpen(false)}>
                                        <User className="h-4 w-4 flex-shrink-0" />
                                        Users
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Flash messages */}
            {usePage().props.flash?.success && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="flash-success animate-slide-up">{usePage().props.flash.success}</div>
                </div>
            )}
            {usePage().props.flash?.error && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="flash-error animate-slide-up">{usePage().props.flash.error}</div>
                </div>
            )}

            {/* Page header */}
            {header && (
                <div className="border-b border-obsidian-600/15 bg-obsidian-900/30 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            {/* Page content */}
            <main className="relative">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
