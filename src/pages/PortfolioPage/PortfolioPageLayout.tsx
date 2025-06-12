import cls from './PortfolioPageLayout.module.scss';
import { PortfoliosInfo } from '../../entities/Portfolio/ui/PortfoliosInfo/ui/PortfoliosInfo';

interface ILayout {
    children: React.ReactNode;
}
export const PortfolioPageLayout = ({ children }: ILayout) => {
    return (
        <div className={cls.layout}>
            <PortfoliosInfo />
            {children}
        </div>
    );
};

export default PortfolioPageLayout;
