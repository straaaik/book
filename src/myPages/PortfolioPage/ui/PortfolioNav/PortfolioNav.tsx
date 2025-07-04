import { NavigationMenu } from '@/shared/ui/NavigationMenu/NavigationMenu';
import cls from './PortfolioNav.module.scss';
import { Content } from '../../types/types';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { portfolioPageActions } from '../../model/slice/portfolioPageSlice';

interface PortfolioNavProps {
    content: string;
}

interface ButtonContent {
    label: string;
    content: Content;
}

export const PortfolioNav = ({ content }: PortfolioNavProps) => {
    const dispatch = useAppDispatch();

    const onChangeContent = (content: Content) => {
        dispatch(portfolioPageActions.changeContent(content));
        dispatch(portfolioPageActions.changeSelectedCoin());
    };

    const ButtonContent: ButtonContent[] = [
        { label: 'Overview', content: Content.OVERVIEW },
        { label: 'Transaction', content: Content.TRANSACTION },
    ];

    return <NavigationMenu className={cls.PortfolioNav} labels={ButtonContent} activeContent={content} setContent={onChangeContent} />;
};
