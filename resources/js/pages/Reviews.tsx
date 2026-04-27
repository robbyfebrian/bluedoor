import { Head, useForm, usePage, router } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewItem {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface ReviewsProps {
    reviews: PaginatedData<ReviewItem>;
    averageRating: number;
    totalReviews: number;
}

export default function Reviews({ reviews, averageRating, totalReviews }: ReviewsProps) {
    useLenis();
    const { flash } = usePage<SharedData>().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadedReviews, setLoadedReviews] = useState(reviews.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (reviews.current_page === 1) {
            setLoadedReviews(reviews.data);
        } else {
            const newReviews = reviews.data.filter(nR => !loadedReviews.some(oR => oR.id === nR.id));
            setLoadedReviews(prev => [...prev, ...newReviews]);
        }
        setIsLoadingMore(false);
    }, [reviews]);

    const loadMore = () => {
        if (reviews.next_page_url) {
            setIsLoadingMore(true);
            router.get(reviews.next_page_url, {}, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_name: '',
        customer_email: '',
        rating: 5,
        comment: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/reviews/submit', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    // Body scroll lock when modal open
    useEffect(() => {
        if (isModalOpen) {
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
    }, [isModalOpen]);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Head title="Reviews" />

            <div className="min-h-screen bg-crema text-espresso font-sans selection:bg-gold selection:text-white">

                {/* HERO SECTION */}
                <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-ocean-grain text-crema overflow-hidden">
                    <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="font-serif text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight mb-8 leading-none"
                            >
                                Voices of <br/><span className="italic text-oat/90">Blue Doors</span>
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
                            >
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-gold text-espresso rounded-full px-8 py-4 font-medium tracking-widest uppercase hover:bg-white transition hover:scale-105 text-sm"
                                >
                                    Share Your Story
                                </button>
                                <p className="text-sm md:text-base text-crema/60 max-w-sm font-light leading-relaxed">
                                    Every cup has a story. Read what our community says about their moments at Blue Door Coffee.
                                </p>
                            </motion.div>
                        </div>

                        {/* RATING DISPLAY */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3, type: "spring" }}
                            className="flex flex-col items-center justify-center p-10 lg:px-16 lg:py-8 border border-crema/50 rounded-full aspect-square shrink-0"
                        >
                            <span className="font-serif text-7xl lg:text-8xl text-crema leading-none mb-2">{averageRating.toFixed(1)}</span>
                            <div className="flex gap-1 text-gold mb-2">
                                {[1,2,3,4,5].map(star => (
                                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-xs uppercase tracking-widest text-crema/50">From {totalReviews} Reviews</p>
                        </motion.div>
                    </div>
                </section>

                {/* REVIEWS MASONRY GRID */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                    {loadedReviews.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full py-32 flex flex-col items-center justify-center text-center text-espresso/60/50"
                        >
                            <span className="text-4xl mb-4">✍️</span>
                            <p className="font-serif text-2xl mb-2">No Stories Yet</p>
                            <p className="text-sm max-w-md">Be the first to share your Blue Door Coffee experience.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                            }}
                            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                        >
                            {loadedReviews.map((review, index) => {
                                const hoverBgColors = ['hover:bg-ocean-start', 'hover:bg-gold', 'hover:bg-mocha', 'hover:bg-espresso'];
                                const textHoverColors = ['group-hover:text-crema', 'group-hover:text-espresso', 'group-hover:text-crema', 'group-hover:text-crema'];
                                const hoverColor = hoverBgColors[index % hoverBgColors.length];
                                const textHover = textHoverColors[index % hoverBgColors.length];

                                return (
                                <motion.div
                                    key={review.id}
                                    variants={fadeUp}
                                    className={`break-inside-avoid bg-white rounded-sm p-8 lg:p-10 relative overflow-hidden border border-ocean-start/10/10 hover:border-transparent ${hoverColor} ${textHover} transition-colors duration-500 group`}
                                >
                                    {/* Giant Quote Watermark */}
                                    <div className="absolute -top-22 rotate-180 right-4 text-[12rem] leading-none font-serif text-espresso/60/5 opacity-50 select-none pointer-events-none -mt-8">
                                        "
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex gap-1 text-gold mb-6">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold' : 'text-espresso/60/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className={`text-lg font-light leading-relaxed mb-8 italic text-espresso/80 ${textHover} transition-colors`}>
                                            "{review.comment}"
                                        </p>

                                        <div className="flex justify-between items-end border-t border-ocean-start/10/10 pt-4">
                                            <div className={`text-sm font-bold uppercase tracking-widest text-espresso ${textHover} transition-colors`}>
                                                {review.customer_name}
                                            </div>
                                            <div className={`text-xs font-medium text-espresso/40 ${textHover}/60 transition-colors uppercase tracking-widest`}>
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                );
                            })}
                        </motion.div>
                    )}

                    {reviews.next_page_url && (
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
                </section>

                {/* SHARE STORY MODAL */}
                {typeof document !== 'undefined' && createPortal(
                    <AnimatePresence>
                        {isModalOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsModalOpen(false)}
                                    className="fixed inset-0 bg-ocean-start/80 backdrop-blur-sm z-[60]"
                                />

                                {/* Modal Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: '100%' }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: '100%' }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed inset-y-0 right-0 w-full md:max-w-xl bg-crema z-[60] shadow-2xl flex flex-col overflow-hidden"
                                >
                                    <div className="flex justify-between items-center p-6 lg:p-10 border-b border-ocean-start/10/10 bg-crema shrink-0">
                                        <h2 className="font-serif text-3xl text-espresso tracking-tight">Share Your Story</h2>
                                        <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-white hover:bg-ocean-start/80/10 flex items-center justify-center transition-colors text-espresso shrink-0">
                                            ✕
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 lg:p-10" data-lenis-prevent>
                                        <p className="text-espresso/60/60 text-sm mb-12 leading-relaxed">
                                            We'd love to hear about your experience. Your story helps us grow and will be published after a quick review.
                                        </p>

                                        <form onSubmit={submit} className="space-y-8">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="customer_name"
                                                    value={data.customer_name}
                                                    onChange={(e) => setData('customer_name', e.target.value)}
                                                    required
                                                    placeholder=" "
                                                    className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer"
                                                />
                                                <label htmlFor="customer_name" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Name *</label>
                                                {errors.customer_name && <p className="mt-2 text-xs text-red-600">{errors.customer_name}</p>}
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="customer_email"
                                                    value={data.customer_email}
                                                    onChange={(e) => setData('customer_email', e.target.value)}
                                                    placeholder=" "
                                                    className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer"
                                                />
                                                <label htmlFor="customer_email" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email Address (Optional)</label>
                                                {errors.customer_email && <p className="mt-2 text-xs text-red-600">{errors.customer_email}</p>}
                                            </div>

                                            <div>
                                                <p className="text-sm text-espresso/60/50 mb-3">Rating *</p>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setData('rating', star)}
                                                            className={`w-12 h-12 flex items-center justify-center rounded-sm transition-colors ${data.rating >= star ? 'bg-gold text-white' : 'bg-white text-espresso/60/30 hover:bg-ocean-start/80/10'}`}
                                                        >
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.rating && <p className="mt-2 text-xs text-red-600">{errors.rating}</p>}
                                            </div>

                                            <div className="relative">
                                                <textarea
                                                    id="comment"
                                                    value={data.comment}
                                                    onChange={(e) => setData('comment', e.target.value)}
                                                    required
                                                    rows={5}
                                                    placeholder=" "
                                                    className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer resize-none"
                                                />
                                                <label htmlFor="comment" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Your Experience *</label>
                                                {errors.comment && <p className="mt-2 text-xs text-red-600">{errors.comment}</p>}
                                            </div>

                                            <div className="pt-8">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full bg-ocean-grain text-crema px-8 py-4 font-medium tracking-widest uppercase hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {processing ? 'Submitting...' : 'Submit Review'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </>
    );
}
