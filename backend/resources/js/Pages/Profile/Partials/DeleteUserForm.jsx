import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                </h3>
                <p className="text-sm text-obsidian-400 mt-1">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                <Trash2 className="h-4 w-4" />
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/20">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Delete Account</h3>
                    </div>

                    <p className="text-sm text-obsidian-300">
                        Are you sure you want to delete your account? All data will be permanently lost.
                        Please enter your password to confirm.
                    </p>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />
                        <TextInput
                            id="password" type="password" name="password" ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full" isFocused placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <SecondaryButton type="button" onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton disabled={processing}>Delete Account</DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
