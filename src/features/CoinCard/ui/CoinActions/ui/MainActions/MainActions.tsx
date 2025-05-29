import { ModalTransaction } from '@/features/ModalTransaction/ui/ModalTransaction';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { PiCoins } from 'react-icons/pi';

interface MainActionsProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onAddBtnClick: () => void;
}

export const MainActions = ({ isOpen, onClose, onAddBtnClick }: MainActionsProps) => {
    return (
        <div>
            <DropDownMenu>
                <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
            </DropDownMenu>
            <ModalTransaction isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
