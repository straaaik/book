'use client';

import { FiEdit3 } from 'react-icons/fi';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { MdDeleteForever } from 'react-icons/md';
import { useDeleteTransactionMutation } from '../../../../../../../../model/endpoints/deleteTransaction';
import { Transaction } from '../../../../../../../../types/transactionsType';

export const CellTransactionActions = ({ openChangeModal, info }: { openChangeModal: (arg: boolean) => void; info: Transaction }) => {
    const [deleteTransaction] = useDeleteTransactionMutation();
    const onDeleteClick = () => {
        deleteTransaction(info.id);
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
