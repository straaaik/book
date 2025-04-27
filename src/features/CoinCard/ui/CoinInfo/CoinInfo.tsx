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
    profitLoss?: number;
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
            {price && <TextNumber text={price} currency />}
            {change1h && <TextNumber text={change1h} percentages highlight />}
            {change24h && <TextNumber text={change24h} percentages highlight />}
            {change7d && <TextNumber text={change7d} percentages highlight />}
            {marketCap && <TextNumber text={marketCap} big />}
            {volume && <TextNumber text={Number(volume)} big />}
            {circulatingSupply && <TextNumber text={Number(circulatingSupply)} big />}
            {holdings && (
                <div className={cls.holdings}>
                    <TextNumber text={Number(holdings[0])} currencyRounded />
                    <div className={cls.wrapper}>
                        <TextNumber text={Number(holdings[1])} />
                        <span>{symbol}</span>
                    </div>
                </div>
            )}
            {avgPrice && <TextNumber text={Number(avgPrice)} currencyRounded />}
            {profitLoss && <TextNumber text={Number(profitLoss)} currency />}
        </>
    );
};
