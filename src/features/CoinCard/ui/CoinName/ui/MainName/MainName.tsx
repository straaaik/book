import { Button } from '@/shared/ui/Button/Button';
import Link from 'next/link';
import cls from './MainName.module.scss';
import Image from 'next/image';

interface MainNameProps {
    image?: string;
    name?: string;
    symbol?: string;
    id: string;
    rank?: number;
}

export const MainName = ({ id, rank, name, symbol, image }: MainNameProps) => {
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
