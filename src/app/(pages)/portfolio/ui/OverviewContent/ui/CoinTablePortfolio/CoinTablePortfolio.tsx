import { useCallback } from 'react';
import cls from './CoinTablePortfolio.module.scss';
import { PortfolioSorted } from './ui/PortfolioSorted/PortfolioSorted';
import { CoinCard } from '@/features';
import { Table } from '@/shared/ui/Table/Table';
import { useAppSelector } from '@/app/config/store/hooks';
import { getActivePortfolio } from '@/entities/Portfolio/model/selectors/getActivePortfolio';

interface IPortfolioList {
    onClick: (arg: string) => void;
}

export const CoinTablePortfolio = ({ onClick }: IPortfolioList) => {
    const activePortfolio = useAppSelector(getActivePortfolio);

    const renderPortfolio = useCallback(() => {
        return activePortfolio?.map((item) => {
            return (
                <CoinCard
                    onClick={onClick}
                    id={item.id}
                    portfolioName={item.portfolio_name}
                    key={item.id}
                    name={item.name}
                    symbol={item.symbol}
                    price={item.current_price}
                    image={item.image}
                    holdings={[item.holdings_coin * item.current_price, item.holdings_coin]}
                    avgPrice={item.avgPrice}
                    change1h={item.price_change_percentage_1h_in_currency}
                    change24h={item.price_change_percentage_24h_in_currency}
                    change7d={item.price_change_percentage_7d_in_currency}
                    profitLoss={[item.profit_loss, (item.profit_loss / item.purchase_price) * 100]}
                />
            );
        });
    }, [onClick, activePortfolio]);

    return <Table title="Assets" classNameContainer={cls.container} className={cls.CoinTablePortfolio} head={<PortfolioSorted />} main={renderPortfolio()} />;
};
