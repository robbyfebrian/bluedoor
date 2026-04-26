import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MaskedRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function MaskedReveal({ children, delay = 0, className = '' }: MaskedRevealProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}

interface SplitTextRevealProps {
    text: string;
    delay?: number;
    className?: string;
    staggerDuration?: number;
}

export function SplitTextReveal({ text, delay = 0, className = '', staggerDuration = 0.05 }: SplitTextRevealProps) {
    const words = text.split(" ");
    return (
        <div className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden mr-[0.25em] mb-1">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * staggerDuration
                        }}
                    >
                        {word}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
