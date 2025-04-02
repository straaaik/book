import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSorted.module.scss';
import { SortedButton } from './ui/SortedButton';

interface CoinSortedProps {
    className?: string;
}

export const CoinSorted = ({ className }: CoinSortedProps) => {
    return (
        <div className={classNames(cls.coin, {}, [className])}>
            <div className={cls.market_cap_rank}>
                <SortedButton>#</SortedButton>
            </div>
            <div className={cls.name}>
                <SortedButton>Name</SortedButton>
            </div>

            <div className={cls.current_price}>
                <SortedButton>Price</SortedButton>
            </div>
            <div className={cls.price_change_percentage_24h}>
                <SortedButton>24h %</SortedButton>
            </div>
            <div className={cls.market_cap}>
                <SortedButton>MarketCap</SortedButton>
            </div>
        </div>
    );
};
