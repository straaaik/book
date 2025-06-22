import { useState } from 'react';
import { CoinTablePortfolio } from './ui/CoinTablePortfolio/CoinTablePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import cls from './OverviewContent.module.scss';
import { CoinHistory } from './ui/CoinHistory/CoinHistory';
import { useAppSelector } from '@/shared/hooks/hooks';
import { getActivePortfolio } from '@/entities/Portfolio';

export const OverviewContent = () => {
    const [selectCoin, setSelectCoin] = useState<string | null>(null);
    const { portfolio, isLoading, error } = useAppSelector(getActivePortfolio);

    if (Boolean(error?.length))
        return (
            <div className={cls.OverviewContent}>
                {error?.map((e, i) => (
                    <div key={i}>{e.error}</div>
                ))}
            </div>
        );

    return (
        <div className={cls.OverviewContent}>
            {selectCoin ? (
                <CoinHistory setSelectCoin={setSelectCoin} coinId={selectCoin} />
            ) : (
                <>
                    <PortfolioChart isLoading={isLoading} portfolio={portfolio} />
                    <NewTransaction className={cls.btnNewTransaction} />
                    <CoinTablePortfolio isLoading={isLoading} portfolio={portfolio} onClick={setSelectCoin} />
                </>
            )}
        </div>
    );
};
