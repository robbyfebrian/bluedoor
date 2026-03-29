import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import AppLayout from '@/layouts/AppLayout';

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
        <AppLayout>
            <Head title="Menu  " />

            <div className="min-h-screen bg-transparent">
                {/* Navigation */}


                {/* Header */}
                <div className="bg-ocean-gradient py-12 text-crema">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="mb-2 font-serif text-4xl font-bold text-crema">Our Menu</h1>
                        <p className="text-lg text-crema/90">Handcrafted with love, served with care</p>
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
                                        ? 'bg-espresso text-white'
                                        : 'bg-ocean-grain text-espresso hover:bg-ocean-grain/70'
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
                                <div key={item.id} className="bg-transparent border border-mocha/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-espresso">{item.name}</h3>
                                            <span className="text-lg font-bold text-crema">${item.price}</span>
                                        </div>
                                        <p className="text-crema mb-4">{item.description}</p>
                                        {item.allergens && item.allergens.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.allergens.map((allergen, index) => (
                                                    <span key={index} className="rounded bg-ocean-grain px-2 py-1 text-xs text-caramel">
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
                            <p className="text-crema text-lg">No items in this category yet.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}

            </div>
        </AppLayout>
    );
}
