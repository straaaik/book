'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { CoinSorted } from '@/features/CoinList/ui/CoinSorted/CoinSorted';
import { Text } from '@/shared/ui/animation/text/Text';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button } from '@/shared/ui/button/Button';
import { CoinInfo } from '@/features/CoinList/ui/CoinInfo/CoinInfo';
import { div } from 'motion/react-client';

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

const portfolioData = [];

const Portfolio = ({ className }: portfolioProps) => {
    return (
        <div className={classNames(cls.Portfolio, {}, [className])}>
            <div className={cls.info_Portfolio}>
                <div className={cls.name_Portfolio}>Total value</div>
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
                <Line data={data} />
            </div>
            <div className={cls.holdings}>
                <Button>Add coin</Button>
                <CoinSorted />
                {portfolioData.lenght ? (
                    portfolioData.map((coin) => (
                        <CoinInfo
                            id={coin.id}
                            key={coin.market_cap_rank}
                            name={coin.name}
                            change24h={coin.price_change_percentage_24h}
                            marketCap={coin.market_cap}
                            price={coin.current_price}
                            rank={coin.market_cap_rank}
                            image={coin.image}
                            symbol={coin.symbol}
                        />
                    ))
                ) : (
                    <div className={cls.empty}>Your portfolio is empty</div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
