import { CoinByID } from '@/entities/Coin';
import cls from './Header.module.scss';
import Image from 'next/image';
import { Coin, portfolioApi } from '@/entities/Portfolio';
import { useIcon } from '@/shared/hooks/useIcon';

interface HeaderProps {
    serverCoin: CoinByID;
    selectCoin: Coin;
}

export const Header = ({ serverCoin, selectCoin }: HeaderProps) => {
    const { data: infoPortfolio } = portfolioApi.useGetPortfolioNamesForIdQuery(selectCoin.portfolio_name);
    const portfolioName = selectCoin.portfolio_name;
    const icon = useIcon();
    const PortfolioIcon = icon(infoPortfolio?.[portfolioName].icon);
    return (
        <div className={cls.Header}>
            <div className={cls.coinInfo}>
                {serverCoin?.image.large && <Image src={serverCoin?.image.large} alt={serverCoin?.name} width={50} height={50} />}
                <span className={cls.name}>{serverCoin?.name}</span>
                <span className={cls.symbol}>{serverCoin?.symbol}</span>
            </div>
            <div className={cls.portfolioInfo}>
                {PortfolioIcon && <PortfolioIcon className={cls.icon} />}
                <span className={cls.portfolioName}>{selectCoin.portfolio_name}</span>
            </div>
        </div>
    );
};
