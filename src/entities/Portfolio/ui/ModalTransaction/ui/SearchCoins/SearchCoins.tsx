import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Input } from '@/shared/ui/Input/Input';
import cls from './SearchCoins.module.scss';
import { useState } from 'react';
import { useDebounceSearch } from '@/shared/hooks/useDebounceSearch';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Coins } from './ui/Coins/Coins';
import { CoinsListWithMarketData } from '../../../../../Coin/types/types';

interface SelectCoinProps {
    className?: string;
    setChooseCoin: (arg: CoinsListWithMarketData) => void;
}

export const SearchCoins = ({ className, setChooseCoin }: SelectCoinProps) => {
    const [value, setValue] = useState('');
    const { response: dataCoins, isFetching } = useDebounceSearch(value);

    return (
        <div className={classNames(cls.SelectCoin, {}, [className])}>
            <Input className={cls.input} value={value} onChange={setValue} placeholder="Search..." />
            {!isFetching ? <Coins setChooseCoin={setChooseCoin} dataCoins={dataCoins} /> : <Skeleton className={cls.skeleton} value={8} />}
        </div>
    );
};
