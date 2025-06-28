'use client';

import { coinApi } from '../../../Coin/model/endpoints/getCoinInfo';
import { RELOAD_TIME } from '@/shared/constant/constant';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEffect } from 'react';
import { getActive } from '../../model/selectors/getActive';
import { portfolioActions } from '../../model/slice/portfolioSlice';
import { Portfolio } from '../../types/types';
import { useGetCoinsWithTransactionsQuery } from '../../model/endpoints/getCoins';

export const useUpdatePortfolio = () => {
    const dispatch = useAppDispatch();
    const activePortfolio = useAppSelector(getActive);
    const {
        data: dataCoinsInPortfolio,
        isLoading: isLoadingCoinsInPortfolio,
        error: errorCoinsInPortfolio,
    } = useGetCoinsWithTransactionsQuery(activePortfolio);
    const names = [...new Set(dataCoinsInPortfolio?.map((item) => item.name))];
    const {
        data: dataCoins,
        isLoading: isLoadingCoins,
        error: errorCoins,
    } = coinApi.useGetCoinListWithMarketQuery({ names }, { pollingInterval: RELOAD_TIME, skip: !names.length });

    useEffect(() => {
        const errors = [];
        if (errorCoins) {
            errors.push(errorCoins);
        }

        if (errorCoinsInPortfolio) {
            errors.push(errorCoinsInPortfolio);
        }
        dispatch(portfolioActions.setError(errors));
    }, [dispatch, errorCoins, errorCoinsInPortfolio]);

    useEffect(() => {
        const portfolio: Portfolio[] = [];

        dataCoinsInPortfolio?.forEach((item) => {
            const match = dataCoins?.find((coin) => {
                return coin.name === item.name;
            });

            if (match) {
                // SELL TRANSACTION
                const sellTransactions = item.transactions?.filter((transaction) => transaction.type === 'sell');
                const allSellAmounts = sellTransactions?.reduce((acc, coin) => acc + coin.amount, 0) || 0;

                // BUY TRANSACTION
                const buyTransactions = item.transactions?.filter((transaction) => transaction.type === 'buy');
                const allBuyAmounts = buyTransactions?.reduce((acc, coin) => acc + coin.amount, 0) || 0;
                const sumBuyCoins = buyTransactions?.reduce((acc, item) => acc + item.price * item.amount, 0) || 0;

                // INFO COIN

                const holdings_coin = allBuyAmounts - allSellAmounts;
                const purchase_price = buyTransactions?.reduce((acc, item) => acc + item.amount * item.price, 0) || 0;
                const avgPrice = sumBuyCoins / holdings_coin;
                const profit_loss = match.current_price * holdings_coin - avgPrice * holdings_coin;
                const profit_loss_percentage = (profit_loss / purchase_price) * 100;

                const updatePortfolio = { ...match, ...item, holdings_coin, purchase_price, avgPrice, profit_loss, profit_loss_percentage };
                portfolio.push(updatePortfolio);
            }
        });

        if (isLoadingCoinsInPortfolio || isLoadingCoins) {
            dispatch(portfolioActions.setIsLoading(true));
        } else {
            dispatch(portfolioActions.updatePortfolio(portfolio));
            dispatch(portfolioActions.setIsLoading(false));
        }
    }, [dataCoinsInPortfolio, dataCoins, dispatch, isLoadingCoinsInPortfolio, isLoadingCoins]);
};
