import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Plus, Pencil, Trash2, Package, Search, AlertCircle, ChevronUp, ChevronDown,
    ShoppingBag, TrendingUp, Clock, DollarSign, Filter, X, Sparkles
} from 'lucide-react';

/* ── Animated Counter ── */
function AnimatedCounter({ value, duration = 1200 }) {
    const [display, setDisplay] = useState(0);
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
    return <span className="tabular-nums">{display.toLocaleString()}</span>;
}

export default function Index({ products, filters }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [search, setSearch] = useState(filters.search || '');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [perPage, setPerPage] = useState(filters.per_page || 10);

    const sortField = filters.sort || 'created_at';
    const sortDir = filters.dir || 'desc';

    const totalProducts = products.total;
    const avgPrice = products.data.length > 0
        ? products.data.reduce((s, p) => s + Number(p.price), 0) / products.data.length
        : 0;

    const handleSearch = (value) => {
        setSearch(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const t = setTimeout(() => {
            router.get(route('admin.products.index'), {
                search: value || '',
                sort: sortField,
                dir: sortDir,
                per_page: perPage,
            }, { preserveState: true, preserveScroll: true });
        }, 400);
        setSearchTimeout(t);
    };

    useEffect(() => {
        return () => { if (searchTimeout) clearTimeout(searchTimeout); };
    }, [searchTimeout]);

    const handleSort = (field) => {
        const dir = sortField === field && sortDir === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.products.index'), {
            search,
            sort: field,
            dir,
            per_page: perPage,
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPage = (value) => {
        setPerPage(value);
        router.get(route('admin.products.index'), {
            search,
            sort: sortField,
            dir: sortDir,
            per_page: value,
        }, { preserveState: true, preserveScroll: true });
    };

    const confirmDeletion = (product) => {
        setProductToDelete(product);
        setConfirmingDeletion(true);
    };

    const deleteProduct = () => {
        router.delete(route('admin.products.destroy', productToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setProductToDelete(null);
            },
        });
    };

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <ChevronUp className="h-3 w-3 text-obsidian-500" />;
        return sortDir === 'asc'
            ? <ChevronUp className="h-3 w-3 text-electric-400" />
            : <ChevronDown className="h-3 w-3 text-electric-400" />;
    };

    const priceCards = [
        { label: 'Total Products', value: totalProducts, icon: ShoppingBag, color: 'electric', gradient: 'from-electric-500/20 to-electric-600/10' },
        { label: 'Active Items', value: totalProducts, icon: TrendingUp, color: 'emerald', gradient: 'from-emerald-500/20 to-emerald-600/10' },
        { label: 'Avg Price', icon: DollarSign, color: 'amber', gradient: 'from-amber-500/20 to-amber-600/10', value: `$${avgPrice.toFixed(2)}` },
        { label: 'Latest', icon: Clock, color: 'purple', gradient: 'from-purple-500/20 to-purple-600/10', value: products.data[0]?.created_at || '—' },
    ];

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/20">
                            <Package className="h-5 w-5 text-electric-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Products</h2>
                            <p className="text-xs text-obsidian-500 mt-0.5">{totalProducts} total items in catalog</p>
                        </div>
                    </div>
                    <Link href={route('admin.products.create')} className="btn-premium">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-electric-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/4 via-transparent to-transparent blur-3xl animate-aurora-2" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* ─── Mini stat row ─── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {priceCards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <div key={card.label} className="opacity-0 animate-reveal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                                    <div className="relative bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-4 hover:border-electric-500/25 transition-all duration-300 overflow-hidden">
                                        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full blur-2xl pointer-events-none`} />
                                        <div className="relative z-10 flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient} border border-white/5`}>
                                                <Icon className={`h-4 w-4 ${card.color === 'emerald' ? 'text-emerald-400' : card.color === 'amber' ? 'text-amber-400' : card.color === 'purple' ? 'text-purple-400' : 'text-electric-400'}`} />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-obsidian-500 uppercase tracking-wider">{card.label}</p>
                                                <p className="text-sm font-bold text-white mt-0.5">{card.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ─── Search & Filters ─── */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 opacity-0 animate-reveal" style={{ animationDelay: '0.35s' }}>
                        <div className="relative flex-1 min-w-0 w-full sm:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                            <input
                                type="text"
                                placeholder="Search by name or description..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="input-premium pl-11"
                            />
                            {search && (
                                <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian-500 hover:text-white transition-colors p-1 touch-target">
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button onClick={() => setShowFilters(!showFilters)} className={`btn-ghost text-xs px-3 py-2.5 ${showFilters ? 'border-electric-500/40 text-electric-400' : ''}`}>
                                <Filter className="h-3.5 w-3.5" />
                                Options
                            </button>
                            {showFilters && (
                                <select value={perPage} onChange={(e) => handlePerPage(e.target.value)} className="input-premium w-auto min-w-[110px]">
                                    <option value="10">10 / page</option>
                                    <option value="25">25 / page</option>
                                    <option value="50">50 / page</option>
                                </select>
                            )}
                        </div>
                    </div>

                    {/* ─── Products Table (md+) ─── */}
                    <div className="hidden md:block opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table-premium">
                                    <thead>
                                        <tr>
                                            <th>
                                                <button onClick={() => handleSort('name')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                                    Product <SortIcon field="name" />
                                                </button>
                                            </th>
                                            <th className="hidden lg:table-cell">Description</th>
                                            <th>
                                                <button onClick={() => handleSort('price')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                                    Price <SortIcon field="price" />
                                                </button>
                                            </th>
                                            <th className="hidden lg:table-cell">
                                                <button onClick={() => handleSort('created_at')} className="inline-flex items-center gap-1 hover:text-white transition-colors">
                                                    Created <SortIcon field="created_at" />
                                                </button>
                                            </th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product, index) => (
                                            <tr key={product.id} className="group opacity-0 animate-reveal" style={{ animationDelay: `${0.45 + index * 0.04}s` }}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/15 border border-electric-500/15 flex items-center justify-center group-hover:border-electric-500/30 group-hover:shadow-glow transition-all duration-300 flex-shrink-0">
                                                            <Package className="h-4 w-4 text-electric-400" />
                                                        </div>
                                                        <span className="font-semibold text-white group-hover:text-electric-200 transition-colors">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="text-obsidian-400 max-w-xs truncate text-sm hidden lg:table-cell">
                                                    {product.description || <span className="text-obsidian-600 italic">No description</span>}
                                                </td>
                                                <td>
                                                    <span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400">
                                                        ${Number(product.price).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="text-obsidian-400 text-sm hidden lg:table-cell">{product.created_at}</td>
                                                <td>
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={route('admin.products.edit', product.id)} className="btn-ghost text-xs px-3 py-1.5 touch-target">
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">Edit</span>
                                                        </Link>
                                                        <button onClick={() => confirmDeletion(product)} className="btn-danger text-xs px-3 py-1.5 touch-target">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.data.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="empty-state">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20">
                                                            <Package className="h-8 w-8 text-obsidian-500" />
                                                        </div>
                                                        <p className="text-obsidian-400">No products found.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {products.last_page > 1 && (
                                <div className="px-4 sm:px-6 py-4 border-t border-obsidian-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <p className="text-sm text-obsidian-400">
                                        Showing <span className="font-semibold text-white">{products.from}</span> to{' '}
                                        <span className="font-semibold text-white">{products.to}</span> of{' '}
                                        <span className="font-semibold text-white">{products.total}</span>
                                    </p>
                                    <div className="flex gap-1.5 flex-wrap justify-center">
                                        {products.links.filter(l => !l.label.includes('Previous') && !l.label.includes('Next')).map((link) => (
                                            <button
                                                key={link.label}
                                                onClick={() => router.get(link.url, { search, sort: sortField, dir: sortDir, per_page: perPage }, { preserveState: true, preserveScroll: true })}
                                                className={`pagination-link ${link.active ? 'pagination-link-active' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ─── Products Mobile Cards (< md) ─── */}
                    <div className="md:hidden space-y-3 opacity-0 animate-reveal" style={{ animationDelay: '0.4s' }}>
                        {products.data.length > 0 ? (
                            products.data.map((product, index) => (
                                <div key={product.id} className="table-card" style={{ animationDelay: `${0.45 + index * 0.04}s` }}>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/15 border border-electric-500/15 flex items-center justify-center flex-shrink-0">
                                                <Package className="h-4 w-4 text-electric-400" />
                                            </div>
                                            <span className="font-semibold text-white truncate">{product.name}</span>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-emerald-400 flex-shrink-0">
                                            ${Number(product.price).toFixed(2)}
                                        </span>
                                    </div>
                                    {product.description && (
                                        <p className="text-xs text-obsidian-400 line-clamp-2">{product.description}</p>
                                    )}
                                    <div className="flex items-center justify-between pt-2 border-t border-obsidian-600/15">
                                        <span className="text-[11px] text-obsidian-500">{product.created_at}</span>
                                        <div className="flex items-center gap-2">
                                            <Link href={route('admin.products.edit', product.id)} className="btn-ghost text-xs px-3 py-1.5 touch-target">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Link>
                                            <button onClick={() => confirmDeletion(product)} className="btn-danger text-xs px-3 py-1.5 touch-target">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-12 text-obsidian-500">
                                <div className="p-4 rounded-2xl bg-obsidian-800/50 border border-obsidian-600/20">
                                    <Package className="h-8 w-8 text-obsidian-500" />
                                </div>
                                <p className="text-obsidian-400">No products found.</p>
                            </div>
                        )}

                        {products.last_page > 1 && (
                            <div className="flex flex-col items-center gap-3 pt-4">
                                <p className="text-sm text-obsidian-400">
                                    Showing <span className="font-semibold text-white">{products.from}</span> to{' '}
                                    <span className="font-semibold text-white">{products.to}</span> of{' '}
                                    <span className="font-semibold text-white">{products.total}</span>
                                </p>
                                <div className="flex gap-1.5 flex-wrap justify-center">
                                    {products.links.filter(l => !l.label.includes('Previous') && !l.label.includes('Next')).map((link) => (
                                        <button
                                            key={link.label}
                                            onClick={() => router.get(link.url, { search, sort: sortField, dir: sortDir, per_page: perPage }, { preserveState: true, preserveScroll: true })}
                                            className={`pagination-link ${link.active ? 'pagination-link-active' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {confirmingDeletion && (
                <div className="modal-backdrop flex items-center justify-center" onClick={() => setConfirmingDeletion(false)}>
                    <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Delete Product</h3>
                        </div>
                        <p className="text-sm text-obsidian-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">{productToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button onClick={() => setConfirmingDeletion(false)} className="btn-ghost">Cancel</button>
                            <button onClick={deleteProduct} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
