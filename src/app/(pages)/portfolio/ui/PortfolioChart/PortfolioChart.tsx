import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioChart.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { portfolioApi } from '@/entities/Portfolio';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
    className?: string;
}

export const PortfolioChart = ({ className }: PortfolioChartProps) => {
    const { data: portfolioData } = portfolioApi.useGetPortfolioQuery();
    const coinName = portfolioData?.map((coin) => coin.name);
    const amountCoin = portfolioData?.map((coin) => coin.holdings_coin);

    const data = {
        labels: coinName,
        datasets: [
            {
                data: amountCoin,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: 'transparent',
            },
        ],
    };
    return (
        <div className={classNames(cls.PortfolioChart, {}, [className])}>
            <Doughnut className={cls.doughnut} data={data} />
        </div>
    );
};
