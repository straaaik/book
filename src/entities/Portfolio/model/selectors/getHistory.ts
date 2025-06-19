import { createAppSelector } from '@/shared/hooks/hooks';
import { getActivePortfolio } from './getActivePortfolio';
import { HistoryCoin, Portfolio } from '../../types/types';

export const getHistory = createAppSelector([getActivePortfolio, (_, coinId?: string) => coinId], (portfolio, coinId) => {
    const merge = (item: Portfolio) => {
        const addOrder = (order: HistoryCoin, type: 'buy' | 'sell') => ({
            ...order,
            type,
            name: item.name,
            symbol: item.symbol,
            image: item.image,
            id_coin: item.id,
            portfolio_name: item.portfolio_name,
        });

        const buyOrders = item.buy?.map((order) => addOrder(order, 'buy'));
        const sellOrders = item.sell?.map((order) => addOrder(order, 'sell'));

        const orders = [...buyOrders, ...sellOrders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return orders;
    };

    if (coinId) {
        const coins = portfolio.filter((coin) => coin.name === coinId);
        if (!coins) return null;

        if (Array.isArray(coins)) {
            return coins.flatMap((coin) => {
                return merge(coin);
            });
        }
        return merge(coins);
    } else {
        return portfolio.flatMap((coin) => {
            return merge(coin);
        });
    }
});

export type OrderInfo = NonNullable<ReturnType<typeof getHistory>>;
export type Order = OrderInfo[number];
