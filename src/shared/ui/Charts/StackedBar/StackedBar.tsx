import cls from './StackedBar.module.scss';
import { memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { classNames } from '../../../lib/ClassNames/ClassNames';
import { Skeleton } from '../../Skeleton/Skeleton';

interface StackedBarProps {
    className?: string;
    labels?: string[];
    data?: number[];
    isLoading?: boolean;
}

export const StackedBar = memo(({ className, labels, data, isLoading }: StackedBarProps) => {
    if (isLoading || !data?.length || !labels?.length) {
        return (
            <div className={classNames(cls.StackedBar, {}, [className])}>
                <Skeleton width={300} height={200} />
            </div>
        );
    }

    ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

    const redColor = window.getComputedStyle(document.documentElement).getPropertyValue('--red-color');
    const greenColor = window.getComputedStyle(document.documentElement).getPropertyValue('--green-color');
    const blueColor = window.getComputedStyle(document.documentElement).getPropertyValue('--blue-color');

    const bgSecondary = window.getComputedStyle(document.body).getPropertyValue('--bg-secondary-color');

    const options: ChartOptions<'bar'> = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'point',
                displayColors: false,
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (typeof context.raw === 'number') {
                            label += context.raw.toFixed(3) + ' %';
                        }
                        return label;
                    },
                },
            },
        },
        responsive: true,
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

    const defaultData: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: (context) => {
                    const value = context.raw;

                    if (typeof value == 'number' && value > 0) return greenColor;
                    else if (typeof value == 'number' && value == 0) return blueColor;
                    else return redColor;
                },
                borderRadius: 12,
                minBarLength: 10,
            },
        ],
    };
    return (
        <div className={classNames(cls.StackedBar, {}, [className])}>
            <Bar data={defaultData} options={options} />
        </div>
    );
});
