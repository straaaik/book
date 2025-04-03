import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSorted.module.scss';
import { SortedButton } from '../SortedButton/SortedButton';

interface CoinSortedProps {
    className?: string;
}

export const CoinSorted = ({ className }: CoinSortedProps) => {
    return (
        <div className={classNames(cls.coin, {}, [className])}>
            <div className={cls.market_cap_rank}>
                <SortedButton item="market_cap_rank">#</SortedButton>
            </div>
            <div className={cls.name}>
                <SortedButton item="name">Name</SortedButton>
            </div>
            <div className={cls.current_price}>
                <SortedButton item="current_price">Price</SortedButton>
            </div>
            <div className={cls.price_change_percentage_24h}>
                <SortedButton item="price_change_percentage_24h">24h %</SortedButton>
            </div>
            <div className={cls.market_cap}>
                <SortedButton item="market_cap">MarketCap</SortedButton>
            </div>
        </div>
    );
};
