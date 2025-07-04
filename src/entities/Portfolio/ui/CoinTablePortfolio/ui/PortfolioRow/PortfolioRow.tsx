import { CoinDescription, Portfolio } from '../../../../types/types';
import { memo } from 'react';
import cls from './PortfolioRow.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { usePortfolioIcon } from '../../../../module/hooks/usePortfolioIcon';
import { RenderCell } from '@/shared/ui/Table/ui/RenderCell';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { PortfolioActionsCell } from '../PortfolioActionsCell/PortfolioActionsCell';

interface PortfolioRowProps {
    coinInfo?: Portfolio;
    isLoading?: boolean;
    onClick?: (arg: CoinDescription) => void;
}

export const PortfolioRow = memo(({ coinInfo, isLoading, onClick }: PortfolioRowProps) => {
    const PortfolioIcon = usePortfolioIcon(coinInfo?.portfolioId || '');

    const onCoinClick = () => {
        if (coinInfo) onClick?.({ id: coinInfo.id, image: coinInfo.image, name: coinInfo.name, symbol: coinInfo.symbol });
    };

    const holdingsCoinPrice = coinInfo ? coinInfo?.holdings_coin * coinInfo?.current_price : 0;

    return (
        <tr className={cls.PortfolioRow}>
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.name}
                content={
                    <Button className={cls.link} onClick={onCoinClick}>
                        {coinInfo?.image && <Image className={cls.image} src={coinInfo?.image} alt={coinInfo?.image} width={30} height={30} />}
                        {coinInfo?.name && <div className={cls.name}>{coinInfo?.name}</div>}
                        {coinInfo?.symbol && <div className={cls.symbol}>{coinInfo?.symbol}</div>}
                    </Button>
                }
            />
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.portfolioId}
                content={
                    <div className={cls.icon_wrapper}>
                        {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                        <span>{coinInfo?.portfolioId}</span>
                    </div>
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
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.holdings_coin}
                content={
                    <div className={cls.holdings}>
                        <TextNumber text={Number(holdingsCoinPrice)} format="currencyRounded" />
                        <div className={cls.wrapper}>
                            <TextNumber text={Number(coinInfo?.holdings_coin)} />
                            <span>{coinInfo?.symbol}</span>
                        </div>
                    </div>
                }
            />
            <RenderCell isLoading={isLoading} value={coinInfo?.avgPrice} content={<TextNumber text={coinInfo?.avgPrice} format="currency" />} />
            <RenderCell
                isLoading={isLoading}
                value={coinInfo?.holdings_coin}
                content={
                    <div className={cls.profitLoss}>
                        <TextNumber className={cls.currency} text={Number(coinInfo?.profit_loss)} format="currencyRounded" highlight />
                        <TextNumber className={cls.percentages} text={Number(coinInfo?.profit_loss_percentage)} format="percentages" highlight />
                    </div>
                }
            />
            <PortfolioActionsCell coinId={coinInfo?.id} />
        </tr>
    );
});
