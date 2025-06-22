import { useState } from 'react';
import { PortfolioActions } from './ui/PortfolioActions/PortfolioActions';
import { MainActions } from './ui/MainActions/MainActions';
import { CoinInfo } from '../../types/types';
import { useDeleteCoinMutation } from '@/entities/Portfolio';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface CoinActionsProps {
    portfolio?: boolean;
    coinInfo?: CoinInfo;
    isLoading?: boolean;
}

export const CoinActions = ({ portfolio, coinInfo, isLoading }: CoinActionsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteCoin] = useDeleteCoinMutation();

    const onDeleteBtnClick = () => {
        if (coinInfo?.id) deleteCoin(coinInfo.id);
    };

    const onAddBtnClick = () => {
        setIsOpen(true);
    };

    if (isLoading) {
        return (
            <td>
                <Skeleton width={30} height={30} />
            </td>
        );
    }

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
