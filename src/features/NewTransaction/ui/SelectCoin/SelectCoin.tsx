import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import cls from './SelectCoin.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { CoinsListWithMarketData } from '@/entities/Coin';
import { ChooseCoin } from '../ModalTransaction/ModalTransaction';

interface SelectCoinProps {
    className?: string;
    data?: CoinsListWithMarketData[];
    setChooseCoin: (info: ChooseCoin) => void;
}

export const SelectCoin = ({ className, data, setChooseCoin }: SelectCoinProps) => {
    const [value, setValue] = useState<string>();
    const onChangeHandler = (value: string) => {
        setValue(value);
    };

    const onButtonClick = (info: ChooseCoin) => {
        setChooseCoin(info);
    };
    return (
        <div className={classNames(cls.SelectCoin, {}, [className])}>
            <div className={cls.title}>
                <div className={cls.header}>Select Coin</div>
                <Input className={cls.input} id="search" value={value} onChange={onChangeHandler} />
            </div>
            <div className={cls.content}>
                {data?.map(({ name, symbol, image, current_price, id }) => (
                    <Button onClick={() => onButtonClick({ name, symbol, image, current_price })} className={cls.wrapper} theme={ButtonTheme.CLEAR} key={id}>
                        <Image className={cls.image} src={image} alt={image} width={30} height={30} />
                        <div className={cls.name}> {name}</div>
                        <div className={cls.symbol}>{symbol}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
};
