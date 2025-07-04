import { CoinList } from '@/entities/Coin';
import cls from './MainPage.module.scss';

export function MainPage() {
    return (
        <div className={cls.Main}>
            <CoinList />
        </div>
    );
}
