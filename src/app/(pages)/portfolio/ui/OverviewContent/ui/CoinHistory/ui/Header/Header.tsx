import cls from './Header.module.scss';
import Image from 'next/image';
import { getIcon } from '@/shared/lib/getIcon';
import { useIcon } from '@/shared/hooks/useIcon';

interface HeaderProps {
    image: string;
    name: string;
    symbol: string;
    portfolioName: string;
}

export const Header = ({ image, name, symbol, portfolioName }: HeaderProps) => {
    const PortfolioIcon = useIcon(portfolioName);

    return (
        <div className={cls.Header}>
            <div className={cls.coinInfo}>
                {image && <Image src={image} alt={name} width={50} height={50} />}
                <span className={cls.name}>{name}</span>
                <span className={cls.symbol}>{symbol}</span>
            </div>
            <div className={cls.portfolioInfo}>
                {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                <span className={cls.portfolioName}>{portfolioName}</span>
            </div>
        </div>
    );
};
