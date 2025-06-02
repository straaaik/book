'use client';

import { RefObject, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLDivElement | null>, setVisible: (arg: boolean) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setVisible, ref]);
};
