import { portfolioApi } from '@/entities/Portfolio';
import { ICONS } from '../assets/icon/PortfolioIcons';

export const useIcon = (name: string) => {
    const { data: portfolio } = portfolioApi.useGetPortfolioNamesQuery();

    const iconName = portfolio?.find((item) => item.id == name)?.[name].icon;

    if (!iconName) return null;

    const icon = ICONS.find((item) => item.name == iconName);
    return icon?.icon;
};
