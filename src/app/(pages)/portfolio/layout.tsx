import cls from './layout.module.scss';
import { PortfoliosInfo } from './ui/PortfoliosInfo/PortfoliosInfo';

interface ILayout {
    children: React.ReactNode;
}
export const layout = ({ children }: ILayout) => {
    return (
        <div className={cls.layout}>
            <PortfoliosInfo />
            {children}
        </div>
    );
};

export default layout;
