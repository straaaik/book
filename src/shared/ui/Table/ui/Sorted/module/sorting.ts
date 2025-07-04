import { Dispatch, SetStateAction } from 'react';

interface sortedFunction<T> {
    item: keyof T;
    status: 'ascending' | 'descending';
    setSortingData?: Dispatch<SetStateAction<T[]>>;
}

export const sorting = <T>({ item, status, setSortingData }: sortedFunction<T>) => {
    switch (status) {
        case 'ascending':
            setSortingData?.((prev: T[]) =>
                [...prev].sort((a, b) => {
                    if (!isNaN(Number(a[item])) && !isNaN(Number(b[item]))) {
                        return Number(b[item]) - Number(a[item]);
                    } else {
                        return String(a[item]).localeCompare(String(b[item]), undefined, { sensitivity: 'base' });
                    }
                })
            );

            break;
        case 'descending':
            setSortingData?.((prev: T[]) =>
                [...prev].sort((a, b) => {
                    if (!isNaN(Number(a[item])) && !isNaN(Number(b[item]))) {
                        return Number(a[item]) - Number(b[item]);
                    } else {
                        return String(b[item]).localeCompare(String(a[item]), undefined, { sensitivity: 'base' });
                    }
                })
            );
            break;
        default:
            break;
    }
};
