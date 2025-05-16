import { CoinsListWithMarketData } from '@/entities/Coin';
import { Sorted } from '@/features/Sorted/Sorted';

interface SortingCoinListProps {
    data: CoinsListWithMarketData[];
    setData: (arg: CoinsListWithMarketData[]) => void;
}

export const SortingCoinList = ({ data, setData }: SortingCoinListProps) => {
    const sortingCoins = ({ item, status }: { item: keyof CoinsListWithMarketData; status: 'ascending' | 'descending' }) => {
        switch (status) {
            case 'ascending':
                if (item == 'name') {
                    setData([...data].sort((a, b) => a[item].localeCompare(b[item], undefined, { sensitivity: 'base' })));
                } else {
                    setData([...data].sort((a, b) => Number(b[item]) - Number(a[item])));
                }
                break;
            case 'descending':
                if (item == 'name') {
                    setData([...data].sort((a, b) => b[item].localeCompare(a[item], undefined, { sensitivity: 'base' })));
                } else {
                    setData([...data].sort((a, b) => Number(a[item]) - Number(b[item])));
                }
                break;
            default:
                setData(data);
                break;
        }
    };

    return (
        <Sorted<CoinsListWithMarketData>
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
            sortedFunction={(payload) => sortingCoins(payload)}
        />
    );
};
