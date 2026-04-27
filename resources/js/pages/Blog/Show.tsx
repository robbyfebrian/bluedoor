import { Head, Link } from '@inertiajs/react';
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
    content: string;
    featured_image_url: string | null;
    category: string;
    tags: string[] | null;
    published_at: string;
    views: number;
    author: Author;
}

interface BlogShowProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogShow({ post, relatedPosts }: BlogShowProps) {
    useLenis();

    const categoryMap: Record<string, string> = {
        'news': 'News',
        'recipes': 'Recipes',
        'tips': 'Tips & Tricks',
        'events': 'Events',
    };

    return (
        <AppLayout>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt} />
            </Head>

            <div className="min-h-screen bg-transparent pt-24 pb-16">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <Navlink href="/blog" className="inline-flex items-center text-sm font-semibold text-caramel hover:text-espresso transition-colors mb-8">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Blog
                        </Navlink

                        <div className="flex items-center justify-center space-x-2 mb-6 text-sm font-bold tracking-wider uppercase text-espresso/70">
                            <span className="text-caramel">{categoryMap[post.category] || post.category}</span>
                            <span>•</span>
                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-espresso leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center mt-6">
                            <div className="flex items-center text-sm text-mocha space-x-6">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-ocean-start flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                                        {post.author.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-espresso">By {post.author.name}</span>
                                </div>
                                <span className="flex items-center border-l border-mocha/20 pl-6">
                                    <svg className="w-5 h-5 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    {post.views} views
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featured_image_url && (
                        <div className="mb-16 rounded-2xl overflow-hidden shadow-xl aspect-[21/9]">
                            <img
                                src={post.featured_image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-amber max-w-none prose-headings:font-serif prose-headings:text-espresso prose-a:text-caramel prose-a:no-underline hover:prose-a:text-espresso hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-mocha/10 flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="bg-ocean-grain px-4 py-1.5 rounded-full text-sm font-medium text-espresso border border-mocha/10">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t-2 border-mocha/10">
                        <h2 className="text-3xl font-serif font-bold text-espresso mb-10 text-center">More from {categoryMap[post.category] || post.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Navlink key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group flex flex-col bg-ocean-grain rounded-2xl overflow-hidden shadow-sm border border-mocha/10 hover:shadow-xl transition-all duration-300">
                                    {relatedPost.featured_image_url && (
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={relatedPost.featured_image_url}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-espresso mb-3 line-clamp-2 group-hover:text-caramel transition-colors">{relatedPost.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                                    </div>
                                </Navlink
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
