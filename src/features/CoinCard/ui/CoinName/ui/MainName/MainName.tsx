import { Button } from '@/shared/ui/Button/Button';
import Link from 'next/link';
import cls from './MainName.module.scss';
import Image from 'next/image';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface MainNameProps {
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
    rank?: number;
    isLoading?: boolean;
}

export const MainName = ({ id, rank, name, symbol, image, isLoading }: MainNameProps) => {
    if (isLoading)
        return (
            <>
                <td>
                    <Skeleton width={30} height={30} />
                </td>
                <td>
                    <div className={cls.link}>
                        <Skeleton border="50%" />
                        <Skeleton width={100} />
                        <Skeleton width={100} />
                    </div>
                </td>
            </>
        );
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
        </>
    );
};
