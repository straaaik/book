'use client';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { ModalTransaction } from '@/features';
import { useAppSelector } from '@/app/config/store/hooks';

export const NewTransaction = ({ className }: { className?: string }) => {
    const activePortfolio = useAppSelector((state) => state.portfolioPage.active);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            <Button theme={ButtonTheme.DANGER} onClick={() => setIsOpen(true)}>
                Add Transaction
            </Button>
            <ModalTransaction active={activePortfolio} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
