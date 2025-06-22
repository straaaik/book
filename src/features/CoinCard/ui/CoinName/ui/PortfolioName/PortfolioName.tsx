import cls from './PortfolioName.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { useIcon } from '@/shared/hooks/useIcon';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface PortfolioNameProps {
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
    rank?: number;
    portfolioName: string;
    onClick?: (id: string) => void;
    isLoading?: boolean;
}

export const PortfolioName = ({ rank, name, symbol, portfolioName, image, onClick, isLoading }: PortfolioNameProps) => {
    const PortfolioIcon = useIcon(portfolioName);

    const onCoinClick = () => {
        if (name) onClick?.(name);
    };

    if (isLoading)
        return (
            <>
                <td>
                    <div className={cls.link}>
                        <Skeleton border="50%" />
                        <Skeleton width={100} />
                    </div>
                </td>
                <td>
                    <Skeleton width={40} height={40} border="50%" />
                </td>
            </>
        );

    return (
        <>
            {rank && <td className={cls.rank}>{rank}</td>}
            <td>
                <Button className={cls.link} onClick={onCoinClick}>
                    {image && <Image className={cls.image} src={image} alt={image} width={30} height={30} />}
                    {name && <div className={cls.name}>{name}</div>}
                    {symbol && <div className={cls.symbol}>{symbol}</div>}
                </Button>
            </td>
            <td>
                <div className={cls.icon_wrapper}>
                    {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                    <span>{portfolioName}</span>
                </div>
            </td>
        </>
    );
};
