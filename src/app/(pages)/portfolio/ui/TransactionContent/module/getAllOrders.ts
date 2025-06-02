import { HistoryCoin, Portfolio } from '@/entities/Portfolio';

export interface Order extends HistoryCoin {
    type: 'buy' | 'sell';
    name: string;
    symbol: string;
    image: string;
    id: string;
    portfolio_name: string;
}

export const getAllOrders = (portfolio: Portfolio[]): Order[] => {
    if (!portfolio) return [];

    return portfolio.flatMap((item) => {
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

        return [...buyOrders, ...sellOrders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
};
