import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PageCount.module.scss';
import { Button } from '@/shared/ui/button/Button';

interface PageCountProps {
    className?: string;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageCount = ({ className, page, setPage }: PageCountProps) => {
    const nextPage = () => {
        setPage((prev) => prev + 1);
    };
    const prevPage = () => {
        setPage((prev) => prev - 1);
    };

    return (
        <div className={classNames(cls.PageCount, {}, [className])}>
            <div>{page}</div>
            <Button onClick={prevPage}>{'<'}</Button>
            <Button onClick={nextPage}>{'>'}</Button>
        </div>
    );
};
