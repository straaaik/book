import { baseApi } from '@/shared/api/request';
import { PortfolioResponse } from '../types/types';

export const portfolioApi = baseApi.injectEndpoints({
    endpoints: (create) => ({ getPortfolio: create.query<PortfolioResponse[], void>({ query: () => '/portfolio' }) }),
    overrideExisting: true,
});
