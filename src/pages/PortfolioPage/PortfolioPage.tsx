'use client';

import { useUpdatePortfolio } from '@/entities/Portfolio';
import { useState } from 'react';
import { PortfolioNav } from './ui/PortfolioNav/PortfolioNav';
import { OverviewContent } from './ui/OverviewContent/OverviewContent';
import { TransactionContent } from './ui/TransactionContent/TransactionContent';

export enum Content {
    TRANSACTION = 'Transaction',
    OVERVIEW = 'Overview',
}

export const PortfolioPage = () => {
    useUpdatePortfolio(); // Обновление портфолио
    const [content, setContent] = useState<string>(Content.OVERVIEW);

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
