import { ModalTransaction } from '@/entities/Portfolio';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiCoins } from 'react-icons/pi';

interface PortfolioActionsProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onDeleteBtnClick: () => void;
    onAddBtnClick: () => void;
}

export const PortfolioActions = ({ isOpen, onClose, onDeleteBtnClick, onAddBtnClick }: PortfolioActionsProps) => {
    return (
        <div>
            <DropDownMenu>
                <DropDownMenuItem description="Delete" icon={<AiOutlineDelete />} onClick={onDeleteBtnClick} />
                <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
            </DropDownMenu>
            <ModalTransaction isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
