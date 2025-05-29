import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './FormAddTransaction.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { InfoBox } from '@/shared/ui/InfoBox/infoBox';
import { SelectButton } from '@/shared/ui/SelectButton/selectButton';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { portfolioApi } from '@/entities/Portfolio';
import { Actions } from './ui/Actions/Actions';
import { IForm } from '../../module/types';
import { ButtonChoosesCoin } from './ui/ButtonChoosesCoin/ButtonChoosesCoin';
import { Inputs } from './ui/Inputs/Inputs';
import { SelectPortfolio } from './ui/SelectPortfolio/SelectPortfolio';
import { CoinsListWithMarketData } from '@/entities/Coin';

interface FormAddTransactionProps {
    className?: string;
    chooseCoin: CoinsListWithMarketData;
    setChooseCoin: (item: null) => void;
    active?: string;
}

export const FormAddTransaction = ({ className, chooseCoin, setChooseCoin, active }: FormAddTransactionProps) => {
    const [addCoin] = portfolioApi.useUpdateCoinToPortfolioMutation();

    const { handleSubmit, control, watch } = useForm<IForm>({
        defaultValues: {
            name: chooseCoin.name,
            id: chooseCoin.id,
            price: chooseCoin.current_price.toString() || '0',
            amount: '',
            fee: '',
            notes: '',
            date: new Date(),
            options: 'buy',
            portfolio_name: active == 'Overview' ? 'Choose portfolio' : active,
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        await addCoin({
            id: data.id,
            name: data.name,
            amount: Number(data.amount),
            price: Number(data.price),
            date: data.date,
            fee: Number(data.fee),
            notes: data.notes,
            options: data.options,
            portfolio_name: data.portfolio_name,
        });
        setChooseCoin(null);
    };

    const totalSpend = Number(watch('amount')) * Number(watch('price'));

    return (
        <form className={classNames(cls.AddTransaction, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="options"
                control={control}
                render={({ field }) => <SelectButton onSendData={field.onChange} className={cls.selectButton} items={['buy', 'sell']} />}
            />
            <SelectPortfolio control={control} />
            <ButtonChoosesCoin image={chooseCoin.image} name={chooseCoin.name} symbol={chooseCoin.symbol} onClick={() => setChooseCoin(null)} />
            <Inputs control={control} />
            <Actions control={control} />
            <InfoBox className={cls.infoBox} description="Total Spent" value={totalSpend} current="usd" />
            <Button theme={ButtonTheme.INVERTED} type="submit" className={cls.buttonAdd}>
                {watch('options') == 'buy' ? 'Add' : 'Remove'}
            </Button>
        </form>
    );
};
