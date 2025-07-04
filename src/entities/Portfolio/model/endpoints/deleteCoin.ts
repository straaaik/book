import { baseApi } from '../api/api';

const deleteCoin = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteCoin: create.mutation<void, string>({
            query: (id) => ({
                url: `/coins/${id}?_dependent=transactions`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coins', 'Transactions', 'Portfolios'],
        }),
    }),
});

export const { useDeleteCoinMutation } = deleteCoin;
