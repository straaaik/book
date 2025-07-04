'use client';

import { Dispatch, SetStateAction, useDeferredValue, useEffect, useState } from 'react';

export const useLazyState = <T>(value?: T[]): [T[], Dispatch<SetStateAction<T[]>>] => {
    const [data, setData] = useState(value || []);
    const lazyData = useDeferredValue(data);

    useEffect(() => {
        if (value) setData(value);
    }, [value]);

    return [lazyData, setData];
};
