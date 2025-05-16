'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { PortfolioInfo } from './ui/PortfolioInfo/PortfolioInfo';
import { useUpdatePortfolio } from '@/shared/hooks/useUpdatePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioList } from './ui/PortfolioList/PortfolioList';

const Portfolio = () => {
    useUpdatePortfolio();

    return (
        <div className={classNames(cls.Portfolio, {}, [])}>
            <div className={cls.info_Portfolio}>
                <PortfolioInfo />
            </div>
            <div className={cls.chart}>
                ТЕСТОВАЯ ТАБЛИЦА
                <div>
                    <Button>History</Button>
                </div>
                {/* <Line data={data} /> */}
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
