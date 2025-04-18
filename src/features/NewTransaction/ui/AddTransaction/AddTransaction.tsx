import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './AddTransaction.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';
import { InfoBox } from '@/shared/ui/infoBox/infoBox';
import Image from 'next/image';
import { ChooseCoin } from '../ModalTransaction/ModalTransaction';

interface AddTransactionProps {
    className?: string;
    chooseCoin: ChooseCoin;
    setChooseCoin: (item: null) => void;
}

export const AddTransaction = ({ className, chooseCoin, setChooseCoin }: AddTransactionProps) => {
    return (
        <div className={classNames(cls.AddTransaction, {}, [className])}>
            <div className={cls.header}>Add Transaction</div>
            <div className={cls.buttonChoose}>
                <Button>Buy</Button>
                <Button>Sell</Button>
            </div>
            <Button onClick={() => setChooseCoin(null)} className={cls.wrapper} theme={ButtonTheme.DANGER}>
                <Image className={cls.image} src={chooseCoin.image} alt={chooseCoin.image} width={30} height={30} />
                <div className={cls.name}> {chooseCoin.name}</div>
                <div className={cls.symbol}>{chooseCoin.symbol}</div>
            </Button>
            <div>
                <Input />
                <Input />
            </div>
            <InfoBox data={['Total Spent', 100]} />
            <Button>Add </Button>
        </div>
    );
};
