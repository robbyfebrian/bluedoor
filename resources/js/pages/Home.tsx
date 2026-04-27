import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import RollingText from '@/Components/RollingText';
import { MaskedReveal, SplitTextReveal } from '@/Components/MaskedReveal';

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

    const [auraColor, setAuraColor] = useState('bg-gold/30');
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    
    // Smooth and fast follow
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Because the aura div has top-[-300px] and left-[-300px],
            // setting x and y to clientX and clientY perfectly centers it.
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

    // Grid Parallax setup for the 7-picture asymmetric scroll
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress: gridScroll } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(gridScroll, [0, 1], [0, -100]);
    const y2 = useTransform(gridScroll, [0, 1], [0, -250]);
    const y3 = useTransform(gridScroll, [0, 1], [0, -150]);
    const y4 = useTransform(gridScroll, [0, 1], [0, -300]);
    const y5 = useTransform(gridScroll, [0, 1], [0, -50]);
    const y6 = useTransform(gridScroll, [0, 1], [0, -200]);
    const y7 = useTransform(gridScroll, [0, 1], [0, -100]);

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const submitNewsletter: FormEventHandler = (e) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => reset('email', 'name'),
        });
    };

    return (
        <>
            <Head title="Home" />

            <div className="relative z-10 bg-crema text-espresso font-sans selection:bg-gold selection:text-white">
                <motion.div
                    className={`fixed top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full pointer-events-none z-[50] transition-colors duration-300 mix-blend-normal opacity-50`}
                    style={{
                        x: springX,
                        y: springY,
                        background: auraColor.includes('gold')
                            ? 'radial-gradient(circle, rgba(200, 169, 119, 0.4) 0%, transparent 60%)'
                            : auraColor.includes('ocean')
                                ? 'radial-gradient(circle, rgba(26, 54, 93, 0.3) 0%, transparent 60%)'
                                : 'radial-gradient(circle, rgba(209, 200, 192, 0.4) 0%, transparent 60%)'
                    }}
                />

                {/* 1. HERO SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-gold/30')} className="relative h-screen w-full flex overflow-hidden bg-espresso">
                    <motion.div style={{ y: yHero }} className="absolute inset-0">
                        <img src="/images/landing-page/hero-image.avif" alt="Bluedoor Coffee" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-espresso/30 to-espresso/90" />
                    </motion.div>

                    <div className="relative z-10 flex flex-col justify-center items-center lg:items-end w-full h-full text-center lg:text-left px-6 lg:px-24 pt-20">
                        <div className="flex flex-col items-center lg:items-start max-w-2xl">
                            <div className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-crema tracking-tight mb-8 leading-[1.1] uppercase">
                                <SplitTextReveal text="HOME FOR" delay={0.2} />
                                <SplitTextReveal text="BETTER COFFEE" delay={0.4} />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="backdrop-blur-md bg-black/20 border border-white/10 rounded-3xl p-8 lg:p-10 text-left shadow-2xl"
                            >
                                <p className="text-crema/90 text-lg lg:text-xl font-light leading-relaxed mb-8">
                                    Founded in 2013 in Braga, Bandung. We treat coffee as a craft guided by intention and detail — responsibly sourced, precisely roasted, and purposefully served to create meaningful experiences.
                                </p>

                                <Link href="/team" className="inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold tracking-widest text-espresso transition hover:bg-white hover:scale-105 shadow-sm">
                                    Discover Our Story
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        >
                            <Link href="/locations" className="text-crema text-[10px] uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors">
                                Our Locations
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* 2. THE GLOBAL STAGE MARQUEE */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-20 lg:py-24 bg-espresso text-crema border-b border-crema/10 overflow-hidden flex whitespace-nowrap select-none">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="flex gap-16 lg:gap-32 items-center px-8 lg:px-16"
                    >
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-16 lg:gap-32 items-center">
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl lg:text-5xl italic tracking-tight">19 Somerset Pl, Melbourne</span>
                                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold mt-3 uppercase font-medium">From Bandung to Melbourne.</span>
                                </div>
                                <span className="text-gold/40 text-2xl">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl lg:text-5xl italic tracking-tight">Brewing Soon. Semarang</span>
                                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold mt-3 uppercase font-medium">Heart of Kota Lama.</span>
                                </div>
                                <span className="text-gold/40 text-2xl">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl lg:text-5xl italic tracking-tight">Cafe in Residence</span>
                                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold mt-3 uppercase font-medium">Kinto Exhibit, BKK</span>
                                </div>
                                <span className="text-gold/40 text-2xl">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl lg:text-5xl italic tracking-tight">In Collaboration</span>
                                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-gold mt-3 uppercase font-medium">BDX SAM & NATT, Gafoy</span>
                                </div>
                                <span className="text-gold/40 text-2xl">✦</span>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* 3. A RECORD OF CRAFT (7-PICTURE ASYMMETRIC SCROLL) */}
                <section ref={containerRef} onMouseEnter={() => setAuraColor('bg-gold/20')} className="relative py-32 lg:py-48 px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
                    {/* 7 Pictures Grid */}
                    <div className="lg:w-1/2 grid grid-cols-12 gap-4 lg:gap-6 h-[800px] lg:h-[1200px] relative">
                        <motion.div style={{ y: y1 }} className="col-span-7 h-[250px] lg:h-[400px] relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-1.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Bluedoor Alkateri" />
                        </motion.div>
                        <motion.div style={{ y: y2 }} className="col-span-5 h-[200px] lg:h-[300px] mt-12 lg:mt-24 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-2.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Coffee Craft" />
                        </motion.div>
                        <motion.div style={{ y: y3 }} className="col-span-6 h-[300px] lg:h-[450px] -mt-12 lg:-mt-24 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-3.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Interior Details" />
                        </motion.div>
                        <motion.div style={{ y: y4 }} className="col-span-6 h-[250px] lg:h-[350px] mt-12 lg:mt-32 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-4.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Coffee Making" />
                        </motion.div>
                        <motion.div style={{ y: y5 }} className="col-span-8 h-[250px] lg:h-[350px] -mt-16 lg:-mt-12 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-5.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Roastery" />
                        </motion.div>
                        <motion.div style={{ y: y6 }} className="col-span-4 h-[200px] lg:h-[280px] mt-8 lg:mt-16 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-6.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Detail Shot" />
                        </motion.div>
                        <motion.div style={{ y: y7 }} className="col-span-12 h-[300px] lg:h-[450px] mt-8 lg:mt-12 relative z-10 will-change-transform">
                            <img src="/images/landing-page/pict-bluedoor-7.avif" className="w-full h-full object-cover rounded-sm shadow-xl" alt="Atmosphere" />
                        </motion.div>
                    </div>

                    {/* Text block */}
                    <div className="lg:w-1/2 relative">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="lg:sticky lg:top-48 h-fit flex flex-col justify-center bg-crema p-8 lg:p-12 rounded-3xl border border-espresso/5 shadow-sm z-20">
                            <h2 className="font-serif text-3xl lg:text-[3.5rem] text-espresso leading-none mb-8 tracking-tight">
                                A Record of Craft, Consistency, and Achievement
                            </h2>
                            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-6 font-bold">Headquarter</h3>

                            <p className="text-espresso/70 leading-relaxed mb-6 font-light">
                                Blue Doors Alkateri marks the beginning of a journey rooted in pure intention. Established in 2013 within the heritage corridors of Braga, Bandung, it began as a quiet space behind an unassuming blue door—built on curiosity, patience, and a profound respect for the craft of coffee.
                            </p>
                            <p className="text-espresso/70 leading-relaxed mb-6 font-light">
                                We never chased trends; we pursued meaningful experiences shaped by process, people, and place. Set within historic surroundings, Alkateri grew into more than just a café—it became an intersection where tradition and modern coffee culture coexist, and where every detail reflects a deliberate approach. As we expand across cities and oceans, Alkateri remains our true north, preserving the core values of Blue Doors: quality, consistency, and undeniable character.
                            </p>
                            <p className="text-espresso/70 leading-relaxed font-light">
                                Behind this foundation stands <strong className="font-serif text-espresso font-normal">Rendy Nugraha</strong>, the driving force behind our daily craft and operational integrity. Bridging technical expertise with disciplined execution, his experience—highlighted in national barista championships—ensures that excellence at Blue Doors is never performative, but deeply embedded in our everyday practice.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 4. CHAMPIONSHIP ACHIEVEMENTS */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 px-6 lg:px-12 bg-[#213554] text-crema relative overflow-hidden z-20">
                    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-5/12">
                            <MaskedReveal>
                                <h2 className="font-serif text-4xl lg:text-[3.5rem] leading-none mb-8 tracking-tight">
                                    Recognition Earned Through <br/><span className="italic text-gold">Discipline</span>
                                </h2>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="text-crema/70 mb-12 max-w-sm leading-relaxed font-light">
                                    Where daily practice shapes champions, cultivates culture, and cements a lasting commitment to the craft.
                                </p>
                            </MaskedReveal>
                            <MaskedReveal delay={0.4}>
                                <p className="text-crema/40 text-sm max-w-sm leading-relaxed italic border-l border-gold/30 pl-6">
                                    For Blue Doors, these achievements are a reminder that growth is strongest when grounded in craft. This experience continually shapes how our team trains, collaborates, and evolves—ensuring that the excellence recognized on stage is consistently felt in every cup we serve.
                                </p>
                            </MaskedReveal>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
                                <Link href="/careers" className="inline-flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-gold/10 text-gold group-hover:bg-gold group-hover:text-[#213554] transition-colors duration-500">
                                        <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-gold font-semibold group-hover:tracking-[0.25em] transition-all duration-500">Join Our Team</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-7/12 flex flex-col justify-center border-t border-crema/10">
                            {[
                                { name: "Rendy Dwi Nugraha", desc: "Three-time Indonesia Barista Championship Finalist (2022, 2023, 2025)", rank: "01" },
                                { name: "Ellen Chen", desc: "5th Place, Indonesia Brewers Championship (2023)", rank: "02" },
                                { name: "Andhika Rachmadi", desc: "1st Place, Indonesia Brewers Championship League (2024)", rank: "03" },
                                { name: "Asna Hakim", desc: "6th Place, Indonesia Youth Barista Championship (2024)", rank: "04" },
                            ].map((champ, i) => (
                                <motion.div key={i} variants={fadeUp} className="border-b border-crema/10 group cursor-default">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center py-8 hover:px-6 hover:bg-white/5 transition-all -mx-4 px-4">
                                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                                            <span className="text-[10px] text-gold/40 tracking-widest">{champ.rank}</span>
                                            <span className="font-serif text-2xl lg:text-3xl tracking-tight group-hover:text-gold transition-colors">{champ.name}</span>
                                        </div>
                                        <span className="text-crema/50 text-xs tracking-widest uppercase md:text-right md:w-1/2 leading-relaxed">{champ.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 5. TOP SECTION (DARK): HUGE TYPOGRAPHY */}
                {/* 5. BEANS GALLERY */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 px-6 lg:px-12 bg-crema text-espresso">
                    <div className="max-w-screen-2xl mx-auto">
                        
                        {/* TITLE & DESCRIPTION */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl mb-24">
                            <MaskedReveal>
                                <h3 className="font-serif text-4xl lg:text-5xl mb-6 tracking-tight">The Unbeatable Sips</h3>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="text-xl text-espresso/70 leading-relaxed font-light italic border-l border-gold/30 pl-6">
                                    "A trilogy of character: three expressions, one unforgettable standard."
                                </p>
                            </MaskedReveal>
                        </motion.div>

                        {/* STAGGERED GRID */}
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                            {/* CARD 1 */}
                            <motion.div variants={fadeUp} className="group flex flex-col">
                                <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-10.avif" alt="Megan Blend" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Megan Blend</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="text-espresso/70 text-sm leading-relaxed max-w-sm">Pomegranate, red currant, and a smooth caramel finish. Crafted for the bold who seek an unparalleled experience.</p>
                                </MaskedReveal>
                            </motion.div>
                            
                            {/* CARD 2 (Pushed lower) */}
                            <motion.div variants={fadeUp} className="group flex flex-col md:mt-16 lg:mt-32">
                                <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-11.avif" alt="Avatara" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Avatara</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="text-espresso/70 text-sm leading-relaxed max-w-sm">Sweet, explosive flavors with a touch of charm. Single origin excellence to savor an unbeatable sip.</p>
                                </MaskedReveal>
                            </motion.div>
                            
                            {/* CARD 3 (Pushed slightly lower) */}
                            <motion.div variants={fadeUp} className="group flex flex-col mt-8 md:mt-0 lg:mt-16">
                                <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-12.avif" alt="Chieftain" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Chieftain</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="text-espresso/70 text-sm leading-relaxed max-w-sm">Sweet, ripe fruit flavors that make coffee truly enjoyable. Distinctive characteristics waiting to be explored.</p>
                                </MaskedReveal>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. THE SIGNATURE ARCHIVE */}
                <section onMouseEnter={() => setAuraColor('bg-gold/20')} className="py-32 px-6 lg:px-12 bg-[#D1C8C0] text-espresso border-y border-espresso/10">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2">
                            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso mb-12 font-bold border-b border-espresso/20 pb-4 inline-block">The OG Signature Product</h3>

                            <div className="mb-16">
                                <h2 className="font-serif text-4xl lg:text-5xl mb-6 tracking-tight">Kyoto Latte</h2>
                                <p className="text-espresso/70 leading-relaxed max-w-lg font-light">
                                    Organic craft matcha from the Tencha Harvest, featuring a medium firing blend (Yabukita, Saemidori, Okumidori, Seimei, Samidori, Kagoshima & Shizuoka). Layered delicately with our organic milk blend and vanilla, crowned with a natural anaerobic single-origin espresso.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-serif text-4xl lg:text-5xl mb-6 tracking-tight">Kyotomisu</h2>
                                <p className="text-espresso/70 leading-relaxed max-w-lg font-light">
                                    A refined take on the classic tiramisu. Traditional coffee-soaked layers are gracefully replaced with ceremonial-grade matcha from our Tencha Blend, folded into a mascarpone-style cream. Defined by its light sweetness and soft textures, it is an inspired dessert built on depth, clarity, and elegance.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2 relative h-[500px] lg:h-[700px] w-full">
                            {/* Signature overlapping images */}
                            <div className="absolute top-0 right-0 w-3/4 h-[350px] lg:h-[500px] z-10 shadow-2xl rounded-sm overflow-hidden isolate transform-gpu">
                                <img src="/images/landing-page/pict-bluedoor-13.avif" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Kyoto Latte" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-2/3 h-[300px] lg:h-[400px] z-20 shadow-2xl rounded-sm overflow-hidden border-[12px] border-[#D1C8C0] isolate transform-gpu">
                                <img src="/images/landing-page/pict-bluedoor-14.avif" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Kyotomisu" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 8. DARK MENU SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-oat/20')} className="relative py-32 lg:py-48 bg-[#1B1B1B] text-crema overflow-hidden">
                    <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-5/12">
                            <MaskedReveal>
                                <h2 className="font-serif text-4xl lg:text-[3.5rem] leading-tight mb-8 tracking-tight">
                                    Where modern elegance <br/><span className="italic text-oat">meets rustic charm.</span>
                                </h2>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="text-crema/70 leading-relaxed font-light mb-12 max-w-sm">
                                    Experience a crafted menu designed for tranquility and inspiration. Every detail is a nod to our roots.
                                </p>
                            </MaskedReveal>
                            <Link href="/menu" className="inline-block text-xs uppercase tracking-widest hover:text-oat border-b border-oat/30 pb-1 hover:border-oat transition-colors">
                                <RollingText text="Discover Full Menu" />
                            </Link>
                        </motion.div>

                        <div className="lg:w-7/12 w-full">
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 lg:pl-16 border-l border-crema/10">
                                {featuredItems.slice(0, 4).map((item) => (
                                    <motion.div key={item.id} variants={fadeUp} className="group flex justify-between items-end border-b border-crema/10 pb-6 hover:border-crema/40 transition-colors pl-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-crema/40 mb-2">{item.menu_category.name}</p>
                                            <h4 className="font-serif text-2xl tracking-wide group-hover:text-oat transition-colors">{item.name}</h4>
                                        </div>
                                        {/* User explicitly requested RP styling instead of dollars */}
                                        <div className="text-lg font-light italic text-oat tracking-wider">
                                            Rp {parseInt(item.price).toLocaleString('id-ID')}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 9. EXHIBITS & FUTURE SPACES */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 lg:py-48 px-6 lg:px-12 bg-white text-espresso">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col group">
                                <div className="h-[300px] mb-8 overflow-hidden rounded-sm shadow-lg isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-15.avif" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Kinto Exhibit" />
                                </div>
                                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-4 font-bold border-t border-espresso/10 pt-6">Cafe in Residence</h3>
                                <h2 className="font-serif text-3xl mb-4 tracking-tight">KINTO Exhibit</h2>
                                <p className="text-espresso/70 leading-relaxed text-sm font-light">
                                    The KINTO Exhibit presents a thoughtful dialogue between form and function, where design serves both purpose and experience. Through carefully curated objects and spatial storytelling, KINTO reflects a philosophy of mindful living. One that values simplicity, balance, and intention. Within this collaboration, coffee becomes part of a larger sensory narrative, inviting guests to slow down, engage, and appreciate the quiet refinement found in everyday rituals.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col group">
                                <div className="h-[300px] mb-8 overflow-hidden rounded-sm shadow-lg isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-16.avif" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Blue Doors X Sam & Natt" />
                                </div>
                                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-4 font-bold border-t border-espresso/10 pt-6">In Collaboration</h3>
                                <h2 className="font-serif text-3xl mb-4 tracking-tight">Blue Doors X Sam & Natt</h2>
                                <p className="text-espresso/70 leading-relaxed text-sm font-light">
                                    BDX is more than an event—it's an exploration site of art, culture, and design, cherished with a sip of coffee and celebration of the journey from inspiration to creation. With art, design, and the rich culture of coffee at its core, BDX celebrates the refined process of creation—where every detail is crafted with purpose and grace. Experience the harmonious blend of sensory pleasures as you journey through the artistry of form, flavor, and ambiance.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col group">
                                <div className="h-[300px] mb-8 overflow-hidden rounded-sm shadow-lg isolate transform-gpu">
                                    <img src="/images/landing-page/pict-bluedoor-17.avif" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Kota Lama Semarang" />
                                </div>
                                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-4 font-bold border-t border-espresso/10 pt-6">Brewing Soon</h3>
                                <h2 className="font-serif text-3xl mb-4 tracking-tight">Kota Lama</h2>
                                <p className="text-espresso/70 leading-relaxed text-sm font-light">
                                    Rooted in heritage, this new space carries a familiar soul into the heart of Kota Lama. Thoughtfully shaped by its surroundings, Blue Doors Semarang continues our journey with the same intention: honoring place, process, and people while serving better coffee. This new chapter is not about starting over, but about evolving and allowing our values to take form within a historic setting.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 10. HUGE FOOTER & NEWSLETTER */}
                <section onMouseEnter={() => setAuraColor('bg-crema/20')} className="py-32 px-6 lg:px-12 bg-[#1A1A1A] text-crema flex flex-col justify-between min-h-[80vh]">
                    <div className="max-w-screen-2xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center">
                        <div className="font-serif text-5xl md:text-[6rem] lg:text-[8rem] leading-none mb-20 font-light uppercase tracking-tighter text-oat">
                            <SplitTextReveal text="BLUEDOOR" />
                        </div>

                        <div className="w-full max-w-xl flex flex-col items-center mt-8">
                            <MaskedReveal delay={0.4}>
                                <h3 className="font-sans text-xs uppercase tracking-[0.3em] mb-12 text-crema/60">Subscribe to our newsletter</h3>
                            </MaskedReveal>

                            {flash?.success && <p className="mb-6 text-sm text-green-400">{flash.success}</p>}
                            {flash?.error && <p className="mb-6 text-sm text-red-400">{flash.error}</p>}

                            <form onSubmit={submitNewsletter} className="w-full relative flex items-end gap-4 border-b border-crema/20 focus-within:border-crema transition-colors pb-3">
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full bg-transparent border-none text-crema placeholder:text-crema/30 focus:ring-0 p-0 text-lg font-serif italic"
                                    />
                                </div>
                                <button type="submit" disabled={processing} className="text-xs uppercase tracking-widest hover:text-oat transition-colors disabled:opacity-50 font-semibold text-crema/80">
                                    {processing ? 'Wait...' : 'Subscribe'}
                                </button>
                            </form>
                            {(errors.email || errors.name) && (
                                <p className="text-sm text-red-400 mt-3 text-left w-full">{errors.email || errors.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="max-w-screen-2xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-crema/40 uppercase tracking-[0.2em] pt-16">
                        <p>© 2026 BLUEDOOR COFFEE</p>
                        <div className="flex gap-8 mt-6 md:mt-0">
                            <a href="#"><RollingText text="Instagram" className="hover:text-crema" /></a>
                            <a href="#"><RollingText text="Twitter" className="hover:text-crema" /></a>
                            <a href="#"><RollingText text="Spotify" className="hover:text-crema" /></a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
