import { IPortfoliosInfo } from '../../../types/types';
import { baseApi } from '../../api/api';

const createNewPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        createNewPortfolio: create.mutation<IPortfoliosInfo, { id: string; icon?: string }>({
            async queryFn(portfolioInfo, _, __, baseQuery) {
                const { id, icon } = portfolioInfo;
                const update = await baseQuery({
                    url: `/portfolios`,
                    method: 'POST',
                    body: {
                        id,
                        icon,
                        coins: id,
                    } as IPortfoliosInfo,
                });

                return { data: update.data as IPortfoliosInfo };
            },
            invalidatesTags: ['Portfolios'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateNewPortfolioMutation } = createNewPortfolio;
