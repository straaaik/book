import { useAppSelector } from '@/shared/hooks/hooks';
import { getHistory } from '../../../entities/Portfolio/model/selectors/getHistory';

export const useSortingHistory = (sortByCoin: string, sortByType: string) => {
    const history = useAppSelector(getHistory);

    if (!history) return [];

    if (sortByCoin !== 'All' && sortByType == 'All') {
        return history?.filter((order) => order.name === sortByCoin) || [];
    } else if (sortByCoin == 'All' && sortByType !== 'All') {
        return history?.filter((order) => order.type === sortByType) || [];
    } else if (sortByCoin !== 'All' && sortByType !== 'All') {
        return history?.filter((order) => order.name === sortByCoin).filter((order) => order.type === sortByType) || [];
    } else if (sortByCoin == 'All' || sortByType == 'All') {
        return history;
    } else {
        return history;
    }
};
