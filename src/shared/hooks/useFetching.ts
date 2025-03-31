import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetching = <T>(url: string, params = {}): [T | null, boolean, string | null] => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        console.log('запрос');
        axios
            .get<T>(url, params)
            .then((res) => {
                setIsLoading(false);
                setData(res.data);
            })
            .catch((e) => {
                if (axios.isAxiosError(e)) {
                    setIsLoading(false);
                    setError(e.message);
                }
            });
    }, [url, params]);

    return [data, isLoading, error];
};
