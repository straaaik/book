import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioCard.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { Portfolio } from '@/entities/Portfolio';
import { motion } from 'motion/react';
interface PortfolioCardProps {
    className?: string;
    name: string;
    portfolio?: Portfolio[];
    active?: string;
    setActive?: (arg: string) => void;
    Icon?: React.FC | string;
}

export const PortfolioCard = ({ className, name, portfolio, active, setActive, Icon }: PortfolioCardProps) => {
    const initialCapital = portfolio?.reduce((acc, coin) => acc + coin.purchase_price, 0) || 0;
    const capital = portfolio?.reduce((acc, coin) => acc + coin.current_price * coin.holdings_coin, 0) || 0;
    const changesPricePercentage = ((capital - initialCapital) / initialCapital) * 100;

    return (
        <motion.div
            animate={{ border: active == name ? '1px dotted var(--warn-color)' : '1px dotted var(--bg-secondary-color)' }}
            whileHover={{ backgroundColor: 'var(--bg-secondary-color)' }}
            onClick={() => setActive?.(name)}
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
