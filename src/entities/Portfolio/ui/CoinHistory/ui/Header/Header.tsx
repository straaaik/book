import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import cls from './Header.module.scss';
import Image from 'next/image';
import { usePortfolioIcon } from '../../../../module/hooks/usePortfolioIcon';

interface HeaderProps {
    image?: string;
    name?: string;
    symbol?: string;
    isLoading?: boolean;
    portfolioName?: string;
}

export const Header = ({ image, name, symbol, isLoading, portfolioName }: HeaderProps) => {
    const PortfolioIcon = usePortfolioIcon(portfolioName || '');

    if (isLoading) {
        return (
            <div className={cls.Header}>
                <div className={cls.coinInfo}>
                    <Skeleton border="50%" />
                    <Skeleton width={200} />
                    <Skeleton width={50} />
                </div>
            </div>
        );
    }

    return (
        <div className={cls.Header}>
            <div className={cls.coinInfo}>
                {image && <Image src={image} alt={'icon'} width={50} height={50} />}
                <span className={cls.name}>{name}</span>
                <span className={cls.symbol}>{symbol}</span>
            </div>
            <div className={cls.portfolioInfo}>{PortfolioIcon && <PortfolioIcon className={cls.icon} />}</div>
        </div>
    );
};
