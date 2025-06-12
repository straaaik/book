import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './NotFoundResult.module.scss';
import { TbSearch } from 'react-icons/tb';
import { memo } from 'react';

interface NotFoundResultProps {
    className?: string;
}

export const NotFoundResult = memo(({ className }: NotFoundResultProps) => {
    return (
        <div className={classNames(cls.NotFoundResult, {}, [className])}>
            <TbSearch className={cls.iconSearch} />
            <div className={cls.description}>Coin was not found</div>
        </div>
    );
});
