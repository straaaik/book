import { useAppSelector } from '@/app/config/store/hooks';
import { CoinCard } from '@/features/CoinCard/CoinCard';
import cls from './PortfolioList.module.scss';
import { PortfolioSorted } from './ui/PortfolioSorted/PortfolioSorted';

export const PortfolioList = () => {
    const portfolio = useAppSelector((state) => state.portfolio.data);

    return (
        <>
            {Boolean(portfolio?.length) ? (
                <div className={cls.wrapper}>
                    <PortfolioSorted />
                    {portfolio?.map((item) => (
                        <CoinCard
                            className={cls.wrapper}
                            id={item.id}
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
                    ))}
                </div>
            ) : (
                <div className={cls.empty}>Your portfolio is empty</div>
            )}
        </>
    );
};
