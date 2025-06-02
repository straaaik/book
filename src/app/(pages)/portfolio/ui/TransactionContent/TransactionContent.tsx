import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './TransactionContent.module.scss';
import { TransactionTable } from './ui/TransactionTable/TransactionTable';

interface TransactionContentProps {
    className?: string;
}

export const TransactionContent = ({ className }: TransactionContentProps) => {
    return (
        <div className={classNames(cls.TransactionContent, {}, [className])}>
            <TransactionTable />
        </div>
    );
};
