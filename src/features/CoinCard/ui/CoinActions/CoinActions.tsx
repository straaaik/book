import { useState } from 'react';
import { PortfolioActions } from './ui/PortfolioActions/PortfolioActions';
import { MainActions } from './ui/MainActions/MainActions';
import { CoinInfo } from '../../types/types';
import { useDeleteCoinMutation } from '@/entities/Portfolio';

interface CoinActionsProps {
    portfolio?: boolean;
    coinInfo: CoinInfo;
}

export const CoinActions = ({ portfolio, coinInfo }: CoinActionsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteCoin] = useDeleteCoinMutation();

    const onDeleteBtnClick = () => {
        if (coinInfo?.id) deleteCoin(coinInfo.id);
    };

    const onAddBtnClick = () => {
        setIsOpen(true);
    };

    return (
        <td>
            {portfolio ? (
                <PortfolioActions isOpen={isOpen} onAddBtnClick={onAddBtnClick} onClose={() => setIsOpen(false)} onDeleteBtnClick={onDeleteBtnClick} />
            ) : (
                <MainActions isOpen={isOpen} onAddBtnClick={onAddBtnClick} onClose={() => setIsOpen(false)} />
            )}
        </td>
    );
};
