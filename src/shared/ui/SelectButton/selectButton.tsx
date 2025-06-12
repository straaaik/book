import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './selectButton.module.scss';
import { motion } from 'motion/react';
import { memo, useState } from 'react';

interface selectButtonProps {
    className?: string;
    items: string[];
    onSendData: (item: string) => void;
}

const ActiveSwiper = () => {
    return <motion.div className={cls.swiper} layoutId="swiper"></motion.div>;
};

export const SelectButton = memo(({ className, items, onSendData }: selectButtonProps) => {
    const [selected, setSelected] = useState(items[0]);

    const handlerItemClick = (item: string) => {
        setSelected(item);
        onSendData(item);
    };

    return (
        <ul className={classNames(cls.selectButton, {}, [className])}>
            {items.map((item) => (
                <li className={cls.item} key={item} onClick={() => handlerItemClick(item)}>
                    <div className={cls.item_content}>{item}</div>
                    {selected == item && <ActiveSwiper />}
                </li>
            ))}
        </ul>
    );
});
