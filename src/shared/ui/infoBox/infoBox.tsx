import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './infoBox.module.scss';
import { Text } from '@/shared/ui/animation/text/Text';

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
                <Text text={data[1].toLocaleString()} className={cls.data} />
            </div>

            {secondData && <div className={cls.loader} style={{ width: calcProgressWidth() }}></div>}
            {secondData && (
                <div className={cls.secondBlock}>
                    <div className={cls.description}>{secondData[0]}</div>
                    {secondData[1] ? (
                        <Text text={secondData[1].toLocaleString()} className={cls.data} />
                    ) : (
                        <Text text="Ꝏ" className={cls.data} />
                    )}
                </div>
            )}
        </div>
    );
};
