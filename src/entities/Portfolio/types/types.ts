export interface Coins {
    coin_name: string;
    coin_amount: [number];
    coin_buy_price: [number];
}

export interface PortfolioState {
    name: string;
    coins: Coins;
}

export interface PortfolioResponse {
    portfolio: PortfolioState;
}
