import cls from './CoinInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { RenderCell } from './RenderCell';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface CoinInfoProps {
    isLoading?: boolean;

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
    const { price, change1h, change24h, change7d, marketCap, volume, circulatingSupply, holdings, avgPrice, profitLoss, symbol, isLoading } = props;

    return (
        <>
            <RenderCell isLoading={isLoading} value={price} format="currency" />
            <RenderCell isLoading={isLoading} value={change1h} format="percentages" highlight />
            <RenderCell isLoading={isLoading} value={change24h} format="percentages" highlight />
            <RenderCell isLoading={isLoading} value={change7d} format="percentages" highlight />
            <RenderCell isLoading={isLoading} value={marketCap} format="big" />
            <RenderCell isLoading={isLoading} value={volume} format="big" />
            <RenderCell isLoading={isLoading} value={circulatingSupply} format="big" />
            {holdings !== undefined && (
                <td>
                    {isLoading ? (
                        <div className={cls.holdings}>
                            <Skeleton width={150} height={25} />
                            <Skeleton width={150} height={10} />
                        </div>
                    ) : (
                        <div className={cls.holdings}>
                            <TextNumber text={Number(holdings[0])} format="currencyRounded" />
                            <div className={cls.wrapper}>
                                <TextNumber text={Number(holdings[1])} />
                                <span>{symbol}</span>
                            </div>
                        </div>
                    )}
                </td>
            )}
            <RenderCell isLoading={isLoading} value={avgPrice} format="currencyRounded" />
            {profitLoss !== undefined && (
                <td>
                    {isLoading ? (
                        <div className={cls.profitLoss}>
                            <Skeleton width={150} height={25} />
                            <Skeleton width={150} height={10} />
                        </div>
                    ) : (
                        <div className={cls.profitLoss}>
                            <TextNumber className={cls.currency} text={Number(profitLoss[0])} format="currencyRounded" highlight />
                            <TextNumber className={cls.percentages} text={Number(profitLoss[1])} format="percentages" highlight />
                        </div>
                    )}
                </td>
            )}
        </>
    );
};
