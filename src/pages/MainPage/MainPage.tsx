import cls from './MainPage.module.scss';
import { CoinList } from './ui/CoinList/CoinList';

export function MainPage() {
    return (
        <div className={cls.Main}>
            <CoinList />
        </div>
    );
}
