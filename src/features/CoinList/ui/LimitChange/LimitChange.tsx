import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './LimitChange.module.scss';

interface LimitLimitChange {
    className?: string;
}

export const LimitChange = ({ className }: LimitLimitChange) => {
    return <div className={classNames(cls.LimitChange, {}, [className])}></div>;
};
