import { ICONS } from '../assets/icon/PortfolioIcons';

export const getIcon = (name?: string) => {
    const icon = ICONS.find((item) => item.name == name);
    return icon?.icon;
};
