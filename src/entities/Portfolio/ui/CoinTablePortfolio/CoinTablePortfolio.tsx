import cls from './CoinTablePortfolio.module.scss';
import { PortfolioSorted } from './ui/PortfolioSorted/PortfolioSorted';
import { Table } from '@/shared/ui/Table/Table';
import { useLazyState } from '@/shared/hooks/useLazyState';
import { CoinDescription, Portfolio } from '../../types/types';
import { PortfolioRow } from './ui/PortfolioRow/PortfolioRow';

interface CoinTablePortfolioProps {
    onClick?: (arg: CoinDescription) => void;
    portfolio?: Portfolio[];
    isLoading?: boolean;
}

export const CoinTablePortfolio = ({ onClick, portfolio, isLoading }: CoinTablePortfolioProps) => {
    const [sortedPortfolio, setSortedPortfolio] = useLazyState(portfolio);

    return (
        <Table
            title="Assets"
            classNameContainer={cls.container}
            className={cls.CoinTablePortfolio}
            head={<PortfolioSorted setSortedData={setSortedPortfolio} />}
            main={
                isLoading || !sortedPortfolio.length
                    ? new Array(10).fill(undefined).map((item, i) => <PortfolioRow isLoading={true} key={i} coinInfo={item} />)
                    : sortedPortfolio?.map((item) => <PortfolioRow key={item.id} coinInfo={item} onClick={onClick} />)
            }
        />
    );
};
