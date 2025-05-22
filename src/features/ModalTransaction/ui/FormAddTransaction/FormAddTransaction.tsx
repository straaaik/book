import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './FormAddTransaction.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { InfoBox } from '@/shared/ui/InfoBox/infoBox';
import { ChooseCoin } from '../ModalTransaction';
import { SelectButton } from '@/shared/ui/SelectButton/selectButton';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { portfolioApi } from '@/entities/Portfolio';
import { Actions } from '../Actions/Actions';
import { IForm } from '../../module/types';
import { ButtonChoosesCoin } from '../ButtonChoosesCoin/ButtonChoosesCoin';
import { Inputs } from '../Inputs/Inputs';

interface FormAddTransactionProps {
    className?: string;
    chooseCoin: ChooseCoin;
    setChooseCoin: (item: null) => void;
    active: string;
}

export const FormAddTransaction = ({ className, chooseCoin, setChooseCoin, active }: FormAddTransactionProps) => {
    const [addCoin] = portfolioApi.useUpdateCoinToPortfolioMutation();

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IForm>({
        defaultValues: {
            name: chooseCoin.name,
            id: chooseCoin.id,
            price: chooseCoin.current_price?.toString() || '0',
            amount: '1',
            fee: '',
            notes: '',
            date: new Date(),
            options: 'buy',
        },
    });

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        setChooseCoin(null);
        await addCoin({
            id: data.id + active,
            name: data.name,
            amount: Number(data.amount),
            price: Number(data.price),
            date: data.date,
            fee: Number(data.fee),
            notes: data.notes,
            options: data.options,
            portfolio_name: active,
        });
    };

    const totalSpend = Number(watch('amount')) * Number(watch('price'));
    const imageCoin = chooseCoin.image || '';

    return (
        <form className={classNames(cls.AddTransaction, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="options"
                control={control}
                render={({ field }) => <SelectButton onSendData={field.onChange} className={cls.selectButton} items={['buy', 'sell']} />}
            />
            <ButtonChoosesCoin image={imageCoin} name={chooseCoin.name} symbol={chooseCoin.symbol} onClick={() => setChooseCoin(null)} />
            <Inputs control={control} />
            <Actions control={control} />
            <InfoBox className={cls.infoBox} description="Total Spent" value={totalSpend} current="usd" />
            <Button theme={ButtonTheme.INVERTED} type="submit" className={cls.buttonAdd}>
                {watch('options') == 'buy' ? 'Add' : 'Remove'}
            </Button>
        </form>
    );
};
