'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfoliosInfo.module.scss';
import { CreatePortfolio } from '../../CreatePortfolio/ui/CreatePortfolio';
import { PortfolioCard } from './PortfolioCard/PortfolioCard';
import { useGetPortfoliosInfoQuery } from '../../../model/endpoints/getPortfolioInfo';
import { OVERVIEW } from '@/shared/constant/constant';
import { IPortfoliosInfo } from '../../../types/types';

interface PortfolioInfoProps {
    className?: string;
}

export const PortfoliosInfo = ({ className }: PortfolioInfoProps) => {
    const { data: portfolioInfo, isLoading } = useGetPortfoliosInfoQuery();

    const overviewInfo: IPortfoliosInfo = {
        id: OVERVIEW,
        initial_price: portfolioInfo?.reduce((acc, item) => item?.initial_price + acc, 0) || 0,
        price: portfolioInfo?.reduce((acc, item) => item?.price + acc, 0) || 0,
    };

    if (isLoading)
        return (
            <div className={classNames(cls.PortfolioInfo, {}, [className])}>
                <PortfolioCard isLoading={true} />
                <PortfolioCard isLoading={true} />
                <PortfolioCard isLoading={true} />
            </div>
        );

    return (
        <div className={classNames(cls.PortfolioInfo, {}, [className])}>
            <PortfolioCard portfolio={overviewInfo} />
            <div className={cls.userPortfolio}>
                {portfolioInfo?.map((item) => (
                    <PortfolioCard portfolio={item} key={item.id} />
                ))}
            </div>

            <div className={cls.btn_wrapper}>
                <CreatePortfolio className={cls.btnAdd} />
            </div>
        </div>
    );
};
