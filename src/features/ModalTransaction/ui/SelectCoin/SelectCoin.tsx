'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import cls from './SelectCoin.module.scss';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { coinApi } from '@/entities/Coin';
import { ChooseCoin } from '../ModalTransaction';
import { useDebounceSearch } from '@/shared/hooks/useDebounceSearch';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import ImageHolder from '../../../../../public/ImageHolder.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { NotFoundResult } from '@/shared/ui/NotFoundResult/NotFoundResult';

interface SelectCoinProps {
    className?: string;
    setChooseCoin: (info: ChooseCoin) => void;
}

export const SelectCoin = ({ className, setChooseCoin }: SelectCoinProps) => {
    const { data } = coinApi.useGetCoinListQuery();
    const [value, setValue] = useState('');
    const [dataCoins, isFetching, error, isError] = useDebounceSearch(data, value);

    const onChangeHandler = (value: string) => {
        setValue(value);
    };

    const onButtonClick = useCallback(
        (info: ChooseCoin) => {
            setChooseCoin(info);
        },
        [setChooseCoin]
    );

    const memoDataCoins = useMemo(
        () =>
            dataCoins?.map(({ name, symbol, image, current_price, id }) => {
                const imageSrc = image?.startsWith('http') ? image : ImageHolder;

                return (
                    <Button
                        onClick={() => onButtonClick({ name, symbol, image, current_price, id })}
                        className={cls.wrapper}
                        theme={ButtonTheme.CLEAR}
                        key={id}
                    >
                        <Image className={cls.image} src={imageSrc} alt={symbol} width={30} height={30} />
                        <div className={cls.name}> {name}</div>
                        <div className={cls.symbol}>{symbol}</div>
                    </Button>
                );
            }),
        [dataCoins, onButtonClick]
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
        <div className={classNames(cls.SelectCoin, {}, [className])}>
            <div className={cls.title}>
                <Input className={cls.input} value={value} onChange={onChangeHandler} placeholder="Search..." />
            </div>
            <div className={cls.content}>{renderContent()}</div>
        </div>
    );
};
