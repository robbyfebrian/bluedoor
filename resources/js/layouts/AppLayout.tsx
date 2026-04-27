import { Link, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { memo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion';
import RollingText from '@/Components/RollingText';
import ToastNotification from '@/Components/ToastNotification';
import { createContext, useContext } from 'react';
import NavLink from '@/Components/NavLink';

export const NavigateContext = createContext<(href: string) => void>(() => {});
export const useNavigate = () => useContext(NavigateContext);

interface Sticker {
    id: number;
    x: number;
    y: number;
    url: string;
    rotation: number;
}

const STICKER_IMAGES = [
    '/images/sticker-cursor/bluedoor-sticker-1.avif',
    '/images/sticker-cursor/bluedoor-sticker-2.avif',
    '/images/sticker-cursor/bluedoor-sticker-3.avif',
    '/images/sticker-cursor/bluedoor-sticker-4.avif',
    '/images/sticker-cursor/bluedoor-sticker-5.avif',
    '/images/sticker-cursor/bluedoor-sticker-6.avif',
    '/images/sticker-cursor/bluedoor-sticker-7.avif',
    '/images/sticker-cursor/bluedoor-sticker-8.avif',
    '/images/sticker-cursor/bluedoor-sticker-9.avif',
    '/images/sticker-cursor/bluedoor-sticker-10.avif',
];

function ScrollReset() {
    useEffect(() => {
        // Scroll to top instantly when the new component mounts
        window.scrollTo(0, 0);
        // @ts-ignore
        if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    }, []);
    return null;
}

interface AppLayoutProps {
    children: ReactNode;
}

const PageCurtain = memo(({ isVisible, onExitComplete }: {
    isVisible: boolean;
    onExitComplete?: () => void;
}) => (
    <AnimatePresence onExitComplete={onExitComplete}>
        {isVisible && (
            <motion.div
                className="fixed inset-0 z-200 flex items-start pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
            >
                {[110, 125, 115, 130, 105].map((h, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 pointer-events-none"
                        style={{
                            height: `${h}vh`,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), linear-gradient(135deg, var(--color-ocean-start) 0%, var(--color-ocean-end) 100%)`,
                            backgroundSize: `220px 220px, 100vw 130vh`,
                            backgroundPosition: `0 0, -${i * 20}vw 0`,
                            backgroundRepeat: 'repeat, no-repeat',
                            backgroundBlendMode: 'soft-light, normal',
                            willChange: 'transform',
                        }}
                        // Masuk dari bawah ke atas (cover screen)
                        initial={{ y: "100%" }}
                        animate={{ y: "0%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 } }}
                        // Keluar ke atas (reveal page baru)
                        exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 } }}
                    />
                ))}
            </motion.div>
        )}
    </AnimatePresence>
));

PageCurtain.displayName = 'PageCurtain';

export default function AppLayout({ children }: AppLayoutProps) {
    useLenis(); // Enable smooth scrolling

    const { url } = usePage();
    const pathname = url.split('?')[0];
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const [footerHeight, setFooterHeight] = useState(0);
    const isTransitioning = useRef(true);
    const [isCurtainVisible, setIsCurtainVisible] = useState(false);
    const pendingHrefRef = useRef<string | null>(null);

    const navigateWithCurtain = (href: string) => {
        if (pendingHrefRef.current) return; // prevent double-click
        pendingHrefRef.current = href;
        setIsCurtainVisible(true); // tampilkan curtain dulu

        setTimeout(() => {
            if (href.startsWith('/admin')) {
                window.location.href = href;
            } else {
                router.visit(href, { preserveScroll: false });
            }
            setTimeout(() => { pendingHrefRef.current = null; }, 200);
        }, 850); // tunggu curtain masuk selesai
    };

    // Prevent scroll jump during exit animation globally
    useEffect(() => {
        const removeBefore = router.on('before', (event) => {
            event.detail.visit.preserveScroll = true;
            // Clear stickers during page transition to prevent glitching
            setStickers([]);
            isTransitioning.current = true;
        });
        return () => removeBefore();
    }, []);

    useEffect(() => {
        const removeFinish = router.on('finish', () => {
            // Page sudah load, sekarang exit curtain
            setTimeout(() => setIsCurtainVisible(false), 100);
        });
        return () => removeFinish();
    }, []);

    useEffect(() => {
        isTransitioning.current = true;
        const t = setTimeout(() => {
            isTransitioning.current = false;
        }, 1000);
        return () => clearTimeout(t);
    }, [pathname]);

    // Custom Dot Cursor State
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springCursorX = useSpring(cursorX, { stiffness: 400, damping: 25 });
    const springCursorY = useSpring(cursorY, { stiffness: 400, damping: 25 });

    // Sticker Trail State
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const stickerCountRef = useRef(0);
    const lastPosRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            const lastPos = lastPosRef.current;

            // Update custom dot cursor
            cursorX.set(x);
            cursorY.set(y);

            if (isTransitioning.current) return;

            // Do not drop stickers if a modal/sidebar is open (indicated by body overflow hidden)
            if (document.body.style.overflow === 'hidden' || document.documentElement.style.overflow === 'hidden') return;

            // Do not drop stickers if hovering over navbar or footer
            if (navRef.current?.contains(e.target as Node)) return;

            // Calculate distance
            const dx = x - lastPos.x;
            const dy = y - lastPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Drop a new sticker if the mouse moved more than 60px
            if (distance > 60) {
                lastPosRef.current = { x, y };

                const currentCount = stickerCountRef.current;
                const newSticker: Sticker = {
                    id: currentCount,
                    x,
                    y,
                    url: STICKER_IMAGES[currentCount % 10],
                    rotation: Math.random() * 40 - 20, // Random rotation between -20 and 20 degrees
                };

                setStickers((prev) => {
                    const next = [...prev, newSticker];
                    // Keep at most 6 stickers
                    if (next.length > 6) {
                        return next.slice(next.length - 6);
                    }
                    return next;
                });

                stickerCountRef.current += 1;

                setTimeout(() => {
                    setStickers((prev) => prev.filter((s) => s.id !== newSticker.id));
                }, 1000);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

    useMotionValueEvent(scrollY, 'change', (latest) => {
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
        <NavigateContext.Provider value={navigateWithCurtain}>
            <div className="relative flex min-h-screen cursor-none flex-col overflow-hidden font-sans text-espresso">
                {/* CUSTOM BLUE DOT CURSOR */}
                <motion.div
                    className="pointer-events-none fixed top-0 left-0 z-100 h-3 w-3 rounded-full bg-gold shadow-sm"
                    style={{
                        x: springCursorX,
                        y: springCursorY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />

                {/* STICKER TRAIL CURSOR */}
                <div className="pointer-events-none fixed inset-0 z-90">
                    <AnimatePresence>
                        {stickers.map((sticker) => (
                            <motion.img
                                key={sticker.id}
                                src={sticker.url}
                                alt="sticker"
                                initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotation }}
                                animate={{ opacity: 1, scale: 1, rotate: sticker.rotation }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                className="absolute object-contain drop-shadow-xl"
                                style={{
                                    left: sticker.x,
                                    top: sticker.y,
                                    x: '-50%',
                                    y: '-50%',
                                    width: '120px',
                                    height: '120px',
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </div>
                {/* Universal Background */}
                <div className="pointer-events-none fixed inset-0 -z-10 bg-ocean-grain" />

                {/* Navigation (Persistent) */}
                {/* Invisible Hover Trigger for Navbar */}
                <div className="fixed top-0 right-0 left-0 z-45 h-12" onMouseEnter={() => setIsHovered(true)} />

                {/* Navigation (Glassmorphism Pill) */}
                <motion.nav
                    ref={navRef}
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: '-150%', opacity: 0 },
                    }}
                    animate={hidden && !isHovered ? 'hidden' : 'visible'}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`px-12 py-6 fixed top-0 right-6 left-6 z-50 border transition-all duration-500 ease-in-out lg:right-0 lg:left-0 ${
                        isScrolled
                            ? `${pathname === '/' ? 'bg-espresso/40' : 'bg-ocean-start/40'} border-white/10 py-2 shadow-xs backdrop-blur-xs`
                            : 'border-transparent bg-transparent py-2 shadow-none'
                    }`}
                >
                    <div className="mx-auto flex w-full items-center justify-between px-6 py-1.5 text-crema md:px-0">
                        {/* Mobile Hamburger */}
                        <div className="flex w-1/3 justify-start lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="-ml-2 p-2 text-crema focus:outline-none"
                                aria-label="Open Mobile Menu"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Left Links */}
                        <div className="cursor-none hidden w-1/3 items-center space-x-6 text-[12px] font-medium tracking-[0.2em] uppercase lg:flex">
                            <NavLink href="/menu">
                                <RollingText text="Menu" className="" />
                            </NavLink>
                            <NavLink href="/gallery">
                                <RollingText text="Gallery" className="" />
                            </NavLink>
                            <NavLink href="/locations">
                                <RollingText text="Locations" className="" />
                            </NavLink>
                            <NavLink href="/team">
                                <RollingText text="Team" className="" />
                            </NavLink>
                            <NavLink href="/careers">
                                <RollingText text="Careers" className="" />
                            </NavLink>
                            <NavLink href="/reviews">
                                <RollingText text="Reviews" className="" />
                            </NavLink>
                        </div>

                        {/* Center Logo */}
                        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
                            <NavLink href="/" className="font-serif text-3xl font-medium tracking-tight text-crema transition-colors">
                                <RollingText text="Bluedoor" className="" />
                                {/* <img src="/images/logo.png" alt="" className='w-16 object-cover' /> */}
                            </NavLink>
                        </div>

                        {/* Right Login CTA */}
                        <div className="hidden w-1/3 items-center justify-end lg:flex">
                            <NavLink
                                href="/admin/login"
                                className="rounded-full bg-gold px-8 py-2 text-[11px] font-bold tracking-widest text-espresso uppercase shadow-sm transition hover:scale-105 hover:bg-white"
                            >
                                Login
                            </NavLink>
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
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ocean-grain p-6 text-crema"
                        >
                            {/* Noise Overlay */}
                            <div className="bg-noise pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"></div>

                            {/* Close button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-8 right-8 z-10 p-2 text-crema transition-colors hover:text-gold focus:outline-none"
                                aria-label="Close Mobile Menu"
                            >
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="cursor-none relative z-10 flex flex-col items-center justify-center space-y-10 font-serif text-5xl font-light">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <NavLink href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Menu
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                    <NavLink href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Gallery
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                                    <NavLink href="/locations" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Locations
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <NavLink href="/team" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Team
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                    <NavLink href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Careers
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                    <NavLink href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="transition-colors hover:text-gold">
                                        Reviews
                                    </NavLink>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                    <NavLink
                                        href="/admin/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="mt-8 block text-center rounded-full bg-gold px-8 py-2.5 font-sans text-[11px] font-bold tracking-widest text-espresso uppercase shadow-sm transition duration-500 hover:scale-105 hover:bg-white hover:text-espresso"
                                    >
                                        Login
                                    </NavLink>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STAGGERED COLUMNS CURTAIN TRANSITION */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.main
                        key={pathname}
                        className="relative z-20 flex flex-1 flex-col rounded-b-[2.5rem] shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
                        // We don't animate the page itself much, let the curtain do the work
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                    >
                        <ScrollReset />
                        {/* The actual page content */}
                        <div className="relative z-10 flex flex-1 flex-col overflow-hidden rounded-b-[2.5rem]">{children}</div>
                    </motion.main>
                </AnimatePresence>

                {/* SPACER FOR FIXED FOOTER */}
                <div style={{ height: footerHeight }} className="pointer-events-none w-full shrink-0" />

                {/* Footer (Persistent) */}
                <footer ref={footerRef} className="fixed bottom-0 left-0 z-0 w-full py-12 text-crema/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-12">
                            {/* Brand & Tagline */}
                            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                <img src="/images/logo.png" alt="Blue Doors" className="h-20 w-32 object-cover opacity-80" />
                                <p className="text-base text-crema/60 italic">Home for Better Coffee</p>
                            </div>

                            {/* Explore Links */}
                            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                <h4 className="font-serif text-lg font-bold text-crema">Explore</h4>
                                <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-crema/60 md:items-start">
                                    <NavLink href="/menu">
                                        <RollingText text="Menu" className="" />
                                    </NavLink>
                                    <NavLink href="/gallery">
                                        <RollingText text="Gallery" className="" />
                                    </NavLink>
                                    <NavLink href="/locations">
                                        <RollingText text="Locations" className="" />
                                    </NavLink>
                                    <NavLink href="/team">
                                        <RollingText text="Team" className="" />
                                    </NavLink>
                                    <NavLink href="/careers">
                                        <RollingText text="Careers" className="" />
                                    </NavLink>
                                    <NavLink href="/reviews">
                                        <RollingText text="Reviews" className="" />
                                    </NavLink>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                <h4 className="font-serif text-lg font-bold text-crema">Headquarter</h4>
                                <p className="mt-4 text-sm leading-relaxed text-crema/60">
                                    St. Alkateri, No. 2<br />
                                    Bandung City, West Java
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                <h4 className="font-serif text-lg font-bold text-crema">Connect</h4>
                                <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-crema/60 md:items-start">
                                    <a href="#">
                                        <RollingText text="Instagram" className="" />
                                    </a>
                                    <a href="#">
                                        <RollingText text="E-mail" className="" />
                                    </a>
                                    <a href="#">
                                        <RollingText text="Whatsapp" className="" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 text-center text-sm text-crema/40">
                            &copy; {new Date().getFullYear()} Blue Doors. All rights reserved.
                        </div>
                    </div>
                </footer>

                <ToastNotification />

                <PageCurtain isVisible={isCurtainVisible} />
            </div>
        </NavigateContext.Provider>
    );
}
