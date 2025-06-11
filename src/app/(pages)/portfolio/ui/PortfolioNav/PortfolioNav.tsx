import { Dispatch, SetStateAction } from 'react';
import { Content } from '../../page';
import { NavigationMenu } from '@/shared/ui/NavigationMenu/NavigationMenu';
import cls from './PortfolioNav.module.scss';

interface PortfolioNavProps {
    setContent: Dispatch<SetStateAction<string>>;
    content: string;
}

interface ButtonContent {
    label: string;
    content: Content;
}

export const PortfolioNav = ({ setContent, content }: PortfolioNavProps) => {
    const ButtonContent: ButtonContent[] = [
        { label: 'Overview', content: Content.OVERVIEW },
        { label: 'Transaction', content: Content.TRANSACTION },
    ];

    return <NavigationMenu className={cls.PortfolioNav} labels={ButtonContent} activeContent={content} setContent={setContent} />;
};
