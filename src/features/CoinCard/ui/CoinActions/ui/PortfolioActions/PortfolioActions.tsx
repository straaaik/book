import { CoinInfo } from '@/features/CoinCard/types/types';
import { ModalTransaction } from '@/features/ModalTransaction/ui/ModalTransaction';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiCoins } from 'react-icons/pi';

interface PortfolioActionsProps {
    className?: string;
    coinInfo: CoinInfo;
    isOpen: boolean;
    onClose: () => void;
    onDeleteBtnClick: () => void;
    onAddBtnClick: () => void;
}

export const PortfolioActions = ({ coinInfo, isOpen, onClose, onDeleteBtnClick, onAddBtnClick }: PortfolioActionsProps) => {
    return (
        <div>
            <DropDownMenu>
                <DropDownMenuItem description="Delete" icon={<AiOutlineDelete />} onClick={onDeleteBtnClick} />
                <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
            </DropDownMenu>
            <ModalTransaction coin={coinInfo} isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
