import { Transaction } from '../../../types/transactionsType';
import { Coin, IUpdatePortfolio } from '../../../types/types';
import { baseApi } from '../../api/api';
import { addCoinToPortfolio } from './addCoinToPortfolio';
import { addTransactionToPortfolio } from './addTransactionToPortfolio';

export const updatePortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        updatePortfolio: create.mutation<{ coin: Coin | null; transaction: Transaction }, IUpdatePortfolio>({
            async queryFn(args, { dispatch }) {
                const { amount, coinId, date, fee, name, notes, options, portfolioId, price, serverId, transactionId, image, symbol } = args;

                try {
                    const newCoin = await dispatch(
                        addCoinToPortfolio.endpoints.addCoinToPortfolio.initiate({
                            id: coinId,
                            image,
                            name,
                            portfolioId,
                            serverId,
                            symbol,
                        })
                    ).unwrap();
                    const newTransaction = await dispatch(
                        addTransactionToPortfolio.endpoints.addTransactionToPortfolio.initiate({
                            amount,
                            coinName: name,
                            date,
                            coinId,
                            fee,
                            id: transactionId,
                            notes,
                            price,
                            type: options,
                            portfolioId,
                        })
                    ).unwrap();
                    return {
                        data: {
                            coin: newCoin,
                            transaction: newTransaction,
                        },
                    };
                } catch (e) {
                    return {
                        error: {
                            status: 500,
                            data: (e as Error).message,
                        },
                    };
                }
            },
            invalidatesTags: ['Coins', 'Portfolios', 'Transactions'],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdatePortfolioMutation } = updatePortfolio;
