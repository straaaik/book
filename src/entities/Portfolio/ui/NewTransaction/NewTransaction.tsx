'use client';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { useAppSelector } from '@/shared/hooks/hooks';
import { getActive } from '../../model/selectors/getActive';
import { ModalTransaction } from '../ModalTransaction/ModalTransaction';

export const NewTransaction = ({ className }: { className?: string }) => {
    const activePortfolio = useAppSelector(getActive);
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
