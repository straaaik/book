import cls from './LoadingSpinner.module.scss';
import { memo } from 'react';

export const LoadingSpinner = memo(() => {
    return (
        <div className={cls.container}>
            <div className={cls.ldsRipple}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
});
