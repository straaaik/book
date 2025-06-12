import { createAppSelector } from '@/shared/hooks/hooks';
import { getPortfolio } from './getPortfolio';

export const getAllCoins = createAppSelector(getPortfolio, (portfolio) => {
    const allCoins = portfolio.map((coin) => ({
        name: coin.name,
        image: coin.image,
    }));

    return allCoins;
});
