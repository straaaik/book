import { classNames } from '../../lib/ClassNames/ClassNames';
import cls from './NavigationMenu.module.scss';
import { NavigationButton } from './ui/NavigationButton';
import { motion } from 'motion/react';

interface ILabels<T> {
    label: string;
    content: T;
}

interface NavigationMenuProps<T> {
    className?: string;
    activeContent: string;
    labels: ILabels<T>[];
    setContent: (arg: T) => void;
}

const variantsHover = {
    // hoverStart: {
    //     // height: 100,
    //     transition: { duration: 0.2, ease: 'easeInOut', repeat: 1 },
    // },
};

export const NavigationMenu = <T,>({ className, labels, activeContent, setContent }: NavigationMenuProps<T>) => {
    return (
        <ul className={classNames(cls.NavigationMenu, {}, [className])}>
            {labels.map((item) => (
                <motion.li className={cls.item} key={item.label}>
                    <NavigationButton key={item.label} onClick={() => setContent(item.content)} text={item.label} />
                    {activeContent == item.label && <motion.div variants={variantsHover} className={cls.swiper} layoutId="swiperNav" />}
                </motion.li>
            ))}
        </ul>
    );
};
