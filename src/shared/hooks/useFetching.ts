import { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';

export const useFetching = <T>(request: () => AxiosPromise): [T | null, boolean, string | null] => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        setIsLoading(true);
        console.log('запрос');
        request()
            .then((res) => {
                setIsLoading(false);
                setData(res.data);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, isLoading, error];
};
