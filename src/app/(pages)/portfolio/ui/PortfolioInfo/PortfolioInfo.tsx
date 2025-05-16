import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { useAppSelector } from '@/app/config/store/hooks';

interface PortfolioInfoProps {
    className?: string;
}

export const PortfolioInfo = ({ className }: PortfolioInfoProps) => {
    const portfolio = useAppSelector((state) => state.portfolio.data);
    const initialCapital = portfolio?.reduce((acc, coin) => acc + coin.purchase_price, 0);
    const capital = portfolio?.reduce((acc, coin) => acc + coin.current_price * coin.holdings_coin, 0);
    const changesPricePercentage = ((capital - initialCapital) / initialCapital) * 100;
    return (
        <div className={classNames(cls.PortfolioInfo, {}, [className])}>
            <div className={cls.name_Portfolio}>Main</div>
            <div className={cls.price_Portfolio}>
                <TextNumber text={capital} format="currencyRounded" />
            </div>
            <div className={cls.price_change_Portfolio}>
                <TextNumber text={changesPricePercentage} format="percentages" highlight />
            </div>
        </div>
    );
};
