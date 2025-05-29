import { Button } from '@/shared/ui/Button/Button';
import cls from './CoinName.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useIcon } from '@/shared/hooks/useIcon';
import { portfolioApi } from '@/entities/Portfolio';

interface CoinNameProps {
    className?: string;
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
    rank?: number;
    portfolioName?: string;
}

export const CoinName = ({ name, image, symbol, id, rank, portfolioName }: CoinNameProps) => {
    const { data } = portfolioApi.useGetPortfolioNamesQuery();
    const iconName = data?.find((item) => item.id == portfolioName);
    const icon = useIcon();
    const PortfolioIcon = icon(iconName?.icon);

    return (
        <>
            {rank && <td className={cls.rank}>{rank}</td>}
            <td>
                <Button>
                    <Link href={`/coin/${id}`} className={cls.link}>
                        {image && <Image className={cls.image} src={image} alt={image} width={30} height={30} />}
                        {name && <div className={cls.name}>{name}</div>}
                        {symbol && <div className={cls.symbol}>{symbol}</div>}
                    </Link>
                </Button>
            </td>
            {portfolioName && (
                <td>
                    <div className={cls.icon_wrapper}>
                        {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                        <span>{portfolioName}</span>
                    </div>
                </td>
            )}
        </>
    );
};
