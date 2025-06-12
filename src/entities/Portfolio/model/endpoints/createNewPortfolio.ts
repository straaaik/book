import { IPortfoliosInfo } from '../../types/types';
import { baseApi } from '../api/api';

const createNewPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        createNewPortfolio: create.mutation<IPortfoliosInfo, { id: string; icon?: string }>({
            async queryFn(portfolioInfo, _, __, baseQuery) {
                const { id, icon } = portfolioInfo;
                const update = await baseQuery({
                    url: `/portfolios_info`,
                    method: 'POST',
                    body: {
                        id,
                        icon,
                        initial_price: 0,
                        price: 0,
                    } as IPortfoliosInfo,
                });

                return { data: update.data as IPortfoliosInfo };
            },
            invalidatesTags: ['Names'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateNewPortfolioMutation } = createNewPortfolio;
