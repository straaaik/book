export interface Coins {
    coin_name: string;
    coin_amount: number[];
    coin_buy_price: number[];
}

export interface PortfolioState {
    id: string;
    coins: Coins[];
}

export interface newCoinType {
    id: string;
    coins: Coins;
}
