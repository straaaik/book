import { CoinsListWithMarketData } from '@/entities/Coin';

interface History {
    amounts: number[];
    prices: number[];
}

export interface Coin extends CoinsListWithMarketData {
    id: string;
    buy: History;
    sell: History;
    holdings: number;
    avgPrice: number;
}

export interface PortfolioState {
    main: Coin[];
}

export interface UpdateCoin {
    id: string;
    name: string;
    amounts: number[];
    prices: number[];
}
