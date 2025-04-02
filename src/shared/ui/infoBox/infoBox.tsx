import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './infoBox.module.scss';
import { Text } from '@/shared/ui/animation/text/Text';

interface infoBoxProps {
    className?: string;
    data: [string, string];
    secondData?: [string, string];
}

export const InfoBox = ({ className, data, secondData }: infoBoxProps) => {
    return (
        <div className={classNames(cls.infoBox, {}, [className])}>
            <div className={cls.firstBlock}>
                <div className={cls.description}>{data[0]}</div>
                <Text text={data[1]} className={cls.data} />
            </div>

            {secondData && (
                <div className={cls.secondBlock}>
                    <div className={cls.description}>{secondData[0]}</div>
                    <Text text={secondData[1]} className={cls.data} />
                </div>
            )}
        </div>
    );
};
