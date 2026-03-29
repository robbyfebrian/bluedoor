import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import AppLayout from '@/layouts/AppLayout';

interface NewsletterUnsubscribeProps {
    email: string;
}

export default function NewsletterUnsubscribe({ email }: NewsletterUnsubscribeProps) {
    useLenis();
    const { flash } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors } = useForm({
        email: email ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/newsletter/unsubscribe', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Unsubscribe Newsletter  " />

            <div className="min-h-screen bg-transparent">
                <section className="bg-ocean-gradient py-12 text-crema">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <h1 className="mb-2 font-serif text-4xl font-bold text-crema">Unsubscribe Newsletter</h1>
                        <p className="text-lg text-crema/90">Manage your email preferences anytime.</p>
                    </div>
                </section>

                <main className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="rounded-xl border border-mocha/20 bg-transparent p-8 shadow-md">
                        <h2 className="mb-2 text-3xl font-bold text-espresso">Unsubscribe Newsletter</h2>
                        <p className="mb-6 text-crema">Enter your email to stop receiving newsletters from Blue Door Coffee.</p>

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
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-mocha/20 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-caramel"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-espresso px-8 py-3 font-semibold text-white transition hover:bg-caramel disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing ? 'Submitting...' : 'Unsubscribe'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
