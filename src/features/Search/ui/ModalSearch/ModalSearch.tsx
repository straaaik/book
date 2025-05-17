'use client';

import cls from './ModalSearch.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { CoinList } from '@/entities/Coin';
import { Input } from '@/shared/ui/Input/Input';
import Image from 'next/image';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { useDebounceSearch } from '@/shared/hooks/useDebounceSearch';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import ImageHolder from '../../../../../public/ImageHolder.png';
import { NotFoundResult } from '@/shared/ui/NotFoundResult/NotFoundResult';

interface ModalSearchProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    data?: CoinList[];
}

export const ModalSearch = ({ className, isOpen, onClose, data }: ModalSearchProps) => {
    const [value, setValue] = useState<string>('');
    const [dataCoins, isFetching, error, isError] = useDebounceSearch(data, value);

    const onChangeValue = (value: string) => {
        setValue(value);
    };

    const onLinkClick = useCallback(() => {
        onClose();
        setValue('');
    }, [onClose]);

    const memoDataCoins = useMemo(
        () =>
            dataCoins?.map((coin) => {
                const image = coin.image?.startsWith('http') ? coin.image : ImageHolder;

                return (
                    <Link onClick={onLinkClick} className={cls.link} href={`/coin/${coin.id}`} key={coin.id}>
                        <div className={cls.wrapperName}>
                            <Image src={image} alt={coin.symbol} width={30} height={30} />
                            <div className={cls.name}>{coin.name}</div>
                            <div className={cls.symbol}>{coin.symbol}</div>
                        </div>
                        <div className={cls.info}>
                            <TextNumber text={coin.price_change_percentage_1h_in_currency} format="percentages" highlight />
                        </div>
                    </Link>
                );
            }),
        [dataCoins, onLinkClick]
    );

    const renderContent = () => {
        if (isFetching || isError) {
            return <Skeleton value={8} className={cls.skeleton} />;
        } else {
            if (memoDataCoins?.length) {
                return memoDataCoins;
            } else {
                return <NotFoundResult />;
            }
        }
    };

    return (
        <Modal header="Search coin" className={classNames(cls.ModalSearch, {}, [className])} onClose={onClose} isOpen={isOpen}>
            <Input focus id="search" placeholder="Search coin..." className={cls.input} value={value} onChange={onChangeValue} />
            {renderContent()}
        </Modal>
    );
};
