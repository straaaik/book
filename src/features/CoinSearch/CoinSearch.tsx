'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSearch.module.scss';
import { ModalButton } from '@/shared/ui/animation/modal/ModalButton';
import useSWR from 'swr';
import { fetcher } from '@/shared/api/request';
import { CoinList } from '@/shared/types/types';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

interface CoinSearchProps {
    className?: string;
}

export const CoinSearch = ({ className }: CoinSearchProps) => {
    const [value, setValue] = useState('');
    const [coinList, setCoinList] = useState<CoinList[]>([]);
    const { data } = useSWR<CoinList[]>('coins/list', fetcher);

    const onSortingData = (searchValue: string): CoinList[] => {
        const result = data ? data.filter((coin) => coin.name.toLowerCase().includes(searchValue.toLowerCase())) : [];
        return result;
    };

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setCoinList(onSortingData(e.target.value));
    };

    return (
        <div className={classNames(cls.CoinSearch, {}, [className])}>
            <ModalButton text="Search">
                <input className={cls.input} value={value} onChange={onChangeValue} />
                {coinList.length ? (
                    coinList.slice(0, 10).map((coin) => (
                        <Link className={cls.link} href={`/coin/${coin.id}`} key={coin.id}>
                            <div className={cls.name}>{coin.name}</div>
                            <div className={cls.symbol}>{coin.symbol}</div>
                        </Link>
                    ))
                ) : (
                    <div>ПОИСК</div>
                )}
            </ModalButton>
        </div>
    );
};
