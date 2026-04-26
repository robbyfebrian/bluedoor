import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
    id: number;
    menu_category_id: number;
    name: string;
    description: string;
    price: number | string; // Handle both since API might return stringified int
    image: string | null;
    image_url: string | null;
    allergens: string[] | null;
}

interface MenuCategory {
    id: number;
    name: string;
    description: string | null;
}

interface MenuProps {
    categories: MenuCategory[];
    menuItems: MenuItem[];
}

export default function Menu({ categories, menuItems }: MenuProps) {
    useLenis(); // Enable smooth scrolling

    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Reset pagination when filter changes
    const handleCategoryChange = (cat: number | 'all') => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.menu_category_id === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [menuItems, activeCategory, searchQuery]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const activeItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

                {/* STICKY CATEGORY NAVIGATION & SEARCH */}
                <section className="sticky top-0 z-40 bg-crema/95 backdrop-blur-md border-b border-ocean-start/10">
                    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                        <div className="flex gap-8 overflow-x-auto scrollbar-hide text-sm uppercase tracking-widest font-medium items-center">
                            {categories.map((category) => {
                                const isActive = activeCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryChange(category.id)}
                                        className={`relative whitespace-nowrap px-1 pb-2 transition-colors duration-300 ${isActive ? 'text-espresso' : 'text-espresso/60/50 hover:text-espresso'}`}
                                    >
                                        {category.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeCategoryUnderline"
                                                className="absolute left-0 right-0 bottom-0 h-0.5 bg-ocean-grain"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="relative w-full md:w-64 flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full bg-transparent border-b border-espresso/20 px-0 py-2 text-sm focus:outline-none focus:border-ocean-start focus:ring-0 placeholder-espresso/40 transition-colors text-espresso"
                            />
                            <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
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
                    </AnimatePresence>
                </section>
            </div>
        </>
    );
}
