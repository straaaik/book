import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioCard.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { FC } from 'react';
import { getActive } from '../../../../model/selectors/getActive';
import { portfolioActions } from '../../../../model/slice/portfolioSlice';
import { PortfolioInfoState } from '../../../../types/types';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { usePortfolioIcon } from '../../../../module/hooks/usePortfolioIcon';

interface PortfolioCardProps {
    className?: string;
    portfolio?: PortfolioInfoState;
    Icon?: FC;
    isLoading?: boolean;
    onClick?: () => void;
}

export const PortfolioCard = ({ className, portfolio, Icon, isLoading, onClick }: PortfolioCardProps) => {
    const dispatch = useAppDispatch();
    const activePortfolio = useAppSelector(getActive);
    const PortfolioIcon = usePortfolioIcon(portfolio?.id || '');

    const onHandlerClick = (name: string) => {
        dispatch(portfolioActions.setActive(name));
        onClick?.();
    };

    if (isLoading) {
        return <Skeleton width={150} height={150} border="12px" />;
    }

    if (!portfolio) return null;

    const costPortfolio = portfolio.cost;

    const changesPricePercentage = portfolio.profit_loss_percentage;

    return (
        <motion.div
            animate={{ border: activePortfolio == portfolio?.id ? '1px dotted var(--warn-color)' : '1px dotted var(--bg-secondary-color)' }}
            whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }}
            onClick={() => onHandlerClick(portfolio.id)}
            className={classNames(cls.PortfolioCard, {}, [className])}
        >
            <div className={cls.main}>
                <div className={cls.name_Portfolio}>{portfolio?.id}</div>
                <div className={cls.price_Portfolio}>
                    <TextNumber text={costPortfolio} format="currencyRounded" />
                </div>
                <div className={cls.initialPrice}>
                    <TextNumber text={portfolio.initialCost} format="currencyRounded" />
                </div>
                <div className={cls.price_change_Portfolio}>
                    <TextNumber text={changesPricePercentage} format="percentages" highlight />
                </div>
            </div>

            <div className={cls.icon}>{(PortfolioIcon && <PortfolioIcon />) || (Icon && <Icon />)}</div>
        </motion.div>
    );
};
