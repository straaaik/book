import cls from './SelectCountCoins.module.scss';
import { Select } from '@/shared/ui/Select/Select';
import { Dispatch, SetStateAction } from 'react';

interface SelectCountCoinsProps {
    className?: string;
    limit: string;
    setLimit: Dispatch<SetStateAction<string>>;
}

export const SelectCountCoins = ({ limit, setLimit }: SelectCountCoinsProps) => {
    return (
        <div className={cls.SelectCountCoins}>
            <Select
                initialValue={limit}
                options={[
                    { description: '50', value: '50' },
                    { description: '100', value: '100' },
                    { description: '150', value: '150' },
                    { description: '200', value: '200' },
                ]}
                onChange={setLimit}
            />
        </div>
    );
};
