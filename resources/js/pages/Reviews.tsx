import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import AppLayout from '@/layouts/AppLayout';

interface ReviewItem {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface ReviewsProps {
    reviews: ReviewItem[];
    averageRating: number;
    totalReviews: number;
}

export default function Reviews({ reviews, averageRating, totalReviews }: ReviewsProps) {
    useLenis();
    const { flash } = usePage<SharedData>().props;

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
            onSuccess: () => reset('customer_name', 'customer_email', 'rating', 'comment'),
        });
    };

    return (
        <AppLayout>
            <Head title="Reviews" />

            <div className="min-h-screen bg-transparent">


                <section className="bg-ocean-gradient py-12 text-crema">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <h1 className="mb-2 font-serif text-4xl font-bold text-crema">Customer Reviews</h1>
                        <p className="text-lg text-crema/90">{averageRating.toFixed(1)} / 5 average from {totalReviews} approved reviews</p>
                    </div>
                </section>

                <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
                    <section className="rounded-xl border border-ocean-start/40 bg-ocean-grain p-6 text-crema lg:col-span-2">
                        <h2 className="mb-4 text-2xl font-semibold text-crema">Share Your Experience</h2>
                        <p className="mb-4 text-sm text-crema/90">Your review will be published after moderation.</p>

                        {flash?.success && (
                            <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                                {flash.success}
                            </p>
                        )}
                        {flash?.info && (
                            <p className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                                {flash.info}
                            </p>
                        )}
                        {flash?.error && (
                            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                                {flash.error}
                            </p>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="customer_name" className="mb-1 block text-sm font-medium text-crema/95">Name *</label>
                                <input
                                    id="customer_name"
                                    type="text"
                                    required
                                    value={data.customer_name}
                                    onChange={(e) => setData('customer_name', e.target.value)}
                                    className="w-full rounded-lg border border-crema/40 bg-ocean-start/30 px-4 py-2 text-crema placeholder:text-crema/70 focus:border-transparent focus:ring-2 focus:ring-crema"
                                />
                                {errors.customer_name && <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="customer_email" className="mb-1 block text-sm font-medium text-crema/95">Email (optional)</label>
                                <input
                                    id="customer_email"
                                    type="email"
                                    value={data.customer_email}
                                    onChange={(e) => setData('customer_email', e.target.value)}
                                    className="w-full rounded-lg border border-crema/40 bg-ocean-start/30 px-4 py-2 text-crema placeholder:text-crema/70 focus:border-transparent focus:ring-2 focus:ring-crema"
                                />
                                {errors.customer_email && <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>}
                            </div>

                            <div>
                                <label htmlFor="rating" className="mb-1 block text-sm font-medium text-crema/95">Rating *</label>
                                <select
                                    id="rating"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', Number(e.target.value))}
                                    className="w-full rounded-lg border border-crema/40 bg-ocean-start/30 px-4 py-2 text-crema focus:border-transparent focus:ring-2 focus:ring-crema"
                                >
                                    <option value={5}>5 - Excellent</option>
                                    <option value={4}>4 - Very Good</option>
                                    <option value={3}>3 - Good</option>
                                    <option value={2}>2 - Fair</option>
                                    <option value={1}>1 - Poor</option>
                                </select>
                                {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                            </div>

                            <div>
                                <label htmlFor="comment" className="mb-1 block text-sm font-medium text-crema/95">Comment *</label>
                                <textarea
                                    id="comment"
                                    required
                                    rows={5}
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="w-full rounded-lg border border-crema/40 bg-ocean-start/30 px-4 py-2 text-crema placeholder:text-crema/70 focus:border-transparent focus:ring-2 focus:ring-crema"
                                    placeholder="Tell us about your experience"
                                />
                                {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-espresso px-6 py-3 font-semibold text-white transition hover:bg-caramel disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </section>

                    <section className="space-y-4 lg:col-span-3">
                        {reviews.length === 0 ? (
                            <div className="rounded-xl border border-mocha/20 bg-transparent p-6 text-crema shadow-sm">
                                No published reviews yet. Be the first to share your experience.
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <article key={review.id} className="rounded-xl border border-mocha/20 bg-transparent p-6 shadow-sm">
                                    <div className="mb-2 flex items-center justify-between gap-4">
                                        <h3 className="text-lg font-semibold text-espresso">{review.customer_name}</h3>
                                        <span className="text-sm text-caramel">{new Date(review.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="mb-2 text-crema">{'⭐'.repeat(review.rating)}</p>
                                    <p className="text-gray-700">{review.comment}</p>
                                </article>
                            ))
                        )}
                    </section>
                </main>
            </div>
        </AppLayout>
    );
}
