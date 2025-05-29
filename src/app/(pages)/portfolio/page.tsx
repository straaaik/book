'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './page.module.scss';
import { useUpdatePortfolio } from '@/shared/hooks/useUpdatePortfolio';
import { NewTransaction } from './ui/NewTransaction/NewTransaction';
import { PortfolioChart } from './ui/PortfolioChart/PortfolioChart';
import { PortfoliosInfo } from './ui/PortfoliosInfo/PortfoliosInfo';
import { useAppSelector } from '@/app/config/store/hooks';
import { portfolioApi } from '@/entities/Portfolio';
import { useState } from 'react';
import { CreatePortfolioPage } from './ui/CreatePortfolioPage/CreatePortfolioPage';
import { CoinTablePortfolio } from './ui/CoinTablePortfolio/CoinTablePortfolio';
import { PortfolioEmpty } from './ui/PortfolioEmpty/PortfolioEmpty';
import { checkEmptyPortfolio } from './module/checkEmptyPortfolio';
import { LoadingSpinner } from '../_loading/loading';
import { CoinHistory } from './ui/CoinHistory/CoinHistory';

const Portfolio = () => {
    useUpdatePortfolio();
    const portfolio = useAppSelector((state) => state.portfolio.data);
    const [activePortfolio, setActivePortfolio] = useState<string>('Overview');
    const [selectCoin, setSelectCoin] = useState<string | null>(null);
    const { data: portfolioNames, isLoading } = portfolioApi.useGetPortfolioNamesQuery();
    const checkRender = checkEmptyPortfolio(portfolio, activePortfolio);

    if (isLoading) return <LoadingSpinner />;
    if (!portfolioNames?.length) return <CreatePortfolioPage />;

    return (
        <div className={classNames(cls.Portfolio, {}, [])}>
            <PortfoliosInfo portfolio={portfolio} active={activePortfolio} setActive={setActivePortfolio} />
            {checkRender ? (
                <>
                    <PortfolioChart active={activePortfolio} />
                    <NewTransaction active={activePortfolio} className={cls.btnNewTransaction} />
                    {selectCoin ? (
                        <CoinHistory setSelectCoin={setSelectCoin} coin={selectCoin} />
                    ) : (
                        <CoinTablePortfolio active={activePortfolio} portfolio={portfolio} onClick={setSelectCoin} />
                    )}
                </>
            ) : (
                <PortfolioEmpty active={activePortfolio} />
            )}
        </div>
    );
};

export default Portfolio;
