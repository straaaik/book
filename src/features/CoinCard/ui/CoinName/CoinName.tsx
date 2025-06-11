import { PortfolioName } from './ui/PortfolioName/PortfolioName';
import { MainName } from './ui/MainName/MainName';

interface CoinNameProps {
    className?: string;
    image?: string;
    name: string;
    symbol?: string;
    id: string;
    rank?: number;
    portfolioName?: string;
    onClick?: (id: string) => void;
}

export const CoinName = ({ name, image, symbol, id, rank, portfolioName, onClick }: CoinNameProps) => {
    return portfolioName ? (
        <PortfolioName id={id} portfolioName={portfolioName} image={image} name={name} symbol={symbol} rank={rank} onClick={onClick} />
    ) : (
        <MainName id={id} image={image} name={name} symbol={symbol} rank={rank} />
    );
};
