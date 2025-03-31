import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './styles/notFound.module.scss';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/Button';
import Link from 'next/link';

interface notFoundProps {
    className?: string;
}

export default function notFound({ className }: notFoundProps) {
    return (
        <div className={classNames(cls.notFound, {}, [className])}>
            <div className={cls.description}>
                <div className={cls.error}>404</div>
                <div className={cls.text}>Page not found</div>
            </div>
            <Button theme={ButtonTheme.DANGER} size={ButtonSize.XL}>
                <Link href={'/'}>Go home</Link>
            </Button>
        </div>
    );
}
