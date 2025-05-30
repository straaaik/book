import { Input } from '@/shared/ui/Input/Input';
import { Control, Controller } from 'react-hook-form';
import cls from './Inputs.module.scss';
import { IForm } from '../../../../module/types';

interface InputsProps {
    control: Control<IForm>;
}

export const Inputs = ({ control }: InputsProps) => {
    return (
        <div className={cls.input_wrapper}>
            <Controller
                name="price"
                control={control}
                rules={{ required: 'The price must be specified.' }}
                render={({ field, fieldState }) => (
                    <Input info="Price Per Coin" value={field.value} regex="number" error={fieldState.error?.message} onChange={field.onChange} badge="USD" />
                )}
            />
            <Controller
                name="amount"
                rules={{ required: 'The quantity must be specified.' }}
                control={control}
                render={({ field, fieldState }) => (
                    <Input info="Quantity" error={fieldState.error?.message} focus regex="number" value={field.value} onChange={field.onChange} />
                )}
            />
        </div>
    );
};
