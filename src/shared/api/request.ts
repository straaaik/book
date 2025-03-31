import axios from 'axios';

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

export const getCoinById = async (id: number) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {});
    return res;
};
