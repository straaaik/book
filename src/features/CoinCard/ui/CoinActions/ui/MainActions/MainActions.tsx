import { CoinInfo } from '@/features/CoinCard/types/types';
import { ModalTransaction } from '@/features/ModalTransaction/ui/ModalTransaction';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { PiCoins } from 'react-icons/pi';

interface MainActionsProps {
    className?: string;
    coinInfo: CoinInfo;
    isOpen: boolean;
    onClose: () => void;
    onAddBtnClick: () => void;
}

export const MainActions = ({ coinInfo, isOpen, onClose, onAddBtnClick }: MainActionsProps) => {
    return (
        <div>
            <DropDownMenu>
                <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
            </DropDownMenu>
            <ModalTransaction coin={coinInfo} isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
