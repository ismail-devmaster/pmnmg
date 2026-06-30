import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Package, Users, Shield, UserCheck, TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard({ stats, recent_products }) {
    const statCards = [
        { name: 'Total Products', value: stats.total_products, icon: Package, gradient: 'from-blue-500/20 to-blue-600/20', iconColor: 'text-blue-400', borderColor: 'border-blue-500/20' },
        { name: 'Total Users', value: stats.total_users, icon: Users, gradient: 'from-emerald-500/20 to-emerald-600/20', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/20' },
        { name: 'Admins', value: stats.total_admins, icon: Shield, gradient: 'from-amber-500/20 to-amber-600/20', iconColor: 'text-amber-400', borderColor: 'border-amber-500/20' },
        { name: 'Clients', value: stats.total_clients, icon: UserCheck, gradient: 'from-purple-500/20 to-purple-600/20', iconColor: 'text-purple-400', borderColor: 'border-purple-500/20' },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
                        <TrendingUp className="h-5 w-5 text-electric-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {statCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.name}
                                    className={`stat-card opacity-0 animate-slide-up stagger-${index + 1}`}
                                >
                                    <div className={`stat-icon bg-gradient-to-br ${card.gradient} border ${card.borderColor}`}>
                                        <Icon className={`h-5 w-5 ${card.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">{card.name}</p>
                                        <p className="text-2xl font-bold text-white mt-0.5">{card.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Recent Products */}
                    <div className="premium-card opacity-0 animate-slide-up stagger-5">
                        <div className="px-6 py-5 border-b border-obsidian-600/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-electric-500/10">
                                    <Package className="h-4 w-4 text-electric-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Recent Products</h3>
                            </div>
                            <a href={route('admin.products.index')} className="flex items-center gap-1.5 text-sm font-medium text-electric-400 hover:text-electric-300 transition-colors">
                                View all <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-premium">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_products.map((product) => (
                                        <tr key={product.id} className="group">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-lg bg-obsidian-700/50 border border-obsidian-600/20 flex items-center justify-center group-hover:border-electric-500/20 transition-colors">
                                                        <Package className="h-4 w-4 text-obsidian-400 group-hover:text-electric-400 transition-colors" />
                                                    </div>
                                                    <span className="font-semibold text-white">{product.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-mono text-electric-300">${product.price.toFixed(2)}</span>
                                            </td>
                                            <td className="text-obsidian-400">{product.created_at}</td>
                                        </tr>
                                    ))}
                                    {recent_products.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="empty-state">No products yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
