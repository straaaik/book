'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
    element?: HTMLElement;
}
export const Portal = ({ children, element }: PortalProps) => {
    const [target, setTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setTarget(element || document.body);
    }, [element]);

    if (!target) return null;

    return createPortal(children, target);
};
