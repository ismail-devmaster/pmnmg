import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                active
                    ? 'bg-electric-600/15 text-electric-400 border border-electric-500/20'
                    : 'text-obsidian-300 hover:bg-obsidian-700/40 hover:text-white border border-transparent'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
