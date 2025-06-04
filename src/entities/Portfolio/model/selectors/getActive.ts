import { RootState } from '@/app/config/store/store';

export const getActive = (state: RootState) => state.portfolio.active;
