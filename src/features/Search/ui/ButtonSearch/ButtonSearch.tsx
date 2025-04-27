import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import cls from './ButtonSearch.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

interface ButtonSearchProps {
    onClick: () => void;
}

export const ButtonSearch = ({ onClick }: ButtonSearchProps) => {
    return (
        <Button theme={ButtonTheme.OPACITY} className={cls.ButtonSearch} onClick={onClick}>
            <div className={cls.placeholder}>Search</div>
            <AiOutlineSearch className={cls.icon} />
        </Button>
    );
};
