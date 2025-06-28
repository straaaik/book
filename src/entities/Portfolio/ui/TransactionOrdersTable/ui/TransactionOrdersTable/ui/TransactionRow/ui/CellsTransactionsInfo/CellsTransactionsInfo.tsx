import cls from './CellsTransactionsInfo.module.scss';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { MdOutlineAttachMoney, MdMoneyOffCsred } from 'react-icons/md';
import { LANG } from '@/shared/constant/constant';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Columns } from '../../../../TransactionOrdersTable';
import { Transaction } from '../../../../../../../../types/transactionsType';
import Image from 'next/image';
import { usePortfolioIcon } from '@/entities/Portfolio';

interface CellsTransactionsInfoProps {
    info: Transaction;
    show: Columns;
}

export const CellsTransactionsInfo = ({ info, show }: CellsTransactionsInfoProps) => {
    const { type, amount, price, fee, notes, coin, coinName, portfolioId } = info;
    const PortfolioIcon = usePortfolioIcon(portfolioId);

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

            {show.coin && coin && (
                <td>
                    <div className={cls.coin_name}>
                        <Image src={coin?.image} alt={coinName} width={30} height={30} />
                        <span className={cls.icon}>{coin?.name}</span>
                        <span className={cls.symbol}>{coin?.symbol}</span>
                    </div>
                </td>
            )}

            {show.portfolioId && (
                <td>
                    <div className={cls.portfolio}>
                        {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                        <span className={cls.name}>{portfolioId}</span>
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

            {show.amount && (
                <td>
                    <div className={classNames(cls.amount, modsType, [])}>
                        <span className={cls.currency}>
                            <TextNumber text={amountPrice} format="currencyRounded" />
                        </span>
                        <div className={cls.coins}>
                            <span>{amount}</span>
                            <span>{coin?.symbol.toUpperCase()}</span>
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
