'use client';

import { PortfoliosInfo } from '@/entities/Portfolio';
import cls from './PortfolioPageLayout.module.scss';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { portfolioPageActions } from './model/slice/portfolioPageSlice';

interface ILayout {
    children: React.ReactNode;
}
export const PortfolioPageLayout = ({ children }: ILayout) => {
    const dispatch = useAppDispatch();

    const onClickCardPortfolio = () => {
        dispatch(portfolioPageActions.changeSelectedCoin());
    };

    return (
        <div className={cls.layout}>
            <PortfoliosInfo onClick={onClickCardPortfolio} />
            {children}
        </div>
    );
};

export default PortfolioPageLayout;
