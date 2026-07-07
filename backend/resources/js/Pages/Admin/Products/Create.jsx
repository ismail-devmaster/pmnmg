import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Package, ArrowLeft, Sparkles, DollarSign, Tag, FileText, Eye } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            onFinish: () => reset('name', 'description', 'price'),
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/20">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Create Product</h2>
                        <p className="text-xs text-obsidian-500 mt-0.5">Add a new product to the catalog</p>
                    </div>
                </div>
            }
        >
            <Head title="Create Product" />

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent blur-3xl animate-aurora" />
            </div>

            <div className="relative z-10 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('admin.products.index')} className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-4 sm:mb-6 opacity-0 animate-reveal">
                        <ArrowLeft className="h-4 w-4" />
                        Back to products
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* ─── Form (renders before preview on mobile due to DOM order) ─── */}
                        <div className="lg:col-span-2 opacity-0 animate-reveal" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 sm:p-8">
                                <form onSubmit={submit} className="space-y-5 sm:space-y-6">
                                    <div>
                                        <label className="label-premium flex items-center gap-2">
                                            <Tag className="h-3.5 w-3.5 text-emerald-400" />
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="input-premium"
                                            placeholder="Enter product name"
                                            autoFocus
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="label-premium flex items-center gap-2">
                                            <FileText className="h-3.5 w-3.5 text-emerald-400" />
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            className="textarea-premium"
                                            rows="5"
                                            placeholder="Describe your product..."
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    <div>
                                        <label className="label-premium flex items-center gap-2">
                                            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                                            Price
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-400 font-mono text-sm">$</span>
                                            <input
                                                type="number"
                                                name="price"
                                                step="0.01"
                                                min="0"
                                                value={data.price}
                                                className="input-premium pl-8"
                                                placeholder="0.00"
                                                onChange={(e) => setData('price', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.price} className="mt-2" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-obsidian-600/20">
                                        <button type="submit" disabled={processing} className="btn-premium justify-center">
                                            <Sparkles className="h-4 w-4" />
                                            {processing ? 'Creating...' : 'Create Product'}
                                        </button>
                                        <Link href={route('admin.products.index')} className="btn-ghost justify-center">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* ─── Preview Card ─── */}
                        <div className="opacity-0 animate-reveal" style={{ animationDelay: '0.15s' }}>
                            <div className="lg:sticky lg:top-24">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/15">
                                        <Eye className="h-3.5 w-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-obsidian-400 uppercase tracking-wider">Preview</span>
                                </div>
                                <div className="bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/60 backdrop-blur-xl rounded-2xl border border-obsidian-600/15 shadow-card p-5 sm:p-6 overflow-hidden group hover:border-emerald-500/25 transition-all duration-300">
                                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:opacity-80 transition-opacity" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2.5 rounded-xl bg-obsidian-800/60 border border-obsidian-600/20 group-hover:border-emerald-500/25 transition-colors">
                                                <Package className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{data.name || 'Product Name'}</p>
                                                <p className="text-[11px] text-obsidian-500">New Product</p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-gradient-to-r from-obsidian-600/30 via-obsidian-600/10 to-transparent mb-4" />
                                        <p className="text-xs text-obsidian-400 leading-relaxed min-h-[3rem]">
                                            {data.description || <span className="text-obsidian-600 italic">No description yet</span>}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-obsidian-600/20">
                                            <span className="text-xs font-semibold text-obsidian-500 uppercase tracking-wider">Price</span>
                                            <p className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-electric-400 mt-1">
                                                ${Number(data.price || 0).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
