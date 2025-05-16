import cls from './CoinCard.module.scss';
import { CoinName } from './ui/CoinName/CoinName';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { CoinActions } from './ui/CoinActions/CoinActions';

interface CoinInfoProps {
    className?: string;
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
    profitLoss?: [number, number];
    id: string;
}

export const CoinCard = (props: CoinInfoProps) => {
    const {
        className,
        rank,
        name,
        image,
        symbol,
        id,
        price,
        change1h,
        change24h,
        change7d,
        marketCap,
        volume,
        circulatingSupply,
        holdings,
        avgPrice,
        profitLoss,
    } = props;

    return (
        <div className={classNames(cls.CoinCard, {}, [className])}>
            {rank && <div>{rank}</div>}
            <CoinName name={name} image={image} symbol={symbol} id={id} />
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
            <CoinActions portfolio={Boolean(avgPrice)} coinInfo={{ name, symbol, image, current_price: price, id }} />
        </div>
    );
};
