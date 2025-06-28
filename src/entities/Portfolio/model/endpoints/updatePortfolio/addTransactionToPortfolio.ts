import { Transaction } from '../../../types/transactionsType';
import { baseApi } from '../../api/api';

export const addTransactionToPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        addTransactionToPortfolio: create.mutation<Transaction, Transaction>({
            async queryFn(transaction, _, __, baseQuery) {
                const update = await baseQuery({
                    url: `/transactions`,
                    method: 'POST',
                    body: transaction as Transaction,
                });

                return { data: update.data as Transaction };
            },
            invalidatesTags: ['Coins', 'Transactions'],
        }),
    }),
    overrideExisting: false,
});

export const { useAddTransactionToPortfolioMutation, endpoints: newTransactionEndpoints } = addTransactionToPortfolio;
