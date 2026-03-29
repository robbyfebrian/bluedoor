import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    useLenis(); // Enable smooth scrolling
    const { url } = usePage();

    const isCurrent = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <div className="relative min-h-screen bg-ocean-gradient text-espresso font-sans">
            {/* Grainy Noise Overlay */}
            <div className="bg-noise" />

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Navigation (Brutalist style) */}
                <nav className="absolute top-0 left-0 right-0 z-50 w-full pt-8 pb-4">
                    <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-6 sm:px-12 mix-blend-difference text-white">
                        {/* Left Links */}
                        <div className="hidden md:flex w-1/3 items-center space-x-8 text-sm font-semibold uppercase tracking-widest">
                            <Link href="/menu" className="hover:opacity-75 transition-opacity">Menu</Link>
                            <Link href="/team" className="hover:opacity-75 transition-opacity">Team</Link>
                            <Link href="/careers" className="hover:opacity-75 transition-opacity">Careers</Link>
                            <Link href="/reviews" className="hover:opacity-75 transition-opacity">Reviews</Link>
                        </div>

                        {/* Center Logo */}
                        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                            <Link href="/" className="font-sans text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
                                <img src="/images/logo.png" alt="Blue Doors" className="h-16 w-auto" />
                            </Link>
                        </div>
                    </div>

                    {/* Login CTA (Right side, outside mix-blend-mode to preserve color) */}
                    <div className="absolute right-6 top-6 sm:right-12 flex items-center justify-end z-[60]">
                        <Link href="/login" className="rounded-full bg-[#d0e653] px-8 py-3 text-sm font-bold tracking-wide text-[#1a1a1a] transition hover:bg-[#c3d94b] hover:scale-105 shadow-sm">
                            Login
                        </Link>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-auto border-t border-ocean-start/30 bg-ocean-grain py-12 text-crema">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                            {/* Brand & Tagline */}
                            <div className="flex flex-col text-center md:text-left items-start">
                                <img src="/images/logo.png" alt="Blue Doors" className="mx-auto h-20 w-32 object-cover md:mx-0" />
                                <p className="text-base italic text-crema/80">Home for Better Coffee</p>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col text-center md:text-left">
                                <h4 className="font-serif text-lg font-bold text-crema">Headquarter</h4>
                                <p className="mt-4 text-sm leading-relaxed text-crema/80">
                                    St. Alkateri, No. 2<br />
                                    Bandung City, West Java
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex flex-col text-center md:text-left">
                                <h4 className="font-serif text-lg font-bold text-crema">Connect</h4>
                                <div className="mt-4 flex flex-col space-y-2 text-sm text-crema/80">
                                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                                    <a href="#" className="hover:text-white transition-colors">E-mail</a>
                                    <a href="#" className="hover:text-white transition-colors">Whatsapp</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 text-center text-sm text-crema/60">
                            &copy; {new Date().getFullYear()} Blue Doors. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
