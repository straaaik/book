import { RootState } from '@/shared/types/redux';

export const getPortfolio = (state: RootState) => state.portfolio.coins;
