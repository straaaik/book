import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioChart.module.scss';
import { CharDoughnut } from '@/shared/ui/Charts/Doughnut/Doughnut';
import { useAppSelector } from '@/app/config/store/hooks';

interface PortfolioChartProps {
    className?: string;
    active: string;
}

export const PortfolioChart = ({ className, active }: PortfolioChartProps) => {
    const portfolioData = useAppSelector((state) => state.portfolio.data);
    const activePortfolio = (() => {
        if (active == 'Overview') return portfolioData;
        return portfolioData?.filter((item) => item.portfolio_name == active);
    })();

    const coinName = activePortfolio?.map((coin) => coin.name);
    const amountCoin = activePortfolio?.map((coin) => coin.holdings_coin * coin.current_price);

    const data = {
        labels: coinName,
        datasets: [
            {
                data: amountCoin,
                backgroundColor: [
                    'rgb(0, 173, 181)',
                    'rgb(255, 46, 99)',
                    'rgb(157, 192, 139)',
                    'rgb(162, 123, 92)',
                    'rgb(192, 108, 132)',
                    'rgb(96, 153, 102)',
                    'rgb(138, 129, 124)',
                ],
                borderColor: 'transparent',
            },
        ],
    };
    return (
        <div className={classNames(cls.PortfolioChart, {}, [className])}>
            <CharDoughnut data={data} />
        </div>
    );
};
