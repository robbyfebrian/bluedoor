import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence } from 'framer-motion';

interface Branch {
    id: number;
    name: string;
    code: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    phone: string | null;
    email: string | null;
    opening_time: string | null;
    closing_time: string | null;
    is_open: boolean;
    full_address: string;
}

interface LocationsProps {
    branches: Branch[];
}

export default function Locations({ branches }: LocationsProps) {
    useLenis();

    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    // Body scroll lock when modal open
    useEffect(() => {
        if (selectedBranch) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // @ts-ignore
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        };
    }, [selectedBranch]);

    const fadeUp = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Head title="Locations" />

            <div className="min-h-screen bg-crema text-espresso font-sans selection:bg-gold selection:text-white pb-24">

                {/* HERO SECTION */}
                <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-ocean-grain text-crema overflow-hidden">
                    <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="font-serif text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight mb-8 leading-none"
                        >
                            Our <br /><span className="italic text-oat/90">Sanctuaries</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-crema/80 max-w-2xl font-light"
                        >
                            Find your nearest Blue Door. Every location is uniquely crafted to bring you the best coffee experience.
                        </motion.p>
                    </div>
                </section>

                {/* ASYMMETRIC GRID GALLERY */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                        {branches.length > 0 ? (
                            branches.map((branch, index) => {
                                // Dynamic span based on index
                                let spanClass = 'md:col-span-12';
                                const mod = index % 7;
                                if (mod === 0) spanClass = 'md:col-span-12';
                                else if (mod === 1) spanClass = 'md:col-span-7';
                                else if (mod === 2) spanClass = 'md:col-span-5';
                                else if (mod === 3) spanClass = 'md:col-span-4';
                                else if (mod === 4) spanClass = 'md:col-span-8';
                                else if (mod === 5) spanClass = 'md:col-span-6';
                                else if (mod === 6) spanClass = 'md:col-span-6';

                                // Prevent empty grid space if the last item starts a new row
                                if (index === branches.length - 1 && (mod === 1 || mod === 3 || mod === 5)) {
                                    spanClass = 'md:col-span-12';
                                }

                                return (
                                    <motion.div
                                        key={branch.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.95 },
                                            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] } }
                                        }}
                                        onClick={() => setSelectedBranch(branch)}
                                        className={`w-full min-h-[400px] relative group cursor-pointer overflow-hidden rounded-2xl bg-ocean-grain border border-ocean-start/20 shadow-lg hover:shadow-2xl transition-shadow duration-700 flex flex-col justify-between p-8 md:p-12 col-span-1 ${spanClass} isolate`}
                                    >
                                        {/* Noise Overlay - Static opacity to prevent blend mode flicker */}
                                        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none"></div>

                                        {/* Background Decor */}
                                        <div className="absolute -bottom-24 -right-12 lg:-right-24 text-[12rem] lg:text-[15rem] font-serif italic text-crema/5 leading-none pointer-events-none select-none transition-transform duration-1000 group-hover:-translate-x-8 group-hover:-translate-y-8">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </div>

                                        {/* Top Content: Status & Code */}
                                        <div className="relative z-10 flex justify-between items-start w-full">
                                            <div className="flex items-center space-x-3">
                                                <span className="relative flex h-3 w-3">
                                                    {branch.is_open && (
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                                                    )}
                                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${branch.is_open ? 'bg-gold' : 'bg-espresso/40'}`}></span>
                                                </span>
                                                <span className="uppercase tracking-widest text-xs font-bold text-crema/80">
                                                    {branch.is_open ? 'Open Now' : 'Closed'}
                                                </span>
                                            </div>
                                            <div className="text-crema/40 font-mono text-sm uppercase tracking-widest">
                                                {branch.code}
                                            </div>
                                        </div>

                                        {/* Bottom Content: Name & City */}
                                        <div className="relative z-10 w-full transition-transform duration-700 group-hover:-translate-y-4">
                                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-crema mb-2">
                                                {branch.name}
                                            </h2>
                                            <div className="flex justify-between items-end">
                                                <p className="text-crema/70 uppercase tracking-[0.2em] text-sm md:text-base">
                                                    {branch.city}
                                                </p>

                                                {/* Discover Arrow */}
                                                <div className="w-12 h-12 rounded-full border border-oat/30 flex items-center justify-center bg-oat/20 text-oat opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-1 md:col-span-12 py-20 flex flex-col items-center justify-center text-espresso/50">
                                <span className="text-4xl mb-4">📍</span>
                                <p className="font-serif text-2xl">No Locations Found</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* MODAL */}
                {typeof document !== 'undefined' && createPortal(
                    <AnimatePresence>
                        {selectedBranch && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedBranch(null)}
                                    className="fixed inset-0 bg-ocean-start/70 backdrop-blur-xs z-[60] cursor-pointer"
                                />

                                {/* Modal Content */}
                                <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none">
                                    <button
                                        onClick={() => setSelectedBranch(null)}
                                        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        className="relative max-w-3xl w-full bg-crema text-espresso rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                                    >
                                        {/* Modal Header */}
                                        <div className="bg-ocean-grain p-8 md:p-12 relative overflow-hidden text-crema">
                                            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20"></div>
                                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                                <div>
                                                    <span className="uppercase tracking-widest text-gold text-xs font-bold mb-2 block">{selectedBranch.city}</span>
                                                    <h2 className="font-serif text-4xl md:text-5xl">{selectedBranch.name}</h2>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                                    <span className={`h-2 w-2 rounded-full ${selectedBranch.is_open ? 'bg-gold' : 'bg-white/40'}`}></span>
                                                    <span className="text-xs uppercase tracking-widest text-white/90">{selectedBranch.is_open ? 'Open' : 'Closed'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                                            {/* Left Column */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-xs uppercase tracking-widest text-espresso/40 mb-3 font-bold">Address</h3>
                                                    <p className="text-lg leading-relaxed font-serif text-espresso/90">
                                                        {selectedBranch.address}<br />
                                                        {selectedBranch.city}, {selectedBranch.province}<br />
                                                        {selectedBranch.postal_code}
                                                    </p>
                                                    <a href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.full_address)}`} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm font-bold uppercase tracking-widest text-gold hover:text-ocean-start transition-colors border-b border-gold/30 hover:border-ocean-start/30 pb-1">
                                                        Get Directions
                                                    </a>
                                                </div>

                                                <div>
                                                    <h3 className="text-xs uppercase tracking-widest text-espresso/40 mb-3 font-bold">Hours</h3>
                                                    {selectedBranch.opening_time && selectedBranch.closing_time ? (
                                                        <p className="text-lg font-mono text-espresso/90">
                                                            {selectedBranch.opening_time} - {selectedBranch.closing_time}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm italic text-espresso/60">Hours not available</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-xs uppercase tracking-widest text-espresso/40 mb-3 font-bold">Contact</h3>
                                                    <div className="space-y-2">
                                                        {selectedBranch.phone ? (
                                                            <a href={`tel:${selectedBranch.phone}`} className="block text-lg hover:text-gold transition-colors font-mono">{selectedBranch.phone}</a>
                                                        ) : (
                                                            <p className="text-sm italic text-espresso/60">Phone not available</p>
                                                        )}

                                                        {selectedBranch.email && (
                                                            <a href={`mailto:${selectedBranch.email}`} className="block text-sm hover:text-gold transition-colors">{selectedBranch.email}</a>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-ocean-start/10">
                                                    <p className="text-sm text-espresso/60 italic leading-relaxed">
                                                        We look forward to welcoming you to {selectedBranch.name}. Experience our signature blends in a space designed for comfort and connection.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </>
    );
}
