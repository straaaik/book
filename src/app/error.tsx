'use client'; // Error boundaries must be Client Components

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/Button';
import { useEffect } from 'react';
import cls from './styles/error.module.scss';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={cls.Error}>
            <div className={cls.description}>Something went wrong!</div>
            <Button theme={ButtonTheme.DANGER} size={ButtonSize.XL} onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
}
