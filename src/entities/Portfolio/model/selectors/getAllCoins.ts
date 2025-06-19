import { createAppSelector } from '@/shared/hooks/hooks';
import { getPortfolio } from './getPortfolio';
import { OVERVIEW } from '@/shared/constant/constant';

export const getAllCoins = createAppSelector([getPortfolio, (_, portfolioName: string) => portfolioName], (portfolio, portfolioName) => {
    if (portfolioName == OVERVIEW) {
        const allCoins = portfolio.map((coin) => ({
            name: coin.name,
            image: coin.image,
        }));

        return allCoins;
    } else {
        const currentPortfolio = portfolio.filter((coin) => coin.portfolio_name == portfolioName);

        return currentPortfolio.map((coin) => ({
            name: coin.name,
            image: coin.image,
        }));
    }
});
