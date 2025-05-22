import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ButtonPicker.module.scss';
import { Button, ButtonTheme } from '../Button/Button';
import { memo, useEffect, useRef, useState } from 'react';

interface ButtonPickerProps {
    className?: string;
    icon?: React.ReactNode;
    text?: string;
    item?: React.ReactNode;
}

export const ButtonPicker = memo(({ className, icon, text, item }: ButtonPickerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsVisible]);

    return (
        <div className={classNames(cls.ButtonPicker, {}, [className])}>
            <Button className={cls.btn} theme={ButtonTheme.BORDER} onClick={() => setIsVisible(!isVisible)}>
                <span>{icon}</span>
                <span>{text}</span>
            </Button>
            {isVisible && (
                <div ref={ref} className={cls.item}>
                    {item}
                </div>
            )}
        </div>
    );
});
