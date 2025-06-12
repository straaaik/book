import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioEmpty.module.scss';
import { NewTransaction } from '../OverviewContent/ui/NewTransaction/NewTransaction';
import { PiHandCoinsDuotone } from 'react-icons/pi';

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
