import cls from './CoinName.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

interface CoinNameProps {
    className?: string;
    image?: string;
    name?: string;
    symbol?: string;
    id?: string;
}

export const CoinName = ({ name, image, symbol, id }: CoinNameProps) => {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={cls.name}>
            <Link className={cls.link} href={`/coin/${id}`}>
                {image && <Image className={cls.image} src={image} alt={image} width={30} height={30} />}
                {name && <div className={cls.name}>{name}</div>}
                {symbol && <div className={cls.symbol}>{symbol}</div>}
            </Link>
        </motion.div>
    );
};
