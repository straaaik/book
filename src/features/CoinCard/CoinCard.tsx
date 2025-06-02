import { CoinName } from './ui/CoinName/CoinName';
import { CoinInfo } from './ui/CoinInfo/CoinInfo';
import { CoinActions } from './ui/CoinActions/CoinActions';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

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
    portfolioName?: string;
    onClick?: (arg: string) => void;
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
        portfolioName,
        onClick,
    } = props;

    const keyProps = Object.keys(props) as [keyof CoinInfoProps];

    if (keyProps.some((key) => props[key] === undefined)) {
        return (
            <tr>
                <td style={{ padding: '0 10px' }} colSpan={10}>
                    <Skeleton height={60} />
                </td>
            </tr>
        );
    }

    return (
        <tr className={className}>
            <CoinName onClick={onClick} rank={rank} name={name} image={image} symbol={symbol} id={id} portfolioName={portfolioName} />
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
        </tr>
    );
};
