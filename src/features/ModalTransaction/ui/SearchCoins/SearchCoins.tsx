import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Input } from '@/shared/ui/Input/Input';
import cls from './SearchCoins.module.scss';
import { useState } from 'react';
import { useDebounceSearch } from '@/shared/hooks/useDebounceSearch';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { Coins } from './ui/Coins/Coins';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface SelectCoinProps {
    className?: string;
    setChooseCoin: (arg: CoinsListWithMarketData) => void;
}

export const SearchCoins = ({ className, setChooseCoin }: SelectCoinProps) => {
    const [value, setValue] = useState('');
    const { response: dataCoins, isFetching } = useDebounceSearch(value);

    return (
        <div className={classNames(cls.SelectCoin, {}, [className])}>
            <div className={cls.title}>
                <Input className={cls.input} value={value} onChange={setValue} placeholder="Search..." />
            </div>
            {!isFetching ? <Coins setChooseCoin={setChooseCoin} dataCoins={dataCoins} /> : <Skeleton className={cls.skeleton} value={8} />}
        </div>
    );
};
