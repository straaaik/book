import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './CreatePortfolioPage.module.scss';
import { TbFaceIdError } from 'react-icons/tb';
import { CreatePortfolio } from '@/entities/Portfolio';

interface CreatePortfolioPageProps {
    className?: string;
}

export const CreatePortfolioPage = ({ className }: CreatePortfolioPageProps) => {
    return (
        <div className={classNames(cls.CreatePortfolioPage, {}, [className])}>
            <div className={cls.description}>{"You don't have any portfolio."}</div>
            <CreatePortfolio className={cls.btnAdd} />
            <TbFaceIdError className={cls.icon} />
        </div>
    );
};
