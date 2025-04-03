'use client';

import { useState } from 'react';
import { ButtonSearch } from './ui/ButtonSearch/ButtonSearch';
import { ModalSearch } from './ui/ModalSearch/ModalSearch';

export const CoinSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ButtonSearch onClick={() => setIsOpen(true)} />
            <ModalSearch onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </>
    );
};
