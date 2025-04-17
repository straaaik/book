'use client';

import { useState } from 'react';
import { ButtonSearch } from './ui/ButtonSearch/ButtonSearch';
import { ModalSearch } from './ui/ModalSearch/ModalSearch';
import { coinApi } from '@/entities/Coin';

export const CoinSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [trigger, { data }] = coinApi.useLazyGetCoinListQuery();

    const onClickButton = () => {
        setIsOpen(true);
        trigger(undefined, true);
    };

    return (
        <>
            <ButtonSearch onClick={onClickButton} />
            <ModalSearch onClose={() => setIsOpen(false)} isOpen={isOpen} data={data} />
        </>
    );
};
