import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence } from 'framer-motion';

interface Branch {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    photo: string | null;
    photo_url: string | null;
    email: string | null;
    branch?: Branch;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    next_page_url?: string | null;
}

interface TeamProps {
    team: PaginatedData<Employee>;
    branches: Branch[];
    filters: { search?: string; branch?: string | number };
}

export default function Team({ team, branches, filters }: TeamProps) {
    useLenis(); // Enable smooth scrolling

    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedBranch, setSelectedBranch] = useState<number | 'all'>(filters?.branch as number | 'all' || 'all');
    const [loadedTeam, setLoadedTeam] = useState(team.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const isMounted = useRef(false);

    // Debounced filter submission
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/team',
                { search: searchQuery, branch: selectedBranch },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedBranch]);

    useEffect(() => {
        if (team.current_page === 1) {
            setLoadedTeam(team.data);
        } else {
            const newMembers = team.data.filter(newMember => !loadedTeam.some(oldMember => oldMember.id === newMember.id));
            setLoadedTeam(prev => [...prev, ...newMembers]);
        }
        setIsLoadingMore(false);
    }, [team]);

    const loadMore = () => {
        if (team.next_page_url) {
            setIsLoadingMore(true);
            router.get(team.next_page_url, { search: searchQuery, branch: selectedBranch }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    };

    const filteredTeam = loadedTeam;

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <Head title="Our Team" />
            <div className="min-h-screen bg-crema text-espresso font-sans selection:bg-gold selection:text-white">

                {/* HERO SECTION */}
                <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-ocean-grain text-crema overflow-hidden">
                    <div className="absolute inset-0 bg-noise mix-blend-multiply opacity-20"></div>
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="font-serif text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight mb-8 leading-none"
                        >
                            The People <br/><span className="italic text-oat/90">Behind the Craft</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-lg md:text-xl text-crema/80 max-w-2xl font-light"
                        >
                            Meet the dedicated individuals who bring the Blue Doors experience to life every single day.
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
                                    <option value="all">All Branches</option>
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
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-72 relative shrink-0">
                            <input
                                type="text"
                                placeholder="Search by name or position..."
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

                {/* TEAM GRID */}
                <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto min-h-[50vh]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={`${selectedBranch}-${searchQuery}`}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                        >
                            {filteredTeam.map((member) => (
                                <motion.div key={member.id} variants={fadeUp} className="group relative">
                                    <div className="aspect-3/4 overflow-hidden bg-white rounded-sm mb-6 relative">
                                        {member.photo_url ? (
                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 text-espresso/20 group-hover:scale-105 transition-transform duration-1000 will-change-transform">
                                                <span className="text-8xl font-serif">{member.name[0]}</span>
                                            </div>
                                        )}

                                        {/* Bio Overlay on Hover */}
                                        <div className="absolute inset-0 bg-ocean-start/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center cursor-default">
                                            <p className="text-crema/90 text-sm leading-relaxed font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {member.bio || "Passionate team member dedicated to delivering the best coffee experience."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="font-serif text-2xl text-espresso mb-1 tracking-tight">{member.name}</h3>
                                        <p className="text-xs uppercase tracking-[0.2em] text-espresso/60/70 mb-1">{member.position}</p>
                                        {member.branch && (
                                            <p className="text-[10px] uppercase tracking-widest text-espresso/60/40">{member.branch.name.replace('Blue Door Coffee – ', '')}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        {team.next_page_url && (
                            <div className="mt-16 flex justify-center w-full">
                                <button
                                    onClick={loadMore}
                                    disabled={isLoadingMore}
                                    className="bg-transparent border border-ocean-start text-espresso px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-ocean-start hover:text-white transition-all duration-300 disabled:opacity-50"
                                >
                                    {isLoadingMore ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </AnimatePresence>

                    {filteredTeam.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full py-32 flex flex-col items-center justify-center text-center text-espresso/60/50"
                        >
                            <span className="text-4xl mb-4">☕️</span>
                            <p className="font-serif text-2xl mb-2">No team members found</p>
                            <p className="text-sm">Try adjusting your search or branch filter.</p>
                        </motion.div>
                    )}
                </section>
            </div>
        </>
    );
}
