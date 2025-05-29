import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinsTable.module.scss';

interface IPortfolioList {
    className?: string;
    head?: React.ReactNode;
    main?: React.ReactNode;
}

export const CoinsTable = ({ head, main, className }: IPortfolioList) => {
    return (
        <div className={cls.wrapper}>
            <table className={classNames(cls.CoinTablePortfolio, {}, [className])}>
                <thead className={cls.tableHead}>{head}</thead>
                <tbody className={cls.tableBody}>{main}</tbody>
            </table>
        </div>
    );
};
