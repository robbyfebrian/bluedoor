import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
    id: number;
    menu_category_id: number;
    name: string;
    description: string;
    price: number | string;
    image: string | null;
    image_url: string | null;
    allergens: string[] | null;
}

interface MenuCategory {
    id: number;
    name: string;
    description: string | null;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    next_page_url?: string | null;
}

interface MenuProps {
    categories: MenuCategory[];
    menuItems: PaginatedData<MenuItem>;
    filters: { search?: string; category?: string | number };
}

export default function Menu({ categories, menuItems, filters }: MenuProps) {
    useLenis(); // Enable smooth scrolling

    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [activeCategory, setActiveCategory] = useState<number | 'all'>(filters?.category as number | 'all' || 'all');
    
    const [loadedItems, setLoadedItems] = useState(menuItems.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const isMounted = useRef(false);

    // Debounced filter submission
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/menu',
                { search: searchQuery, category: activeCategory },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, activeCategory]);

    useEffect(() => {
        if (menuItems.current_page === 1) {
            setLoadedItems(menuItems.data);
        } else {
            const newItems = menuItems.data.filter(newItem => !loadedItems.some(oldItem => oldItem.id === newItem.id));
            setLoadedItems(prev => [...prev, ...newItems]);
        }
        setIsLoadingMore(false);
    }, [menuItems]);

    const loadMore = () => {
        if (menuItems.next_page_url) {
            setIsLoadingMore(true);
            router.get(menuItems.next_page_url, { search: searchQuery, category: activeCategory }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    const activeItems = loadedItems;

    // Helper for Rupiah formatting
    const formatIDR = (price: number | string) => {
        const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numericPrice);
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Head title="Menu" />

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
                                Artisan <span className="italic text-oat/90">Selection</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-lg md:text-xl text-crema/70 max-w-xl font-light leading-relaxed"
                            >
                                Crafted with precision, brewed with passion. Discover our meticulously curated collection of beverages and delicacies.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* FILTER SECTION */}
                <section className="sticky top-0 z-40 bg-crema/95 backdrop-blur-md border-b border-ocean-start/10">
                    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

                            {/* Category Select */}
                            <div className="relative w-full sm:w-64">
                                <select
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                    className="w-full appearance-none bg-transparent border-0 border-b border-espresso/20 text-espresso text-sm uppercase tracking-widest font-medium px-0 py-2 pr-8 focus:ring-0 focus:border-espresso focus:outline-none cursor-pointer transition-colors"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-espresso/60">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-72 relative shrink-0">
                            <input
                                type="text"
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-0 border-b border-espresso/20 focus:border-espresso focus:outline-none focus:ring-0 px-0 py-2 text-sm placeholder:text-espresso/40 transition-colors text-espresso"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso text-xs uppercase tracking-widest transition-colors">
                                    Clear
                                </button>
                            )}
                            {!searchQuery && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso/40 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* MENU GRID */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto min-h-[60vh]">

                    {activeCategory !== 'all' && categories.find(c => c.id == activeCategory)?.description && (
                        <motion.div
                            key={`desc-${activeCategory}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mb-16 text-espresso/70 text-lg font-light leading-relaxed"
                        >
                            <p>{categories.find(c => c.id == activeCategory)?.description}</p>
                        </motion.div>
                    )}

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
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
                        >
                            {activeItems.length > 0 ? (
                                activeItems.map((item) => (
                                    <motion.article
                                        key={item.id}
                                        variants={fadeUp}
                                        className="group cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Image Container with Overflow Hidden for Zoom Effect */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white rounded-sm mb-6 border border-ocean-start/10/10">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M2,21H22V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16Z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-1">
                                            <div className="flex justify-between items-start gap-4 mb-3">
                                                <h3 className="font-serif text-2xl tracking-tight text-espresso group-hover:text-gold transition-colors leading-snug">
                                                    {item.name}
                                                </h3>
                                                <span className="font-medium text-sm tracking-widest text-espresso shrink-0 mt-1">
                                                    {formatIDR(item.price)}
                                                </span>
                                            </div>

                                            <p className="text-espresso/60/80 text-sm font-light leading-relaxed mb-6 flex-1">
                                                {item.description}
                                            </p>

                                            {/* Allergens Tags */}
                                            {item.allergens && item.allergens.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-ocean-start/10/10">
                                                    {item.allergens.map((allergen, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 text-[10px] uppercase tracking-widest border border-ocean-start/10/20 text-espresso/60/60 rounded-sm"
                                                        >
                                                            {allergen}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 flex flex-col items-center justify-center text-center text-espresso/60/50"
                                >
                                    <span className="text-4xl mb-4">🍽️</span>
                                    <p className="font-serif text-2xl mb-2">Coming Soon</p>
                                    <p className="text-sm">We are preparing something special for this category.</p>
                                </motion.div>
                            )}
                        </motion.div>
                        {menuItems.next_page_url && (
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
            </div>
        </>
    );
}
