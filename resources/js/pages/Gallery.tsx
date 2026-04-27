import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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

interface GalleryProps {
    images: GalleryImage[];
    categories: Record<string, string>;
    selectedCategory: string;
}

export default function Gallery({ images, categories, selectedCategory }: GalleryProps) {
    useLenis();

    const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] grid-flow-dense gap-6"
                        >
                            {images.length > 0 ? (
                                images.map((item, index) => {
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
                    </AnimatePresence>
                </section>

                {/* LIGHTBOX MODAL */}
                {typeof document !== 'undefined' && createPortal(
                    <AnimatePresence>
                        {selectedImage && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedImage(null)}
                                    className="fixed inset-0 bg-ocean-start/70 backdrop-blur-xs z-[60] cursor-zoom-out"
                                />

                                {/* Lightbox Content */}
                                <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 md:p-12 pointer-events-none">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors pointer-events-auto backdrop-blur-xs"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col pointer-events-auto"
                                    >
                                        {selectedImage.image_url && (
                                            <div className="relative flex-1 min-h-0 rounded-sm overflow-hidden shadow-2xl">
                                                <img
                                                    src={selectedImage.image_url}
                                                    alt={selectedImage.title || 'Gallery image'}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}

                                        {(selectedImage.title || selectedImage.description) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mt-6 text-center"
                                            >
                                                {selectedImage.title && (
                                                    <h2 className="font-serif text-3xl md:text-4xl text-crema mb-3">{selectedImage.title}</h2>
                                                )}
                                                {selectedImage.description && (
                                                    <p className="text-crema/70 font-light text-sm md:text-base max-w-2xl mx-auto">{selectedImage.description}</p>
                                                )}
                                            </motion.div>
                                        )}
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
