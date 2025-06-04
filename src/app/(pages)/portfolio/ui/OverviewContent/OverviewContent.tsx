import { useState } from 'react';
import { CoinTablePortfolio } from './ui/CoinTablePortfolio/CoinTablePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import cls from './OverviewContent.module.scss';
import { CoinHistory } from './ui/CoinHistory/CoinHistory';

export const OverviewContent = () => {
    const [selectCoin, setSelectCoin] = useState<string | null>(null);

    return (
        <div className={cls.OverviewContent}>
            {selectCoin ? (
                <CoinHistory setSelectCoin={setSelectCoin} coinId={selectCoin} />
            ) : (
                <>
                    <PortfolioChart />
                    <NewTransaction className={cls.btnNewTransaction} />
                    <CoinTablePortfolio onClick={setSelectCoin} />
                </>
            )}
        </div>
    );
};
