'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { useUpdatePortfolio } from '@/shared/hooks/useUpdatePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import { PortfoliosInfo } from './ui/PortfoliosInfo/PortfoliosInfo';
import { PortfolioList } from './ui/PortfolioList/PortfolioList';
import { useAppSelector } from '@/app/config/store/hooks';
import { portfolioApi } from '@/entities/Portfolio';
import { LoadingSpinner } from '../_loading/loading';
import { useState } from 'react';
import { CreatePortfolioPage } from './ui/CreatePortfolioPage/CreatePortfolioPage';

const Portfolio = () => {
    useUpdatePortfolio();
    const portfolio = useAppSelector((state) => state.portfolio.data);
    const { data: portfolioNames, isLoading } = portfolioApi.useGetPortfolioNamesQuery();
    const [activePortfolio, setActivePortfolio] = useState<string>('Overview');

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className={classNames(cls.Portfolio, {}, [])}>
            {portfolioNames?.length ? (
                <>
                    <div className={cls.info_Portfolio}>
                        <PortfoliosInfo portfolio={portfolio} active={activePortfolio} setActive={setActivePortfolio} />
                    </div>
                    <div className={cls.chart}>
                        <PortfolioChart />
                    </div>
                    <div className={cls.holdings}>
                        <div className={cls.actions_container}>
                            <NewTransaction active={activePortfolio} />
                        </div>
                        <div>
                            <PortfolioList active={activePortfolio} portfolio={portfolio} />
                        </div>
                    </div>
                </>
            ) : (
                <CreatePortfolioPage />
            )}
        </div>
    );
};

export default Portfolio;
