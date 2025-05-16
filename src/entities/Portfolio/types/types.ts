import { CoinsListWithMarketData } from '@/entities/Coin';

interface HistoryCoin {
    amount: number;
    price: number;
    date: Date;
}

interface HistoryCapital {
    capital: number;
    date: Date;
}

export type Portfolio = Coin & CoinsListWithMarketData;

export interface Coin {
    id: string;
    name: string;
    buy: HistoryCoin[];
    sell: HistoryCoin[];
    holdings_coin: number;
    purchase_price: number;
    avgPrice: number;
    profit_loss: number;
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
}

export interface PortfoliosStatus {
    id: string;
    capital: number;
    initial_capital: number;
    history_capital: HistoryCapital[];
}
