import cls from './CoinCard.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { AiFillPlusSquare } from 'react-icons/ai';
import { CoinName } from './ui/CoinName/CoinName';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { motion } from 'motion/react';

interface CoinInfoProps {
    rank?: number;
    image?: string;
    name?: string;
    symbol?: string;
    price?: number;
    change1h?: number;
    change24h?: number;
    change7d?: number;
    marketCap?: number;
    volume?: number;
    circulatingSupply?: number;
    holdings?: [number, number];
    avgPrice?: number;
    profitLoss?: number;
    id?: string;
}

export const CoinCard = (props: CoinInfoProps) => {
    const { rank, name, image, symbol, id, price, change1h, change24h, change7d, marketCap, volume, circulatingSupply, holdings, avgPrice, profitLoss } = props;

    return (
        <motion.div className={cls.CoinCard}>
            {rank && <div>{rank}</div>}
            <div className={cls.name_container}>
                <CoinName name={name} image={image} symbol={symbol} id={id} />
            </div>
            <div className={cls.info_container}>
                <CoinInfo
                    price={price}
                    marketCap={marketCap}
                    volume={volume}
                    profitLoss={profitLoss}
                    avgPrice={avgPrice}
                    change1h={change1h}
                    change24h={change24h}
                    change7d={change7d}
                    circulatingSupply={circulatingSupply}
                    holdings={holdings}
                    symbol={symbol}
                />
            </div>
            <div className={cls.actions_container}>
                <Button theme={ButtonTheme.CLEAR}>
                    <AiFillPlusSquare />
                </Button>
            </div>
        </motion.div>
    );
};
