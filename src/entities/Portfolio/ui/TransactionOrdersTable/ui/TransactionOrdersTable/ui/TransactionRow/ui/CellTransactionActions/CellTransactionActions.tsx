import { useDeleteTransactionMutation } from '../../../../../../../../model/endpoints/deleteTransaction';
import { Order } from '../../../../../../../../model/selectors/getHistory';
import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { MdDeleteForever } from 'react-icons/md';

export const CellTransactionActions = ({ info }: { info: Order }) => {
    const [deleteCoin] = useDeleteTransactionMutation();
    const onHandlerClick = () => {
        deleteCoin({ coinId: info.id_coin, transactionId: info.id, type: info.type });
    };

    return (
        <td>
            <DropDownMenu>
                <DropDownMenuItem onClick={onHandlerClick} description="Delete transaction" icon={<MdDeleteForever />} />
            </DropDownMenu>
        </td>
    );
};
