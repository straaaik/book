'use client';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { ModalTransaction } from '@/features';

export const NewTransaction = ({ active, className }: { active: string; className?: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={className}>
            <Button theme={ButtonTheme.DANGER} onClick={() => setIsOpen(true)}>
                Add Transaction
            </Button>
            <ModalTransaction active={active} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
