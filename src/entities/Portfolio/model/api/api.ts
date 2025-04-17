import { baseApi } from '@/shared/api/request';
import { newCoinType, PortfolioState } from '../../types/types';

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfolio: create.query<PortfolioState[], void>({ query: () => '/portfolio' }),
        addCoinToPortfolio: create.mutation<PortfolioState, newCoinType>({
            async queryFn(newCoin, _, __, baseQuery) {
                const res = await baseQuery('/portfolio');
                const portfolio = res.data as PortfolioState[];
                const id = portfolio.findIndex((item) => item.id == newCoin.id);
                const currentCoins = portfolio[id].coins;
                const currentId = portfolio[id].id;

                //Если монета уже есть
                if (currentCoins.some((coin) => coin?.coin_name == newCoin.coins.coin_name)) {
                    console.log('Монета в портфеле');
                    const coinId = currentCoins.findIndex((coin) => coin?.coin_name == newCoin.coins.coin_name);

                    const updateCoin = [
                        ...currentCoins,
                        //TODO Переписать, без forEach, потому что ---> forEach возвращает undefined <----
                        newCoin.coins.coin_amount.forEach((item) => currentCoins[coinId].coin_amount.push(item)),
                        newCoin.coins.coin_buy_price.forEach((item) => currentCoins[coinId].coin_buy_price.push(item)),
                    ];

                    const update = await baseQuery({
                        url: `/portfolio/${currentId}`,
                        method: 'PUT',
                        body: { coins: updateCoin.filter((item) => item != undefined) },
                    });
                    return { data: update.data as PortfolioState };
                } //Если монеты нет
                else {
                    console.log('Монеты нет');

                    const updatedPortfolio = [...currentCoins, newCoin.coins];
                    const update = await baseQuery({
                        url: `/portfolio/${currentId}`,
                        method: 'PUT',
                        body: { coins: updatedPortfolio },
                    });
                    return { data: update.data as PortfolioState };
                }
            },
        }),
    }),
    overrideExisting: true,
});
