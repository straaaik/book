import { RootState } from '@/shared/types/redux';

export const getActive = (state: RootState) => state.portfolio.active;
