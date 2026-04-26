import { motion } from 'framer-motion';

interface RollingTextProps {
    text: string;
    className?: string;
}

export default function RollingText({ text, className = '' }: RollingTextProps) {
    return (
        <motion.span
            className={`relative overflow-hidden group cursor-pointer inline-flex flex-col ${className}`}
            initial="initial"
            whileHover="hover"
        >
            {/* The line that extends left to right */}
            <motion.span
                className="absolute bottom-0 left-0 h-[1px] bg-current w-full"
                variants={{
                    initial: { scaleX: 0, transformOrigin: "left" },
                    hover: { scaleX: 1, transformOrigin: "left" }
                }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />

            <span className="relative overflow-hidden flex pb-0.5">
                {text.split("").map((char, i) => (
                    <span key={i} className="relative inline-block whitespace-pre">
                        <motion.span
                            className="inline-block"
                            variants={{
                                initial: { y: 0 },
                                hover: { y: "-100%" }
                            }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i * 0.02 }}
                        >
                            {char}
                        </motion.span>
                        <motion.span
                            className="absolute left-0 inline-block"
                            style={{ top: '100%' }}
                            variants={{
                                initial: { y: 0 },
                                hover: { y: "-100%" }
                            }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i * 0.02 }}
                        >
                            {char}
                        </motion.span>
                    </span>
                ))}
            </span>
        </motion.span>
    );
}
