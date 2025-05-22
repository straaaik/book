import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CreatePortfolioPage.module.scss';
import { CreatePortfolio } from '../CreatePortfolio/CreatePortfolio';

interface CreatePortfolioPageProps {
    className?: string;
}

export const CreatePortfolioPage = ({ className }: CreatePortfolioPageProps) => {
    return (
        <div className={classNames(cls.CreatePortfolioPage, {}, [className])}>
            <div className={cls.description}>{"You don't have any portfolio."}</div>
            <CreatePortfolio className={cls.btnAdd} />
        </div>
    );
};
