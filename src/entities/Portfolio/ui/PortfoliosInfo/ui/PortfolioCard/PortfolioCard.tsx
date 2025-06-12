import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioCard.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useIcon } from '@/shared/hooks/useIcon';
import { FC } from 'react';
import { getActive } from '../../../../model/selectors/getActive';
import { portfolioActions } from '../../../../model/slice/portfolioSlice';
import { IPortfoliosInfo } from '../../../../types/types';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface PortfolioCardProps {
    className?: string;
    portfolio?: IPortfoliosInfo;
    Icon?: FC;
    isLoading?: boolean;
}

export const PortfolioCard = ({ className, portfolio, Icon, isLoading }: PortfolioCardProps) => {
    const dispatch = useAppDispatch();
    const activePortfolio = useAppSelector(getActive);
    const PortfolioIcon = useIcon(portfolio?.id || '');

    const onHandlerClick = (name: string) => {
        dispatch(portfolioActions.setActive(name));
    };

    if (!portfolio) return null;

    if (isLoading) {
        return <Skeleton width={150} height={150} border="12px" />;
    }

    const changesPricePercentage = ((portfolio?.price - portfolio?.initial_price) / portfolio?.initial_price) * 100;

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
                    <TextNumber text={portfolio?.price} format="currencyRounded" />
                </div>
                <div className={cls.price_change_Portfolio}>
                    <TextNumber text={changesPricePercentage} format="percentages" highlight />
                </div>
            </div>

            <div className={cls.icon}>{(PortfolioIcon && <PortfolioIcon />) || (Icon && <Icon />)}</div>
        </motion.div>
    );
};
