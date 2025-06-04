import { createAppSelector } from '@/app/config/store/hooks';
import { getActive } from './getActive';
import { getPortfolio } from './getPortfolio';

export const getActivePortfolio = createAppSelector([getPortfolio, getActive], (portfolio, active) => {
    if (active === 'Overview') {
        return portfolio;
    } else {
        return portfolio.filter((coin) => coin.portfolio_name === active);
    }
});
