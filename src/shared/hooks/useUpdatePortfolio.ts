import { coinApi } from '@/entities/Coin';
import { portfolioApi, portfolioActions } from '@/entities/Portfolio';
import { useEffect } from 'react';
import { RELOAD_TIME } from '../constant/constant';
import { useAppDispatch } from '@/app/config/store/hooks';

export const useUpdatePortfolio = () => {
    const dispatch = useAppDispatch();
    const { data: dataPortfolio } = portfolioApi.useGetPortfolioQuery();
    const names = dataPortfolio?.map((item) => item.name);
    const { data: dataCoins } = coinApi.useGetCoinListWithMarketQuery({ names }, { pollingInterval: RELOAD_TIME });

    useEffect(() => {
        const merged = dataPortfolio?.map((item) => {
            const match = dataCoins?.find((coin) => coin.name === item.name);
            if (match) {
                const updatePortfolio = { ...match, ...item, profit_loss: match.current_price * item.holdings_coin - item.purchase_price };
                return updatePortfolio;
            }
            return { ...item };
        });
        dispatch(portfolioActions.updatePortfolio(merged));
    }, [dataPortfolio, dataCoins, dispatch]);
};
