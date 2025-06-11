'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfoliosInfo.module.scss';
import { PortfolioCard } from '../PortfolioCard/PortfolioCard';
import { useAppSelector } from '@/app/config/store/hooks';
import { CreatePortfolio } from '../CreatePortfolio/CreatePortfolio';
import { useGetPortfolioNamesQuery } from '@/entities/Portfolio';

interface PortfolioInfoProps {
    className?: string;
}

export const PortfoliosInfo = ({ className }: PortfolioInfoProps) => {
    const portfolio = useAppSelector((state) => state.portfolio.data);
    const { data: portfolioNames } = useGetPortfolioNamesQuery();

    if (!portfolioNames?.length) return null;

    return (
        <div className={classNames(cls.PortfolioInfo, {}, [className])}>
            <PortfolioCard portfolio={portfolio} name="Overview" />
            <div className={cls.userPortfolio}>
                {portfolioNames?.map((item) => (
                    <PortfolioCard portfolio={portfolio?.filter((coin) => coin.portfolio_name === item.id)} key={item.id} name={item.id} />
                ))}
            </div>

            <div className={cls.btn_wrapper}>
                <CreatePortfolio className={cls.btnAdd} />
            </div>
        </div>
    );
};
