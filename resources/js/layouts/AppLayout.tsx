import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import RollingText from '@/Components/RollingText';
import ToastNotification from '@/Components/ToastNotification';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

    useLenis(); // Enable smooth scrolling
    const { url } = usePage();
    const pathname = url.split('?')[0];
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const footerRef = useRef<HTMLElement>(null);
    const [footerHeight, setFooterHeight] = useState(0);

    // Body scroll lock when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            // @ts-ignore
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!footerRef.current) return;

        const updateHeight = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.getBoundingClientRect().height);
            }
        };

        const observer = new ResizeObserver(updateHeight);
        observer.observe(footerRef.current);

        // Initial call
        updateHeight();

        return () => observer.disconnect();
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Update scrolled state for background transition
        setIsScrolled(latest > 50);

        // Always show if near the top
        if (latest < 50) {
            setHidden(false);
            return;
        }

        // Hide when scrolling down, show when scrolling up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });


    return (
        <div className="relative min-h-screen text-espresso font-sans overflow-hidden flex flex-col">
            {/* Universal Background */}
            <div className="fixed inset-0 bg-ocean-grain -z-10 pointer-events-none" />

            {/* Navigation (Persistent) */}
            {/* Invisible Hover Trigger for Navbar */}
            <div
                className="fixed top-0 left-0 right-0 h-12 z-[45]"
                onMouseEnter={() => setIsHovered(true)}
            />

            {/* Navigation (Glassmorphism Pill) */}
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: "-150%", opacity: 0 }
                }}
                animate={hidden && !isHovered ? "hidden" : "visible"}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed top-6 left-6 right-6 lg:left-12 lg:right-12 z-50 rounded-full border transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? `${pathname === '/' ? 'bg-espresso/40' : 'bg-ocean-start/40'} backdrop-blur-xs border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] py-2`
                        : "bg-transparent border-transparent shadow-none py-2"
                }`}
            >
                <div className="mx-auto flex w-full items-center justify-between px-6 md:px-8 py-1.5 text-crema">

                    {/* Mobile Hamburger */}
                    <div className="flex lg:hidden w-1/3 justify-start">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-crema focus:outline-none"
                            aria-label="Open Mobile Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Left Links */}
                    <div className="hidden lg:flex w-1/3 items-center space-x-8 text-[12px] font-medium uppercase tracking-[0.2em]">
                        <Link href="/menu"><RollingText text="Menu" className="" /></Link>
                        <Link href="/team"><RollingText text="Team" className="" /></Link>
                        <Link href="/careers"><RollingText text="Careers" className="" /></Link>
                        <Link href="/reviews"><RollingText text="Reviews" className="" /></Link>
                    </div>

                    {/* Center Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                        <Link href="/" className="font-serif text-3xl font-medium tracking-tight text-crema transition-colors">
                            <RollingText text="Bluedoors" className="" />
                            {/* <img src="/images/logo.png" alt="" className='w-16 object-cover' /> */}
                        </Link>
                    </div>

                    {/* Right Login CTA */}
                    <div className="hidden lg:flex w-1/3 justify-end items-center">
                        <Link href="/admin/login" className="rounded-full bg-gold px-8 py-2 text-[11px] font-bold tracking-widest uppercase text-espresso transition hover:bg-white hover:scale-105 shadow-sm">
                            Login
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* MOBILE MENU FULLSCREEN */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-50 bg-ocean-grain flex flex-col items-center justify-center p-6 text-crema"
                    >
                        {/* Noise Overlay */}
                        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none"></div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 p-2 text-crema focus:outline-none hover:text-gold transition-colors z-10"
                            aria-label="Close Mobile Menu"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center justify-center space-y-10 font-serif text-5xl font-light z-10 relative">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Menu</Link></motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Team</Link></motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Careers</Link></motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors">Reviews</Link></motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 block rounded-full bg-gold px-8 py-2.5 text-[11px] font-bold tracking-widest uppercase text-espresso transition hover:bg-white hover:scale-105 shadow-sm font-sans tracking-widest uppercase font-bold rounded-full px-12 py-4 hover:bg-gold hover:text-espresso transition-colors duration-500">Login</Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STAGGERED COLUMNS CURTAIN TRANSITION */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.main
                    key={pathname}
                    className="flex-1 flex flex-col relative z-20 shadow-[0_15px_35px_rgba(0,0,0,0.2)] rounded-b-[2.5rem]"
                    // We don't animate the page itself much, let the curtain do the work
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                >
                    {/* The actual page content */}
                    <div className="relative z-10 flex-1 flex flex-col rounded-b-[2.5rem] overflow-hidden">
                        {children}
                    </div>

                    {/* The Curtain that belongs to this specific page instance */}
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-start pointer-events-none"
                    >
                        {[110, 125, 115, 130, 105].map((h, i) => {
                            const noiseSvg = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

                            return (
                                <motion.div
                                    key={i}
                                    className="flex-1 border-r border-ocean-start/20 last:border-r-0"
                                    style={{
                                        height: `${h}vh`,
                                        backgroundImage: `${noiseSvg}, linear-gradient(135deg, var(--color-ocean-start) 0%, var(--color-ocean-end) 100%)`,
                                        backgroundSize: `220px 220px, 100vw 130vh`, // Tall enough to cover the tallest block
                                        backgroundPosition: `0 0, -${i * 20}vw 0`, // Sync gradient positions
                                        backgroundRepeat: 'repeat, no-repeat',
                                        backgroundBlendMode: 'soft-light, normal'
                                    }}
                                    initial={{ y: 0 }}
                                    animate={{ y: "-100%" }}
                                    exit={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: [0.1, 0.05, 0.2, 0.15, 0][i] // Random staggered effect
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                </motion.main>
            </AnimatePresence>

            {/* SPACER FOR FIXED FOOTER */}
            <div style={{ height: footerHeight }} className="w-full shrink-0 pointer-events-none" />

            {/* Footer (Persistent) */}
            <footer
                ref={footerRef}
                className="fixed bottom-0 left-0 w-full py-12 text-crema/80 z-0"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
                        {/* Brand & Tagline */}
                        <div className="flex flex-col text-center md:text-left items-center md:items-start">
                            <img src="/images/logo.png" alt="Blue Doors" className="h-20 w-32 object-cover opacity-80" />
                            <p className="text-base italic text-crema/60">Home for Better Coffee</p>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col text-center md:text-left items-center md:items-start">
                            <h4 className="font-serif text-lg font-bold text-crema">Headquarter</h4>
                            <p className="mt-4 text-sm leading-relaxed text-crema/60">
                                St. Alkateri, No. 2<br />
                                Bandung City, West Java
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col text-center md:text-left items-center md:items-start">
                            <h4 className="font-serif text-lg font-bold text-crema">Connect</h4>
                            <div className="mt-4 flex flex-col space-y-2 text-sm text-crema/60 items-center md:items-start">
                                <a href="#"><RollingText text="Instagram" className="" /></a>
                                <a href="#"><RollingText text="E-mail" className="" /></a>
                                <a href="#"><RollingText text="Whatsapp" className="" /></a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 text-center text-sm text-crema/40">
                        &copy; {new Date().getFullYear()} Blue Doors. All rights reserved.
                    </div>
                </div>
            </footer>

            <ToastNotification />
        </div>
    );
}
