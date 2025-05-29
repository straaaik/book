import { CoinsListWithMarketData } from '@/entities/Coin';

interface HistoryCoin {
    amount: number;
    price: number;
    date: string;
}

interface HistoryCapital {
    capital: number;
    date: Date;
}

export type Portfolio = Coin & CoinsListWithMarketData;

export interface IPortfolioNames {
    id: string;
    icon?: string;
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
