'use client';

import cls from './ModalChangeTransaction.module.scss';
import { memo } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { OrderInfo } from '../../../../model/selectors/getHistory';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { MyDatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFormChanges } from '../../../../types/types';
import { useChangeTransactionMutation } from '../../../../model/endpoints/changeTransaction';

interface ModalChangeTransactionProps {
    isOpen: boolean;
    onClose: (arg: boolean) => void;
    info: OrderInfo[number];
    symbol?: string;
}

export const ModalChangeTransaction = memo(({ isOpen, info, onClose, symbol }: ModalChangeTransactionProps) => {
    const [changeTransaction] = useChangeTransactionMutation();
    const { handleSubmit, control } = useForm<IFormChanges>({
        defaultValues: {
            date: new Date(info.date),
            fee: info.fee.toString(),
            notes: info.notes,
            price: info.price.toString(),
            quantity: info.amount.toString(),
            coinId: info.id_coin,
            type: info.type,
            transactionId: info.id,
        },
    });

    const onSubmit: SubmitHandler<IFormChanges> = (data) => {
        changeTransaction(data);
    };

    return (
        <Modal className={cls.ModalChangeTransaction} isOpen={isOpen} onClose={() => onClose(false)} header="Transaction Changes">
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => <Input info="Quantity" value={field.value} badge={symbol?.toUpperCase()} onChange={field.onChange} />}
                />
                <Controller
                    name="fee"
                    control={control}
                    render={({ field }) => <Input info="Fees" value={field.value} type="currency" onChange={field.onChange} />}
                />
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input info="Price Per Coin" value={field.value} type="currency" onChange={field.onChange} />}
                />
                <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => <TextArea className={cls.textarea} onChange={field.onChange} value={field.value} description="Notes" />}
                />
                <div className={cls.datepickerWrapper}>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => <MyDatePicker onChange={field.onChange} selected={new Date(field.value)} />}
                    />
                </div>
                <Button type="submit" className={cls.btnChange} theme={ButtonTheme.DANGER}>
                    Change transaction
                </Button>
            </form>
        </Modal>
    );
});
