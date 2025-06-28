import cls from './PortfolioName.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { usePortfolioIcon } from '@/entities/Portfolio';
import { portfolioPageActions } from '@/pages/PortfolioPage/model/slice/portfolioPageSlice';

interface PortfolioNameProps {
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
    rank?: number;
    portfolioName: string;
    isLoading?: boolean;
}

export const PortfolioName = ({ rank, name, symbol, portfolioName, image, isLoading }: PortfolioNameProps) => {
    const PortfolioIcon = usePortfolioIcon(portfolioName);
    const dispatch = useAppDispatch();

    const onCoinClick = () => {
        if (name && symbol && image) {
            dispatch(portfolioPageActions.changeSelectedCoin({ name, symbol, image, id: name + portfolioName }));
        }
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
