import React, { FC } from 'react';
import Image from 'next/image';
import cls from './CoinInfo.module.scss';
import Link from 'next/link';
import { Text } from '@/shared/ui/animation/text/Text';
import { div } from 'motion/react-client';

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
        <div className={cls.coin}>
            <div className={cls.market_cap_rank}>{rank}</div>
            <div className={cls.name_container}>
                {image && <Image src={image} alt={image} width={30} height={30} />}
                <Link href={`/coin/${id}`} className={cls.link}>
                    <div className={cls.name}>{name}</div>
                    {symbol && <div className={cls.symbol}>{symbol.toUpperCase()}</div>}
                </Link>
            </div>

            <Text className={cls.current_price} text={price} />
            <Text className={cls.price_change_percentage_24h} text={change24h} />
            <Text className={cls.market_cap} text={marketCap} />
        </div>
    );
};
