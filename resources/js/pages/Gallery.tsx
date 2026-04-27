import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
    id: number;
    title: string | null;
    description: string | null;
    category: string;
    image_url: string | null;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    next_page_url?: string | null;
}

interface GalleryProps {
    images: PaginatedData<GalleryImage>;
    categories: Record<string, string>;
    selectedCategory: string;
}

export default function Gallery({ images, categories, selectedCategory }: GalleryProps) {
    useLenis();

    const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [loadedImages, setLoadedImages] = useState(images.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollThumbnails = (dir: 'up' | 'down') => {
        if (scrollContainerRef.current) {
            const isDesktop = window.innerWidth >= 768;
            const scrollAmountMobile = (80 + 16) * 2; // Scroll 2 items on mobile
            const scrollAmountDesktop = (96 + 16) * 3; // Scroll 3 items on desktop
            const amount = isDesktop ? scrollAmountDesktop : scrollAmountMobile;
            const scrollValue = dir === 'down' ? amount : -amount;

            scrollContainerRef.current.scrollBy({
                top: scrollValue,
                left: scrollValue,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (images.current_page === 1) {
            setLoadedImages(images.data);
        } else {
            const newImages = images.data.filter(newImg => !loadedImages.some(oldImg => oldImg.id === newImg.id));
            setLoadedImages(prev => [...prev, ...newImages]);
        }
        setIsLoadingMore(false);
    }, [images]);

    const loadMore = () => {
        if (images.next_page_url) {
            setIsLoadingMore(true);
            router.get(images.next_page_url, activeCategory !== 'all' ? { category: activeCategory } : {}, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        router.get(
            '/gallery',
            cat !== 'all' ? { category: cat } : {},
            { preserveState: true, preserveScroll: true }
        );
    };

    // Body scroll lock when lightbox open
    useEffect(() => {
        if (selectedImage) {
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
    }, [selectedImage]);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Head title="Gallery" />

            <div className="min-h-screen bg-crema text-espresso font-sans selection:bg-gold selection:text-white pb-24">

                {/* HERO SECTION */}
                <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-ocean-grain text-crema overflow-hidden">
                    <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col md:flex-row items-end md:justify-between gap-12">
                        <div className="max-w-3xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="font-serif text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight leading-none mb-6"
                            >
                                Visual <span className="italic text-oat/90">Journey</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-lg md:text-xl text-crema/70 max-w-xl font-light leading-relaxed"
                            >
                                A glimpse into the atmosphere, craftsmanship, and moments that define the Blue Door experience.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* STICKY CATEGORY NAVIGATION */}
                <section className="sticky top-0 z-40 bg-crema/95 backdrop-blur-xs border-b border-ocean-start/10">
                    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center py-4 gap-4">
                        <div className="flex gap-8 overflow-x-auto scrollbar-hide text-sm uppercase tracking-widest font-medium items-center">
                            {Object.entries(categories).map(([key, label]) => {
                                const isActive = activeCategory === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleCategoryChange(key)}
                                        className={`relative whitespace-nowrap px-1 pb-2 transition-colors duration-300 ${isActive ? 'text-espresso' : 'text-espresso/60/50 hover:text-espresso'}`}
                                    >
                                        {label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeGalleryCategoryUnderline"
                                                className="absolute left-0 right-0 bottom-0 h-0.5 bg-ocean-grain"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* MASONRY GALLERY GRID */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto min-h-[60vh]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial="hidden"
                            animate={selectedImage ? { opacity: 0 } : "visible"}
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] grid-flow-dense gap-6"
                        >
                            {loadedImages.length > 0 ? (
                                loadedImages.map((item, index) => {
                                    // Create an asymmetric, editorial bento grid pattern
                                    let spanClass = 'col-span-1 row-span-1'; // Default

                                    if (index % 10 === 0) {
                                        spanClass = 'md:col-span-2 md:row-span-2'; // Large feature block
                                    } else if (index % 10 === 3 || index % 10 === 8) {
                                        spanClass = 'md:col-span-2 md:row-span-1'; // Wide block
                                    } else if (index % 10 === 5) {
                                        spanClass = 'md:col-span-1 md:row-span-2'; // Tall block
                                    }

                                    return (
                                        <motion.figure
                                            key={item.id}
                                            layoutId={selectedImage ? undefined : `gallery-img-${item.id}`}
                                            variants={fadeUp}
                                            onClick={() => setSelectedImage(item)}
                                            className={`relative group cursor-pointer overflow-hidden rounded-sm bg-ocean-start/5 border border-ocean-start/10 hover:border-gold/30 hover:shadow-2xl transition-all duration-700 ${spanClass}`}
                                        >
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title || 'Gallery image'}
                                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                        ) : (
                                            <div className="w-full aspect-square flex items-center justify-center opacity-10">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M2,21H22V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16Z" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-ocean-start/90 via-ocean-start/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">

                                            {/* Center Plus Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 rotate-[-45deg] group-hover:rotate-0 transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                                                <div className="w-16 h-16 rounded-full border border-crema/20 flex items-center justify-center bg-ocean-start/20 backdrop-blur-xs text-crema">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            {item.title && (
                                                <h3 className="text-crema font-serif text-2xl translate-y-8 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]">{item.title}</h3>
                                            )}
                                            {item.category && (
                                                <div className="overflow-hidden mt-2">
                                                    <p className="text-gold text-xs uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100">
                                                        {categories[item.category] || item.category}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.figure>
                                );
                            })
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 flex flex-col items-center justify-center text-center text-espresso/60/50 w-full"
                                >
                                    <span className="text-4xl mb-4">📷</span>
                                    <p className="font-serif text-2xl mb-2">No Images Yet</p>
                                    <p className="text-sm">We are still capturing moments for this category.</p>
                                </motion.div>
                            )}
                        </motion.div>
                        {images.next_page_url && (
                            <div className="mt-16 flex justify-center w-full">
                                <button
                                    onClick={loadMore}
                                    disabled={isLoadingMore}
                                    className="bg-transparent border border-ocean-start text-espresso px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-ocean-start hover:text-white transition-all duration-300 disabled:opacity-50"
                                >
                                    {isLoadingMore ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </section>

                {/* LIGHTBOX MODAL (Seamless LayoutId Transition) */}
                {typeof document !== 'undefined' && createPortal(
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[60] bg-ocean-grain/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                            >
                                {/* CLOSE BUTTON (Isolated & High Contrast) */}
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    style={{ zIndex: 100 }}
                                    className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>

                                <div className="w-full h-full max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center pt-16 md:pt-0 pointer-events-auto relative z-50">
                                    {/* MAIN ACTIVE IMAGE */}
                                    <div className="w-full md:flex-1 h-[60vh] md:h-[85vh] flex flex-col items-center justify-center relative">
                                        <AnimatePresence mode="popLayout">
                                            <motion.div
                                                key={selectedImage.id}
                                                layout
                                                layoutId={`gallery-img-${selectedImage.id}`}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl cursor-zoom-out flex flex-col bg-ocean-start/20"
                                                onClick={() => setSelectedImage(null)}
                                            >
                                                {selectedImage.image_url ? (
                                                    <img
                                                        src={selectedImage.image_url}
                                                        alt={selectedImage.title || 'Gallery image'}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-black/40 flex items-center justify-center">
                                                        <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M2,21H22V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16Z" />
                                                        </svg>
                                                    </div>
                                                )}

                                                {/* Image Info Overlay */}
                                                {(selectedImage.title || selectedImage.description) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-start/80 via-ocean-start/20 to-transparent p-6 md:p-10 pt-20 text-center pointer-events-none"
                                                    >
                                                        {selectedImage.title && <h2 className="font-serif text-3xl md:text-5xl text-crema mb-3 drop-shadow-lg">{selectedImage.title}</h2>}
                                                        {selectedImage.description && <p className="text-crema/90 font-light text-sm md:text-base max-w-2xl mx-auto drop-shadow-md">{selectedImage.description}</p>}
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* THUMBNAILS SIDEBAR */}
                                    <div className="flex flex-row md:flex-col items-center justify-center gap-3 shrink-0 w-full md:w-auto h-24 md:h-[85vh] md:pt-14 relative" style={{ zIndex: 90 }}>
                                        {/* Scroll Up/Left Arrow */}
                                        <button onClick={() => scrollThumbnails('up')} className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md shrink-0 shadow-xl border border-white/10">
                                            <svg className="w-5 h-5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                            <svg className="w-5 h-5 md:hidden block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                        </button>

                                        <div
                                            ref={scrollContainerRef}
                                            className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto touch-pan-y md:touch-auto w-full md:w-32 h-full max-w-[176px] md:max-w-none md:max-h-[544px] pb-4 md:pb-0 scrollbar-hide relative"
                                        >
                                            <AnimatePresence mode="popLayout">
                                                {loadedImages.filter(img => img.id !== selectedImage.id).map(img => (
                                                    <motion.div
                                                        layout
                                                        key={img.id}
                                                        layoutId={`gallery-img-${img.id}`}
                                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                        onClick={() => setSelectedImage(img)}
                                                        className="w-20 h-20 md:w-full md:h-24 rounded-xl overflow-hidden cursor-pointer shrink-0 border-2 border-transparent hover:border-gold transition-colors relative bg-black/40 hover:bg-black/60"
                                                    >
                                                        {img.image_url ? (
                                                            <img
                                                                src={img.image_url}
                                                                alt={img.title || 'Thumbnail'}
                                                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                                                                <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M2,21H22V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16Z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>

                                        {/* Scroll Down/Right Arrow */}
                                        <button onClick={() => scrollThumbnails('down')} className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md shrink-0 shadow-xl border border-white/10">
                                            <svg className="w-5 h-5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            <svg className="w-5 h-5 md:hidden block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </>
    );
}
