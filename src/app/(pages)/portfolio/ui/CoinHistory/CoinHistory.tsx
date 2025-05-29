import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CoinHistory.module.scss';
import { portfolioApi } from '@/entities/Portfolio';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { coinApi } from '@/entities/Coin';
import { IoChevronBackCircle } from 'react-icons/io5';
import Image from 'next/image';
import { LANG } from '@/shared/constant/constant';

interface CoinHistoryProps {
    className?: string;
    coin: string;
    setSelectCoin: (arg: null) => void;
}

export const CoinHistory = memo(({ className, coin, setSelectCoin }: CoinHistoryProps) => {
    const { data: selectCoin } = portfolioApi.useGetCoinForIdQuery(coin);
    const { data: serverCoin } = coinApi.useGetCoinQuery(selectCoin?.serverId, {
        skip: !selectCoin?.serverId,
    });

    return (
        <div className={classNames(cls.CoinHistory, {}, [className])}>
            <Button className={cls.btnBack} onClick={() => setSelectCoin(null)}>
                <IoChevronBackCircle />
            </Button>
            <div className={cls.title}>
                {serverCoin?.image.large && <Image src={serverCoin?.image.large} alt={serverCoin?.name} width={50} height={50} />}
                <span className={cls.name}>{serverCoin?.name}</span>
                <span className={cls.symbol}>{serverCoin?.symbol}</span>
            </div>
            <div className={cls.history}>
                <h1 className={cls.history_title}>Transactions</h1>
                BUY
                {selectCoin?.buy.map((item, i) => (
                    <div style={{ display: 'flex', gap: 10 }} key={i}>
                        <span>{new Date(item.date).toLocaleString(LANG)}</span>
                        <span>{item.amount}</span>
                        <span>{item.price}</span>
                    </div>
                ))}
                SELL
                {selectCoin?.sell.map((item, i) => (
                    <div style={{ display: 'flex', gap: 10 }} key={i}>
                        <span>{new Date(item.date).toLocaleString(LANG)}</span>
                        <span>{item.amount}</span>
                        <span>{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});
