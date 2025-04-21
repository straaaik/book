interface History {
    amounts: number[];
    prices: number[];
}

export interface Coin {
    id: string;
    buy: History;
    sell: History;
}

export interface PortfolioState {
    main: Coin[];
}

export interface UpdateCoin {
    id: string;
    amounts: number[];
    prices: number[];
}
