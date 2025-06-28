import { baseApi } from '../api/api';

const deleteCoin = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteCoin: create.mutation<void, string>({
            query: (id) => ({
                url: `/coins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coins', 'Transactions'],
        }),
    }),
});

export const { useDeleteCoinMutation } = deleteCoin;
