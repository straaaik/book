import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CellsHistoryInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { Order } from '../../../../module/mergeOrders';
import { LANG } from '@/shared/constant/constant';
import { MdOutlineAttachMoney, MdMoneyOffCsred } from 'react-icons/md';

interface CellsHistoryInfoProps {
    info: Order;
    symbol?: string;
}

export const CellsHistoryInfo = ({ info, symbol }: CellsHistoryInfoProps) => {
    const orderDate = new Date(info.date).toLocaleString(LANG).split(',');
    const amountPrice = info.amount * info.price;
    const modsType = {
        [cls.typeBuy]: info.type == 'buy',
        [cls.typeSell]: info.type == 'sell',
    };

    return (
        <>
            <td>
                <div className={classNames(cls.type, modsType, [])}>
                    <span className={cls.icon}>{info.type == 'buy' ? <MdOutlineAttachMoney /> : <MdMoneyOffCsred />}</span>
                    <span className={cls.text}>{info.type}</span>
                </div>
            </td>
            <td>
                <div className={cls.date}>
                    <span className={cls.day}>{orderDate[0]}</span>
                    <span className={cls.time}>{orderDate[1]}</span>
                </div>
            </td>
            <td>
                <div className={classNames(cls.amount, modsType, [])}>
                    <span className={cls.currency}>
                        <TextNumber text={amountPrice} format="currencyRounded" />
                    </span>
                    <div className={cls.coins}>
                        <span>{info.amount}</span>
                        {symbol?.toUpperCase()}
                    </div>
                </div>
            </td>
            <td>
                <span className={cls.price}>
                    <TextNumber text={info.price} format="currencyRounded" />
                </span>
            </td>
            <td>
                <span className={cls.fee}>
                    <TextNumber text={info.fee} format="currencyRounded" />
                </span>
            </td>
        </>
    );
};
