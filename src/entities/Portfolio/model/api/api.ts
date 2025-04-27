import { baseApi } from '@/shared/api/request';
import { Coin, PortfolioState, UpdateCoin } from '../../types/types';
import { OperationType } from '@/shared/types/types';
import { coinApi } from '@/entities/Coin';

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfolio: create.query<Coin[], void>({ query: () => '/main', providesTags: ['Portfolio'] }),
        updateCoinToPortfolio: create.mutation<PortfolioState, [OperationType, UpdateCoin]>({
            async queryFn([options, newCoin], api, __, baseQuery) {
                const res = await baseQuery('/main');
                const portfolio = res.data as Coin[];
                const currentCoinId = newCoin.id.toLocaleLowerCase();
                const checkCoin = portfolio.some((coin) => coin?.id.toLocaleUpperCase() == currentCoinId.toLocaleUpperCase());

                if (checkCoin) {
                    const coinId = portfolio.findIndex((coin) => coin?.id.toLocaleUpperCase() == currentCoinId.toLocaleUpperCase());
                    const newAmounts = [...newCoin.amounts, ...portfolio[coinId][options].amounts];
                    const newPrices = [...newCoin.prices, ...portfolio[coinId][options].prices];
                    const updateData = { ...portfolio[coinId], [options]: { amounts: newAmounts, prices: newPrices } };
                    const holdings = updateData.buy.amounts.reduce((acc, i) => acc + i, 0);
                    const avgPrice = updateData.buy.amounts.reduce((acc, item, i) => acc + updateData.buy.prices[i] * item, 0) / holdings;

                    if (options == 'buy') {
                        const update = await baseQuery({
                            url: `/main/${currentCoinId}`,
                            method: 'PUT',
                            body: { ...updateData, holdings, avgPrice },
                        });
                        return { data: update.data as PortfolioState };
                    } else {
                        const update = await baseQuery({
                            url: `/main/${currentCoinId}`,
                            method: 'PUT',
                            body: updateData,
                        });
                        return { data: update.data as PortfolioState };
                    }
                } else {
                    const res = await api.dispatch(coinApi.endpoints.getCoinListWithMarket.initiate({ names: newCoin.name }));
                    const coin = res.data;
                    const holdings = newCoin.amounts.reduce((acc, i) => acc + i, 0);
                    const avgPrice = newCoin.amounts.reduce((acc, item, i) => acc + newCoin.prices[i] * item, 0);

                    const update = await baseQuery({
                        url: `/main`,
                        method: 'POST',
                        body: {
                            ...coin![0],
                            buy: {
                                amounts: newCoin.amounts,
                                prices: newCoin.prices,
                            },
                            sell: {
                                amounts: [],
                                prices: [],
                            },
                            holdings: holdings,
                            avgPrice: avgPrice,
                        },
                    });
                    return { data: update.data as PortfolioState };
                }
            },
            invalidatesTags: ['Portfolio'],
        }),
    }),
});
