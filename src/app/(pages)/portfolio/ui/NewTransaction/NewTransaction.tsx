'use client';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { ModalTransaction } from '@/features';

export const NewTransaction = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickButton = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <Button theme={ButtonTheme.INVERTED} onClick={onClickButton}>
                Add Transaction
            </Button>
            <ModalTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
