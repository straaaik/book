import { Coin, IPortfoliosInfo } from '../../types/types';
import { baseApi } from '../api/api';

export const updatePortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        updatePortfolio: create.mutation<IPortfoliosInfo, { id?: string; price?: number }>({
            async queryFn(info, _, extraOptions, baseQuery) {
                const { id, price } = info;
                const coins = (await baseQuery(`/portfolio?portfolio_name=${id}`)).data as Coin[];

                const initial_price = coins.reduce((acc, coin) => coin.purchase_price + acc, 0);

                const update = await baseQuery({
                    url: `/portfolios_info/${id}`,
                    method: 'PATCH',
                    body: {
                        initial_price,
                        price: price || 0,
                    } as IPortfoliosInfo,
                });

                return { data: update.data as IPortfoliosInfo };
            },
            invalidatesTags: ['Names'],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdatePortfolioMutation } = updatePortfolio;
