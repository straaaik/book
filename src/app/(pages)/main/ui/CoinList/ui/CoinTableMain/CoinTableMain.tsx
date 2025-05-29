import { CoinsListWithMarketData } from '@/entities/Coin';
import { CoinCard, CoinsTable } from '@/features';
import { useState, useEffect } from 'react';
import { SortingCoinList } from './ui/SortingCoinList/SortingCoinList';
import cls from './CoinTableMain.module.scss';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';

interface CoinTableMainProps {
    data: CoinsListWithMarketData[] | undefined;
    isLoading: boolean;
}

export const CoinTableMain = ({ data, isLoading }: CoinTableMainProps) => {
    const [sortedData, setSortedData] = useState<CoinsListWithMarketData[]>([]);

    useEffect(() => {
        if (data) setSortedData(data);
    }, [data]);

    if (isLoading || !sortedData.length) return <LoadingSpinner />;

    return (
        <CoinsTable
            className={cls.CoinTableMain}
            head={<SortingCoinList data={sortedData} setData={setSortedData} />}
            main={sortedData.map((coin) => (
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
            ))}
        />
    );
};
