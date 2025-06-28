import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfoliosInfo.module.scss';
import { CreatePortfolio } from '../../CreatePortfolio/ui/CreatePortfolio';
import { PortfolioCard } from './PortfolioCard/PortfolioCard';

import { usePortfolioInfo } from '../../../module/hooks/usePortfolioInfo';

interface PortfolioInfoProps {
    className?: string;
    onClick?: () => void;
}

export const PortfoliosInfo = ({ className, onClick }: PortfolioInfoProps) => {
    const { portfolio: portfolioInfo, isLoading, overview } = usePortfolioInfo();

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
            <PortfolioCard onClick={onClick} portfolio={overview} />
            <div className={cls.userPortfolio}>
                {portfolioInfo?.map((item) => (
                    <PortfolioCard onClick={onClick} portfolio={item} key={item.id} />
                ))}
            </div>

            <div className={cls.btn_wrapper}>
                <CreatePortfolio className={cls.btnAdd} />
            </div>
        </div>
    );
};
