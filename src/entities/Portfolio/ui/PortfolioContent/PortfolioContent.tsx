import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioContent.module.scss';
import { memo } from 'react';
import { CoinHistory } from '../CoinHistory/CoinHistory';
import { CoinTablePortfolio } from '../CoinTablePortfolio/CoinTablePortfolio';
import { NewTransaction } from '../NewTransaction/NewTransaction';
import { PortfolioChart } from '../PortfolioChart/PortfolioChart';
import { CoinDescription } from '../../types/types';
import { getActivePortfolio } from '../../model/selectors/getActivePortfolio';
import { useAppSelector } from '@/shared/hooks/hooks';
import { PortfolioEmpty } from '../PortfolioEmpty/PortfolioEmpty';

interface PortfolioContentProps {
    className?: string;
    selectedCoin?: CoinDescription;
    onClickCoin: (arg?: CoinDescription) => void;
}

export const PortfolioContent = memo(({ className, selectedCoin, onClickCoin }: PortfolioContentProps) => {
    const { portfolio, isLoading } = useAppSelector(getActivePortfolio);

    if (isLoading) {
        return (
            <div className={classNames(cls.PortfolioContent, {}, [className])}>
                <PortfolioChart isLoading={true} />
                <NewTransaction className={cls.btnNewTransaction} />
                <CoinTablePortfolio isLoading={isLoading} />
            </div>
        );
    }

    if (!portfolio.length) {
        return (
            <div className={classNames(cls.PortfolioContent, {}, [className])}>
                <PortfolioEmpty />
            </div>
        );
    }

    return (
        <div className={classNames(cls.PortfolioContent, {}, [className])}>
            {selectedCoin ? (
                <CoinHistory coinInfo={selectedCoin} onClick={onClickCoin} />
            ) : (
                <>
                    <PortfolioChart portfolio={portfolio} />
                    <NewTransaction className={cls.btnNewTransaction} />
                    <CoinTablePortfolio portfolio={portfolio} isLoading={isLoading} onClick={(info) => onClickCoin(info)} />
                </>
            )}
        </div>
    );
});
