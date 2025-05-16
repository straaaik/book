import cls from './CoinInfo.module.scss';

import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';

interface CoinInfoProps {
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
    symbol?: string;
}

export const CoinInfo = ({
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
    symbol,
}: CoinInfoProps) => {
    return (
        <>
            {price !== undefined && <TextNumber text={price} format="currency" />}
            {change1h !== undefined && <TextNumber text={change1h} format="percentages" highlight />}
            {change24h !== undefined && <TextNumber text={change24h} format="percentages" highlight />}
            {change7d !== undefined && <TextNumber text={change7d} format="percentages" highlight />}
            {marketCap !== undefined && <TextNumber text={marketCap} format="big" />}
            {volume !== undefined && <TextNumber text={Number(volume)} format="big" />}
            {circulatingSupply !== undefined && <TextNumber text={Number(circulatingSupply)} format="big" />}
            {holdings !== undefined && (
                <div className={cls.holdings}>
                    <TextNumber text={Number(holdings[0])} format="currencyRounded" />
                    <div className={cls.wrapper}>
                        <TextNumber text={Number(holdings[1])} />
                        <span>{symbol}</span>
                    </div>
                </div>
            )}
            {avgPrice !== undefined && <TextNumber text={Number(avgPrice)} format="currencyRounded" />}
            {profitLoss !== undefined && (
                <div className={cls.profitLoss}>
                    <TextNumber className={cls.currency} text={Number(profitLoss[0])} format="currencyRounded" highlight />
                    <TextNumber className={cls.percentages} text={Number(profitLoss[1])} format="percentages" highlight />
                </div>
            )}
        </>
    );
};
