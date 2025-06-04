import { RootState } from '@/app/config/store/store';

export const getPortfolio = (state: RootState) => state.portfolio.data;
