import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './cardInfo.module.scss';

interface cardInfoProps {
    className?: string;
}

export const cardInfo = ({ className }: cardInfoProps) => {
    return (
        <div className={classNames(cls.cardInfo, {}, [className])}>
            <div>{}</div>
        </div>
    );
};
