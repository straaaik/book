import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSorted.module.scss';
import { SortedButton } from '../SortedButton/SortedButton';

interface CoinSortedProps {
    className?: string;
    limit: string;
    setLimit: React.Dispatch<React.SetStateAction<string>>;
}

export const CoinSorted = ({ className, limit, setLimit }: CoinSortedProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(e.target.value);
    };

    return (
        <div className={classNames(cls.coin, {}, [className])}>
            <form className={cls.limitSelect}>
                <select name="limit" id="limit-select" value={limit} onChange={handleChange}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="250">250</option>
                </select>
            </form>
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
