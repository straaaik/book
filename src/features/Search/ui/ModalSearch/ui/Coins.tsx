import cls from './Coins.module.scss';
import { ResponseType } from '@/shared/hooks/useDebounceSearch';
import { LazyList } from '@/shared/ui/LazyList/LazyList';
import { NotFoundResult } from '@/shared/ui/NotFoundResult/NotFoundResult';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { ListChildComponentProps } from 'react-window';

interface CoinsProps {
    className?: string;
    dataCoins: ResponseType;
    onClose: () => void;
    setValue: (value: string) => void;
}

export const Coins = ({ dataCoins, onClose, setValue }: CoinsProps) => {
    const onLinkClick = useCallback(() => {
        onClose();
        setValue('');
    }, [onClose, setValue]);

    const Row: React.FC<ListChildComponentProps<ResponseType>> = ({ index, style }) => {
        const coin = dataCoins?.[index];
        if (!coin) return null;

        let image;
        if ('image' in coin) image = coin.image;
        else image = coin.large;

        return (
            <Link style={style} onClick={onLinkClick} className={cls.link} href={`/coin/${coin.id}`} key={coin.id}>
                <div className={cls.wrapperName}>
                    <Image src={image} alt={coin.symbol} width={30} height={30} />
                    <div className={cls.name}>{coin.name}</div>
                    <div className={cls.symbol}>{coin.symbol}</div>
                </div>
            </Link>
        );
    };

    return <div className={cls.Coins}>{dataCoins?.length ? <LazyList Row={Row} itemCount={dataCoins.length} /> : <NotFoundResult />}</div>;
};
