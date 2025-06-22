import { coinApi } from '../../../Coin/model/endpoints/getCoinInfo';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEffect } from 'react';
import { useGetPortfolioQuery, useGetPortfoliosInfoQuery } from '../../model/endpoints/getPortfolioInfo';
import { getActive } from '../../model/selectors/getActive';
import { portfolioActions } from '../../model/slice/portfolioSlice';
import { Portfolio } from '../../types/types';
import { useUpdatePortfolioMutation } from '../../model/endpoints/updatePortfolio';
import { getPortfolio } from '../../model/selectors/getPortfolio';

export const useUpdatePortfolio = () => {
    const dispatch = useAppDispatch();
    const { data: dataPortfolio, isLoading: isLoadingPortfolio, error: errorPortfolio } = useGetPortfolioQuery();
    const names = dataPortfolio?.map((item) => item.name);
    const { data: dataPortfolios, isLoading: isLoadingPortfolios, error: errorPortfolios } = useGetPortfoliosInfoQuery();
    const activePortfolio = useAppSelector(getActive);
    const {
        data: dataCoins,
        isLoading: isLoadingCoins,
        error: errorCoins,
    } = coinApi.useGetCoinListWithMarketQuery({ names }, { pollingInterval: RELOAD_TIME });
    const [updatePortfolioInfo] = useUpdatePortfolioMutation();
    const portfolioState = useAppSelector(getPortfolio);

    useEffect(() => {
        const errors = [];
        if (errorCoins) {
            errors.push(errorCoins);
        }
        if (errorPortfolios) {
            errors.push(errorPortfolios);
        }
        if (errorPortfolio) {
            errors.push(errorPortfolio);
        }
        dispatch(portfolioActions.setError(errors));
    }, [dispatch, errorCoins, errorPortfolios, errorPortfolio]);

    useEffect(() => {
        dataPortfolios?.forEach((portfolio) => {
            const coins = portfolioState.filter((coin) => coin.portfolio_name == portfolio.id);
            const price = coins.reduce((acc, coin) => coin.current_price * coin.holdings_coin + acc, 0);
            updatePortfolioInfo({ id: portfolio.id, price });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPortfolios, portfolioState]);

    useEffect(() => {
        const portfolio: Portfolio[] = [];

        dataPortfolio?.forEach((item) => {
            const match = dataCoins?.find((coin) => {
                return coin.name === item.name;
            });

            if (match) {
                const updatePortfolio = { ...match, ...item, profit_loss: match.current_price * item.holdings_coin - item.purchase_price };
                portfolio.push(updatePortfolio);
            }
        });

        if (isLoadingPortfolio || isLoadingPortfolios || isLoadingCoins) {
            dispatch(portfolioActions.setIsLoading(true));
        } else {
            dispatch(portfolioActions.updatePortfolio(portfolio));
            dispatch(portfolioActions.setIsLoading(false));
        }
    }, [dataPortfolio, dataCoins, dispatch, activePortfolio, isLoadingPortfolio, isLoadingPortfolios, isLoadingCoins]);
};
