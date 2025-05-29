import { ICONS } from '../assets/icon/PortfolioIcons';

export const useIcon = () => {
    return (name?: string) => {
        const icon = ICONS.find((item) => item.name == name);
        return icon?.icon;
    };
};
