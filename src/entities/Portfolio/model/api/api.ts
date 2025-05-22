import { baseApi } from '@/shared/api/request';
import { Coin, IPortfolioNames, UpdateCoin } from '../../types/types';
import { coinApi } from '@/entities/Coin';
import { portfolioActions } from '../slice/portfolioSlice';

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        createNewPortfolio: create.mutation<IPortfolioNames, IPortfolioNames>({
            async queryFn(portfolioInfo, _, __, baseQuery) {
                const { id, icon } = portfolioInfo;
                const update = await baseQuery({
                    url: `/portfolio_names`,
                    method: 'POST',
                    body: { id, icon },
                });

                return { data: update.data as IPortfolioNames };
            },
            invalidatesTags: ['Names'],
        }),
        getPortfolioNames: create.query<IPortfolioNames[], void>({ query: () => '/portfolio_names', providesTags: ['Names'] }),
        getPortfolio: create.query<Coin[], void>({ query: () => '/portfolio', providesTags: ['Portfolio'] }),
        deleteCoin: create.mutation<void, string>({
            query: (id) => ({
                url: `/portfolio/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Portfolio'],
        }),
        updateCoinToPortfolio: create.mutation<Coin, UpdateCoin>({
            async queryFn(newCoin, _, __, baseQuery) {
                const res = await baseQuery('/portfolio');
                const { id: newCoinId, name: newCoinName, options, portfolio_name, ...newCoinInfo } = newCoin;
                const portfolio = res.data as Coin[];

                const checkCoin = portfolio.some((item) => item?.id == newCoinId);

                if (checkCoin) {
                    const coinId = portfolio.findIndex((coin) => coin?.id == newCoinId);
                    const updatePortfolio = [...portfolio[coinId][options], newCoinInfo];
                    const updateData = {
                        ...portfolio[coinId],
                        [options]: updatePortfolio,
                    };

                    const holdingsCoin =
                        updateData.buy.reduce((acc, item) => acc + item.amount, 0) - updateData.sell.reduce((acc, item) => acc + item.amount, 0);
                    const avgPrice = updateData.buy.reduce((acc, item) => acc + item.price * item.amount, 0) / holdingsCoin;
                    const purchasePrice = updateData.buy.reduce((acc, item) => acc + item.amount * item.price, 0);

                    if (options == 'buy') {
                        const update = await baseQuery({
                            url: `/portfolio/${newCoinId}`,
                            method: 'PUT',
                            body: {
                                ...updateData,
                                holdings_coin: holdingsCoin,
                                avgPrice: avgPrice,
                                purchase_price: purchasePrice,
                            },
                        });
                        return { data: update.data as Coin };
                    } else {
                        const update = await baseQuery({
                            url: `/portfolio/${newCoinId}`,
                            method: 'PUT',
                            body: { ...updateData, holdings_coin: holdingsCoin },
                        });
                        return { data: update.data as Coin };
                    }
                } else {
                    const updateData = {
                        id: newCoinId,
                        name: newCoinName,
                        buy: [newCoinInfo],
                        sell: [],
                        holdings_coin: newCoinInfo.amount,
                        avgPrice: newCoinInfo.price,
                        purchase_price: newCoinInfo.price * newCoinInfo.amount,
                        portfolio_name: portfolio_name,
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
                    const coinInfo = (await dispatch(coinApi.endpoints.getCoinListWithMarket.initiate({ names: coin.name }))).data || [];
                    const merge = { ...coinInfo[0], ...coin, profit_loss: coinInfo[0].current_price * coin.holdings_coin - coin.purchase_price };
                    dispatch(portfolioActions.addCoinToPortfolio(merge));
                } catch (e) {
                    // TODO обработать ошибку
                    console.log(e);
                }
            },
            invalidatesTags: ['Portfolio'],
        }),
    }),
});
