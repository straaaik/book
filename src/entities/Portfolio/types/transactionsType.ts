import { Coin } from './types';

export type TransactionType = 'buy' | 'sell';

export interface Transaction {
    id: string;
    amount: number;
    price: number;
    date: Date;
    fee: number;
    coinId: string;
    portfolioId: string;
    notes: string;
    type: TransactionType;
    coinName: string;
    coin?: Coin;
}
