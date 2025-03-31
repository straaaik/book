import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinSorted.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { CoinData } from '@/shared/types/types';
import { SortedButton } from './ui/SortedButton';

interface CoinSortedProps {
    className?: string;
    data: CoinData[];
    set: Dispatch<SetStateAction<CoinData[]>>;
}

export const CoinSorted = ({ className, data, set }: CoinSortedProps) => {
    return (
        <div className={classNames(cls.coin, {}, [className])}>
            <div className={cls.market_cap_rank}>
                <SortedButton set={set} data={data} item={'market_cap_rank'}>
                    #
                </SortedButton>
            </div>
            <div className={cls.name}>
                <SortedButton set={set} data={data} item={'name'}>
                    Name
                </SortedButton>
            </div>

            <div className={cls.current_price}>
                <SortedButton set={set} data={data} item={'current_price'}>
                    Price
                </SortedButton>
            </div>
            <div className={cls.price_change_percentage_24h}>
                <SortedButton set={set} data={data} item={'price_change_percentage_24h'}>
                    24h %
                </SortedButton>
            </div>
            <div className={cls.market_cap}>
                <SortedButton set={set} data={data} item={'market_cap'}>
                    MarketCap
                </SortedButton>
            </div>
        </div>
    );
};
