import cls from './Coins.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { ResponseType } from '@/shared/hooks/useDebounceSearch';
import { coinApi, CoinsListWithMarketData } from '@/entities/Coin';
import { NotFoundResult } from '@/shared/ui/NotFoundResult/NotFoundResult';
import { ListChildComponentProps } from 'react-window';
import { LazyList } from '@/shared/ui/LazyList/LazyList';

interface CoinsProps {
    setChooseCoin: (arg: CoinsListWithMarketData) => void;
    dataCoins: ResponseType;
}

export const Coins = ({ setChooseCoin, dataCoins }: CoinsProps) => {
    const [getCoin] = coinApi.useLazyGetCoinListWithMarketQuery();

    const onButtonClick = async (name: string) => {
        const coin = (await getCoin({ names: name })).data;
        if (coin) setChooseCoin(coin[0]);
    };

    const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
        const item = dataCoins?.[index];
        if (!item) return null;

        let image;
        if ('image' in item) image = item.image;
        else image = item.large;

        return (
            <Button style={style} onClick={() => onButtonClick(item.name)} className={cls.Btn} animation="bg" theme={ButtonTheme.CLEAR} key={item.id}>
                <Image className={cls.image} src={image} alt={item.symbol} width={30} height={30} />
                <div className={cls.name}> {item.name}</div>
                <div className={cls.symbol}>{item.symbol}</div>
            </Button>
        );
    };

    return <div className={cls.Coins}>{dataCoins?.length ? <LazyList Row={Row} itemCount={dataCoins.length} /> : <NotFoundResult />}</div>;
};
