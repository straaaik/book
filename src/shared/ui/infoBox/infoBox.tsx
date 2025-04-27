import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './infoBox.module.scss';
import { TextNumber } from '../TextNumber/TextNumber';

interface infoBoxProps {
    className?: string;
    data: [string, number];
    secondData?: [string, number];
}

export const InfoBox = ({ className, data, secondData }: infoBoxProps) => {
    const calcProgressWidth = () => {
        const result = (data[1] / secondData![1]) * 100;
        return `${result}%`;
    };

    return (
        <div className={classNames(cls.infoBox, {}, [className])}>
            <div className={cls.firstBlock}>
                <div className={cls.description}>{data[0]}</div>
                <TextNumber text={Number(data[1])} className={cls.data} />
            </div>

            {secondData && <div className={cls.loader} style={{ width: calcProgressWidth() }}></div>}
            {secondData && (
                <div className={cls.secondBlock}>
                    <div className={cls.description}>{secondData[0]}</div>
                    {secondData[1] ? <TextNumber text={Number(secondData[1])} className={cls.data} /> : <div className={cls.data}>Ꝏ</div>}
                </div>
            )}
        </div>
    );
};
