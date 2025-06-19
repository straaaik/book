import { Coin } from '../types/types';

interface IUpdateInfoCoins {
    holdingCoins: number;
    avgPrice: number;
    purchasePrice: number;
}

export const updateInfoCoins = (portfolio: Coin): IUpdateInfoCoins => {
    const holdingCoins = portfolio.buy.reduce((acc, item) => acc + item.amount, 0) - portfolio.sell.reduce((acc, item) => acc + item.amount, 0);
    const avgPrice = portfolio.buy.reduce((acc, item) => acc + item.price * item.amount, 0) / holdingCoins;
    const purchasePrice = portfolio.buy.reduce((acc, item) => acc + item.amount * item.price, 0);

    return { holdingCoins, avgPrice, purchasePrice };
};
