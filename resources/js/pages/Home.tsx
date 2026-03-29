import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import AppLayout from '@/layouts/AppLayout';

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

    const { flash } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        name: '',
    });

    const submitNewsletter: FormEventHandler = (e) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => reset('email', 'name'),
        });
    };

    return (
        <AppLayout>
            <Head title="Home" />

            <div className="min-h-screen bg-transparent">
                {/* Brutalist Hero Section */}
                <section className="relative h-screen w-full flex overflow-hidden m-0 p-0 text-[#1a1a1a]">

                    {/* Background Split Screen */}
                    <div className="inset-0 flex w-full h-full">
                        {/* Subtitle & Map Button */}
                        <div>
                            <div className="absolute bottom-64 left-24 flex w-260 flex-col justify-center items-start z-30 text-crema mix-blend-exclusion">
                                <h1 className="font-sans text-[5vw] lg:text-[9vw] font-black uppercase leading-none">
                                    HOME FOR <br/>
                                    BETTER COFFEE
                                </h1>
                            </div>
                            <div className='absolute bottom-32 left-24 flex w-240 flex-col justify-center items-start z-30 text-crema'>
                                <p className="font-sans text-xs leading-[1.6] tracking-wide my-4">
                                Founded in 2013, Blue Doors began with a focused vision to treat coffee as a craft guided by intention and detail. Rooted in Braga, Bandung, we have grown into a platform that brings people together through responsibly sourced, precisely roasted, and purposefully served coffee. Every space we create is a reflection of our belief in Blue Doors as a Home for Better Coffee defined by consistency, quality, and meaningful experiences.
                            </p>
                            <a
                                href="https://maps.app.goo.gl/YourGmapsLinkHere"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-crema bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-crema hover:text-crema transition-all pointer-events-auto"
                            >
                                📍 Blue Doors Solo
                            </a>
                            </div>
                        </div>



                        {/* Left Side: Solid White (Image Placeholder) */}
                        <div className="relative w-full lg:w-[50%] h-auto flex flex-col justify-end p-8 pb-24 sm:p-16 lg:pb-32 lg:pr-24 z-10">
                            <img src="/images/landing-page/hero-image.avif" alt="Megan Blend" className="absolute inset-0 h-full w-full object-cover" />
                        </div>

                        {/* Right Side: Off-white */}
                        <div className="hidden lg:flex w-[50%] h-full bg-transparent relative">
                            {/* Empty right area per current reference focus */}
                        </div>
                    </div>
                </section>

                {/* Highlight Beans Section */}
                <section className="bg-ocean-grain py-24 min-h-screen flex items-center justify-center text-crema">
                    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 font-serif text-3xl font-bold sm:text-4xl text-crema tracking-widest">
                                THE UNBEATABLE SIPS
                            </h2>
                            <p className="font-serif text-lg text-crema/80">
                                A trilogy of character: three expressions, one unforgettable standard.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
                            {/* Megan Blend */}
                            <div className="rounded-xl border border-ocean-start/40 bg-ocean-gradient p-8 transition-shadow hover:shadow-xl hover:shadow-black/20">
                                <div className="mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg bg-black/10">
                                     <img src="https://placehold.co/800x600/1a365d/e2dcd0?text=Megan+Blend" alt="Megan Blend" className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105" />
                                </div>
                                <h3 className="mb-4 font-serif text-2xl font-bold text-crema">Megan Blend</h3>
                                <p className="text-sm leading-relaxed text-crema/80">
                                    Our latest blend featuring the exquisite flavors of pomegranate, red currant, and a smooth caramel finish. Crafted for the bold & breaker of the status quo who always seek a unique and unparalleled experience. Megan embodies our newest campaign, 'Unbeatable Sips' - ensuring that every first sip matters the most.
                                </p>
                            </div>

                            {/* Avatara */}
                            <div className="rounded-xl border border-ocean-start/40 bg-ocean-gradient p-8 transition-shadow hover:shadow-xl hover:shadow-black/20">
                                <div className="mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg bg-black/10">
                                     <img src="https://placehold.co/800x600/1a365d/e2dcd0?text=Avatara" alt="Avatara" className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105" />
                                </div>
                                <h3 className="mb-4 font-serif text-2xl font-bold text-crema">Avatara</h3>
                                <p className="text-sm leading-relaxed text-crema/80">
                                    Introducing our Avatara single origin beans, now available at all Blue Doors across Indonesia! For those who crave sweet, explosive flavors with a touch of charm-take a seat, relax, and savor an unbeatable sip with us.
                                </p>
                            </div>

                            {/* Chieftain */}
                            <div className="rounded-xl border border-ocean-start/40 bg-ocean-gradient p-8 transition-shadow hover:shadow-xl hover:shadow-black/20">
                                <div className="mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg bg-black/10">
                                     <img src="https://placehold.co/800x600/1a365d/e2dcd0?text=Chieftain" alt="Chieftain" className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105" />
                                </div>
                                <h3 className="mb-4 font-serif text-2xl font-bold text-crema">Chieftain</h3>
                                <p className="text-sm leading-relaxed text-crema/80">
                                    Essentially, coffee comes from a fruit, and the best sweetness and flavor come when it's perfectly ripe. What we're aiming for with coffee is to bring out those sweet, ripe fruit flavors that make it really enjoyable. These coffee origins are the first our encountered with their distinctive characteristics. Exploring these flavors has deepened my appreciation for coffee.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Menu Items */}
                <section className="py-16 bg-white min-h-screen flex items-center justify-center">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-espresso mb-8 text-center">Featured Menu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredItems.map((item) => (
                                <div key={item.id} className="bg-ocean-grain border border-ocean-start/40 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition text-crema">
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-crema">{item.name}</h3>
                                            <span className="text-lg font-bold text-crema">${item.price}</span>
                                        </div>
                                        <p className="mb-2 text-sm text-crema/80">{item.menu_category.name}</p>
                                        <p className="text-crema/90">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/menu" className="text-espresso font-semibold hover:text-crema transition">
                                View Full Menu →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Team Preview */}
                {teamMembers.length > 0 && (
                    <section className="py-16 bg-ocean-grain/30 min-h-[70vh] flex items-center justify-center">
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-espresso mb-8 text-center">Meet Our Team</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="rounded-xl border border-ocean-start/40 bg-ocean-grain p-6 text-center text-crema shadow-md">
                                        <div className="mb-4">
                                            {member.photo_url ? (
                                                <img src={member.photo_url} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg" />
                                            ) : (
                                                <div className="w-32 h-32 rounded-full mx-auto bg-ocean-start/50 flex items-center justify-center shadow-lg">
                                                    <span className="text-3xl text-crema">{member.name[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-crema">{member.name}</h3>
                                        <p className="text-crema/85">{member.position}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/team" className="text-espresso font-semibold hover:text-crema transition">
                                    Meet Everyone →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Careers Preview */}
                {openPositions.length > 0 && (
                    <section className="py-16 bg-white min-h-[70vh] flex items-center justify-center">
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-espresso mb-4 text-center">Join Our Team</h2>
                            <p className="text-center text-gray-600 mb-8">We're currently hiring for {openPositions.length} position{openPositions.length !== 1 ? 's' : ''}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {openPositions.map((job) => (
                                    <div key={job.id} className="bg-ocean-grain p-6 rounded-lg border border-ocean-start/40 text-crema">
                                        <h3 className="text-xl font-semibold text-crema mb-2">{job.title}</h3>
                                        <p className="text-crema/85 mb-1">{job.type}</p>
                                        <p className="text-crema/80">{job.location}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/careers" className="bg-espresso text-white px-8 py-3 rounded-lg font-semibold hover:bg-caramel transition inline-block">
                                    View All Openings
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Newsletter Section */}
                <section className="border-t border-mocha/10 bg-ocean-grain py-16 min-h-[70vh] flex items-center justify-center text-crema">
                    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-serif text-3xl font-bold mb-4">Stay Connected</h2>
                        <p className="mb-8 font-serif text-crema">Subscribe to our newsletter for special offers and updates</p>
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
                        <form onSubmit={submitNewsletter} className="max-w-md mx-auto space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Your name (optional)"
                                className="w-full bg-crema text-espresso border-2 border-crema/40 placeholder:text-espresso/70 focus:border-espresso focus:ring-0 px-4 py-3 rounded-xl transition"
                            />
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full bg-crema text-espresso border-2 border-crema/40 placeholder:text-espresso/70 focus:border-espresso focus:ring-0 px-4 py-3 rounded-xl transition"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-espresso text-crema px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-caramel transition disabled:cursor-not-allowed disabled:bg-mocha disabled:opacity-70"
                            >
                                {processing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </form>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
