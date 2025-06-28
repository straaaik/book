import { createAppSelector } from '@/shared/hooks/hooks';
import { getActive } from './getActive';
import { getPortfolio } from './getPortfolio';
import { getIsLoading } from './getIsLoading';
import { Portfolio } from '../../types/types';
import { getErrors } from './getErrors';
import { IError } from '../slice/portfolioSlice';

export interface IGetActivePortfolio {
    portfolio: Portfolio[];
    isLoading: boolean;
    error?: IError[];
}

export const getActivePortfolio = createAppSelector(
    [getPortfolio, getActive, getIsLoading, getErrors],
    (portfolio, active, isLoading, errors): IGetActivePortfolio => {
        if (active === 'Overview') {
            return { portfolio, isLoading, error: errors };
        } else {
            const activePortfolio = portfolio.filter((coin) => coin.portfolioId === active);
            return { portfolio: activePortfolio, isLoading, error: errors };
        }
    }
);
