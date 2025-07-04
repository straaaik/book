import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CellCoinActions.module.scss';
import { memo, useState } from 'react';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { PiCoins } from 'react-icons/pi';
// eslint-disable-next-line fsd/no-cross-slice-dependency
import { ModalTransaction } from '../../../../../../../Portfolio/ui/ModalTransaction/ModalTransaction';

interface CellCoinActionsProps {
    className?: string;
}

export const CellCoinActions = memo(({ className }: CellCoinActionsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onAddBtnClick = () => {
        setIsOpen(true);
    };

    return (
        <td className={classNames(cls.CellCoinActions, {}, [className])}>
            <DropDownMenu>
                <DropDownMenuItem description="Add coin to portfolio" icon={<PiCoins />} onClick={onAddBtnClick} />
            </DropDownMenu>
            <ModalTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </td>
    );
});
