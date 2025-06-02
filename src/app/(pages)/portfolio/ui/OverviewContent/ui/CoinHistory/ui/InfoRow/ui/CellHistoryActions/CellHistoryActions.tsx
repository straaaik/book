import { DropDownMenu, DropDownMenuItem } from '@/shared/ui/DropDownMenu';
import { MdDeleteForever } from 'react-icons/md';

export const CellHistoryActions = () => {
    return (
        <td>
            <DropDownMenu>
                <DropDownMenuItem description="Delete transaction" icon={<MdDeleteForever />} />
            </DropDownMenu>
        </td>
    );
};
