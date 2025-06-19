import { updateInfoCoins } from '../../module/updateInfoCoins';
import { Coin, IFormChanges } from '../../types/types';
import { baseApi } from '../api/api';

const changeTransaction = baseApi.injectEndpoints({
    endpoints: (create) => ({
        changeTransaction: create.mutation<Coin, IFormChanges>({
            async queryFn(transactionInfo, _, __, baseQuery) {
                const { date, fee, notes, price, quantity, coinId, transactionId, type } = transactionInfo;
                const coinRes = await baseQuery(`/portfolio/${coinId}`);
                const coin = coinRes.data as Coin;

                const transaction = coin[type].filter((item) => item.id !== transactionId);
                const changeTransaction = coin[type].find((item) => item.id === transactionId);
                const updateTransaction = { ...changeTransaction, amount: Number(quantity), date, fee: Number(fee), notes, price: Number(price) };

                const updateCoin = { ...coin, [type]: [...transaction, updateTransaction] }; // Развернуть старые транзакции

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

export const { useChangeTransactionMutation } = changeTransaction;
