import { Portfolio } from '@/entities/Portfolio';

export const checkEmptyPortfolio = (portfolio: Portfolio[], activePortfolio: string) => {
    if (!portfolio?.length) return false;
    if (activePortfolio == 'Overview') return true;
    return portfolio.some((item) => item.portfolio_name === activePortfolio);
};
