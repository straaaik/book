'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { PortfolioInfo } from './ui/PortfolioInfo/PortfolioInfo';
import { useUpdatePortfolio } from '@/shared/hooks/useUpdatePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioList } from './ui/PortfolioList/PortfolioList';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';

const Portfolio = () => {
    useUpdatePortfolio();

    return (
        <div className={classNames(cls.Portfolio, {}, [])}>
            <div className={cls.info_Portfolio}>
                <PortfolioInfo />
            </div>
            <div className={cls.chart}>
                <PortfolioChart />
            </div>
            <div className={cls.holdings}>
                <div className={cls.actions_container}>
                    <NewTransaction />
                </div>
                <div>
                    <PortfolioList />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
