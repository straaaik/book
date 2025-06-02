import cls from './CellsTransactionsInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { MdOutlineAttachMoney, MdMoneyOffCsred } from 'react-icons/md';
import { Order } from '@/app/(pages)/portfolio/ui/TransactionContent/module/getAllOrders';
import { LANG } from '@/shared/constant/constant';
import Image from 'next/image';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';

interface CellsTransactionsInfoProps {
    info: Order;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
}

export const CellsTransactionsInfo = ({ info, isOpen, onClose }: CellsTransactionsInfoProps) => {
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
                <div className={cls.coin_name}>
                    <Image alt={info.name} src={info.image} width={30} height={30} />
                    <span className={cls.name}>{info.name}</span>
                    <span className={cls.symbol}>{info.symbol}</span>
                </div>
            </td>
            <td>
                <div className={cls.date}>
                    <span className={cls.day}>{orderDate[0]}</span>
                    <span className={cls.time}>{orderDate[1]}</span>
                </div>
            </td>
            <td>
                <div className={cls.portfolio}>
                    <span className={cls.name}>{info.portfolio_name}</span>
                </div>
            </td>
            <td>
                <div className={classNames(cls.amount, modsType, [])}>
                    <span className={cls.currency}>
                        <TextNumber text={amountPrice} format="currencyRounded" />
                    </span>
                    <div className={cls.coins}>
                        <span>{info.amount}</span>
                        {info.symbol?.toUpperCase()}
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
            <td>
                <span className={cls.fee}>{info.notes ? info.notes : '-'}</span>
            </td>
        </>
    );
};
