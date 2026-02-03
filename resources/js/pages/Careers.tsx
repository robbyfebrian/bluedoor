import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface JobOpening {
    id: number;
    title: string;
    type: string;
    location: string;
    description: string;
    requirements: string | null;
    responsibilities: string | null;
    salary_range: string | null;
}

interface CareersProps {
    jobs: JobOpening[];
}

export default function Careers({ jobs }: CareersProps) {
    useLenis(); // Enable smooth scrolling

    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        job_opening_id: '',
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
        cv: null as File | null,
    });

    const handleApply = (jobId: number) => {
        setSelectedJob(jobId);
        setData('job_opening_id', jobId.toString());
        setShowApplicationForm(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('careers.apply'), {
            onSuccess: () => {
                reset();
                setShowApplicationForm(false);
                alert('Application submitted successfully!');
            },
        });
    };

    return (
        <>
            <Head title="Careers - Blue Door Coffee" />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-amber-900 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <Link href="/" className="text-2xl font-bold">Blue Door Coffee</Link>
                            <div className="flex space-x-8">
                                <Link href="/" className="hover:text-amber-200 transition">Home</Link>
                                <Link href="/menu" className="hover:text-amber-200 transition">Menu</Link>
                                <Link href="/team" className="hover:text-amber-200 transition">Team</Link>
                                <Link href="/careers" className="text-amber-200 font-semibold">Careers</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">Join Our Team</h1>
                        <p className="text-lg text-amber-800">Build your career at Blue Door Coffee</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {!showApplicationForm ? (
                        <>
                            {jobs.length > 0 ? (
                                <div className="space-y-6">
                                    {jobs.map((job) => (
                                        <div key={job.id} className="bg-white border border-amber-200 rounded-lg p-8 shadow-md hover:shadow-xl transition">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-amber-900 mb-2">{job.title}</h2>
                                                    <div className="flex flex-wrap gap-4 text-sm text-amber-700">
                                                        <span className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                            {job.type}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                            </svg>
                                                            {job.location}
                                                        </span>
                                                        {job.salary_range && (
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                                </svg>
                                                                {job.salary_range}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleApply(job.id)}
                                                    className="bg-amber-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition"
                                                >
                                                    Apply Now
                                                </button>
                                            </div>

                                            <div className="prose prose-amber max-w-none mt-6">
                                                <div dangerouslySetInnerHTML={{ __html: job.description }} />

                                                {job.responsibilities && (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold text-amber-900 mb-2">Responsibilities</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
                                                    </div>
                                                )}

                                                {job.requirements && (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold text-amber-900 mb-2">Requirements</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <h2 className="text-2xl font-bold text-amber-900 mb-4">No Open Positions</h2>
                                    <p className="text-gray-600 mb-6">We don't have any open positions at the moment, but we're always looking for talented people!</p>
                                    <p className="text-amber-700">Check back soon or subscribe to our newsletter to be notified of new opportunities.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <button
                                onClick={() => setShowApplicationForm(false)}
                                className="mb-6 text-amber-900 hover:text-amber-700 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to Job Listings
                            </button>

                            <div className="bg-white border border-amber-200 rounded-lg p-8 shadow-md">
                                <h2 className="text-2xl font-bold text-amber-900 mb-6">Submit Your Application</h2>

                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700 mb-1">
                                            Cover Letter
                                        </label>
                                        <textarea
                                            id="cover_letter"
                                            value={data.cover_letter}
                                            onChange={(e) => setData('cover_letter', e.target.value)}
                                            rows={6}
                                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="Tell us why you'd be a great fit for this position..."
                                        />
                                        {errors.cover_letter && <p className="mt-1 text-sm text-red-600">{errors.cover_letter}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                                            CV/Resume * (PDF, DOC, DOCX - Max 5MB)
                                        </label>
                                        <input
                                            type="file"
                                            id="cv"
                                            onChange={(e) => setData('cv', e.target.files?.[0] || null)}
                                            accept=".pdf,.doc,.docx"
                                            required
                                            className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                        {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            </div>
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
