import { AnimatePresence, motion } from 'motion/react';

interface TextProps {
    className?: string;
    text?: string | number;
}

export const Text = ({ className, text }: TextProps) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={className}
                key={text}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
            >
                {text}
            </motion.div>
        </AnimatePresence>
    );
};
