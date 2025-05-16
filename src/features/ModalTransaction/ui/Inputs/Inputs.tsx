import { Input } from '@/shared/ui/Input/Input';
import { Control, Controller } from 'react-hook-form';
import cls from './Inputs.module.scss';
import { IForm } from '../../module/types';

interface InputsProps {
    control: Control<IForm>;
}

export const Inputs = ({ control }: InputsProps) => {
    return (
        <div className={cls.input_wrapper}>
            <Controller
                name="price"
                control={control}
                render={({ field }) => <Input info="Price Per Coin" value={field.value} onChange={field.onChange} badge="USD" />}
            />
            <Controller name="amount" control={control} render={({ field }) => <Input info="Quantity" value={field.value} onChange={field.onChange} />} />
        </div>
    );
};
