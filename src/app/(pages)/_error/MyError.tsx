import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/Button';
import cls from './MyError.module.scss';
import Router from 'next/router';
interface MyErrorProps {
    error: string;
}
export const MyError = ({ error }: MyErrorProps) => {
    return (
        <div className={cls.Error}>
            <div className={cls.description}>{error}</div>
            <Button theme={ButtonTheme.DANGER} size={ButtonSize.XL} onClick={() => Router.reload()}>
                Try again
            </Button>
        </div>
    );
};
