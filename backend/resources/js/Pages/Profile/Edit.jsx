import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500/15 to-electric-600/10 border border-electric-500/20">
                        <User className="h-5 w-5 text-electric-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Profile</h2>
                        <p className="text-xs text-obsidian-500 mt-0.5">Manage your account settings</p>
                    </div>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="max-w-3xl space-y-6">
                <div className="premium-card p-5 sm:p-8">
                    <UpdateProfileInformationForm />
                </div>
                <div className="premium-card p-5 sm:p-8">
                    <UpdatePasswordForm />
                </div>
                <div className="premium-card p-5 sm:p-8 border-red-500/10">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
