import { classNames } from '../../../lib/ClassNames/ClassNames';
import cls from './Doughnut.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
    className?: string;
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
}

export const CharDoughnut = ({ className, data, options }: DoughnutProps) => {
    const defaultOptions: ChartOptions<'doughnut'> = {
        plugins: {
            legend: {
                maxHeight: 200,
                maxWidth: 200,
                onClick: () => {},
                align: 'center',
                position: 'right',
                labels: {
                    boxWidth: 16,
                    boxHeight: 16,
                    borderRadius: 10,
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                mode: 'point',
                displayColors: false,
            },
        },
    };

    return (
        <div className={classNames(cls.Doughnut, {}, [className])}>
            <Doughnut data={data} options={options ? options : defaultOptions} />
        </div>
    );
};
