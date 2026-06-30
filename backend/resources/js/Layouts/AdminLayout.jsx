import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LayoutDashboard, Package, Users, Menu, X, ChevronDown, LogOut, Home, Shield } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
    { name: 'Products', href: route('admin.products.index'), icon: Package },
    { name: 'Users', href: route('admin.users.index'), icon: Users },
];

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const isActive = (href) => {
        const path = href.replace(/\?.*$/, '');
        return window.location.pathname === path || window.location.pathname.startsWith(path + '/');
    };

    return (
        <div className="min-h-screen bg-obsidian-950">
            {/* Background noise texture */}
            <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0" />

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-obsidian-900/95 backdrop-blur-xl border-r border-obsidian-600/20 transform transition-transform duration-300 ease-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Brand gradient */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-electric-600/8 to-transparent pointer-events-none" />

                <div className="relative flex h-16 items-center justify-between px-6 border-b border-obsidian-600/15">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-3 group">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500 to-electric-600 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                            <Home className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">Product Admin</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-obsidian-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="relative mt-6 px-3">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
                                >
                                    <Icon className={`h-5 w-5 ${active ? 'text-electric-400' : ''}`} />
                                    {item.name}
                                    {active && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-electric-400 shadow-glow" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Sidebar footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-obsidian-600/15">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-obsidian-800/40">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500/20 to-electric-600/20 border border-electric-500/20">
                            <Shield className="h-4 w-4 text-electric-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-obsidian-200 uppercase tracking-wider">Admin</p>
                            <p className="text-xs text-obsidian-400 truncate">Full Access</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 flex items-center justify-between border-b border-obsidian-600/15 bg-obsidian-950/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
                    <button onClick={() => setSidebarOpen(true)} className="text-obsidian-400 hover:text-white transition-colors lg:hidden">
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="hidden lg:block" />

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

                {/* Page header */}
                {header && (
                    <div className="border-b border-obsidian-600/15 bg-obsidian-900/30 backdrop-blur-sm">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </div>
                )}

                {/* Flash messages */}
                {usePage().props.flash?.success && (
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="flash-success animate-slide-up">{usePage().props.flash.success}</div>
                    </div>
                )}

                {/* Page content */}
                <main className="relative">{children}</main>
            </div>
        </div>
    );
}
