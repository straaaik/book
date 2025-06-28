import { Coin } from '../../../types/types';
import { baseApi } from '../../api/api';

export const addCoinToPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        addCoinToPortfolio: create.mutation<Coin | null, Coin>({
            async queryFn(newCoin, _, __, baseQuery) {
                const { id } = newCoin;

                console.log(newCoin);

                const res = await baseQuery('/coins');
                // TODO обработать ошибку
                const portfolio = res.data as Coin[];

                const coinInPortfolio = portfolio.some((item) => item?.id == id);

                if (coinInPortfolio) {
                    return { data: null };
                }

                const update = await baseQuery({
                    url: `/coins`,
                    method: 'POST',
                    body: newCoin,
                });
                return { data: update.data as Coin };
            },
            invalidatesTags: ['Coins'],
        }),
    }),
});

export const { useAddCoinToPortfolioMutation } = addCoinToPortfolio;
