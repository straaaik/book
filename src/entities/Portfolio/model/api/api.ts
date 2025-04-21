import { baseApi } from '@/shared/api/request';
import { Coin, PortfolioState, UpdateCoin } from '../../types/types';
import { OperationType } from '@/shared/types/types';

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getPortfolio: create.query<PortfolioState[], void>({ query: () => '/main', providesTags: ['Portfolio'] }),
        updateCoinToPortfolio: create.mutation<PortfolioState, [OperationType, UpdateCoin]>({
            async queryFn([options, newCoin], _, __, baseQuery) {
                const res = await baseQuery('/main');
                const portfolio = res.data as Coin[];
                const currentCoin = newCoin.id;
                const checkCoin = portfolio.some((coin) => coin?.id == currentCoin);

                if (checkCoin) {
                    const coinId = portfolio.findIndex((coin) => coin?.id == currentCoin);
                    const newAmounts = [...newCoin.amounts, ...portfolio[coinId][options].amounts];
                    const newPrices = [...newCoin.prices, ...portfolio[coinId][options].prices];
                    const updateData = { ...portfolio[coinId], [options]: { amounts: newAmounts, prices: newPrices } };

                    if (options == 'buy') {
                        const update = await baseQuery({
                            url: `/main/${currentCoin}`,
                            method: 'PUT',
                            body: updateData,
                        });
                        return { data: update.data as PortfolioState };
                    } else {
                        const update = await baseQuery({
                            url: `/main/${currentCoin}`,
                            method: 'PUT',
                            body: updateData,
                        });
                        return { data: update.data as PortfolioState };
                    }
                } else {
                    const update = await baseQuery({
                        url: `/main`,
                        method: 'POST',
                        body: {
                            id: newCoin.id,
                            buy: {
                                amounts: newCoin.amounts,
                                prices: newCoin.prices,
                            },
                            sell: {
                                amounts: [],
                                prices: [],
                            },
                        },
                    });
                    return { data: update.data as PortfolioState };
                }
            },
            invalidatesTags: ['Portfolio'],
        }),
    }),
});
