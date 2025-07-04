import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfolioActionsCell.module.scss';
import { memo, useState } from 'react';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiCoins } from 'react-icons/pi';
import { ModalTransaction } from '../../../ModalTransaction/ModalTransaction';
import { useDeleteCoinMutation } from '../../../../model/endpoints/deleteCoin';

interface PortfolioActionsCellProps {
    className?: string;
    coinId?: string;
}

export const PortfolioActionsCell = memo(({ className, coinId }: PortfolioActionsCellProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteCoin] = useDeleteCoinMutation();

    const onDeleteBtnClick = () => {
        if (coinId) deleteCoin(coinId);
    };

    const onAddBtnClick = () => {
        setIsOpen(true);
    };

    return (
        <td>
            <div className={classNames(cls.PortfolioActionsCell, {}, [className])}>
                <DropDownMenu>
                    <DropDownMenuItem description="Delete" icon={<AiOutlineDelete />} onClick={onDeleteBtnClick} />
                    <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
                </DropDownMenu>
                <ModalTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </td>
    );
});
