import { Head, Link } from '@inertiajs/react';
import { useLenis } from '@/hooks/useLenis';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
    image_url: string | null;
    menu_category: {
        name: string;
    };
}

interface Employee {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    photo: string | null;
    photo_url: string | null;
}

interface JobOpening {
    id: number;
    title: string;
    type: string;
    location: string;
}

interface HomeProps {
    featuredItems: MenuItem[];
    teamMembers: Employee[];
    openPositions: JobOpening[];
}

export default function Home({ featuredItems, teamMembers, openPositions }: HomeProps) {
    useLenis(); // Enable smooth scrolling

    return (
        <>
            <Head title="Blue Door Coffee Shop" />

            <div className="min-h-screen bg-white">
                {/* Header/Navigation */}
                <nav className="bg-amber-900 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <Link href="/" className="text-2xl font-bold">Blue Door Coffee</Link>
                            <div className="flex space-x-8">
                                <Link href="/" className="hover:text-amber-200 transition">Home</Link>
                                <Link href="/menu" className="hover:text-amber-200 transition">Menu</Link>
                                <Link href="/team" className="hover:text-amber-200 transition">Team</Link>
                                <Link href="/careers" className="hover:text-amber-200 transition">Careers</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-amber-900 mb-4">
                            Welcome to Blue Door Coffee
                        </h1>
                        <p className="text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
                            Your neighborhood coffee shop serving artisanal brews and delicious treats since 2020
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/menu" className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition">
                                View Menu
                            </Link>
                            <Link href="/careers" className="bg-white text-amber-900 border-2 border-amber-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
                                Join Our Team
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Menu Items */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Featured Menu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredItems.map((item) => (
                                <div key={item.id} className="bg-white border border-amber-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                                            <span className="text-lg font-bold text-amber-700">${item.price}</span>
                                        </div>
                                        <p className="text-sm text-amber-600 mb-2">{item.menu_category.name}</p>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/menu" className="text-amber-900 font-semibold hover:text-amber-700 transition">
                                View Full Menu →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Team Preview */}
                {teamMembers.length > 0 && (
                    <section className="py-16 bg-amber-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Meet Our Team</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="text-center">
                                        <div className="mb-4">
                                            {member.photo_url ? (
                                                <img src={member.photo_url} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg" />
                                            ) : (
                                                <div className="w-32 h-32 rounded-full mx-auto bg-amber-200 flex items-center justify-center shadow-lg">
                                                    <span className="text-3xl text-amber-900">{member.name[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-amber-900">{member.name}</h3>
                                        <p className="text-amber-700">{member.position}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/team" className="text-amber-900 font-semibold hover:text-amber-700 transition">
                                    Meet Everyone →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Careers Preview */}
                {openPositions.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-amber-900 mb-4 text-center">Join Our Team</h2>
                            <p className="text-center text-gray-600 mb-8">We're currently hiring for {openPositions.length} position{openPositions.length !== 1 ? 's' : ''}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {openPositions.map((job) => (
                                    <div key={job.id} className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                                        <h3 className="text-xl font-semibold text-amber-900 mb-2">{job.title}</h3>
                                        <p className="text-amber-700 mb-1">{job.type}</p>
                                        <p className="text-gray-600">{job.location}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/careers" className="bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition inline-block">
                                    View All Openings
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Newsletter Section */}
                <section className="py-16 bg-amber-900 text-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
                        <p className="mb-8">Subscribe to our newsletter for special offers and updates</p>
                        <form method="POST" action="/newsletter/subscribe" className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="px-4 py-3 rounded-lg flex-1 max-w-md text-gray-900"
                            />
                            <button type="submit" className="bg-white text-amber-900 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-amber-950 text-amber-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p>&copy; 2026 Blue Door Coffee. All rights reserved.</p>
                        <p className="mt-2 text-sm">123 Coffee Street, Brewtown | (555) 123-4567</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
