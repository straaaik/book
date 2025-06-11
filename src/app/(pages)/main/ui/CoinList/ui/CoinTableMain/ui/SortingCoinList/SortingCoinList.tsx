import { CoinsListWithMarketData } from '@/entities/Coin';
import { Sorted } from '@/features/Sorted/Sorted';
import { Dispatch, SetStateAction } from 'react';

interface SortingCoinListProps {
    setData: Dispatch<SetStateAction<CoinsListWithMarketData[]>>;
}

export const SortingCoinList = ({ setData }: SortingCoinListProps) => {
    return (
        <Sorted<CoinsListWithMarketData>
            setSortingData={setData}
            params={[
                { sortKey: 'market_cap_rank', text: '#' },
                { sortKey: 'name', text: 'Name' },
                { sortKey: 'current_price', text: 'Price' },
                { sortKey: 'price_change_percentage_1h_in_currency', text: '1h %' },
                { sortKey: 'price_change_percentage_24h_in_currency', text: '24h %' },
                { sortKey: 'price_change_percentage_7d_in_currency', text: '7d %' },
                { sortKey: 'market_cap', text: 'Market Cap' },
                { sortKey: 'total_volume', text: 'Volume' },
                { sortKey: 'circulating_supply', text: 'Circulating Supply' },
            ]}
        />
    );
};
