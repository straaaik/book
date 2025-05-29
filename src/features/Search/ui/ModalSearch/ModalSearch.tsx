'use client';

import cls from './ModalSearch.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useState } from 'react';
import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { Input } from '@/shared/ui/Input/Input';
import { useDebounceSearch } from '@/shared/hooks/useDebounceSearch';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Coins } from './ui/Coins';

interface ModalSearchProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalSearch = ({ className, isOpen, onClose }: ModalSearchProps) => {
    const [value, setValue] = useState<string>('');
    const { response: dataCoins, isFetching } = useDebounceSearch(value);
    const onChangeValue = (value: string) => {
        setValue(value);
    };

    return (
        <Modal header="Search coin" className={classNames(cls.ModalSearch, {}, [className])} onClose={onClose} isOpen={isOpen}>
            <Input focus id="search" placeholder="Search coin..." className={cls.input} value={value} onChange={onChangeValue} />
            {!isFetching ? <Coins dataCoins={dataCoins} onClose={onClose} setValue={setValue} /> : <Skeleton className={cls.skeleton} value={8} />}
        </Modal>
    );
};
