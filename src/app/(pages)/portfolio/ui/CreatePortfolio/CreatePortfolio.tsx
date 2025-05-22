import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import { useState } from 'react';
import { ModalCreatePortfolio } from './ui/ModalCreatePortfolio/ModalCreatePortfolio';
import { ButtonCreatePortfolio } from './ui/ButtonCreatePortfolio/ButtonCreatePortfolio';

interface CreatePortfolioProps {
    className?: string;
}

export const CreatePortfolio = ({ className }: CreatePortfolioProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={classNames('', {}, [className])}>
            <ButtonCreatePortfolio onClick={() => setIsOpen(true)}>+</ButtonCreatePortfolio>
            <ModalCreatePortfolio isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
