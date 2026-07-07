import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { User, Mail, CheckCircle2 } from 'lucide-react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="h-4 w-4 text-electric-400" />
                    Profile Information
                </h3>
                <p className="text-sm text-obsidian-400 mt-1">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="label-premium" htmlFor="name">Name</label>
                    <TextInput
                        id="name" className="mt-1 block w-full" value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required isFocused autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <label className="label-premium" htmlFor="email">Email</label>
                    <TextInput
                        id="email" type="email" className="mt-1 block w-full" value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

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
