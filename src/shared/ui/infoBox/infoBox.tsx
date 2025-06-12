import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './InfoBox.module.scss';
import { LANG } from '../../constant/constant';

interface infoBoxProps {
    className?: string;
    description: string;
    value: number | string;
    type?: 'currency' | 'percentage' | 'text';
}

export const InfoBox = ({ className, description, value, type = 'text' }: infoBoxProps) => {
    const content = () => {
        switch (type) {
            case 'currency':
                return Intl.NumberFormat(LANG, {
                    style: 'currency',
                    notation: 'standard',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 3,
                }).format(Number(value));
            case 'percentage':
                return `${value}%`;
            case 'text':
                return value.toString();
            default:
                return <span>{value}</span>;
        }
    };

    return (
        <div className={classNames(cls.infoBox, {}, [className])}>
            <div className={cls.description}>{description}</div>
            <div className={cls.value}>{content()}</div>
        </div>
    );
};
