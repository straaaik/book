import { useCallback } from 'react';
import cls from './CoinTablePortfolio.module.scss';
import { PortfolioSorted } from './ui/PortfolioSorted/PortfolioSorted';
import { Portfolio } from '@/entities/Portfolio';
import { CoinCard, CoinsTable } from '@/features';

interface IPortfolioList {
    portfolio: Portfolio[];
    active: string;
    onClick: (arg: string) => void;
}

export const CoinTablePortfolio = ({ portfolio, active, onClick }: IPortfolioList) => {
    const renderPortfolio = useCallback(() => {
        let activePortfolio;
        if (active == 'Overview') activePortfolio = portfolio;
        else activePortfolio = portfolio?.filter((item) => item.portfolio_name == active);

        return activePortfolio?.map((item) => (
            <CoinCard
                onClick={onClick}
                className={cls.wrapper}
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
        ));
    }, [portfolio, active, onClick]);

    return <CoinsTable className={cls.CoinTablePortfolio} head={<PortfolioSorted />} main={renderPortfolio()} />;
};
