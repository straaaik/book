import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import cls from './SelectCoin.module.scss';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { ChooseCoin } from '../ModalTransaction/ModalTransaction';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';

interface SelectCoinProps {
    className?: string;
    data?: CoinsListWithMarketData[];
    setChooseCoin: (info: ChooseCoin) => void;
}

export const SelectCoin = ({ className, data, setChooseCoin }: SelectCoinProps) => {
    const [value, setValue] = useState('');
    const onChangeHandler = (value: string) => {
        setValue(value);
    };

    const onButtonClick = (info: ChooseCoin) => {
        setChooseCoin(info);
    };

    const renderData = useMemo(() => {
        return data?.map(({ name, symbol, image, current_price, id }) => (
            <Button onClick={() => onButtonClick({ name, symbol, image, current_price, id })} className={cls.wrapper} theme={ButtonTheme.CLEAR} key={id}>
                <Image className={cls.image} src={image} alt={image} width={30} height={30} />
                <div className={cls.name}> {name}</div>
                <div className={cls.symbol}>{symbol}</div>
            </Button>
        ));
    }, [data]);

    return (
        <div className={classNames(cls.SelectCoin, {}, [className])}>
            <div className={cls.title}>
                <Input className={cls.input} value={value} onChange={onChangeHandler} placeholder="Search..." />
            </div>
            <div className={cls.content}>{Boolean(renderData) ? renderData : <LoadingSpinner />}</div>
        </div>
    );
};
