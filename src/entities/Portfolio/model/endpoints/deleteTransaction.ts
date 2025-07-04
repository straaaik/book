import { Coin } from '../../types/types';
import { baseApi } from '../api/api';

const deleteTransaction = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteTransaction: create.mutation<Coin, string>({
            query: (id) => ({
                url: `/transactions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Transactions', 'Portfolios'],
        }),
    }),
});

export const { useDeleteTransactionMutation } = deleteTransaction;
