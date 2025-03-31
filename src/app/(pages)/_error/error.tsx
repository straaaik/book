import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/Button';
import cls from './error.module.scss';

interface errorProps {
    className?: string;
}

export const MyError = ({ className }: errorProps) => {
    return (
        <div className={cls.Error}>
            <div className={cls.description}>Something went wrong!</div>
            <Button theme={ButtonTheme.DANGER} size={ButtonSize.XL} onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
};
