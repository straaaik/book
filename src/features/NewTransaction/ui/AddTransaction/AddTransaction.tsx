import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './AddTransaction.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { InfoBox } from '@/shared/ui/InfoBox/infoBox';
import Image from 'next/image';
import { ChooseCoin } from '../ModalTransaction/ModalTransaction';
import { SelectButton } from '@/shared/ui/SelectButton/selectButton';
import { useState } from 'react';
import { portfolioApi } from '@/entities/Portfolio';
import { OperationType } from '@/shared/types/types';

interface AddTransactionProps {
    className?: string;
    chooseCoin: ChooseCoin;
    setChooseCoin: (item: null) => void;
}

export const AddTransaction = ({ className, chooseCoin, setChooseCoin }: AddTransactionProps) => {
    const [selectOption, setSelectOption] = useState<string>('buy');
    const [quantity, setQuantity] = useState<string>('1');
    const [price, setPrice] = useState<string>(chooseCoin.current_price.toString());
    const [addCoin] = portfolioApi.useUpdateCoinToPortfolioMutation();

    const handlerAddClick = async () => {
        setChooseCoin(null);

        await addCoin([
            selectOption as OperationType,
            {
                id: chooseCoin.id,
                name: chooseCoin.name,
                amounts: [Number(quantity)],
                prices: [Number(price)],
            },
        ]);
    };

    const onChangeQuantity = (value: string) => {
        setQuantity(value);
    };

    const onChangePrice = (value: string) => {
        setPrice(value);
    };

    const selectedItem = (item: string) => {
        setSelectOption(item);
    };

    return (
        <div className={classNames(cls.AddTransaction, {}, [className])}>
            <SelectButton onSendData={selectedItem} className={cls.selectButton} items={['buy', 'sell']} />
            <Button onClick={() => setChooseCoin(null)} className={cls.wrapperSelect} theme={ButtonTheme.DANGER}>
                <Image className={cls.image} src={chooseCoin.image} alt={chooseCoin.image} width={30} height={30} />
                <div className={cls.name}> {chooseCoin.name}</div>
                <div className={cls.symbol}>{chooseCoin.symbol}</div>
            </Button>
            <div className={cls.input_wrapper}>
                <Input info="Price Per Coin" value={price} onChange={onChangePrice} />
                <Input info="Quantity" value={quantity} onChange={onChangeQuantity} />
            </div>
            <InfoBox className={cls.infoBox} data={['Total Spent', Number(price) * Number(quantity)]} />
            <Button theme={ButtonTheme.INVERTED} onClick={handlerAddClick} className={cls.buttonAdd}>
                {selectOption == 'buy' ? 'Add' : 'Remove'}
            </Button>
        </div>
    );
};
