import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Welcome  " />

            <section className="bg-ocean-gradient py-20 text-crema">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-crema sm:text-6xl">
                        Welcome to Blue Door Coffee
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-crema/90 sm:text-xl">
                        A calm place for handcrafted coffee, warm conversations, and thoughtful rituals.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <article className="rounded-xl border border-ocean-start/40 bg-ocean-grain p-8 text-crema shadow-sm">
                        <h2 className="mb-3 font-serif text-2xl font-bold text-crema">Explore Our Menu</h2>
                        <p className="mb-6 text-crema/90">
                            Discover seasonal drinks, house signatures, and carefully selected beans.
                        </p>
                        <Link
                            href="/menu"
                            className="inline-flex rounded-lg bg-ocean-gradient px-5 py-2.5 font-semibold text-crema transition hover:opacity-90"
                        >
                            View Menu
                        </Link>
                    </article>

                    <article className="rounded-xl border border-ocean-start/40 bg-ocean-grain p-8 text-crema shadow-sm">
                        <h2 className="mb-3 font-serif text-2xl font-bold text-crema">Join the Team</h2>
                        <p className="mb-6 text-crema/90">
                            We are always looking for people who care deeply about service and craft.
                        </p>
                        <Link
                            href="/careers"
                            className="inline-flex rounded-lg border border-crema/40 bg-ocean-gradient px-5 py-2.5 font-semibold text-crema transition hover:opacity-90"
                        >
                            See Careers
                        </Link>
                    </article>
                </div>
            </main>
        </AppLayout>
    );
}
