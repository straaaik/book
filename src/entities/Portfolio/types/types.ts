import { CoinsListWithMarketData } from '../../Coin/types/types';
import { Transaction, TransactionType } from './transactionsType';

export interface IFormChanges {
    quantity: string;
    fee: string;
    price: string;
    notes: string;
    date: Date;
    transactionId: string;
}

export interface PortfolioInfoState {
    id: string;
    icon?: string;
    initialCost: number;
    cost: number;
    profit_loss_percentage: number;
}

export interface Portfolio extends Coin, CoinsListWithMarketData {
    holdings_coin: number;
    purchase_price: number;
    avgPrice: number;
    profit_loss: number;
    profit_loss_percentage: number;
}

export interface IPortfoliosInfo {
    id: string;
    icon?: string;
    coins?: Coin[];
    transactions?: Transaction[];
}

export interface IPortfoliosInfoCoins {
    id: string;
    icon?: string;
    coins: Coin[];
}

export interface IPortfoliosInfoTransactions {
    id: string;
    icon?: string;
    transactions: Transaction[];
}

export interface Coin {
    id: string;
    serverId: string;
    name: string;
    image: string;
    symbol: string;
    portfolioId: string;
    transactions?: Transaction[];
}

export interface IUpdatePortfolio {
    coinId: string;
    serverId: string;
    transactionId: string;
    name: string;
    amount: number;
    price: number;
    date: Date;
    notes: string;
    fee: number;
    options: TransactionType;
    portfolioId: string;
    image: string;
    symbol: string;
}

export interface CoinDescription {
    id: string;
    name: string;
    symbol: string;
    image: string;
}
