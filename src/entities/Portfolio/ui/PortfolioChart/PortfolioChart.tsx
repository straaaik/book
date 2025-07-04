'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioChart.module.scss';
import { CharDoughnut } from '@/shared/ui/Charts/Doughnut/Doughnut';
import { StackedBar } from '@/shared/ui/Charts/StackedBar/StackedBar';
import { Area } from '@/shared/ui/Charts/Area/Area';
import { Portfolio } from '../../types/types';

interface PortfolioChartProps {
    className?: string;
    portfolio?: Portfolio[];
    isLoading?: boolean;
}

export const PortfolioChart = ({ className, portfolio, isLoading }: PortfolioChartProps) => {
    if (isLoading || !portfolio)
        return (
            <div className={classNames(cls.PortfolioChart, {}, [className])}>
                <StackedBar isLoading={true} />
                <Area isLoading={true} />
                <CharDoughnut isLoading={true} className={cls.doughnut} />
            </div>
        );

    const sortedPortfolio = portfolio?.toSorted((a, b) => b.holdings_coin * b.current_price - a.holdings_coin * a.current_price);
    const coinNames = sortedPortfolio?.map((coin) => coin.name);
    const coinPrices = sortedPortfolio?.map((coin) => coin.holdings_coin * coin.current_price);
    const portfolioPrice = coinPrices.reduce((acc, item) => acc + item, 0);
    const percentagesCoins = coinPrices.map((item) => (item / portfolioPrice) * 100);
    const dataDoughnut = [...percentagesCoins.slice(0, 5), percentagesCoins.slice(5).length ? percentagesCoins.slice(5).reduce((acc, item) => acc + item) : 0];
    const labelsDoughnut = coinNames.length > 5 ? [...coinNames.slice(0, 5), 'Other coins'] : coinNames;

    const dataStackedBar = sortedPortfolio.map((coin) => coin.profit_loss_percentage);

    return (
        <div className={classNames(cls.PortfolioChart, {}, [className])}>
            <StackedBar data={dataStackedBar} labels={coinNames} />
            <Area />
            <CharDoughnut data={dataDoughnut} labels={labelsDoughnut} className={cls.doughnut} />
        </div>
    );
};
