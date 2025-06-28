import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioEmpty.module.scss';
import { PiHandCoinsDuotone } from 'react-icons/pi';
import { NewTransaction } from '@/entities/Portfolio';

interface PortfolioEmptyProps {
    className?: string;
}

export const PortfolioEmpty = ({ className }: PortfolioEmptyProps) => {
    return (
        <div className={classNames(cls.PortfolioEmpty, {}, [className])}>
            <PiHandCoinsDuotone className={cls.icon} />
            <div className={cls.title}>This portfolio is empty...</div>
            <div className={cls.description}>Add a coin to get started</div>
            <NewTransaction />
        </div>
    );
};
