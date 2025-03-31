import React, { FC } from 'react';
import Image from 'next/image';
import cls from './CoinInfo.module.scss';
import Link from 'next/link';

interface CoinInfoProps {
    rank?: number;
    image?: string;
    name?: string;
    price?: string;
    change24h?: string;
    marketCap?: string;
    symbol?: string;
    onClick?: () => void;
    id?: string;
}

export const CoinInfo: FC<CoinInfoProps> = (props) => {
    const {
        rank = '#',
        name = 'Name',
        price = 'Price',
        change24h = '24h',
        marketCap = 'Market Cap',
        image,
        symbol,
        id,
    } = props;
    return (
        <Link href={`/coin/${id}`} className={cls.coin}>
            <div className={cls.market_cap_rank}>{rank}</div>
            <div className={cls.name_container}>
                {image && <Image src={image} alt={image} width={30} height={30} />}
                <div className={cls.name}>{name}</div>
                {symbol && <div className={cls.symbol}>{symbol.toUpperCase()}</div>}
            </div>

            <div className={cls.current_price}>${price}</div>
            <div className={cls.price_change_percentage_24h}>{change24h} %</div>
            <div className={cls.market_cap}>{marketCap}</div>
        </Link>
    );
};
