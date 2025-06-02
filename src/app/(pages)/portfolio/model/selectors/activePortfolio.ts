import { createAppSelector } from '@/app/config/store/hooks';

export const getActivePortfolio = createAppSelector([(state) => state.portfolio.data, (state) => state.portfolioPage.active], (portfolio, active) => {
    if (active === 'Overview') {
        return portfolio;
    } else {
        return portfolio.filter((coin) => coin.portfolio_name === active);
    }
});
