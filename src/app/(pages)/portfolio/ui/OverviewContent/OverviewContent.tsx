import { useState } from 'react';
import { CoinTablePortfolio } from './ui/CoinTablePortfolio/CoinTablePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import cls from './OverviewContent.module.scss';
import { CoinHistory } from './ui/CoinHistory/CoinHistory';
import { useAppSelector } from '@/app/config/store/hooks';
import { getActivePortfolio } from '@/entities/Portfolio';

export const OverviewContent = () => {
    const [selectCoin, setSelectCoin] = useState<string | null>(null);
    const activePortfolio = useAppSelector(getActivePortfolio);

    return (
        <div className={cls.OverviewContent}>
            {selectCoin ? (
                <CoinHistory setSelectCoin={setSelectCoin} coinId={selectCoin} />
            ) : (
                <>
                    <PortfolioChart portfolio={activePortfolio} />
                    <NewTransaction className={cls.btnNewTransaction} />
                    <CoinTablePortfolio portfolio={activePortfolio} onClick={setSelectCoin} />
                </>
            )}
        </div>
    );
};
