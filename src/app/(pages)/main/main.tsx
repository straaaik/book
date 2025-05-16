import { CoinList } from './ui/CoinList/CoinList';
import cls from './main.module.scss';

export default function MainPage() {
    return (
        <div className={cls.Main}>
            <CoinList />
        </div>
    );
}
