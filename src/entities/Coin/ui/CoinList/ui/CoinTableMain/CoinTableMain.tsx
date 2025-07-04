import { SortingCoinList } from './ui/SortingCoinList/SortingCoinList';
import cls from './CoinTableMain.module.scss';
import { Table } from '@/shared/ui/Table/Table';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { CoinsListWithMarketData } from '../../../../../../entities/Coin/types/types';
import { RowCoinTable } from './ui/RowCoinTable/RowCoinTable';

interface CoinTableMainProps {
    data?: CoinsListWithMarketData[];
    isLoading?: boolean;
}

export const CoinTableMain = ({ data, isLoading }: CoinTableMainProps) => {
    const [sortedData, setSortedData] = useLazyState<CoinsListWithMarketData[]>(data || []);

    return (
        <Table
            className={cls.CoinTableMain}
            head={<SortingCoinList setData={setSortedData} />}
            main={
                isLoading || !sortedData.length
                    ? new Array(30).fill(undefined).map((item, i) => <RowCoinTable coinInfo={item} isLoading={true} key={i} />)
                    : sortedData?.map((coin) => <RowCoinTable key={coin.id} coinInfo={coin} />)
            }
        />
    );
};
