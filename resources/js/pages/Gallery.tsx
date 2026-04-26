import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import AppLayout from '@/layouts/AppLayout';

interface GalleryImage {
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    category: string;
}

interface GalleryProps {
    images: GalleryImage[];
    categories: Record<string, string>;
    selectedCategory: string;
}

export default function Gallery({ images, categories, selectedCategory }: GalleryProps) {
    useLenis();
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryChange = (categoryKey: string) => {
        setIsLoading(true);
        router.get(
            '/gallery',
            { category: categoryKey === 'all' ? undefined : categoryKey },
            { preserveState: true, preserveScroll: true, onFinish: () => setIsLoading(false) }
        );
    };

    return (
        <AppLayout>
            <Head title="Gallery" />

            <div className="min-h-screen bg-transparent">
                <section className="bg-ocean-gradient py-20 text-crema">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-crema sm:text-6xl">Our Gallery</h1>
                        <p className="text-lg text-crema/90">Moments captured at Blue Door Coffee</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Filter Category */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                    selectedCategory === key
                                        ? 'bg-espresso text-crema shadow-md'
                                        : 'bg-ocean-grain border border-mocha/20 text-espresso hover:bg-mocha/10'
                                }`}
                                disabled={isLoading}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {images.map((image) => (
                                    <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-sm border border-mocha/10 bg-ocean-start/5 aspect-square">
                                        <img
                                            src={image.image_url}
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <h3 className="text-xl font-bold text-crema mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                {image.title}
                                            </h3>
                                            {image.description && (
                                                <p className="text-sm text-crema/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                    {image.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-ocean-grain border border-mocha/10 rounded-2xl">
                                <h3 className="text-2xl font-serif text-espresso mb-2">No photos found</h3>
                                <p className="text-mocha">We don't have any photos in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
