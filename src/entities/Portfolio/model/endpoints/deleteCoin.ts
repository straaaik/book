import { baseApi } from '../api/api';

const deleteCoin = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteCoin: create.mutation<void, string>({
            query: (id) => ({
                url: `/portfolio/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Portfolio'],
        }),
    }),
});

export const { useDeleteCoinMutation } = deleteCoin;
