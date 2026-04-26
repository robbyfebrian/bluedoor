import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SharedData } from '@/types';

export default function ToastNotification() {
    const { flash } = usePage<SharedData>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error' | 'info'>('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else if (flash?.info) {
            setMessage(flash.info);
            setType('info');
            setVisible(true);
        }

        if (flash?.success || flash?.error || flash?.info) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-8 right-8 z-[10000] max-w-sm w-full shadow-2xl rounded-sm overflow-hidden group cursor-pointer"
                    onClick={() => setVisible(false)}
                >
                    <div className={`relative px-6 py-5 border backdrop-blur-md flex items-start gap-4 transition-colors duration-300 ${
                        type === 'success' 
                            ? 'bg-[#E8F3E9]/95 border-[#A5D6A7] hover:bg-[#E8F3E9]' 
                            : type === 'error'
                            ? 'bg-[#ffebee]/95 border-[#ef9a9a] hover:bg-[#ffebee]'
                            : 'bg-[#E3F2FD]/95 border-[#90CAF9] hover:bg-[#E3F2FD]'
                    }`}>
                        <div className={`mt-0.5 shrink-0 ${
                            type === 'success' ? 'text-[#2E7D32]' : type === 'error' ? 'text-[#c62828]' : 'text-[#1565C0]'
                        }`}>
                            {type === 'success' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ) : type === 'error' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                        </div>
                        <div className="flex-1 pr-4">
                            <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                                type === 'success' ? 'text-[#2E7D32]' : type === 'error' ? 'text-[#c62828]' : 'text-[#1565C0]'
                            }`}>
                                {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notification'}
                            </h4>
                            <p className={`text-sm leading-relaxed ${
                                type === 'success' ? 'text-[#1b5e20]' : type === 'error' ? 'text-[#b71c1c]' : 'text-[#0d47a1]'
                            }`}>
                                {message}
                            </p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setVisible(false); }}
                            className={`absolute top-4 right-4 p-1 rounded-full opacity-50 hover:opacity-100 transition-opacity ${
                                type === 'success' ? 'text-[#2E7D32] hover:bg-[#A5D6A7]/30' : type === 'error' ? 'text-[#c62828] hover:bg-[#ef9a9a]/30' : 'text-[#1565C0] hover:bg-[#90CAF9]/30'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        {/* Progress bar line */}
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: 0 }}
                            transition={{ duration: 10, ease: "linear" }}
                            className={`absolute bottom-0 left-0 h-1 ${
                                type === 'success' ? 'bg-[#4CAF50]' : type === 'error' ? 'bg-[#f44336]' : 'bg-[#2196F3]'
                            }`}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
