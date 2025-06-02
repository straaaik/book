import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioCard.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { Portfolio } from '@/entities/Portfolio';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/app/config/store/hooks';
import { portfolioPageActions } from '../../model/slice/portfolioPageSlice';
interface PortfolioCardProps {
    className?: string;
    name: string;
    portfolio?: Portfolio[];
    Icon?: React.FC | string;
}

export const PortfolioCard = ({ className, name, portfolio, Icon }: PortfolioCardProps) => {
    const dispatch = useAppDispatch();
    const activePortfolio = useAppSelector((state) => state.portfolioPage.active);
    const initialCapital = portfolio?.reduce((acc, coin) => acc + coin.purchase_price, 0) || 0;
    const capital = portfolio?.reduce((acc, coin) => acc + coin.current_price * coin.holdings_coin, 0) || 0;
    const changesPricePercentage = ((capital - initialCapital) / initialCapital) * 100;

    const onHandlerClick = (name: string) => {
        dispatch(portfolioPageActions.setActivePortfolio(name));
    };

    return (
        <motion.div
            animate={{ border: activePortfolio == name ? '1px dotted var(--warn-color)' : '1px dotted var(--bg-secondary-color)' }}
            whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }}
            onClick={() => onHandlerClick(name)}
            className={classNames(cls.PortfolioCard, {}, [className])}
        >
            <div className={cls.main}>
                <div className={cls.name_Portfolio}>{name}</div>
                <div className={cls.price_Portfolio}>
                    <TextNumber text={capital} format="currencyRounded" />
                </div>
                <div className={cls.price_change_Portfolio}>
                    <TextNumber text={changesPricePercentage} format="percentages" highlight />
                </div>
            </div>

            <div className={cls.icon}>{Icon && <Icon />}</div>
        </motion.div>
    );
};
