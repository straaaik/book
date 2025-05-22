import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './PortfoliosInfo.module.scss';
import { PortfolioCard } from '../PortfolioCard/PortfolioCard';
import { Portfolio, portfolioApi } from '@/entities/Portfolio';
import { CreatePortfolio } from '../CreatePortfolio/CreatePortfolio';
import { ICONS } from '@/shared/assets/icon/PortfolioIcons';

interface PortfolioInfoProps {
    className?: string;
    portfolio: Portfolio[];
    active: string;
    setActive: (arg: string) => void;
}

export const PortfoliosInfo = ({ className, portfolio, active, setActive }: PortfolioInfoProps) => {
    const { data: portfolioNames } = portfolioApi.useGetPortfolioNamesQuery();

    const renderCoin = (name?: string) => {
        const icon = ICONS.filter((item) => item.name == name);
        return icon[0].icon;
    };

    return (
        <div className={classNames(cls.PortfolioInfo, {}, [className])}>
            <div className={cls.overview_wrapper}>
                <PortfolioCard active={active} setActive={setActive} portfolio={portfolio} name="Overview" />
            </div>
            <div className={cls.input_wrapper}>
                {portfolioNames?.map((item) => (
                    <PortfolioCard
                        active={active}
                        setActive={setActive}
                        portfolio={portfolio?.filter((coin) => coin.portfolio_name === item.id)}
                        key={item.id}
                        name={item.id}
                        Icon={item.icon && renderCoin(item.icon)}
                    />
                ))}
            </div>
            <div className={cls.btn_wrapper}>
                <CreatePortfolio className={cls.btnAdd} />
            </div>
        </div>
    );
};
