import cls from './Header.module.scss';
import Image from 'next/image';

interface HeaderProps {
    image: string;
    name: string;
    symbol: string;
}

export const Header = ({ image, name, symbol }: HeaderProps) => {
    return (
        <div className={cls.Header}>
            <div className={cls.coinInfo}>
                {image && <Image src={image} alt={name} width={50} height={50} />}
                <span className={cls.name}>{name}</span>
                <span className={cls.symbol}>{symbol}</span>
            </div>
        </div>
    );
};
