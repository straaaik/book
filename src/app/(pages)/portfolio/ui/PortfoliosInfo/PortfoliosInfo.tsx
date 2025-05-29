import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfoliosInfo.module.scss';
import { PortfolioCard } from '../PortfolioCard/PortfolioCard';
import { Portfolio, portfolioApi } from '@/entities/Portfolio';
import { CreatePortfolio } from '../CreatePortfolio/CreatePortfolio';
import { useIcon } from '@/shared/hooks/useIcon';

interface PortfolioInfoProps {
    className?: string;
    portfolio: Portfolio[];
    active: string;
    setActive: (arg: string) => void;
}

export const PortfoliosInfo = ({ className, portfolio, active, setActive }: PortfolioInfoProps) => {
    const { data: portfolioNames } = portfolioApi.useGetPortfolioNamesQuery();
    const icon = useIcon();

    return (
        <div className={classNames(cls.PortfolioInfo, {}, [className])}>
            <PortfolioCard active={active} setActive={setActive} portfolio={portfolio} name="Overview" />
            {portfolioNames?.map((item) => (
                <PortfolioCard
                    active={active}
                    setActive={setActive}
                    portfolio={portfolio?.filter((coin) => coin.portfolio_name === item.id)}
                    key={item.id}
                    name={item.id}
                    Icon={item.icon && icon(item.icon)}
                />
            ))}
            <div className={cls.btn_wrapper}>
                <CreatePortfolio className={cls.btnAdd} />
            </div>
        </div>
    );
};
