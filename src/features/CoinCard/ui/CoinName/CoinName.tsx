import { PortfolioName } from './ui/PortfolioName/PortfolioName';
import { MainName } from './ui/MainName/MainName';

export interface CoinNameProps {
    isLoading?: boolean;
    className?: string;
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
    rank?: number;
    portfolioName?: string;
}

export const CoinName = ({ name, image, symbol, id, rank, portfolioName, isLoading }: CoinNameProps) => {
    return portfolioName ? (
        <PortfolioName isLoading={isLoading} id={id} portfolioName={portfolioName} image={image} name={name} symbol={symbol} rank={rank} />
    ) : (
        <MainName isLoading={isLoading} id={id} image={image} name={name} symbol={symbol} rank={rank} />
    );
};
