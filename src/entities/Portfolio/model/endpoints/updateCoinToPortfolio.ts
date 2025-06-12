import { Coin, UpdateCoin } from '../../types/types';
import { baseApi } from '../api/api';
import { updatePortfolio } from './updatePortfolio';

const updateCoinToPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        updateCoinToPortfolio: create.mutation<Coin, UpdateCoin>({
            async queryFn(newCoin, _, __, baseQuery) {
                const { id: newCoinId, name: newCoinName, options, portfolio_name: portfolioName, ...newCoinInfo } = newCoin;
                const coinId = newCoinId + portfolioName;
                const orders = { id: crypto.randomUUID(), ...newCoinInfo };

                const res = await baseQuery('/portfolio');
                // TODO обработать ошибку
                const portfolio = res.data as Coin[];

                const coinInPortfolio = portfolio.some((item) => item?.id == coinId);

                if (coinInPortfolio) {
                    const coinIndex = portfolio.findIndex((coin) => coin?.id == coinId);
                    const updatedCoinOrders = [...portfolio[coinIndex][options], orders];
                    const updatedPortfolio = {
                        ...portfolio[coinIndex],
                        [options]: updatedCoinOrders,
                    };
                    const holdingCoins =
                        updatedPortfolio.buy.reduce((acc, item) => acc + item.amount, 0) - updatedPortfolio.sell.reduce((acc, item) => acc + item.amount, 0);
                    const avgPrice = updatedPortfolio.buy.reduce((acc, item) => acc + item.price * item.amount, 0) / holdingCoins;
                    const purchasePrice = updatedPortfolio.buy.reduce((acc, item) => acc + item.amount * item.price, 0);

                    const body = { ...updatedPortfolio, holdings_coin: holdingCoins };

                    if (options == 'buy') {
                        const update = await baseQuery({
                            url: `/portfolio/${coinId}`,
                            method: 'PUT',
                            body: {
                                ...body,
                                avgPrice,
                                purchase_price: purchasePrice,
                            },
                        });
                        return { data: update.data as Coin };
                    } else {
                        const update = await baseQuery({
                            url: `/portfolio/${coinId}`,
                            method: 'PUT',
                            body,
                        });
                        return { data: update.data as Coin };
                    }
                } else {
                    const updateData = {
                        id: coinId,
                        serverId: newCoinId,
                        name: newCoinName,
                        buy: [orders],
                        sell: [],
                        holdings_coin: newCoinInfo.amount,
                        avgPrice: newCoinInfo.price,
                        purchase_price: newCoinInfo.price * newCoinInfo.amount,
                        portfolio_name: portfolioName,
                    };

                    const update = await baseQuery({
                        url: `/portfolio`,
                        method: 'POST',
                        body: updateData,
                    });
                    return { data: update.data as Coin };
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const coin = (await queryFulfilled).data;
                    dispatch(updatePortfolio.endpoints.updatePortfolio.initiate({ id: coin.portfolio_name, price: 0 }));
                } catch (e) {
                    // TODO обработать ошибку
                    console.log(e);
                }
            },
            invalidatesTags: ['Portfolio'],
        }),
    }),
});

export const { useUpdateCoinToPortfolioMutation } = updateCoinToPortfolio;
