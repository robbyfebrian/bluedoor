import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
    image_url: string | null;
    allergens: string[] | null;
}

interface MenuCategory {
    id: number;
    name: string;
    description: string | null;
    menu_items: MenuItem[];
}

interface MenuProps {
    categories: MenuCategory[];
}

export default function Menu({ categories }: MenuProps) {
    useLenis(); // Enable smooth scrolling

    const [activeCategory, setActiveCategory] = useState<number | null>(
        categories.length > 0 ? categories[0].id : null
    );

    const activeItems = categories.find(cat => cat.id === activeCategory)?.menu_items || [];

    return (
        <>
            <Head title="Menu - Blue Door Coffee" />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-amber-900 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <Link href="/" className="text-2xl font-bold">Blue Door Coffee</Link>
                            <div className="flex space-x-8">
                                <Link href="/" className="hover:text-amber-200 transition">Home</Link>
                                <Link href="/menu" className="text-amber-200 font-semibold">Menu</Link>
                                <Link href="/team" className="hover:text-amber-200 transition">Team</Link>
                                <Link href="/careers" className="hover:text-amber-200 transition">Careers</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">Our Menu</h1>
                        <p className="text-lg text-amber-800">Handcrafted with love, served with care</p>
                    </div>
                </div>

                {/* Menu Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    activeCategory === category.id
                                        ? 'bg-amber-900 text-white'
                                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Menu Items Grid */}
                    {activeItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeItems.map((item) => (
                                <div key={item.id} className="bg-white border border-amber-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                                            <span className="text-lg font-bold text-amber-700">${item.price}</span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        {item.allergens && item.allergens.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.allergens.map((allergen, index) => (
                                                    <span key={index} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                                                        {allergen}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No items in this category yet.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="bg-amber-950 text-amber-100 py-8 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p>&copy; 2026 Blue Door Coffee. All rights reserved.</p>
                        <p className="mt-2 text-sm">123 Coffee Street, Brewtown | (555) 123-4567</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
