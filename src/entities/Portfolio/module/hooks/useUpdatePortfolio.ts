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
    const { data: dataPortfolio } = useGetPortfolioQuery();
    const names = dataPortfolio?.map((item) => item.name);
    const { data: portfolios } = useGetPortfoliosInfoQuery();
    const activePortfolio = useAppSelector(getActive);
    const { data: dataCoins } = coinApi.useGetCoinListWithMarketQuery({ names }, { pollingInterval: RELOAD_TIME });
    const [updatePortfolioInfo] = useUpdatePortfolioMutation();
    const portfolioState = useAppSelector(getPortfolio);

    useEffect(() => {
        portfolios?.forEach((portfolio) => {
            const coins = portfolioState.filter((coin) => coin.portfolio_name == portfolio.id);
            const price = coins.reduce((acc, coin) => coin.current_price * coin.holdings_coin + acc, 0);
            updatePortfolioInfo({ id: portfolio.id, price });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolios, portfolioState]);

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

        dispatch(portfolioActions.updatePortfolio(portfolio));
    }, [dataPortfolio, dataCoins, dispatch, activePortfolio]);
};
