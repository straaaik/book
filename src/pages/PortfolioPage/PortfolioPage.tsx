'use client';

import { useGetPortfolioNamesQuery, useUpdatePortfolio } from '@/entities/Portfolio';
import { useState } from 'react';
import { CreatePortfolioPage } from './ui/CreatePortfolioPage/CreatePortfolioPage';
import { PortfolioEmpty } from './ui/PortfolioEmpty/PortfolioEmpty';
import { useCheckEmptyPortfolio } from './hooks/useCheckEmptyPortfolio';
import { PortfolioNav } from './ui/PortfolioNav/PortfolioNav';
import { OverviewContent } from './ui/OverviewContent/OverviewContent';
import { TransactionContent } from './ui/TransactionContent/TransactionContent';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner/LoadingSpinner';

export enum Content {
    TRANSACTION = 'Transaction',
    OVERVIEW = 'Overview',
}

export const PortfolioPage = () => {
    useUpdatePortfolio(); // Обновление портфолио
    const { data: portfolioNames, isLoading } = useGetPortfolioNamesQuery();
    const [content, setContent] = useState<string>(Content.OVERVIEW);
    const checkRender = useCheckEmptyPortfolio();

    if (isLoading) return <LoadingSpinner />;
    if (!portfolioNames?.length) return <CreatePortfolioPage />;
    if (!checkRender) return <PortfolioEmpty />;

    const renderContent = () => {
        switch (content) {
            case Content.OVERVIEW:
                return <OverviewContent />;
            case Content.TRANSACTION:
                return <TransactionContent />;
            default:
                return <div>ERROR</div>;
        }
    };

    return (
        <div>
            <PortfolioNav setContent={setContent} content={content} />
            {renderContent()}
        </div>
    );
};
