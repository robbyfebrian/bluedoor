import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className = '' }: PaginationProps) {
    if (links.length <= 3) return null; // Don't show pagination if there's only 1 page

    return (
        <div className={`flex flex-wrap justify-center items-center gap-2 mt-16 ${className}`}>
            {links.map((link, index) => {
                const isPrevious = link.label.includes('Previous');
                const isNext = link.label.includes('Next');
                let label = link.label;
                
                if (isPrevious) label = '←';
                if (isNext) label = '→';

                if (link.url === null) {
                    return (
                        <div
                            key={index}
                            className="px-4 py-2 text-sm text-espresso/40 cursor-not-allowed border border-espresso/10 rounded-sm"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded-sm transition-colors duration-300 ${
                            link.active
                                ? 'bg-ocean-start text-crema border-ocean-start font-medium shadow-sm'
                                : 'bg-transparent text-espresso/70 border-espresso/20 hover:border-ocean-start hover:text-ocean-start'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
