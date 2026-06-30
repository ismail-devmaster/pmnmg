import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Package, ArrowLeft, Save } from 'lucide-react';

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
                        <Package className="h-5 w-5 text-electric-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Edit Product</h2>
                </div>
            }
        >
            <Head title={`Edit ${product.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <Link href={route('admin.products.index')} className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft className="h-4 w-4" />
                            Back to products
                        </Link>

                        <div className="premium-card p-8 opacity-0 animate-slide-up">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="label-premium">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="input-premium"
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Description</label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        className="textarea-premium"
                                        rows="4"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <label className="label-premium">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        className="input-premium"
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <button type="submit" disabled={processing} className="btn-premium">
                                        <Save className="h-4 w-4" />
                                        {processing ? 'Saving...' : 'Update Product'}
                                    </button>
                                    <Link href={route('admin.products.index')} className="btn-ghost">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
