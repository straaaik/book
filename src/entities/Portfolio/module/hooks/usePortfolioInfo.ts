import { coinApi } from '../../../Coin/model/endpoints/getCoinInfo';
import { OVERVIEW, RELOAD_TIME } from '@/shared/constant/constant';
import { useGetPortfoliosWithTransactionsQuery } from '../../model/endpoints/getPortfolios';
import { PortfolioInfoState } from '../../types/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

interface IUseUpdatePortfolioInfo {
    portfolio?: PortfolioInfoState[];
    isLoading?: boolean;
    error?: ErrorType[];
    overview?: PortfolioInfoState;
}

export const usePortfolioInfo = (): IUseUpdatePortfolioInfo => {
    const { data: dataPortfolios, isLoading: isLoadingPortfolios, error: errorPortfolios } = useGetPortfoliosWithTransactionsQuery();
    const names = [...new Set(dataPortfolios?.map((portfolio) => portfolio.transactions.map((transaction) => transaction.coinName)).flat())];
    const {
        data: dataCoins,
        isLoading: isLoadingCoins,
        error: errorCoins,
    } = coinApi.useGetCoinListWithMarketQuery({ names }, { pollingInterval: RELOAD_TIME, skip: !names.length });

    const [portfolio, setPortfolio] = useState<PortfolioInfoState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setIsError] = useState<ErrorType[]>([]);
    const [overview, setOverview] = useState<PortfolioInfoState>();

    useEffect(() => {
        if (isLoadingPortfolios || isLoadingCoins) setIsLoading(true);
        else if (errorPortfolios || errorCoins) {
            setIsLoading(false);
            if (errorPortfolios) setIsError((p) => [...p, errorPortfolios]);
            if (errorCoins) setIsError((p) => [...p, errorCoins]);
        } else {
            setIsLoading(false);
            const res = dataPortfolios?.map((portfolio) => {
                let initialCost = 0;
                let currentInvest = 0;

                portfolio.transactions.forEach((transaction) => {
                    const match = dataCoins?.find((item) => item.name == transaction.coinName);
                    if (match) {
                        if (transaction.type == 'buy') {
                            currentInvest += transaction.amount * match.current_price - transaction.fee;
                            initialCost += transaction.amount * transaction.price - transaction.fee;
                        } else if (transaction.type == 'sell') {
                            //TODO сделать правильные расчеты для sell
                            currentInvest -= transaction.amount * match.current_price;
                            initialCost -= transaction.amount * transaction.price;
                        }
                    }
                });

                const profit_loss_percentage = ((currentInvest - initialCost) / initialCost) * 100;

                return {
                    id: portfolio.id,
                    icon: portfolio.icon,
                    initialCost: initialCost,
                    cost: currentInvest,
                    profit_loss_percentage,
                };
            });

            if (res?.length) {
                setPortfolio(res);
                const overviewCost = res.reduce((acc, item) => acc + item.cost, 0);
                const overviewInitialCost = res.reduce((acc, item) => acc + item.initialCost, 0);
                const overviewPL = ((overviewCost - overviewInitialCost) / overviewInitialCost) * 100;
                setOverview({
                    id: OVERVIEW,
                    cost: overviewCost,
                    initialCost: overviewInitialCost,
                    profit_loss_percentage: overviewPL,
                });
            }
        }
    }, [dataCoins, dataPortfolios, isLoading, errorCoins, errorPortfolios, isLoadingCoins, isLoadingPortfolios]);

    return {
        portfolio,
        isLoading,
        error,
        overview,
    };
};
