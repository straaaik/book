import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSearch.module.scss';
import { ModalButton } from '@/shared/ui/animation/modal/ModalButton';
import useSWR from 'swr';
import { fetcher } from '@/shared/api/request';
import { CoinList } from '@/shared/types/types';
import { useState } from 'react';
import Link from 'next/link';

interface CoinSearchProps {
    className?: string;
}

export const CoinSearch = ({ className }: CoinSearchProps) => {
    const [value, setValue] = useState('');
    const { data, error, isLoading, mutate } = useSWR<CoinList[]>('coins/list', fetcher);

    const onChangeValue = (e: React.ChangeEvent) => {
        setValue(e.target.value);
        mutate(
            data?.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase())),
            { revalidate: false }
        );
        console.log(data);
    };

    return (
        <div className={classNames(cls.CoinSearch, {}, [className])}>
            <ModalButton text="Search">
                <input className={cls.input} value={value} onChange={onChangeValue} />
                {Boolean(data?.length) &&
                    data.slice(0, 10).map((coin) => (
                        <Link className={cls.link} href={`/coin/${coin.id}`} key={coin.id}>
                            <div className={cls.name}>{coin.name}</div>
                            <div className={cls.symbol}>{coin.symbol}</div>
                        </Link>
                    ))}
            </ModalButton>
        </div>
    );
};
