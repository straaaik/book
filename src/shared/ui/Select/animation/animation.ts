export const sidebarVariants = {
    open: () => ({
        height: 'auto',
        opacity: 1,
        transition: {
            opacity: { ease: 'linear' },
            duration: 0.5,
        },
    }),
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            opacity: { ease: 'linear' },
            duration: 0.5,
        },
    },
};
