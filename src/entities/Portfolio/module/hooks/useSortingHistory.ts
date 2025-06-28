import { useAppSelector } from '@/shared/hooks/hooks';
import { getActive } from '../../model/selectors/getActive';
import { useGetTransactionByPortfolioWithCoinQuery } from '../../model/endpoints/getTransactions';

export const useSortingHistory = (sortByCoin: string, sortByType: string) => {
    const active = useAppSelector(getActive);
    const { data: transactions } = useGetTransactionByPortfolioWithCoinQuery(active);
    if (sortByCoin !== 'All' && sortByType == 'All') {
        return transactions?.filter((order) => order.coinName === sortByCoin) || [];
    } else if (sortByCoin == 'All' && sortByType !== 'All') {
        return transactions?.filter((order) => order.type === sortByType) || [];
    } else if (sortByCoin !== 'All' && sortByType !== 'All') {
        return transactions?.filter((order) => order.coinName === sortByCoin).filter((order) => order.type === sortByType) || [];
    } else if (sortByCoin == 'All' || sortByType == 'All') {
        return transactions;
    } else {
        return transactions;
    }
};
