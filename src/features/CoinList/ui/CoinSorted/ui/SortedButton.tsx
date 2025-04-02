import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './SortedButton.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';
import { useState } from 'react';
import { CoinData } from '@/shared/types/types';

interface SortedButtonProps {
    className?: string;
    children?: string;
}

export const SortedButton = ({ className, children }: SortedButtonProps) => {
    const [status, setStatus] = useState<number>(0);
    // const [initialData, setInitialData] = useState<CoinData[]>(data);

    const sorted = (data: CoinData[], item: keyof CoinData) => {
        // if (status == 0) {
        //     if (item == 'name') {
        //         set(
        //             data.toSorted((a, b) => {
        //                 if (a[item].toUpperCase() > b[item].toUpperCase()) return 1;
        //                 if (a[item].toUpperCase() < b[item].toUpperCase()) return -1;
        //                 return 0;
        //             })
        //         );
        //     } else {
        //         set(data.toSorted((a, b) => Number(b[item]) - Number(a[item])));
        //     }
        // }
        // if (status == 1) {
        //     if (item == 'name') {
        //         set(
        //             data.toSorted((a, b) => {
        //                 if (a[item].toUpperCase() < b[item].toUpperCase()) return 1;
        //                 if (a[item].toUpperCase() > b[item].toUpperCase()) return -1;
        //                 return 0;
        //             })
        //         );
        //     } else {
        //         set(data.toSorted((a, b) => Number(a[item]) - Number(b[item])));
        //     }
        // }
        // if (status == 2) {
        //     set(initialData);
        // }
    };

    const onButtonClick = (data: CoinData[], item: keyof CoinData) => {
        // if (status == 0) {
        //     setInitialData(data);
        // }
        // if (status !== 2) {
        //     setStatus((prev) => prev + 1);
        // } else {
        //     setStatus(0);
        // }
        // sorted(data, item);
    };
    const mods = {
        [cls.firstClick]: status === 0,
        [cls.secondClick]: status === 1,
        [cls.threeClick]: status === 2,
    };

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={() => onButtonClick(data, item)}
            className={classNames(cls.SortedButton, mods, [className])}
        >
            {children}
        </Button>
    );
};
