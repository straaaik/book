import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Pagination.module.scss';
import { Button, ButtonTheme } from '../Button/Button';
import { memo } from 'react';

interface PaginationProps {
    className?: string;
    value: number;
    onClick: (arg: number) => void;
}

export const Pagination = memo(({ className, value, onClick: setPage }: PaginationProps) => {
    return (
        <div className={classNames(cls.Pagination, {}, [className])}>
            <Button animation="bg" className={cls.btn} theme={ButtonTheme.CLEAR} onClick={() => setPage(value - 1)}>
                {'<'}
            </Button>
            {value !== 1 && (
                <>
                    <Button animation="bg" className={cls.btn} theme={ButtonTheme.CLEAR} onClick={() => setPage(1)}>
                        1
                    </Button>
                    <Button className={cls.btn} theme={ButtonTheme.CLEAR}>
                        ...
                    </Button>
                </>
            )}
            <Button animation="bg" className={cls.btn} theme={ButtonTheme.BORDER_WARN}>
                {value}
            </Button>
            <Button animation="bg" className={cls.btn} theme={ButtonTheme.CLEAR} onClick={() => setPage(value + 1)}>
                {value + 1}
            </Button>
            <Button animation="bg" className={cls.btn} theme={ButtonTheme.CLEAR} onClick={() => setPage(value + 2)}>
                {value + 2}
            </Button>

            <Button animation="bg" className={cls.btn} theme={ButtonTheme.CLEAR} onClick={() => setPage(value + 1)}>
                {'>'}
            </Button>
        </div>
    );
});
