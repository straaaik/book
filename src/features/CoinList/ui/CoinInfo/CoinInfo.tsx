import React, { FC } from 'react';
import Image from 'next/image';
import cls from './CoinInfo.module.scss';
import Link from 'next/link';
import { Text } from '@/shared/ui/animation/text/Text';
import { motion } from 'motion/react';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';
import { AiFillPlusSquare } from 'react-icons/ai';

interface CoinInfoProps {
    rank?: number;
    image?: string;
    name?: string;
    price?: number;
    change24h?: number;
    marketCap?: number;
    symbol?: string;
    onClick?: () => void;
    id?: string;
}

export const CoinInfo: FC<CoinInfoProps> = (props) => {
    const { rank = '#', name = 'Name', price = 'Price', change24h = '24h', marketCap = 'Market Cap', image, symbol, id } = props;

    //TODO При нажатии открывается модалка
    const click = () => {};

    return (
        <div className={cls.coin}>
            <div className={cls.market_cap_rank}>{rank}</div>
            <div className={cls.name_container}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link className={cls.link} href={`/coin/${id}`}>
                        {image && <Image className={cls.image} src={image} alt={image} width={30} height={30} />}
                        <div>
                            <div className={cls.name}>{name}</div>
                            {symbol && <div className={cls.symbol}>{symbol.toUpperCase()}</div>}
                        </div>
                    </Link>
                </motion.div>
            </div>

            <Text className={cls.current_price} text={price} currency />
            <Text className={cls.price_change_percentage_24h} text={change24h} highlight percentages />
            <Text className={cls.market_cap} text={marketCap} big />
            <div className={cls.hoverGroup}>
                <Button theme={ButtonTheme.CLEAR} onClick={click}>
                    <AiFillPlusSquare />
                </Button>
            </div>
        </div>
    );
};
