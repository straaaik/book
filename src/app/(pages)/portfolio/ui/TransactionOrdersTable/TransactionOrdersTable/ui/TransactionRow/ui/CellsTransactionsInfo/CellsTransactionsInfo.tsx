import cls from './CellsTransactionsInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { MdOutlineAttachMoney, MdMoneyOffCsred } from 'react-icons/md';
import { LANG } from '@/shared/constant/constant';
import Image from 'next/image';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Order } from '@/entities/Portfolio';
import { useIcon } from '@/shared/hooks/useIcon';
import { Columns } from '../../../../TransactionOrdersTable';

interface CellsTransactionsInfoProps {
    info: Order;
    show: Columns;
}

export const CellsTransactionsInfo = ({ info, show }: CellsTransactionsInfoProps) => {
    const { type, name, image, symbol, portfolio_name, amount, price, fee, notes } = info;
    const PortfolioIcon = useIcon(portfolio_name);
    const orderDate = new Date(info.date).toLocaleString(LANG).split(',');
    const amountPrice = info.amount * info.price;
    const modsType = {
        [cls.typeBuy]: info.type == 'buy',
        [cls.typeSell]: info.type == 'sell',
    };

    return (
        <>
            {show.type && (
                <td>
                    <div className={classNames(cls.type, modsType, [])}>
                        <span className={cls.icon}>{type == 'buy' ? <MdOutlineAttachMoney /> : <MdMoneyOffCsred />}</span>
                        <span className={cls.text}>{type}</span>
                    </div>
                </td>
            )}

            {show.name && (
                <td>
                    <div className={cls.coin_name}>
                        <Image alt={name} src={image} width={30} height={30} />
                        <span className={cls.name}>{name}</span>
                        <span className={cls.symbol}>{symbol}</span>
                    </div>
                </td>
            )}

            {show.date && (
                <td>
                    <div className={cls.date}>
                        <span className={cls.day}>{orderDate[0]}</span>
                        <span className={cls.time}>{orderDate[1]}</span>
                    </div>
                </td>
            )}

            {show.portfolio_name && (
                <td>
                    <div className={cls.portfolio}>
                        {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                        <span className={cls.name}>{portfolio_name}</span>
                    </div>
                </td>
            )}

            {show.amount && (
                <td>
                    <div className={classNames(cls.amount, modsType, [])}>
                        <span className={cls.currency}>
                            <TextNumber text={amountPrice} format="currencyRounded" />
                        </span>
                        <div className={cls.coins}>
                            <span>{amount}</span>
                            {symbol?.toUpperCase()}
                        </div>
                    </div>
                </td>
            )}
            {show.price && (
                <td>
                    <span className={cls.price}>
                        <TextNumber text={price} format="currencyRounded" />
                    </span>
                </td>
            )}
            {show.fee && (
                <td>
                    <span className={cls.fee}>
                        <TextNumber text={fee} format="currencyRounded" />
                    </span>
                </td>
            )}
            {show.notes && (
                <td>
                    <span className={cls.fee}>{notes ? notes : '-'}</span>
                </td>
            )}
        </>
    );
};
