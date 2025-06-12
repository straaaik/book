import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './Table.module.scss';

interface IPortfolioList {
    className?: string;
    classNameContainer?: string;
    head?: React.ReactNode;
    main?: React.ReactNode;
    title?: string;
}

export const Table = ({ head, main, className, classNameContainer, title }: IPortfolioList) => {
    return (
        <div className={classNames(cls.container, {}, [classNameContainer])}>
            {title && <h1 className={cls.title}>{title}</h1>}
            <div className={cls.wrapper}>
                <table className={classNames(cls.Table, {}, [className])}>
                    <thead className={cls.tableHead}>{head}</thead>
                    <tbody className={cls.tableBody}>{main}</tbody>
                </table>
            </div>
        </div>
    );
};
