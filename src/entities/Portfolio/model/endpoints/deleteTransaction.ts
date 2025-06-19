import { updateInfoCoins } from '../../module/updateInfoCoins';
import { Coin } from '../../types/types';
import { baseApi } from '../api/api';

interface ITransactionInfo {
    coinId: string;
    transactionId: string;
    type: 'buy' | 'sell';
}

const deleteTransaction = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteTransaction: create.mutation<Coin, ITransactionInfo>({
            async queryFn(transactionInfo, _, __, baseQuery) {
                const { coinId, transactionId, type } = transactionInfo;
                const coinRes = await baseQuery(`/portfolio/${coinId}`);
                const coin = coinRes.data as Coin;

                const transaction = coin[type].filter((item) => item.id !== transactionId);

                const updateCoin = { ...coin, [type]: transaction };

                const { avgPrice, holdingCoins, purchasePrice } = updateInfoCoins(updateCoin);

                const update = await baseQuery({
                    url: `/portfolio/${coinId}`,
                    method: 'PUT',
                    body: {
                        ...updateCoin,
                        holdings_coin: holdingCoins,
                        avgPrice,
                        purchase_price: purchasePrice,
                    } as Coin,
                });
                return { data: update.data as Coin };
            },

            invalidatesTags: ['Portfolio'],
        }),
    }),
});

export const { useDeleteTransactionMutation } = deleteTransaction;
