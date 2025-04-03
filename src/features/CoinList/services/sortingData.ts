import { CoinData } from '@/shared/types/types';

export const sortingData = (data: CoinData[], status: number, item: keyof CoinData) => {
    const sortData = data;
    if (status == 0) {
        if (item == 'name') {
            return sortData.sort((a, b) => {
                if (a[item].toUpperCase() > b[item].toUpperCase()) return 1;
                if (a[item].toUpperCase() < b[item].toUpperCase()) return -1;
                return 0;
            });
        } else {
            return sortData.sort((a, b) => Number(b[item]) - Number(a[item]));
        }
    }
    if (status == 1) {
        if (item == 'name') {
            return sortData.sort((a, b) => {
                if (a[item].toUpperCase() < b[item].toUpperCase()) return 1;
                if (a[item].toUpperCase() > b[item].toUpperCase()) return -1;
                return 0;
            });
        } else {
            return sortData.sort((a, b) => Number(a[item]) - Number(b[item]));
        }
    }
    if (status == 2) {
        return sortData.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    }
};
