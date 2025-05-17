import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './Actions.module.scss';
import { Control, Controller } from 'react-hook-form';
import { ButtonPicker } from '@/shared/ui/ButtonPicker/ButtonPicker';
import { MyDatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Input } from '@/shared/ui/Input/Input';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { LuPenLine } from 'react-icons/lu';
import { MdAttachMoney } from 'react-icons/md';
import { IForm } from '../../module/types';

interface ActionsProps {
    className?: string;
    control: Control<IForm>;
}

export const Actions = ({ className, control }: ActionsProps) => {
    return (
        <div className={classNames(cls.Actions, {}, [className])}>
            <Controller
                name="fee"
                control={control}
                render={({ field }) => (
                    <ButtonPicker icon={<MdAttachMoney />} text="Fee" item={<Input focus value={field.value} onChange={field.onChange} badge="USD" />} />
                )}
            />
            <Controller name="date" control={control} render={({ field }) => <MyDatePicker selected={field.value} onChange={field.onChange} />} />

            <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                    <ButtonPicker
                        icon={<LuPenLine />}
                        text="Notes"
                        item={<TextArea className={cls.notesInput} value={field.value} onChange={field.onChange} />}
                    />
                )}
            />
        </div>
    );
};
