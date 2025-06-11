import { createAppSelector } from '@/app/config/store/hooks';
import { getPortfolio } from './getPortfolio';

export const getAllCoins = createAppSelector(getPortfolio, (portfolio) => {
    const allCoins = portfolio.map((coin) => ({
        name: coin.name,
        image: coin.image,
    }));

    return allCoins;
});
