'use client';

import { useState } from 'react';
import { ButtonSearch } from './ButtonSearch/ButtonSearch';
import { ModalSearch } from './ModalSearch/ModalSearch';

export const CoinSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickButton = () => {
        setIsOpen(true);
    };

    return (
        <>
            <ButtonSearch onClick={onClickButton} />
            <ModalSearch onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </>
    );
};
