export const animateVariants = {
    error: {
        transform: ['rotate(5deg)', 'rotate(0deg)', 'rotate(-5deg)', 'rotate(0deg)'],
        border: '1px solid var(--red-color)',
        transition: { duration: 0.2, ease: 'easeInOut', repeat: 1 },
    },
};
