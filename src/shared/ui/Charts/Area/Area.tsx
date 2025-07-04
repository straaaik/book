import { classNames } from '../../../lib/ClassNames/ClassNames';
import cls from './Area.module.scss';
import { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Skeleton } from '../../Skeleton/Skeleton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface AreaProps {
    className?: string;
    isLoading?: boolean;
}

export const Area = memo(({ className, isLoading }: AreaProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.Area, {}, [className])}>
                <Skeleton height={200} width={300} />
            </div>
        );
    }

    const bgSecondary = window.getComputedStyle(document.body).getPropertyValue('--bg-secondary-color');
    const warnColor = window.getComputedStyle(document.body).getPropertyValue('--warn-color');

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'point',
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: bgSecondary,
                },
                stacked: true,
            },
            y: {
                grid: {
                    color: bgSecondary,
                },
                stacked: true,
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data: ChartData<'line'> = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: [100, 200, 300, 230, 280, 0, 199],
                borderColor: warnColor,
                backgroundColor: 'transparent',
                pointBorderWidth: 5,
                tension: 0.4,
                spanGaps: true,
            },
        ],
    };

    return (
        <div className={classNames(cls.Area, {}, [className])}>
            <Line data={data} options={options} />
        </div>
    );
});
