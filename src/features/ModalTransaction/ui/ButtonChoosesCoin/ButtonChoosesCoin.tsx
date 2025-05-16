import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import cls from './ButtonChoosesCoin.module.scss';

interface ButtonChoosesCoinProps {
    image: string;
    name?: string;
    symbol?: string;
    onClick: () => void;
}

export const ButtonChoosesCoin = ({ image, name, symbol, onClick }: ButtonChoosesCoinProps) => {
    return (
        <Button onClick={onClick} className={cls.wrapperSelect} scale={[1, 0.95]} animation="bg" theme={ButtonTheme.BORDER_WARN}>
            <div className={cls.icon}>
                <IoIosArrowBack />
            </div>
            <div className={cls.wrapperName}>
                <Image className={cls.image} src={image} alt={image} width={30} height={30} />
                <div className={cls.name}> {name}</div>
                <div className={cls.symbol}>{symbol}</div>
            </div>
        </Button>
    );
};
