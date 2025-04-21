'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { Text } from '@/shared/ui/Text/Text';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
// import { Line } from 'react-chartjs-2';
import { Button } from '@/shared/ui/Button/Button';
import { LoadingSpinner } from '../_loading/loading';
import { portfolioApi } from '@/entities/Portfolio';
import { NewTransaction } from '@/features';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const labels = [1, 2, 3, 4, 5, 6];

export const data = {
    labels,
    datasets: [
        {
            data: [12313, 12500, 12300, 11900, 12182, 12492],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointBorderWidth: 5,
            cubicInterpolationMode: 'monotone',
        },
    ],
};

interface portfolioProps {
    className?: string;
}

const Portfolio = ({ className }: portfolioProps) => {
    const { data: portfolio, error, isLoading } = portfolioApi.useGetPortfolioQuery();

    if (isLoading) return <LoadingSpinner />;
    if (error) return;

    return (
        <div className={classNames(cls.Portfolio, {}, [className])}>
            <div className={cls.info_Portfolio}>
                <div className={cls.name_Portfolio}>
                    {portfolio?.map((item) => (
                        <div key={item.id}>{item.id}</div>
                    ))}
                </div>
                <div className={cls.price_Portfolio}>
                    <Text text={123123} currency />
                </div>
                <div className={cls.price_change_Portfolio}>-256</div>
            </div>
            <div className={cls.chart}>
                ТЕСТОВАЯ ТАБЛИЦА
                <div>
                    <Button>History</Button>
                </div>
                {/* <Line data={data} /> */}
            </div>
            <div className={cls.holdings}>
                <NewTransaction />
                {/* <CoinSorted /> */}
                {true ? (
                    portfolio?.map(({ id, amounts, prices }) => (
                        <div className={cls.coin} key={id}>
                            <div>{id}</div>
                            {/* <div>{amounts.reduce((acc, i) => acc + i)}</div>
                            <div>{prices.reduce((acc, i) => acc + i)}</div> */}
                        </div>
                    ))
                ) : (
                    <div className={cls.empty}>Your portfolio is empty</div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
