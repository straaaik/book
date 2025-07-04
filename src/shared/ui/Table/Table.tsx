import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './Table.module.scss';

interface IPortfolioList {
    className?: string;
    classNameContainer?: string;
    head?: React.ReactNode;
    main?: React.ReactNode;
    title?: string | React.ReactNode;
}

export const Table = ({ head, main, className, classNameContainer, title }: IPortfolioList) => {
    return (
        <div className={classNames(cls.container, {}, [classNameContainer])}>
            {title && <div className={cls.title}>{title}</div>}
            <div className={cls.wrapper}>
                <table className={classNames(cls.Table, {}, [className])}>
                    <thead className={cls.tableHead}>{head}</thead>
                    <tbody className={cls.tableBody}>{main}</tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={100} className={cls.footer}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
