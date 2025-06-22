import { CoinsListWithMarketData } from '@/entities/Coin';
import { SortingCoinList } from './ui/SortingCoinList/SortingCoinList';
import cls from './CoinTableMain.module.scss';
import { Table } from '@/shared/ui/Table/Table';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { CoinCard } from '@/features/CoinCard';
interface CoinTableMainProps {
    data: CoinsListWithMarketData[];
    isLoading?: boolean;
}

export const CoinTableMain = ({ data, isLoading }: CoinTableMainProps) => {
    const [sortedData, setSortedData] = useLazyState<CoinsListWithMarketData[]>(data);

    return (
        <Table
            className={cls.CoinTableMain}
            head={<SortingCoinList setData={setSortedData} />}
            main={
                isLoading || !sortedData
                    ? new Array(30)
                          .fill(undefined)
                          .map((item, i) => (
                              <CoinCard
                                  key={i}
                                  id={item}
                                  name={item}
                                  change1h={item}
                                  change24h={item}
                                  change7d={item}
                                  marketCap={item}
                                  price={item}
                                  rank={item}
                                  image={item}
                                  symbol={item}
                                  volume={item}
                                  circulatingSupply={item}
                                  isLoading={true}
                              />
                          ))
                    : sortedData?.map((coin) => (
                          <CoinCard
                              id={coin.id}
                              key={coin.market_cap_rank}
                              name={coin.name}
                              change1h={coin.price_change_percentage_1h_in_currency}
                              change24h={coin.price_change_percentage_24h_in_currency}
                              change7d={coin.price_change_percentage_7d_in_currency}
                              marketCap={coin.market_cap}
                              price={coin.current_price}
                              rank={coin.market_cap_rank}
                              image={coin.image}
                              symbol={coin.symbol}
                              volume={coin.total_volume}
                              circulatingSupply={coin.circulating_supply}
                          />
                      ))
            }
        />
    );
};
