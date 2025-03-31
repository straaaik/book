import axios from 'axios';
import { ParamValue } from 'next/dist/server/request/params';

export const getCoinList = async (limit = 100, page = 1) => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', per_page: limit, page: page },
    });
    return res;
};

export const getAllCoin = async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/list', {});
    return res;
};

export const getCoinById = async (id: ParamValue) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {});
    return res;
};

export const getTest = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return res;
};
