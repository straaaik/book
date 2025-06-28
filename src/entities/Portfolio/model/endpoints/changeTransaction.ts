import { Coin, IFormChanges } from '../../types/types';
import { baseApi } from '../api/api';

const changeTransaction = baseApi.injectEndpoints({
    endpoints: (create) => ({
        changeTransaction: create.mutation<Coin, IFormChanges>({
            query: (modifiedTransaction) => ({
                url: `/transactions/${modifiedTransaction.transactionId}`,
                method: 'PATCH',
                body: {
                    date: modifiedTransaction.date,
                    fee: Number(modifiedTransaction.fee),
                    notes: modifiedTransaction.notes,
                    price: Number(modifiedTransaction.price),
                    amount: Number(modifiedTransaction.quantity),
                },
            }),

            invalidatesTags: ['Transactions'],
        }),
    }),
});

export const { useChangeTransactionMutation } = changeTransaction;
