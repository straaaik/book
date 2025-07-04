import { classNames } from '../../../lib/ClassNames/ClassNames';
import { Skeleton } from '../../Skeleton/Skeleton';
import { TextNumber } from '../../TextNumber/TextNumber';
import cls from './Doughnut.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

interface DoughnutProps {
    className?: string;
    options?: ChartOptions<'doughnut'>;
    labels?: string[];
    data?: number[];
    isLoading?: boolean;
}

const color = ['#fd993c', '#26495b', '#006837', '#d84689', '#16a3a2', '#4c4c4c'];

export const CharDoughnut = ({ className, labels, data, options, isLoading }: DoughnutProps) => {
    if (isLoading || !data?.length || !labels?.length) {
        return (
            <div className={classNames(cls.Doughnut, {}, [className])}>
                <Skeleton border="12px" width={200} height={200} />
                <Skeleton border="50%" width={300} height={300} />
            </div>
        );
    }

    const defaultOptions: ChartOptions<'doughnut'> = {
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
                        if (context.parsed !== null) {
                            label += context.parsed.toFixed(3) + ' %';
                        }
                        return label;
                    },
                },
            },
        },
    };

    const defaultData: ChartData<'doughnut'> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: color,
                borderColor: 'transparent',
                borderRadius: 5,
                spacing: 3,
                hoverOffset: 10,
            },
        ],
    };

    return (
        <div className={classNames(cls.Doughnut, {}, [className])}>
            <div className={cls.wrapperLabels}>
                {labels.map((label, i) => (
                    <div className={cls.label} key={i}>
                        <div className={cls.container_name}>
                            <div className={cls.colorBox} style={{ backgroundColor: color[i] }} />
                            <span>{label}</span>
                        </div>

                        <TextNumber text={data[i]} format="percentages" />
                    </div>
                ))}
            </div>
            <div className={cls.wrapperDoughnut}>
                <Doughnut data={defaultData} options={options ? options : defaultOptions} />
            </div>
        </div>
    );
};
