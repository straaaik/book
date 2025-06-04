import { createAppSelector } from '@/app/config/store/hooks';
import { getActivePortfolio } from './getActivePortfolio';
import { HistoryCoin, Portfolio } from '../../types/types';

export const getHistory = (coinId?: string) =>
    createAppSelector(getActivePortfolio, (portfolio) => {
        const merge = (item: Portfolio) => {
            const addOrder = (order: HistoryCoin, type: 'buy' | 'sell') => ({
                ...order,
                type,
                name: item.name,
                symbol: item.symbol,
                image: item.image,
                id: item.id,
                portfolio_name: item.portfolio_name,
            });

            const buyOrders = item.buy?.map((order) => addOrder(order, 'buy'));
            const sellOrders = item.sell?.map((order) => addOrder(order, 'sell'));

            const orders = [...buyOrders, ...sellOrders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            return orders;
        };

        if (coinId) {
            const coin = portfolio.find((coin) => coin.id === coinId);
            if (!coin) return null;
            return merge(coin);
        } else {
            return portfolio.flatMap((coin) => {
                return merge(coin);
            });
        }
    });

export type OrderInfo = NonNullable<ReturnType<ReturnType<typeof getHistory>>>;
