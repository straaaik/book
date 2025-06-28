import { ICONS } from '../../../../shared/assets/icon/PortfolioIcons';
import { useGetPortfolioQuery } from '../../model/endpoints/getPortfolios';

export const usePortfolioIcon = (portfolioName: string) => {
    const { data: portfolio } = useGetPortfolioQuery();

    const iconName = portfolio?.find((item) => item.id == portfolioName)?.icon;

    if (!iconName) return null;

    const icon = ICONS.find((item) => item.name == iconName);
    return icon?.icon;
};
