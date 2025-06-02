import { Coin, HistoryCoin } from '@/entities/Portfolio';

export interface Order extends HistoryCoin {
    type: string;
}

export const mergeOrders = (coin: Coin): Order[] => {
    const buyOrders = coin.buy.map((order) => ({
        ...order,
        type: 'buy',
    }));

    const sellOrders = coin.sell.map((order) => ({
        ...order,
        type: 'sell',
    }));

    return [...sellOrders, ...buyOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
