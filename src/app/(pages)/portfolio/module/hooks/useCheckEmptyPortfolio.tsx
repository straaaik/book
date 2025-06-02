import { useAppSelector } from '@/app/config/store/hooks';

export const useCheckEmptyPortfolio = () => {
    const portfolio = useAppSelector((state) => state.portfolio.data);
    const activePortfolio = useAppSelector((state) => state.portfolioPage.active);

    if (!portfolio?.length) return false;
    if (activePortfolio == 'Overview') return true;
    return portfolio.some((item) => item.portfolio_name === activePortfolio);
};
