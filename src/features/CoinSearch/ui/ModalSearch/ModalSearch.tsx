'use client';

import cls from './ModalSearch.module.scss';
import { Modal } from '@/shared/ui/animation/modal/Modal';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { CoinList } from '@/shared/types/types';
import { fetcher } from '@/shared/api/request';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { AiOutlineSearch } from 'react-icons/ai';

interface ModalSearchProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalSearch = ({ className, isOpen, onClose }: ModalSearchProps) => {
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

    const onLinkClick = () => {
        onClose();
        setCoinList([]);
        setValue('');
    };

    return (
        <Modal className={classNames(cls.ModalSearch, {}, [className])} onClose={onClose} isOpen={isOpen}>
            <input id="search" className={cls.input} value={value} onChange={onChangeValue} />
            {coinList.length ? (
                coinList.slice(0, 10).map((coin) => (
                    <Link onClick={onLinkClick} className={cls.link} href={`/coin/${coin.id}`} key={coin.id}>
                        <div className={cls.name}>{coin.name}</div>
                        <div className={cls.symbol}>{coin.symbol}</div>
                    </Link>
                ))
            ) : (
                <AiOutlineSearch className={cls.iconSearch} />
            )}
        </Modal>
    );
};
