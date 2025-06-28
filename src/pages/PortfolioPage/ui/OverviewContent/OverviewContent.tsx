import { CoinTablePortfolio } from './ui/CoinTablePortfolio/CoinTablePortfolio';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import cls from './OverviewContent.module.scss';
import { useAppSelector } from '@/shared/hooks/hooks';
import { CoinHistory, NewTransaction } from '@/entities/Portfolio';
import { getSelectedCoin } from '../../model/selectors/portfolioPageSelectors';
import { getActivePortfolio } from '@/entities/Portfolio/model/selectors/getActivePortfolio';

export const OverviewContent = () => {
    const selectCoin = useAppSelector(getSelectedCoin);
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
                <CoinHistory coinInfo={selectCoin} />
            ) : (
                <>
                    <PortfolioChart isLoading={isLoading} portfolio={portfolio} />
                    <NewTransaction className={cls.btnNewTransaction} />
                    <CoinTablePortfolio isLoading={isLoading} portfolio={portfolio} />
                </>
            )}
        </div>
    );
};
