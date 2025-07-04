import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CreatePortfolioPage.module.scss';
import { TbFaceIdError } from 'react-icons/tb';
import { CreatePortfolio } from '../CreatePortfolio/ui/CreatePortfolio';

interface CreatePortfolioPageProps {
    className?: string;
}

export const CreatePortfolioPage = ({ className }: CreatePortfolioPageProps) => {
    return (
        <div className={classNames(cls.CreatePortfolioPage, {}, [className])}>
            <div className={cls.description}>{"You don't have any portfolio."}</div>
            <CreatePortfolio />
            <TbFaceIdError className={cls.icon} />
        </div>
    );
};
