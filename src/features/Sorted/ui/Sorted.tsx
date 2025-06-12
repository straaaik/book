'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Sorted.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { sorting } from '../module/sorting';
import { ParamsType } from '../types/types';

interface CoinSortedProps<T> {
    className?: string;
    params: ParamsType<T>[];
    setSortingData?: Dispatch<SetStateAction<T[]>>;
}

export const Sorted = <T,>(props: CoinSortedProps<T>) => {
    const { className, params, setSortingData } = props;

    const [status, setStatus] = useState<'ascending' | 'descending'>('ascending');
    const [active, setActive] = useState<keyof T>();

    const setStyleForStatus = (sortKey: keyof T) =>
        active == sortKey ? (status == 'descending' ? { borderBottom: '2px solid var(--warn-color)' } : { borderTop: '2px solid var(--warn-color)' }) : {};

    const onBtnClick = (item: keyof T) => {
        setActive(item);
        setStatus((prev) => (prev == 'ascending' ? 'descending' : 'ascending'));
        sorting({ item, status, setSortingData });
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
