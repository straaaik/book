import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './NotFoundResult.module.scss';
import { TbSearch } from 'react-icons/tb';

interface NotFoundResultProps {
    className?: string;
}

export const NotFoundResult = ({ className }: NotFoundResultProps) => {
    return (
        <div className={classNames(cls.NotFoundResult, {}, [className])}>
            <TbSearch className={cls.iconSearch} />
            <div className={cls.description}>Coin was not found</div>
        </div>
    );
};
