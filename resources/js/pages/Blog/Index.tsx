import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import AppLayout from '@/layouts/AppLayout';

interface Author {
    id: number;
    name: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image_url: string | null;
    category: string;
    published_at: string;
    views: number;
    author: Author;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface BlogIndexProps {
    posts: PaginatedData<BlogPost>;
    categories: Record<string, string>;
    selectedCategory: string;
}

export default function BlogIndex({ posts, categories, selectedCategory }: BlogIndexProps) {
    useLenis();
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryChange = (categoryKey: string) => {
        setIsLoading(true);
        router.get(
            '/blog',
            { category: categoryKey === 'all' ? undefined : categoryKey },
            { preserveState: true, preserveScroll: true, onFinish: () => setIsLoading(false) }
        );
    };

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        setIsLoading(true);
        router.get(url, {}, { preserveScroll: true, onFinish: () => setIsLoading(false) });
    };

    return (
        <AppLayout>
            <Head title="Blog" />

            <div className="min-h-screen bg-transparent">
                <section className="bg-ocean-gradient py-20 text-crema">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-crema sm:text-6xl">Stories & Insights</h1>
                        <p className="text-lg text-crema/90">Read the latest news, recipes, and coffee culture from Blue Door</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-mocha/10 pb-8">
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                    selectedCategory === key
                                        ? 'bg-espresso text-crema shadow-md'
                                        : 'bg-transparent text-espresso border border-transparent hover:border-mocha/20 hover:bg-ocean-grain'
                                }`}
                                disabled={isLoading}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                        {posts.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.data.map((post) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-ocean-grain rounded-2xl overflow-hidden shadow-sm border border-mocha/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="aspect-[16/10] overflow-hidden bg-ocean-start/20 relative">
                                            {post.featured_image_url ? (
                                                <img
                                                    src={post.featured_image_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-mocha">
                                                    <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-caramel text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                {categories[post.category] || post.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center text-xs text-mocha mb-3 space-x-4">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                    {post.views}
                                                </span>
                                            </div>
                                            <h2 className="text-xl font-bold text-espresso mb-3 line-clamp-2 group-hover:text-caramel transition-colors">{post.title}</h2>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                            <div className="flex items-center mt-auto">
                                                <div className="w-8 h-8 rounded-full bg-ocean-start flex items-center justify-center text-white font-bold text-xs mr-3">
                                                    {post.author.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-espresso">{post.author.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-ocean-grain border border-mocha/10 rounded-2xl">
                                <svg className="w-16 h-16 mx-auto text-mocha mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 8M6 12h12M6 16h12"></path></svg>
                                <h3 className="text-2xl font-serif text-espresso mb-2">No articles found</h3>
                                <p className="text-mocha">Check back later for new stories in this category.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="flex justify-center mt-16 space-x-2">
                                {posts.links.map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(link.url)}
                                        disabled={!link.url || link.active}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-espresso text-crema'
                                                : link.url
                                                    ? 'bg-ocean-grain border border-mocha/20 text-espresso hover:bg-mocha/10'
                                                    : 'bg-transparent text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
