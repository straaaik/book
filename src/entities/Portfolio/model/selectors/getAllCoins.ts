import { createAppSelector } from '@/shared/hooks/hooks';
import { getPortfolio } from './getPortfolio';
import { OVERVIEW } from '@/shared/constant/constant';

export const getAllCoins = createAppSelector([getPortfolio, (_, portfolioName: string) => portfolioName], (portfolio, portfolioName) => {
    if (portfolioName == OVERVIEW) {
        const allCoins = portfolio.map((coin) => ({
            name: coin.name,
            image: coin.image,
            symbol: coin.symbol,
        }));

        const uniqueCoins = allCoins.reduce((acc, item) => {
            if (!acc.some((coin) => coin.name === item.name)) {
                acc.push(item);
            }
            return acc;
        }, [] as typeof allCoins);

        return uniqueCoins;
    } else {
        const currentPortfolio = portfolio.filter((coin) => coin.portfolioId == portfolioName);

        return currentPortfolio.map((coin) => ({
            name: coin.name,
            image: coin.image,
            symbol: coin.symbol,
        }));
    }
});
