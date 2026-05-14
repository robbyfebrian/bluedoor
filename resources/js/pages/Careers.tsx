import { Head, useForm, usePage, router } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '@/Components/Pagination';

interface Branch {
    id: number;
    name: string;
}

interface JobOpening {
    id: number;
    title: string;
    type: string;
    location: string;
    description: string;
    requirements: string | null;
    responsibilities: string | null;
    salary_range: string | null;
    branch?: Branch;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface CareersProps {
    jobs: PaginatedData<JobOpening>;
    branches: Branch[];
    filters: { search?: string; branch?: string | number; type?: string };
}

export default function Careers({ jobs, branches, filters }: CareersProps) {
    useLenis();
    const { flash } = usePage<SharedData>().props;

    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedBranch, setSelectedBranch] = useState<number | 'all'>(filters?.branch as number | 'all' || 'all');
    const [selectedType, setSelectedType] = useState<string | 'all'>(filters?.type || 'all');

    const types = ['Full-time', 'Part-time', 'Contract', 'Internship']; // Fallback types since we paginated

    const isMounted = useRef(false);

    // Debounced filter submission
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/careers',
                { search: searchQuery, branch: selectedBranch, type: selectedType },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedBranch, selectedType]);
    const [loadedJobs, setLoadedJobs] = useState(jobs.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (jobs.current_page === 1) {
            setLoadedJobs(jobs.data);
        } else {
            const newJobs = jobs.data.filter(newJob => !loadedJobs.some(oldJob => oldJob.id === newJob.id));
            setLoadedJobs(prev => [...prev, ...newJobs]);
        }
        setIsLoadingMore(false);
    }, [jobs]);

    const loadMore = () => {
        if (jobs.next_page_url) {
            setIsLoadingMore(true);
            router.get(jobs.next_page_url, { search: searchQuery, branch: selectedBranch, type: selectedType }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    const filteredJobs = loadedJobs;
    const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
    const [isApplying, setIsApplying] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        job_opening_id: '',
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
        cv: null as File | null,
        newsletter_consent: false,
    });

    const openJobDetails = (job: JobOpening) => {
        setSelectedJob(job);
        setIsApplying(false);
    };

    const closeDetails = () => {
        setSelectedJob(null);
        setIsApplying(false);
    };

    const handleApply = (jobId: number) => {
        setData('job_opening_id', jobId.toString());
        setIsApplying(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/careers/apply', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeDetails();
            },
        });
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    // Body scroll lock when modal open
    useEffect(() => {
        if (selectedJob) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // @ts-ignore
            window.lenis?.stop();
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        }
        return () => { 
            document.body.style.overflow = 'unset'; 
            document.documentElement.style.overflow = 'unset';
            // @ts-ignore
            window.lenis?.start();
        };
    }, [selectedJob]);

    return (
        <>
            <Head title="Careers" />

            <div className="min-h-screen bg-crema text-espresso font-sans selection:bg-gold selection:text-white">

                {/* HERO SECTION */}
                <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-ocean-grain text-crema overflow-hidden">
                    <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="font-serif text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight mb-8 leading-none"
                        >
                            Shape the <br /><span className="italic text-oat/90">Future of Coffee</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-crema/80 max-w-2xl font-light"
                        >
                            Join a team dedicated to craftsmanship, community, and the relentless pursuit of an unbeatable sip.
                        </motion.p>
                    </div>
                </section>

                {/* FILTER SECTION */}
                <section className="sticky top-0 z-40 bg-crema/95 backdrop-blur-md border-b border-ocean-start/10">
                    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

                            {/* Branch Select */}
                            <div className="relative w-full sm:w-64">
                                <select
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                    className="w-full appearance-none bg-transparent border-0 border-b border-espresso/20 text-espresso text-sm uppercase tracking-widest font-medium px-0 py-2 pr-8 focus:ring-0 focus:border-espresso focus:outline-none cursor-pointer transition-colors"
                                >
                                    <option value="all">All Locations</option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name.replace('Blue Door Coffee – ', '')}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-espresso/60">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            {/* Type Select */}
                            <div className="relative w-full sm:w-48">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full appearance-none bg-transparent border-0 border-b border-espresso/20 text-espresso text-sm uppercase tracking-widest font-medium px-0 py-2 pr-8 focus:ring-0 focus:border-espresso focus:outline-none cursor-pointer transition-colors"
                                >
                                    <option value="all">All Types</option>
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-espresso/60">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-72 relative shrink-0">
                            <input
                                type="text"
                                placeholder="Cari Lowongan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-0 border-b border-espresso/20 focus:border-espresso focus:outline-none focus:ring-0 px-0 py-2 text-sm placeholder:text-espresso/40 transition-colors text-espresso"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso text-xs uppercase tracking-widest transition-colors">
                                    Clear
                                </button>
                            )}
                            {!searchQuery && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso/40 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* NOTIFICATIONS */}
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pt-8 -mb-16 relative z-30">
                    {(flash?.success || flash?.error || flash?.info) && (
                        <div className="mb-6 p-4 bg-[#E3F2FD] border border-[#90CAF9] text-[#1565C0] rounded-sm flex items-center justify-center gap-3">
                            <span className="text-lg">ℹ</span>
                            <p className="font-medium text-sm tracking-wide">{flash.success || flash.error || flash.info}</p>
                        </div>
                    )}
                </div>

                {/* BENTO GRID */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto min-h-[50vh]">

                    <AnimatePresence mode='wait'>
                        {filteredJobs.length > 0 ? (
                            <motion.div
                                key={`${selectedBranch}-${selectedType}-${searchQuery}`}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
                            >
                                {filteredJobs.map((job, index) => {
                                    // Bento logic: Make every 1st and 4th item large (span 2 cols) if possible
                                    const isLarge = (index % 4 === 0 || index % 4 === 3) && filteredJobs.length > 1;

                                    return (
                                        <motion.div
                                            key={job.id}
                                            variants={fadeUp}
                                            onClick={() => openJobDetails(job)}
                                            className={`group relative overflow-hidden bg-white rounded-sm p-8 flex flex-col justify-between cursor-pointer hover:text-crema transition-colors duration-500 border border-ocean-start/10 hover:border-ocean-start ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                                        >
                                            {/* Smooth Hover Background */}
                                            <div className="absolute inset-0 bg-ocean-grain opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                                            <div className="relative z-10 flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="font-serif text-2xl lg:text-3xl tracking-tight mb-2 group-hover:text-crema text-espresso transition-colors duration-500">{job.title}</h3>
                                                    <p className="text-xs uppercase tracking-widest text-espresso/60 group-hover:text-crema/80 transition-colors duration-500">
                                                        {job.branch ? job.branch.name.replace('Blue Door Coffee – ', '') : job.location} • {job.type}
                                                    </p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full border border-ocean-start/20 group-hover:border-crema/30 flex items-center justify-center shrink-0 transition-colors duration-500">
                                                    <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">→</span>
                                                </div>
                                            </div>

                                            <div className="relative z-10 mt-8">
                                                <div className="text-sm font-light leading-relaxed text-espresso/80 group-hover:text-crema/90 transition-colors duration-500 line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: job.description }} />
                                                {job.salary_range && (
                                                    <p className="text-xs font-semibold tracking-wider text-gold">{job.salary_range}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                                {jobs.next_page_url && (
                                    <div className="mt-16 col-span-1 md:col-span-3 flex justify-center w-full">
                                        <button
                                            onClick={loadMore}
                                            disabled={isLoadingMore}
                                            className="bg-transparent border border-ocean-start text-espresso px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-ocean-start hover:text-white transition-all duration-300 disabled:opacity-50"
                                        >
                                            {isLoadingMore ? 'Loading...' : 'Load More'}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full py-32 flex flex-col items-center justify-center text-center text-espresso/60/50"
                            >
                                <span className="text-4xl mb-4">🚪</span>
                                <p className="font-serif text-2xl mb-2">No Open Positions</p>
                                <p className="text-sm max-w-md">We don't have any matching positions at the moment. Try adjusting your filters or check back soon.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* MODAL FOR JOB DETAILS & FORM */}
                {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedJob && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeDetails}
                                className="fixed inset-0 bg-ocean-start/20 backdrop-blur-sm z-[60]"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, y: '100%', scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: '100%', scale: 0.95 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed inset-x-0 bottom-0 md:inset-4 lg:inset-y-10 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-5xl bg-crema z-[60] rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] md:max-h-full"
                            >
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-6 lg:p-10 border-b border-ocean-start/10/10 bg-crema shrink-0">
                                    <div>
                                        <h2 className="font-serif text-3xl lg:text-4xl text-espresso tracking-tight">{selectedJob.title}</h2>
                                        <p className="text-xs uppercase tracking-widest text-espresso/60/60 mt-2">
                                            {selectedJob.branch ? selectedJob.branch.name.replace('Bluedoor Coffee - ', '') : selectedJob.location} • {selectedJob.type}
                                        </p>
                                    </div>
                                    <button onClick={closeDetails} className="w-10 h-10 rounded-full bg-white hover:bg-ocean-start/80/10 flex items-center justify-center transition-colors text-espresso shrink-0">
                                        ✕
                                    </button>
                                </div>

                                {/* Modal Body (Scrollable) */}
                                <div className="flex-1 overflow-y-auto p-6 lg:p-10" data-lenis-prevent>
                                    {!isApplying ? (
                                        <div className="prose prose-blue max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-espresso prose-p:font-light prose-p:text-espresso/60/90 prose-li:text-espresso/60/90">
                                            <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} className="mb-8 text-lg leading-relaxed"/>

                                            {selectedJob.responsibilities && (
                                                <div className="mb-8">
                                                    <h3 className="text-2xl mb-4">Responsibilities</h3>
                                                    <div dangerouslySetInnerHTML={{ __html: selectedJob.responsibilities }} />
                                                </div>
                                            )}

                                            {selectedJob.requirements && (
                                                <div className="mb-8">
                                                    <h3 className="text-2xl mb-4">Requirements</h3>
                                                    <div dangerouslySetInnerHTML={{ __html: selectedJob.requirements }} />
                                                </div>
                                            )}

                                            {selectedJob.salary_range && (
                                                <div className="p-6 bg-white rounded-sm border border-ocean-start/10/10 mt-8">
                                                    <p className="text-xs uppercase tracking-widest text-espresso/60/60 mb-1">Salary Range</p>
                                                    <p className="font-medium text-lg text-espresso">{selectedJob.salary_range}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="max-w-2xl mx-auto"
                                        >
                                            <button
                                                onClick={() => setIsApplying(false)}
                                                className="mb-8 text-espresso/60/60 hover:text-espresso flex items-center text-sm uppercase tracking-widest transition-colors"
                                            >
                                                ← Back to Details
                                            </button>

                                            <h3 className="font-serif text-3xl text-espresso mb-8">Submit Application</h3>

                                            <form onSubmit={submit} className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            required
                                                            placeholder=" "
                                                            className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer"
                                                        />
                                                        <label htmlFor="name" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Full Name *</label>
                                                        {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
                                                    </div>

                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            required
                                                            placeholder=" "
                                                            className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer"
                                                        />
                                                        <label htmlFor="email" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email Address *</label>
                                                        {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        required
                                                        placeholder=" "
                                                        className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer"
                                                    />
                                                    <label htmlFor="phone" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Phone Number *</label>
                                                    {errors.phone && <p className="mt-2 text-xs text-red-600">{errors.phone}</p>}
                                                </div>

                                                <div className="relative">
                                                    <textarea
                                                        id="cover_letter"
                                                        value={data.cover_letter}
                                                        onChange={(e) => setData('cover_letter', e.target.value)}
                                                        rows={4}
                                                        placeholder=" "
                                                        className="block w-full px-0 pt-4 pb-2 text-espresso bg-transparent border-0 border-b border-ocean-start/10/30 appearance-none focus:outline-none focus:ring-0 focus:border-ocean-start peer resize-none"
                                                    />
                                                    <label htmlFor="cover_letter" className="absolute text-sm text-espresso/60/50 duration-300 transform -translate-y-4 scale-75 top-4 -z-10 origin-[0] peer-focus:text-espresso peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Cover Letter (Optional)</label>
                                                    {errors.cover_letter && <p className="mt-2 text-xs text-red-600">{errors.cover_letter}</p>}
                                                </div>

                                                <div>
                                                    <p className="text-sm text-espresso/60/60 mb-2">CV / Resume * (PDF, DOCX)</p>
                                                    <div className="border border-dashed border-ocean-start/10/30 p-6 rounded-sm text-center hover:bg-white/50 transition-colors relative">
                                                        <input
                                                            type="file"
                                                            id="cv"
                                                            onChange={(e) => setData('cv', e.target.files?.[0] || null)}
                                                            accept=".pdf,.doc,.docx"
                                                            required
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <span className="text-sm text-espresso font-medium border-b border-ocean-start pb-1">
                                                            {data.cv ? data.cv.name : "Upload File"}
                                                        </span>
                                                    </div>
                                                    {errors.cv && <p className="mt-2 text-xs text-red-600">{errors.cv}</p>}
                                                </div>

                                                <div className="pt-4 pb-8">
                                                    <label className="mb-4 flex items-start gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.newsletter_consent}
                                                            onChange={(e) => setData('newsletter_consent', e.target.checked)}
                                                            className="mt-1 h-4 w-4 accent-[#305aa0]"
                                                            required
                                                        />
                                                        <span className="text-xs text-espresso/70 leading-relaxed">
                                                            Saya setuju berlangganan newsletter Blue Door Coffee dan memahami langganan akan aktif setelah verifikasi email (double opt-in).
                                                        </span>
                                                    </label>
                                                    {errors.newsletter_consent && (
                                                        <p className="mb-4 text-xs text-red-600 text-center">{errors.newsletter_consent}</p>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="w-full bg-ocean-grain text-crema px-8 py-4 font-medium tracking-widest uppercase hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {processing ? 'Submitting...' : 'Submit Application'}
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Modal Footer - Only show if not applying */}
                                {!isApplying && (
                                    <div className="p-6 border-t border-ocean-start/10/10 bg-white flex justify-end shrink-0">
                                        <button
                                            onClick={() => handleApply(selectedJob.id)}
                                            className="bg-gold rounded-lg text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-ocean-grain transition-all duration-300"
                                        >
                                            Apply for this role
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
                )}
            </div>
        </>
    );
}
