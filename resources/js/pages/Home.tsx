import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
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
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 300);
            mouseY.set(e.clientY - 300);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

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
                    className={`fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] z-[50] transition-colors duration-1000 mix-blend-normal ${auraColor}`}
                    style={{ x: springX, y: springY }}
                />

                {/* 1. HERO SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-gold/30')} className="relative h-screen w-full flex overflow-hidden bg-espresso">
                    <motion.div style={{ y: yHero }} className="absolute inset-0">
                        <img src="/images/landing-page/hero-image.jpg" alt="Bluedoor Coffee" className="h-full w-full object-cover" />
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
                            <a href="https://maps.app.goo.gl/9Qd4yWp1o9R1Y1o18" target="_blank" rel="noreferrer" className="text-crema text-[10px] uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors">
                                Bluedoor Solo
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* 2. INTRO SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 lg:py-48 px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        className="lg:w-1/2"
                    >
                        <h2 className="font-serif text-3xl lg:text-[4rem] text-espresso leading-tight mb-8 tracking-tight">
                            <SplitTextReveal text="Experience Bluedoor..." />
                            <SplitTextReveal text="where every sip is a craft." delay={0.2} className="italic text-espresso/60/80 text-3xl lg:text-5xl mt-2" />
                        </h2>
                        <MaskedReveal delay={0.4}>
                            <p className="text-espresso/60/80 leading-relaxed max-w-md text-lg">
                                Founded in 2013, Bluedoor began with a focused vision to treat coffee as a craft guided by intention and detail. Rooted in Braga, Bandung, we have grown into a platform that brings people together through responsibly sourced, precisely roasted, and purposefully served coffee.
                            </p>
                        </MaskedReveal>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 flex justify-end"
                    >
                        <img src="https://placehold.co/600x400/2c1e16/f0e7d8?text=Roastery" alt="Roastery" className="w-full max-w-md h-auto object-cover rounded-sm shadow-2xl" />
                    </motion.div>
                </section>

                {/* 3. HUGE TYPOGRAPHY SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-gold/20')} className="relative py-48 lg:py-64 bg-ocean-gradient overflow-hidden flex flex-col items-center justify-center text-crema text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="font-serif text-[18vw] leading-none text-crema/10 absolute inset-0 flex items-center justify-center pointer-events-none select-none tracking-tighter mix-blend-overlay"
                    >
                        SIPS
                    </motion.h2>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 max-w-2xl px-6">
                        <MaskedReveal>
                            <h3 className="font-serif text-4xl lg:text-5xl mb-6 tracking-tight">The Unbeatable Sips</h3>
                        </MaskedReveal>
                        <MaskedReveal delay={0.2}>
                            <p className="text-xl text-crema/90 leading-relaxed font-light italic">
                                "A trilogy of character: three expressions, one unforgettable standard."
                            </p>
                        </MaskedReveal>
                    </motion.div>
                </section>

                {/* 4. BEANS GALLERY */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 px-6 lg:px-12 bg-crema">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                        <motion.div variants={fadeUp} className="group">
                            <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white">
                                <img src="https://placehold.co/600x800/1a365d/e2dcd0?text=Megan" alt="Megan Blend" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <MaskedReveal delay={0.2}>
                                <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Megan Blend</h4>
                            </MaskedReveal>
                            <MaskedReveal delay={0.4}>
                                <p className="text-espresso/60/70 text-sm leading-relaxed max-w-sm">Pomegranate, red currant, and a smooth caramel finish. Crafted for the bold who seek an unparalleled experience.</p>
                            </MaskedReveal>
                        </motion.div>
                        <motion.div variants={fadeUp} className="group md:mt-24">
                            <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white">
                                <img src="https://placehold.co/600x800/1a365d/e2dcd0?text=Avatara" alt="Avatara" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <MaskedReveal delay={0.2}>
                                <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Avatara</h4>
                            </MaskedReveal>
                            <MaskedReveal delay={0.4}>
                                <p className="text-espresso/60/70 text-sm leading-relaxed max-w-sm">Sweet, explosive flavors with a touch of charm. Single origin excellence to savor an unbeatable sip.</p>
                            </MaskedReveal>
                        </motion.div>
                        <motion.div variants={fadeUp} className="group">
                            <div className="aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-white">
                                <img src="https://placehold.co/600x800/1a365d/e2dcd0?text=Chieftain" alt="Chieftain" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>
                            <MaskedReveal delay={0.2}>
                                <h4 className="font-serif text-3xl text-espresso mb-3 tracking-tight">Chieftain</h4>
                            </MaskedReveal>
                            <MaskedReveal delay={0.4}>
                                <p className="text-espresso/60/70 text-sm leading-relaxed max-w-sm">Sweet, ripe fruit flavors that make coffee truly enjoyable. Distinctive characteristics waiting to be explored.</p>
                            </MaskedReveal>
                        </motion.div>
                    </motion.div>
                </section>

                {/* 5. DARK MENU SECTION */}
                <section onMouseEnter={() => setAuraColor('bg-oat/20')} className="relative py-32 lg:py-48 bg-[#213554] text-crema overflow-hidden">
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
                            <Link href="/menu" className="inline-block text-xs uppercase tracking-widest hover:text-oat">
                                <RollingText text="Discover Menu" />
                            </Link>
                        </motion.div>

                        <div className="lg:w-7/12 w-full">
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 lg:pl-16 border-l border-crema/10">
                                {featuredItems.slice(0, 4).map((item) => (
                                    <motion.div key={item.id} variants={fadeUp} className="group flex justify-between items-end border-b border-crema/10 pb-6 hover:border-crema/40 transition-colors pl-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-crema/40 mb-2">{item.menu_category.name}</p>
                                            <h4 className="font-serif text-2xl tracking-wide">{item.name}</h4>
                                        </div>
                                        <div className="text-lg font-light italic text-oat">${item.price}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 6. CAREERS & TEAM ACCORDION/LIST */}
                <section onMouseEnter={() => setAuraColor('bg-ocean-start/20')} className="py-32 px-6 lg:px-12 bg-white/30">
                    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2">
                            <MaskedReveal>
                                <h2 className="font-serif text-4xl lg:text-[3.5rem] text-espresso leading-tight mb-8">
                                    It's more than a stay... it's a return to a simpler, <span className="italic text-espresso/60/70">slower way of life.</span>
                                </h2>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="text-espresso/60/80 mb-8 max-w-sm leading-relaxed">
                                    Join our community of passionate individuals dedicated to the art of coffee. Where beauty is found in every detail.
                                </p>
                            </MaskedReveal>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2 flex flex-col justify-center">
                            <div className="border-t border-ocean-start/10">
                                {openPositions.slice(0, 3).map((job) => (
                                    <motion.div key={job.id} variants={fadeUp} className="border-b border-ocean-start/10">
                                        <Link href="/careers" className="group flex justify-between items-center py-8 hover:px-4 hover:bg-crema/50 transition-all -mx-4 px-4">
                                            <span className="font-serif text-2xl text-espresso tracking-tight">{job.title}</span>
                                            <RollingText text="Apply ↗" className="text-espresso/60/40 text-xs uppercase tracking-widest group-hover:text-espresso" />
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div variants={fadeUp} className="border-b border-ocean-start/10">
                                    <Link href="/team" className="group flex justify-between items-center py-8 hover:px-4 hover:bg-crema/50 transition-all -mx-4 px-4">
                                        <span className="font-serif text-2xl text-espresso tracking-tight">Meet The Team</span>
                                        <RollingText text="Discover ↗" className="text-espresso/60/40 text-xs uppercase tracking-widest group-hover:text-espresso" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. HUGE FOOTER & NEWSLETTER */}
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
