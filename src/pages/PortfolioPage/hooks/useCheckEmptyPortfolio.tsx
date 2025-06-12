import { useAppSelector } from '@/shared/hooks/hooks';
import { getActive, getPortfolio } from '@/entities/Portfolio';

export const useCheckEmptyPortfolio = () => {
    const portfolio = useAppSelector(getPortfolio);
    const activePortfolio = useAppSelector(getActive);

    if (!portfolio?.length) return false;
    if (activePortfolio == 'Overview') return true;
    return portfolio.some((item) => item.portfolio_name === activePortfolio);
};
