import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Key, CheckCircle2 } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '', password: '', password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Key className="h-4 w-4 text-electric-400" />
                    Update Password
                </h3>
                <p className="text-sm text-obsidian-400 mt-1">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <label className="label-premium" htmlFor="current_password">Current Password</label>
                    <TextInput
                        id="current_password" ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password" className="mt-1 block w-full" autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <label className="label-premium" htmlFor="password">New Password</label>
                    <TextInput
                        id="password" ref={passwordInput} value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password" className="mt-1 block w-full" autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="label-premium" htmlFor="password_confirmation">Confirm Password</label>
                    <TextInput
                        id="password_confirmation" value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password" className="mt-1 block w-full" autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing}>Save Password</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <span className="flex items-center gap-2 text-sm text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Saved.
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
