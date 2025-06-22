import { RootState } from '@/shared/types/redux';

export const getErrors = (state: RootState) => state.portfolio.error;
