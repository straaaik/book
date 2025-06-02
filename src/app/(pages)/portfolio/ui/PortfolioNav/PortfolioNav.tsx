import cls from './PortfolioNav.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Content } from '../../page';

interface PortfolioNavProps {
    setContent: (content: Content) => void;
    content: Content;
}

interface ButtonContent {
    label: string;
    content: Content;
}

export const PortfolioNav = ({ setContent, content }: PortfolioNavProps) => {
    const ButtonContent: ButtonContent[] = [
        { label: 'Overview', content: Content.OVERVIEW },
        { label: 'Transaction', content: Content.TRANSACTION },
    ];

    return (
        <div className={cls.PortfolioNav}>
            {ButtonContent.map((item) => (
                <Button theme={content == item.content ? ButtonTheme.INVERTED : ButtonTheme.CLEAR} key={item.label} onClick={() => setContent(item.content)}>
                    {item.label}
                </Button>
            ))}
        </div>
    );
};
