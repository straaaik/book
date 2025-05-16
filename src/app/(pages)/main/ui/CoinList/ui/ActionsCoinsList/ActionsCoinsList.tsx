'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ActionsCoinsList.module.scss';
import { Select } from '@/shared/ui/Select/Select';

interface ActionsProps {
    className?: string;
    setLimit: (arg: string) => void;
    limit: string;
}

export const ActionsCoinsList = ({ className, setLimit, limit }: ActionsProps) => {
    const optionsLimit = [
        { description: '50', value: '50' },
        { description: '100', value: '100' },
        { description: '150', value: '150' },
        { description: '200', value: '200' },
    ];

    return (
        <div className={classNames(cls.Actions, {}, [className])}>
            <Select className={cls.select} options={optionsLimit} onChange={setLimit} initialValue={limit} />
        </div>
    );
};
