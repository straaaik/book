'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Sorted.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { Dispatch, SetStateAction, useState } from 'react';
import { sortingData } from './services/sortingData';
import { Coin } from '@/entities/Portfolio';
import { motion } from 'motion/react';
import { div } from 'motion/react-client';

interface CoinSortedProps {
    data: Coin[]; // ТУТ ТОЖЕ
    setData: Dispatch<SetStateAction<any>>; // TODO ТИП
    className?: string;
    rank?: boolean;
    name?: boolean;
    price?: boolean;
    change1h?: boolean;
    change24h?: boolean;
    change7d?: boolean;
    marketCap?: boolean;
    volume?: boolean;
    circulatingSupply?: boolean;
    holdings?: boolean;
    avgPrice?: boolean;
    profitLoss?: boolean;
}

interface ParamsType {
    condition?: boolean;
    sortKey: keyof Coin;
    text?: string;
}

export const Sorted = (props: CoinSortedProps) => {
    const [status, setStatus] = useState<'ascending' | 'descending'>('ascending');
    const [active, setActive] = useState('');
    const { className, data, setData, rank, name, price, change1h, change24h, change7d, marketCap, volume, circulatingSupply, holdings, avgPrice, profitLoss } =
        props;

    const params: ParamsType[] = [
        { condition: price, sortKey: 'current_price', text: 'Price' },
        { condition: change1h, sortKey: 'price_change_percentage_1h_in_currency', text: '1h %' },
        { condition: change24h, sortKey: 'price_change_percentage_24h_in_currency', text: '24h %' },
        { condition: change7d, sortKey: 'price_change_percentage_7d_in_currency', text: '7d %' },
        { condition: marketCap, sortKey: 'market_cap', text: 'Market Cap' },
        { condition: volume, sortKey: 'total_volume', text: 'Volume' },
        { condition: circulatingSupply, sortKey: 'circulating_supply', text: 'Circulating Supply' },
        { condition: holdings, sortKey: 'holdings', text: 'Holdings' },
        { condition: avgPrice, sortKey: 'avgPrice', text: 'Avg. Buy Price' },
    ];

    const setStyleForStatus = (sortKey: keyof Coin) =>
        active == sortKey ? (status == 'descending' ? { borderBottom: '2px solid var(--warn-color)' } : { borderTop: '2px solid var(--warn-color)' }) : {};

    const onBtnClick = (item: keyof Coin) => {
        setActive(item);
        const sortData = sortingData<Coin>(data, status, item);
        setData(sortData);
        setStatus((prev) => (prev == 'ascending' ? 'descending' : 'ascending'));
    };

    return (
        <div className={classNames(cls.CoinSorted, {}, [className])}>
            {rank && (
                <div className={cls.wrapper}>
                    <Button scale={[1.3, 0.8]} style={setStyleForStatus('market_cap_rank')} onClick={() => onBtnClick('market_cap_rank')} className={cls.btn}>
                        #
                    </Button>
                </div>
            )}
            <div className={cls.name_container}>
                {name && (
                    <div className={cls.wrapper}>
                        <Button scale={[1.3, 0.8]} style={setStyleForStatus('name')} onClick={() => onBtnClick('name')} className={cls.btnName}>
                            Name
                        </Button>
                    </div>
                )}
            </div>
            <div className={cls.info_container}>
                {params.map(({ condition, sortKey, text }) => {
                    if (!condition) return null;

                    return (
                        <div key={sortKey}>
                            <Button scale={[1.3, 0.8]} style={setStyleForStatus(sortKey)} onClick={() => onBtnClick(sortKey)} className={cls.btn}>
                                {text}
                            </Button>
                        </div>
                    );
                })}
            </div>

            <div className={cls.actions_container} />
        </div>
    );
};
