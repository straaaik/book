'use client';

import { TransactionHistory, useUpdatePortfolio } from '@/entities/Portfolio';
import { PortfolioNav } from './ui/PortfolioNav/PortfolioNav';
import { Content } from './types/types';
import { useAppSelector } from '@/shared/hooks/hooks';
import { getContent } from './model/selectors/portfolioPageSelectors';
import { OverviewContent } from './ui/OverviewContent/OverviewContent';

export const PortfolioPage = () => {
    useUpdatePortfolio(); // Обновление портфолио
    const content = useAppSelector(getContent);
    const renderContent = () => {
        switch (content) {
            case Content.OVERVIEW:
                return <OverviewContent />;
            case Content.TRANSACTION:
                return <TransactionHistory />;
            default:
                return <div>ERROR</div>;
        }
    };

    return (
        <div>
            <PortfolioNav content={content} />
            {renderContent()}
        </div>
    );
};
