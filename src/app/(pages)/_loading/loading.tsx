import cls from './loading.module.scss';

export const LoadingSpinner = () => {
    return (
        <div className={cls.container}>
            <div className={cls.ldsRipple}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
