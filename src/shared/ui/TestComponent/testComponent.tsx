import { FC, useRef, useState, useEffect } from 'react';
import cls from './testComponent.module.scss';
import { useAnimate } from 'motion/react';

interface SelectButtonProps {
    items: string[];
    className?: string;
}

export const TestSelectButton: FC<SelectButtonProps> = ({ items, className }) => {
    const containerRef = useRef<HTMLUListElement>(null);
    const [selected, setSelected] = useState(items[0]);

    const [slideRef, animate] = useAnimate();

    const moveSlide = (el: HTMLElement) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const itemRect = el.getBoundingClientRect();

        if (containerRect) {
            const left = itemRect.left - containerRect.left;
            const width = itemRect.width;

            animate(
                slideRef.current,
                {
                    left,
                    width,
                },
                { duration: 0.3 }
            );
        }
    };

    const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, item: string) => {
        setSelected(item);
        moveSlide(e.currentTarget);
    };

    useEffect(() => {
        const activeEl = containerRef.current?.querySelector('.active');
        if (activeEl) moveSlide(activeEl as HTMLElement);
    }, []);

    return (
        <ul ref={containerRef} className={`${cls.selectButton} ${className || ''}`}>
            <div ref={slideRef} className={cls.slide} />
            {items.map((item) => (
                <li key={item} className={`${cls.item} ${item === selected ? 'active' : ''}`} onClick={(e) => handleItemClick(e, item)}>
                    {item}
                </li>
            ))}
        </ul>
    );
};
