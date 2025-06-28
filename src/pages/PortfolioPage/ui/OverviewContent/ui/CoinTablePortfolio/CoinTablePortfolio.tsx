import cls from './CoinTablePortfolio.module.scss';
import { PortfolioSorted } from './ui/PortfolioSorted/PortfolioSorted';
import { Table } from '@/shared/ui/Table/Table';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { CoinCard } from '@/features/CoinCard';
import { Portfolio } from '@/entities/Portfolio/types/types';
interface ICoinTablePortfolio {
    portfolio: Portfolio[];
    isLoading?: boolean;
}

export const CoinTablePortfolio = ({ portfolio, isLoading }: ICoinTablePortfolio) => {
    const [sortedPortfolio, setSortedPortfolio] = useLazyState(portfolio);

    return (
        <Table
            title="Assets"
            classNameContainer={cls.container}
            className={cls.CoinTablePortfolio}
            head={<PortfolioSorted setSortedData={setSortedPortfolio} />}
            main={
                isLoading || !sortedPortfolio.length
                    ? new Array(10)
                          .fill(undefined)
                          .map((item, i) => (
                              <CoinCard
                                  isLoading={true}
                                  id={item}
                                  portfolioName={item}
                                  key={i}
                                  name={item}
                                  symbol={item}
                                  price={item}
                                  image={item}
                                  holdings={[item, item]}
                                  avgPrice={item}
                                  change1h={item}
                                  change24h={item}
                                  change7d={item}
                                  profitLoss={[item, item]}
                              />
                          ))
                    : sortedPortfolio?.map((item) => (
                          <CoinCard
                              id={item.id}
                              portfolioName={item.portfolioId}
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
                      ))
            }
        />
    );
};
