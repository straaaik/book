'use client'; // Error boundaries must be Client Components

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { useEffect } from 'react';
import cls from './styles/error.module.scss';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={cls.Error}>
            <div className={cls.description}>{error.message}</div>
            <Button theme={ButtonTheme.DANGER} size={ButtonSize.XL} onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
}
