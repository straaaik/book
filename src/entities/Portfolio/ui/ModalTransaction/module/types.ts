export interface IForm {
    id: string;
    name: string;
    amount: string;
    price: string;
    date: Date;
    fee: string;
    notes: string;
    options: 'buy' | 'sell';
    portfolio_name: string;
}
