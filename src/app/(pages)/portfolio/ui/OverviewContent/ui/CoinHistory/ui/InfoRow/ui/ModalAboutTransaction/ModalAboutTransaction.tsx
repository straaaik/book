import { Modal } from '@/shared/ui/Modal/Modal';
import { Order } from '../../../../module/mergeOrders';
import { InfoBox } from '@/shared/ui/InfoBox/InfoBox';
import cls from './ModalAboutTransaction.module.scss';
import { LANG } from '@/shared/constant/constant';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { CounterBox } from '@/shared/ui/CounterBox/CounterBox';

interface ModalAboutTransactionProps {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    info: Order;
    symbol?: string;
}
//TODO добавить возможность редактирования транзакции, а не только просмотра
export const ModalAboutTransaction = ({ isOpen, info, onClose, symbol }: ModalAboutTransactionProps) => {
    return (
        <Modal className={cls.Content} isOpen={isOpen} onClose={() => onClose(false)} header="Transaction Details">
            <InfoBox className={info.type == 'sell' ? cls.sell : cls.buy} description="Type transaction" value={info.type.toUpperCase()} />
            <InfoBox description="Quantity" value={`${info.amount} ${symbol?.toUpperCase()}`} />
            <InfoBox description="Date" value={new Date(info.date).toLocaleString(LANG)} />
            <InfoBox description="Fees" value={info.fee} type="currency" />
            <InfoBox description="Price Per Coin" value={info.price} type="currency" />
            <InfoBox description="Notes" value={info.notes} />
            <CounterBox className={cls.total} description="Total Spent" value={info.price * info.amount} current="USD" />
            <Button className={cls.btnChange} theme={ButtonTheme.DANGER}>
                Change transaction
            </Button>
        </Modal>
    );
};
