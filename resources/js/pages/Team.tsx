import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
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

interface TeamProps {
    team: Employee[];
    branches: Branch[];
}

export default function Team({ team, branches }: TeamProps) {
    useLenis(); // Enable smooth scrolling

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<number | 'all'>('all');

    const filteredTeam = useMemo(() => {
        return team.filter((member) => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.position.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesBranch = selectedBranch === 'all' || member.branch?.id === selectedBranch;

            return matchesSearch && matchesBranch;
        });
    }, [team, searchQuery, selectedBranch]);

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

                {/* FILTER & SEARCH SECTION */}
                <section className="sticky top-0 z-40 bg-crema/90 backdrop-blur-md border-b border-ocean-start/10">
                    <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Branches Filter */}
                        <div className="flex gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide text-sm uppercase tracking-widest font-medium">
                            <button
                                onClick={() => setSelectedBranch('all')}
                                className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${selectedBranch === 'all' ? 'border-ocean-start text-espresso' : 'border-transparent text-espresso/60/50 hover:text-espresso'}`}
                            >
                                All Branches
                            </button>
                            {branches.map(branch => (
                                <button
                                    key={branch.id}
                                    onClick={() => setSelectedBranch(branch.id)}
                                    className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${selectedBranch === branch.id ? 'border-ocean-start text-espresso' : 'border-transparent text-espresso/60/50 hover:text-espresso'}`}
                                >
                                    {branch.name.replace('Blue Door Coffee – ', '')}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-64 relative">
                            <input
                                type="text"
                                placeholder="Search by name or position..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-0 border-b border-ocean-start/10/30 focus:border-ocean-start focus:ring-0 px-0 py-2 text-sm placeholder:text-espresso/60/40 transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso/60/40 hover:text-espresso text-xs uppercase tracking-widest"
                                >
                                    Clear
                                </button>
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
                                    <div className="aspect-[3/4] overflow-hidden bg-white rounded-sm mb-6 relative">
                                        {member.photo_url ? (
                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 text-espresso/60/20 group-hover:scale-105 transition-transform duration-1000">
                                                <span className="text-8xl font-serif">{member.name[0]}</span>
                                            </div>
                                        )}

                                        {/* Bio Overlay on Hover */}
                                        <div className="absolute inset-0 bg-ocean-start/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center backdrop-blur-sm cursor-default">
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
