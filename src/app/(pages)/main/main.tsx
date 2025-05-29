import cls from './main.module.scss';
import { CoinList } from './ui/CoinList/CoinList';

export default function MainPage() {
    return (
        <div className={cls.Main}>
            <CoinList />
        </div>
    );
}
