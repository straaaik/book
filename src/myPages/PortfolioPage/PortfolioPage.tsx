'use client';

import { CoinDescription, PortfolioContent, PortfoliosInfo, TransactionHistory, useUpdatePortfolio } from '@/entities/Portfolio';
import { PortfolioNav } from './ui/PortfolioNav/PortfolioNav';
import { Content } from './types/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { getContent, getSelectedCoin } from './model/selectors/portfolioPageSelectors';
import { portfolioPageActions } from './model/slice/portfolioPageSlice';
import cls from './PortfolioPage.module.scss';

export const PortfolioPage = () => {
    useUpdatePortfolio(); // Обновление портфолио
    const selectCoin = useAppSelector(getSelectedCoin);
    const dispatch = useAppDispatch();
    const onClickCoin = (info?: CoinDescription) => {
        dispatch(portfolioPageActions.changeSelectedCoin(info));
    };
    const onClickCardPortfolio = () => {
        dispatch(portfolioPageActions.changeSelectedCoin());
    };
    const content = useAppSelector(getContent);
    const renderContent = () => {
        switch (content) {
            case Content.OVERVIEW:
                return <PortfolioContent onClickCoin={onClickCoin} selectedCoin={selectCoin} />;
            case Content.TRANSACTION:
                return <TransactionHistory />;
            default:
                return <div>ERROR</div>;
        }
    };

    return (
        <div className={cls.PortfolioPage}>
            <PortfoliosInfo onClick={onClickCardPortfolio} />
            <PortfolioNav content={content} />
            {renderContent()}
        </div>
    );
};
