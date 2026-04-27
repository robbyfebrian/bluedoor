import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useLenis } from '@/hooks/useLenis';
import type { SharedData } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import RollingText from '@/Components/RollingText';
import { MaskedReveal, SplitTextReveal } from '@/Components/MaskedReveal';
import NavLink from '@/Components/NavLink';

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

    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);



    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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

            <div
                className="relative z-10 overflow-hidden bg-crema font-sans text-espresso selection:bg-gold selection:text-white"
                style={{ position: 'relative' }}
            >
                {/* 1. HERO SECTION */}
                <section className="relative flex h-screen w-full overflow-hidden bg-espresso">
                    <motion.div style={{ y: yHero }} className="absolute inset-0">
                        <img src="/images/landing-page/hero-image.jpg" alt="Bluedoor Coffee" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-espresso/30 to-espresso/90" />
                    </motion.div>

                    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-20 text-start lg:text-center lg:items-end lg:px-24 lg:text-left">
                        <div className="flex max-w-2xl flex-col items-center lg:items-start pb-8">
                            <div className="mb-4 font-serif text-4xl leading-[1] flex flex-col items-center lg:items-start tracking-wide text-crema uppercase md:text-6xl lg:text-[6rem]">
                                <SplitTextReveal text="HOME FOR" delay={1.0} />
                                <SplitTextReveal text="BETTER COFFEE" delay={1.2} />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                                className="flex flex-col items-center lg:items-start rounded-3xl border border-white/10 bg-black/30 p-4 text-left shadow-2xl lg:p-6"
                            >
                                <p className="text-center lg:text-start mb-4 text-sm leading-relaxed font-light text-crema/90 lg:text-lg">
                                    Founded in 2013 in Braga, Bandung. We treat coffee as a craft guided by intention and detail. Responsibly
                                    sourced, precisely roasted, and purposefully served to create meaningful experiences.
                                </p>

                                <NavLink
                                    href="/team"
                                    className="inline-block rounded-full bg-gold px-5 py-2 lg:px-8 lg:py-3.5 text-xs lg:text-sm font-bold tracking-widest text-espresso shadow-sm transition hover:scale-105 hover:bg-white"
                                >
                                    Discover Our Story
                                </NavLink>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 2.0 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        >
                            <NavLink
                                href="/locations"
                                className="text-[10px] font-medium tracking-[0.2em] text-crema uppercase transition-colors hover:text-gold"
                            >
                                Our Locations
                            </NavLink>
                        </motion.div>
                    </div>
                </section>

                {/* 2. THE GLOBAL STAGE MARQUEE */}
                <section className="flex overflow-hidden border-b border-crema/10 bg-espresso py-20 whitespace-nowrap text-crema select-none lg:py-24">
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
                        className="flex items-center gap-16 px-8 lg:gap-32 lg:px-16"
                    >
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-16 lg:gap-32">
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl tracking-tight italic lg:text-5xl">19 Somerset Pl, Melbourne</span>
                                    <span className="mt-3 font-sans text-[10px] font-medium tracking-[0.2em] text-gold uppercase md:text-xs">
                                        From Bandung to Melbourne.
                                    </span>
                                </div>
                                <span className="text-2xl text-gold/40">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl tracking-tight italic lg:text-5xl">Brewing Soon. Semarang</span>
                                    <span className="mt-3 font-sans text-[10px] font-medium tracking-[0.2em] text-gold uppercase md:text-xs">
                                        Heart of Kota Lama.
                                    </span>
                                </div>
                                <span className="text-2xl text-gold/40">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl tracking-tight italic lg:text-5xl">Cafe in Residence</span>
                                    <span className="mt-3 font-sans text-[10px] font-medium tracking-[0.2em] text-gold uppercase md:text-xs">
                                        Kinto Exhibit, BKK
                                    </span>
                                </div>
                                <span className="text-2xl text-gold/40">✦</span>
                                <div className="flex flex-col">
                                    <span className="font-serif text-3xl tracking-tight italic lg:text-5xl">In Collaboration</span>
                                    <span className="mt-3 font-sans text-[10px] font-medium tracking-[0.2em] text-gold uppercase md:text-xs">
                                        BDX SAM & NATT, Gafoy
                                    </span>
                                </div>
                                <span className="text-2xl text-gold/40">✦</span>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* 3. A RECORD OF CRAFT */}
                <section
                    style={{ position: 'relative' }}
                    className="relative mx-auto flex max-w-screen-2xl items-center flex-col-reverse gap-16 px-6 py-32 lg:flex-row lg:gap-32 lg:px-12 lg:py-48"
                >
                    {/* Text block */}
                    <div className="relative lg:w-1/2">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            className="z-20 flex h-fit flex-col justify-center items-center rounded-3xl border border-espresso/5 bg-crema p-8 shadow-sm lg:sticky lg:top-48 lg:p-12"
                        >
                            <h2 className="mb-8 font-serif text-3xl leading-none tracking-tight text-espresso lg:text-[3.5rem]">
                                A Record of Craft, Consistency, and Achievement
                            </h2>
                            <h3 className="mb-6 font-sans text-[10px] font-bold tracking-[0.2em] text-gold uppercase">Headquarter</h3>

                            <p className="mb-6 leading-relaxed font-light text-espresso/70">
                                Blue Doors Alkateri marks the beginning of a journey rooted in pure intention. Established in 2013 within the heritage
                                corridors of Braga, Bandung, it began as a quiet space behind an unassuming blue door—built on curiosity, patience,
                                and a profound respect for the craft of coffee.
                            </p>
                            <p className="mb-6 leading-relaxed font-light text-espresso/70">
                                We never chased trends; we pursued meaningful experiences shaped by process, people, and place. Set within historic
                                surroundings, Alkateri grew into more than just a café—it became an intersection where tradition and modern coffee
                                culture coexist, and where every detail reflects a deliberate approach. As we expand across cities and oceans,
                                Alkateri remains our true north, preserving the core values of Blue Doors: quality, consistency, and undeniable
                                character.
                            </p>
                            <p className="leading-relaxed font-light text-espresso/70">
                                Behind this foundation stands <strong className="font-serif font-normal text-espresso">Rendy Nugraha</strong>, the
                                driving force behind our daily craft and operational integrity. Bridging technical expertise with disciplined
                                execution, his experience—highlighted in national barista championships—ensures that excellence at Blue Doors is never
                                performative, but deeply embedded in our everyday practice.
                            </p>
                        </motion.div>
                    </div>

                    {/* 7 Pictures Grid (Bento Box Layout) */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="relative grid w-full grid-cols-2 grid-rows-[repeat(6,120px)] gap-3 md:grid-rows-[repeat(6,180px)] lg:w-1/2 lg:grid-cols-4 lg:grid-rows-[repeat(3,200px)] lg:gap-4"
                    >
                        {/* 1 (Large - top left) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-1.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Bluedoor Alkateri"
                            />
                        </motion.div>
                        {/* 2 (Small - top right) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-2.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Coffee Craft"
                            />
                        </motion.div>
                        {/* 3 (Tall - right edge) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-1 row-span-2 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-3.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Interior Details"
                            />
                        </motion.div>
                        {/* 4 (Small - middle right) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-4.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Coffee Making"
                            />
                        </motion.div>
                        {/* 5 (Wide - bottom left) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-2 row-span-1 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-5.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Roastery"
                            />
                        </motion.div>
                        {/* 6 (Small - bottom middle) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-6.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Detail Shot"
                            />
                        </motion.div>
                        {/* 7 (Small - bottom right) */}
                        <motion.div variants={fadeUp} className="group relative z-10 col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-sm">
                            <img
                                src="/images/landing-page/pict-bluedoor-7.avif"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Atmosphere"
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* 4. CHAMPIONSHIP ACHIEVEMENTS */}
                <section className="relative z-20 overflow-hidden bg-[#213554] px-6 py-32 text-crema lg:px-12">
                    <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col gap-16 lg:flex-row lg:gap-32">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-5/12">
                            <MaskedReveal>
                                <h2 className="mb-8 font-serif text-4xl leading-none tracking-tight lg:text-[3.5rem]">
                                    Recognition Earned Through
                                    <br />
                                    <span className="text-gold italic">Discipline</span>
                                </h2>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="mb-12 max-w-sm leading-relaxed font-light text-crema/70">
                                    Where daily practice shapes champions, cultivates culture, and cements a lasting commitment to the craft.
                                </p>
                            </MaskedReveal>
                            <MaskedReveal delay={0.4}>
                                <p className="max-w-sm border-l border-gold/30 pl-6 text-sm leading-relaxed text-crema/40 italic">
                                    For Blue Doors, these achievements are a reminder that growth is strongest when grounded in craft. This experience
                                    continually shapes how our team trains, collaborates, and evolves—ensuring that the excellence recognized on stage
                                    is consistently felt in every cup we serve.
                                </p>
                            </MaskedReveal>

                            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
                                <NavLink href="/careers" className="group inline-flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-[#213554]">
                                        <svg
                                            className="h-5 w-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold tracking-widest text-gold uppercase transition-all duration-500 group-hover:tracking-[0.25em]">
                                        Join Our Team
                                    </span>
                                </NavLink>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col justify-center border-t border-crema/10 lg:w-7/12"
                        >
                            {[
                                {
                                    name: 'Rendy Dwi Nugraha',
                                    desc: 'Three-time Indonesia Barista Championship Finalist (2022, 2023, 2025)',
                                    rank: '01',
                                },
                                { name: 'Ellen Chen', desc: '5th Place, Indonesia Brewers Championship (2023)', rank: '02' },
                                { name: 'Andhika Rachmadi', desc: '1st Place, Indonesia Brewers Championship League (2024)', rank: '03' },
                                { name: 'Asna Hakim', desc: '6th Place, Indonesia Youth Barista Championship (2024)', rank: '04' },
                            ].map((champ, i) => (
                                <motion.div key={i} variants={fadeUp} className="group cursor-default border-b border-crema/10">
                                    <div className="-mx-4 flex flex-col mx-0 px-4 py-4 transition-all hover:bg-white/5 md:flex-row md:items-center md:justify-between">
                                        <div className="mb-4 flex items-center gap-6 md:mb-0">
                                            <span className="text-[10px] tracking-widest text-gold/40">{champ.rank}</span>
                                            <span className="font-serif text-2xl tracking-tight transition-colors group-hover:text-gold lg:text-3xl">
                                                {champ.name}
                                            </span>
                                        </div>
                                        <span className="text-xs leading-relaxed tracking-widest text-crema/50 uppercase md:w-1/2 md:text-right">
                                            {champ.desc}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 5. TOP SECTION (DARK): HUGE TYPOGRAPHY */}
                {/* 5. BEANS GALLERY */}
                <section className="bg-crema px-6 py-32 text-espresso lg:px-12">
                    <div className="mx-auto max-w-screen-2xl">
                        {/* TITLE & DESCRIPTION */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-24 max-w-2xl">
                            <MaskedReveal>
                                <h3 className="mb-6 font-serif text-4xl tracking-tight lg:text-5xl">The Unbeatable Sips</h3>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="border-l border-gold/30 pl-6 text-xl leading-relaxed font-light text-espresso/70 italic">
                                    "A trilogy of character: three expressions, one unforgettable standard."
                                </p>
                            </MaskedReveal>
                        </motion.div>

                        {/* STAGGERED GRID */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-16"
                        >
                            {/* CARD 1 */}
                            <motion.div variants={fadeUp} className="group flex flex-col">
                                <div className="isolate mb-8 aspect-[3/4] transform-gpu overflow-hidden rounded-sm bg-white">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-10.avif"
                                        alt="Megan Blend"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="mb-3 font-serif text-3xl tracking-tight text-espresso">Megan Blend</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="max-w-sm text-sm leading-relaxed text-espresso/70">
                                        Pomegranate, red currant, and a smooth caramel finish. Crafted for the bold who seek an unparalleled
                                        experience.
                                    </p>
                                </MaskedReveal>
                            </motion.div>

                            {/* CARD 2 (Pushed lower) */}
                            <motion.div variants={fadeUp} className="group flex flex-col md:mt-16 lg:mt-32">
                                <div className="isolate mb-8 aspect-[3/4] transform-gpu overflow-hidden rounded-sm bg-white">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-11.avif"
                                        alt="Avatara"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="mb-3 font-serif text-3xl tracking-tight text-espresso">Avatara</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="max-w-sm text-sm leading-relaxed text-espresso/70">
                                        Sweet, explosive flavors with a touch of charm. Single origin excellence to savor an unbeatable sip.
                                    </p>
                                </MaskedReveal>
                            </motion.div>

                            {/* CARD 3 (Pushed slightly lower) */}
                            <motion.div variants={fadeUp} className="group mt-8 flex flex-col md:mt-0 lg:mt-16">
                                <div className="isolate mb-8 aspect-[3/4] transform-gpu overflow-hidden rounded-sm bg-white">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-12.avif"
                                        alt="Chieftain"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <MaskedReveal delay={0.2}>
                                    <h4 className="mb-3 font-serif text-3xl tracking-tight text-espresso">Chieftain</h4>
                                </MaskedReveal>
                                <MaskedReveal delay={0.4}>
                                    <p className="max-w-sm text-sm leading-relaxed text-espresso/70">
                                        Sweet, ripe fruit flavors that make coffee truly enjoyable. Distinctive characteristics waiting to be
                                        explored.
                                    </p>
                                </MaskedReveal>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. THE SIGNATURE ARCHIVE */}
                <section className="border-y border-espresso/10 bg-[#D1C8C0] px-6 py-32 text-espresso lg:px-12">
                    <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 lg:flex-row lg:gap-32">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2">
                            <h3 className="mb-12 inline-block border-b border-espresso/20 pb-4 font-sans text-[10px] font-bold tracking-[0.2em] text-espresso uppercase">
                                The OG Signature Product
                            </h3>

                            <div className="mb-16">
                                <h2 className="mb-6 font-serif text-4xl tracking-tight lg:text-5xl">Kyoto Latte</h2>
                                <p className="max-w-lg leading-relaxed font-light text-espresso/70">
                                    Organic craft matcha from the Tencha Harvest, featuring a medium firing blend (Yabukita, Saemidori, Okumidori,
                                    Seimei, Samidori, Kagoshima & Shizuoka). Layered delicately with our organic milk blend and vanilla, crowned with
                                    a natural anaerobic single-origin espresso.
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-6 font-serif text-4xl tracking-tight lg:text-5xl">Kyotomisu</h2>
                                <p className="max-w-lg leading-relaxed font-light text-espresso/70">
                                    A refined take on the classic tiramisu. Traditional coffee-soaked layers are gracefully replaced with
                                    ceremonial-grade matcha from our Tencha Blend, folded into a mascarpone-style cream. Defined by its light
                                    sweetness and soft textures, it is an inspired dessert built on depth, clarity, and elegance.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="relative h-[500px] w-full lg:h-[700px] lg:w-1/2"
                        >
                            {/* Signature overlapping images */}
                            <div className="absolute top-0 right-0 isolate z-10 h-[350px] w-3/4 transform-gpu overflow-hidden rounded-sm shadow-2xl lg:h-[500px]">
                                <img
                                    src="/images/landing-page/pict-bluedoor-13.avif"
                                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                                    alt="Kyoto Latte"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 isolate z-20 h-[300px] w-2/3 transform-gpu overflow-hidden rounded-sm border-[12px] border-[#D1C8C0] shadow-2xl lg:h-[400px]">
                                <img
                                    src="/images/landing-page/pict-bluedoor-14.avif"
                                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                                    alt="Kyotomisu"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 8. DARK MENU SECTION */}
                <section className="relative overflow-hidden bg-[#1B1B1B] py-32 text-crema lg:py-48">
                    <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row lg:px-12">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center lg:text-start lg:w-5/12">
                            <MaskedReveal>
                                <h2 className="mb-8 font-serif text-4xl leading-tight tracking-tight lg:text-[3.5rem]">
                                    Where modern elegance <br />
                                    <span className="text-oat italic">meets rustic charm.</span>
                                </h2>
                            </MaskedReveal>
                            <MaskedReveal delay={0.2}>
                                <p className="mb-12 max-w-sm leading-relaxed font-light text-crema/70">
                                    Experience a crafted menu designed for tranquility and inspiration. Every detail is a nod to our roots.
                                </p>
                            </MaskedReveal>
                            <NavLink
                                href="/menu"
                                className="inline-block pb-1 text-xs tracking-widest uppercase transition-colors hover:border-oat hover:text-oat"
                            >
                                <RollingText text="Discover Full Menu" />
                            </NavLink>
                        </motion.div>

                        <div className="w-full lg:w-7/12">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 border-l border-crema/10 lg:pl-16"
                            >
                                {featuredItems.slice(0, 4).map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeUp}
                                        className="group flex items-end justify-between border-b border-crema/10 pb-6 pl-6 transition-colors hover:border-crema/40"
                                    >
                                        <div>
                                            <p className="mb-2 text-[10px] tracking-widest text-crema/40 uppercase">{item.menu_category.name}</p>
                                            <h4 className="font-serif text-2xl tracking-wide transition-colors group-hover:text-oat">{item.name}</h4>
                                        </div>
                                        {/* User explicitly requested RP styling instead of dollars */}
                                        <div className="text-lg font-light tracking-wider text-oat italic">
                                            Rp {parseInt(item.price).toLocaleString('id-ID')}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 9. EXHIBITS & FUTURE SPACES */}
                <section className="bg-white px-6 py-32 text-espresso lg:px-12 lg:py-48">
                    <div className="mx-auto max-w-screen-2xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-24">
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group flex flex-col"
                            >
                                <div className="isolate mb-8 h-75 transform-gpu overflow-hidden rounded-sm shadow-lg">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-15.avif"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt="Kinto Exhibit"
                                    />
                                </div>
                                <h3 className="mb-4 border-t border-espresso/10 pt-6 font-sans text-[10px] font-bold tracking-[0.2em] text-espresso/40 uppercase">
                                    Cafe in Residence
                                </h3>
                                <h2 className="mb-4 font-serif text-3xl tracking-tight">KINTO Exhibit</h2>
                                <p className="text-sm leading-relaxed font-light text-espresso/70">
                                    The KINTO Exhibit presents a thoughtful dialogue between form and function, where design serves both purpose and
                                    experience. Through carefully curated objects and spatial storytelling, KINTO reflects a philosophy of mindful
                                    living. One that values simplicity, balance, and intention. Within this collaboration, coffee becomes part of a
                                    larger sensory narrative, inviting guests to slow down, engage, and appreciate the quiet refinement found in
                                    everyday rituals.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group flex flex-col"
                            >
                                <div className="isolate mb-8 h-75 transform-gpu overflow-hidden rounded-sm shadow-lg">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-16.avif"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt="Blue Doors X Sam & Natt"
                                    />
                                </div>
                                <h3 className="mb-4 border-t border-espresso/10 pt-6 font-sans text-[10px] font-bold tracking-[0.2em] text-espresso/40 uppercase">
                                    In Collaboration
                                </h3>
                                <h2 className="mb-4 font-serif text-3xl tracking-tight">Blue Doors X Sam & Natt</h2>
                                <p className="text-sm leading-relaxed font-light text-espresso/70">
                                    BDX is more than an event—it's an exploration site of art, culture, and design, cherished with a sip of coffee and
                                    celebration of the journey from inspiration to creation. With art, design, and the rich culture of coffee at its
                                    core, BDX celebrates the refined process of creation—where every detail is crafted with purpose and grace.
                                    Experience the harmonious blend of sensory pleasures as you journey through the artistry of form, flavor, and
                                    ambiance.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group flex flex-col"
                            >
                                <div className="isolate mb-8 h-75 transform-gpu overflow-hidden rounded-sm shadow-lg">
                                    <img
                                        src="/images/landing-page/pict-bluedoor-17.avif"
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        alt="Kota Lama Semarang"
                                    />
                                </div>
                                <h3 className="mb-4 border-t border-espresso/10 pt-6 font-sans text-[10px] font-bold tracking-[0.2em] text-espresso/40 uppercase">
                                    Brewing Soon
                                </h3>
                                <h2 className="mb-4 font-serif text-3xl tracking-tight">Kota Lama</h2>
                                <p className="text-sm leading-relaxed font-light text-espresso/70">
                                    Rooted in heritage, this new space carries a familiar soul into the heart of Kota Lama. Thoughtfully shaped by its
                                    surroundings, Blue Doors Semarang continues our journey with the same intention: honoring place, process, and
                                    people while serving better coffee. This new chapter is not about starting over, but about evolving and allowing
                                    our values to take form within a historic setting.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 10. HUGE FOOTER & NEWSLETTER */}
                <section
                    className="flex min-h-[80vh] flex-col justify-between bg-[#1A1A1A] px-6 py-32 text-crema lg:px-12"
                >
                    <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col items-center justify-center text-center">
                        <div className="mb-20 font-serif text-5xl leading-none font-light tracking-tighter text-oat uppercase md:text-[6rem] lg:text-[8rem]">
                            <SplitTextReveal text="BLUEDOOR" />
                        </div>

                        <div className="mt-8 flex w-full max-w-xl flex-col items-center">
                            <MaskedReveal delay={0.4}>
                                <h3 className="mb-12 font-sans text-xs tracking-[0.3em] text-crema/60 uppercase">Subscribe to our newsletter</h3>
                            </MaskedReveal>

                            <form
                                onSubmit={submitNewsletter}
                                className="relative flex w-full items-end gap-4 border-b border-crema/20 pb-3 transition-colors focus-within:border-crema"
                            >
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full border-none bg-transparent p-0 font-serif text-lg text-crema italic placeholder:text-crema/30 focus:ring-0 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="text-xs font-semibold tracking-widest text-crema/80 uppercase transition-colors hover:text-oat disabled:opacity-50"
                                >
                                    {processing ? 'Wait...' : 'Subscribe'}
                                </button>
                            </form>
                            {(errors.email || errors.name) && (
                                <p className="mt-3 w-full text-left text-sm text-red-400">{errors.email || errors.name}</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
