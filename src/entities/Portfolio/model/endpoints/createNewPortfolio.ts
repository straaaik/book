import { IPortfolioNames } from '../../types/types';
import { baseApi } from '../api/api';

const createNewPortfolio = baseApi.injectEndpoints({
    endpoints: (create) => ({
        createNewPortfolio: create.mutation<IPortfolioNames, { id: string; icon?: string }>({
            async queryFn(portfolioInfo, _, __, baseQuery) {
                const { id, icon } = portfolioInfo;
                const update = await baseQuery({
                    url: `/portfolio_names`,
                    method: 'POST',
                    body: {
                        id,
                        [id]: {
                            icon,
                        },
                    },
                });

                return { data: update.data as IPortfolioNames };
            },
            invalidatesTags: ['Names'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateNewPortfolioMutation } = createNewPortfolio;
