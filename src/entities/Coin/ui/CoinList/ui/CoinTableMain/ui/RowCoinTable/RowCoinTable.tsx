import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './RowCoinTable.module.scss';
import { memo } from 'react';
import { RenderCell } from '@/shared/ui/Table/ui/RenderCell';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { CellCoinActions } from '../CellCoinActions/CellCoinActions';
import { CoinsListWithMarketData } from '../../../../../../../Coin/types/types';

interface RowCoinTableProps {
    className?: string;
    coinInfo?: CoinsListWithMarketData;
    isLoading?: boolean;
}

export const RowCoinTable = memo(({ className, coinInfo, isLoading }: RowCoinTableProps) => {
    return (
        <tr className={classNames(cls.RowCoinTable, {}, [className])}>
            <RenderCell value={coinInfo?.market_cap_rank} content={<div className={cls.rank}>{coinInfo?.market_cap_rank}</div>} />
            <RenderCell
                value={coinInfo?.name}
                content={
                    <Button>
                        <Link href={`/coin/${coinInfo?.id}`} className={cls.link}>
                            {coinInfo?.image && <Image className={cls.image} src={coinInfo?.image} alt={coinInfo?.image} width={30} height={30} />}
                            {coinInfo?.name && <div className={cls.name}>{coinInfo?.name}</div>}
                            {coinInfo?.symbol && <div className={cls.symbol}>{coinInfo?.symbol}</div>}
                        </Link>
                    </Button>
                }
            />
            <RenderCell isLoading={isLoading} value={coinInfo?.current_price} content={<TextNumber text={coinInfo?.current_price} format="currency" />} />
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.price_change_percentage_1h_in_currency}
                content={<TextNumber text={coinInfo?.price_change_percentage_1h_in_currency} format="percentages" highlight />}
            />
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.price_change_percentage_24h_in_currency}
                content={<TextNumber text={coinInfo?.price_change_percentage_24h_in_currency} format="percentages" highlight />}
            />
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.price_change_percentage_7d_in_currency}
                content={<TextNumber text={coinInfo?.price_change_percentage_7d_in_currency} format="percentages" highlight />}
            />
            <RenderCell isLoading={isLoading} value={coinInfo?.market_cap} content={<TextNumber text={coinInfo?.market_cap} format="big" />} />
            <RenderCell isLoading={isLoading} value={coinInfo?.total_volume} content={<TextNumber text={coinInfo?.total_volume} format="big" />} />
            <RenderCell isLoading={isLoading} value={coinInfo?.circulating_supply} content={<TextNumber text={coinInfo?.circulating_supply} format="big" />} />
            <CellCoinActions />
        </tr>
    );
});
