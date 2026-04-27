import { useNavigate } from '@/layouts/AppLayout';
import type { ReactNode } from 'react';

export default function NavLink({ href, children, className = '', onClick }: {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const navigate = useNavigate();

    return (
        <button
            className={`${className} cursor-none`}
            onClick={() => {
                onClick?.();
                navigate(href);
            }}
        >
            {children}
        </button>
    );
}