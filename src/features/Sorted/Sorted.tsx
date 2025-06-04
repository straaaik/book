'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Sorted.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';

interface CoinSortedProps<T> {
    className?: string;
    params: ParamsType<T>[];
    sortedFunction?: (payload: sortedFunction<T>) => void;
}

interface sortedFunction<T> {
    item: keyof T;
    status: 'ascending' | 'descending';
}

export interface ParamsType<T> {
    sortKey: keyof T;
    text?: string;
}

export const Sorted = <T,>(props: CoinSortedProps<T>) => {
    const { className, params, sortedFunction } = props;

    const [status, setStatus] = useState<'ascending' | 'descending'>('ascending');
    const [active, setActive] = useState<keyof T>();

    const setStyleForStatus = (sortKey: keyof T) =>
        active == sortKey ? (status == 'descending' ? { borderBottom: '2px solid var(--warn-color)' } : { borderTop: '2px solid var(--warn-color)' }) : {};

    const onBtnClick = (item: keyof T) => {
        setActive(item);
        setStatus((prev) => (prev == 'ascending' ? 'descending' : 'ascending'));
        sortedFunction?.({ item, status });
    };

    return (
        <tr className={classNames(cls.Sorted, {}, [className])}>
            {params.map(({ sortKey, text }) => {
                return (
                    <th key={text}>
                        <Button scale={[1.3, 0.8]} style={setStyleForStatus(sortKey)} onClick={() => onBtnClick(sortKey)} className={cls.btn}>
                            {text}
                        </Button>
                    </th>
                );
            })}
        </tr>
    );
};
