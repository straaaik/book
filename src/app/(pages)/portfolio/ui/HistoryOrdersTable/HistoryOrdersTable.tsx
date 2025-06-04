import { Table } from '@/shared/ui/Table/Table';
import { TransactionRow } from './ui/TransactionRow/TransactionRow';
import { TransactionSorted } from './ui/TransactionSorted/TransactionSorted';
import { OrderInfo } from '@/entities/Portfolio';

interface HistoryOrdersTableProps {
    orders?: OrderInfo;
    maxInfo?: boolean;
}

export const HistoryOrdersTable = ({ orders, maxInfo }: HistoryOrdersTableProps) => {
    return (
        <Table
            head={<TransactionSorted maxInfo={maxInfo} />}
            main={orders?.map((order) => (
                <TransactionRow maxInfo={maxInfo} key={order.date + order.name} info={order} />
            ))}
        />
    );
};
