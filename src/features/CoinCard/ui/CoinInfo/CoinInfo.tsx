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

export const CoinInfo = (props: CoinInfoProps) => {
    const { price, change1h, change24h, change7d, marketCap, volume, circulatingSupply, holdings, avgPrice, profitLoss, symbol } = props;
    return (
        <>
            {price !== undefined && (
                <td>
                    <TextNumber text={price} format="currency" />
                </td>
            )}
            {change1h !== undefined && (
                <td>
                    <TextNumber text={change1h} format="percentages" highlight />
                </td>
            )}
            {change24h !== undefined && (
                <td>
                    <TextNumber text={change24h} format="percentages" highlight />
                </td>
            )}
            {change7d !== undefined && (
                <td>
                    <TextNumber text={change7d} format="percentages" highlight />
                </td>
            )}
            {marketCap !== undefined && (
                <td>
                    <TextNumber text={marketCap} format="big" />
                </td>
            )}
            {volume !== undefined && (
                <td>
                    <TextNumber text={Number(volume)} format="big" />
                </td>
            )}
            {circulatingSupply !== undefined && (
                <td>
                    <TextNumber text={Number(circulatingSupply)} format="big" />
                </td>
            )}
            {holdings !== undefined && (
                <td>
                    <div className={cls.holdings}>
                        <TextNumber text={Number(holdings[0])} format="currencyRounded" />
                        <div className={cls.wrapper}>
                            <TextNumber text={Number(holdings[1])} />
                            <span>{symbol}</span>
                        </div>
                    </div>
                </td>
            )}
            {avgPrice !== undefined && (
                <td>
                    <TextNumber text={Number(avgPrice)} format="currencyRounded" />
                </td>
            )}
            {profitLoss !== undefined && (
                <td>
                    <div className={cls.profitLoss}>
                        <TextNumber className={cls.currency} text={Number(profitLoss[0])} format="currencyRounded" highlight />
                        <TextNumber className={cls.percentages} text={Number(profitLoss[1])} format="percentages" highlight />
                    </div>
                </td>
            )}
        </>
    );
};
