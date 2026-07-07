import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ' +
                (active
                    ? 'bg-electric-600/15 text-electric-400 border border-electric-500/20'
                    : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white border border-transparent') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
