import { CoinsListWithMarketData } from '@/entities/Coin';

export interface HistoryCoin {
    amount: number;
    price: number;
    date: string;
    fee: number;
    notes: string;
}

interface HistoryCapital {
    capital: number;
    date: Date;
}

export type Portfolio = Coin & CoinsListWithMarketData;

export type IPortfolioNames<ID extends string = string> = {
    id: ID;
} & {
    [T in ID]: IPortfolioTypes;
};

export interface IPortfolioTypes {
    icon: string;
}

export interface Coin {
    id: string;
    serverId: string;
    name: string;
    buy: HistoryCoin[];
    sell: HistoryCoin[];
    holdings_coin: number;
    purchase_price: number;
    avgPrice: number;
    profit_loss: number;
    portfolio_name: string;
}

export interface UpdateCoin {
    id: string;
    name: string;
    amount: number;
    price: number;
    date: Date;
    notes: string;
    fee: number;
    options: 'buy' | 'sell';
    portfolio_name: string;
}

export interface PortfoliosStatus {
    id: string;
    capital: number;
    initial_capital: number;
    history_capital: HistoryCapital[];
}
