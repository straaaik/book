import DatePicker from 'react-datepicker';
import cls from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonTheme } from '../Button/Button';
import { IoCalendarOutline } from 'react-icons/io5';

interface DatePickerProps {
    className?: string;
    selected: Date;
    onChange: () => void;
}

export const MyDatePicker = ({ selected, onChange }: DatePickerProps) => {
    return (
        <DatePicker
            customInput={
                <Button className={cls.btn} theme={ButtonTheme.BORDER}>
                    <span>{<IoCalendarOutline />}</span>
                    <span>{selected.toLocaleDateString()}</span>
                </Button>
            }
            className={cls.calendar}
            selected={selected}
            onChange={onChange}
        />
    );
};
