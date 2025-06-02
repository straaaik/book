import { portfolioApi } from '@/entities/Portfolio';
import { useIcon } from '@/shared/hooks/useIcon';
import cls from './PortfolioName.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';

interface PortfolioNameProps {
    image?: string;
    name?: string;
    symbol?: string;
    id: string;
    rank?: number;
    portfolioName: string;
    onClick?: (id: string) => void;
}

export const PortfolioName = ({ id, rank, name, symbol, portfolioName, image, onClick }: PortfolioNameProps) => {
    const icon = useIcon();
    const { data } = portfolioApi.useGetPortfolioNamesForIdQuery(portfolioName);
    const PortfolioIcon = icon(data?.[portfolioName]?.icon);

    return (
        <>
            {rank && <td className={cls.rank}>{rank}</td>}
            <td>
                <Button className={cls.link} onClick={() => onClick?.(id)}>
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
