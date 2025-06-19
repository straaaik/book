'use client';

import { FiEdit3 } from 'react-icons/fi';
import { useDeleteTransactionMutation } from '../../../../../../../../model/endpoints/deleteTransaction';
import { Order } from '../../../../../../../../model/selectors/getHistory';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { MdDeleteForever } from 'react-icons/md';

export const CellTransactionActions = ({ info, openChangeModal }: { info: Order; openChangeModal: (arg: boolean) => void }) => {
    const [deleteCoin] = useDeleteTransactionMutation();
    const onDeleteClick = () => {
        deleteCoin({ coinId: info.id_coin, transactionId: info.id, type: info.type });
    };

    const onChangeClick = () => {
        openChangeModal(true);
    };

    return (
        <td>
            <DropDownMenu>
                <DropDownMenuItem onClick={onDeleteClick} description="Delete transaction" icon={<MdDeleteForever />} />
                <DropDownMenuItem onClick={onChangeClick} description="Change transaction" icon={<FiEdit3 />} />
            </DropDownMenu>
        </td>
    );
};
