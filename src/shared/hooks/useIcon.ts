import { useGetPortfolioNamesQuery } from '@/entities/Portfolio';
import { ICONS } from '../assets/icon/PortfolioIcons';

export const useIcon = (portfolioName: string) => {
    const { data: portfolio } = useGetPortfolioNamesQuery();

    const iconName = portfolio?.find((item) => item.id == portfolioName)?.[portfolioName].icon;

    if (!iconName) return null;

    const icon = ICONS.find((item) => item.name == iconName);
    return icon?.icon;
};
