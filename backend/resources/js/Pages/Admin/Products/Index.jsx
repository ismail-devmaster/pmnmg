import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Package, Search, X, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ products }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [search, setSearch] = useState('');

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

    const filteredProducts = products.data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
                            <Package className="h-5 w-5 text-electric-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Products</h2>
                    </div>
                    <Link href={route('admin.products.create')} className="btn-premium">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                </div>
            }
        >
            <Head title="Products" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Search */}
                    <div className="mb-6 relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-obsidian-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-premium pl-11"
                        />
                    </div>

                    <div className="premium-card overflow-hidden">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Created</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <tr key={product.id} className={`opacity-0 animate-slide-up stagger-${Math.min(index + 1, 5)} group`}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/15 border border-electric-500/15 flex items-center justify-center group-hover:border-electric-500/30 transition-all duration-200">
                                                    <Package className="h-4 w-4 text-electric-400" />
                                                </div>
                                                <span className="font-semibold text-white">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-obsidian-400 max-w-xs truncate">{product.description || '—'}</td>
                                        <td>
                                            <span className="font-mono text-sm font-semibold text-electric-300">${product.price.toFixed(2)}</span>
                                        </td>
                                        <td className="text-obsidian-400">{product.created_at}</td>
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    className="btn-ghost text-xs px-3 py-1.5"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => confirmDeletion(product)}
                                                    className="btn-danger text-xs px-3 py-1.5"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
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

                        {products.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-obsidian-600/20 flex items-center justify-between">
                                <p className="text-sm text-obsidian-400">
                                    Page <span className="font-semibold text-white">{products.current_page}</span> of{' '}
                                    <span className="font-semibold text-white">{products.last_page}</span>
                                </p>
                                <div className="flex gap-2">
                                    {products.current_page > 1 && (
                                        <Link href={products.prev_page_url} className="pagination-link">
                                            <ChevronLeft className="h-4 w-4" />
                                        </Link>
                                    )}
                                    {products.current_page < products.last_page && (
                                        <Link href={products.next_page_url} className="pagination-link">
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    )}
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
                            <button onClick={deleteProduct} className="btn-danger bg-red-500/10">
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
