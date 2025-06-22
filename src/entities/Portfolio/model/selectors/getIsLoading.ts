import { RootState } from '@/shared/types/redux';

export const getIsLoading = (state: RootState) => state.portfolio.isLoading;
