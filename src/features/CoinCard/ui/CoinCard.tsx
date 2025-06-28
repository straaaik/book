import { CoinActions } from './CoinActions/CoinActions';
import { CoinInfo } from './CoinInfo/CoinInfo';
import { CoinName, CoinNameProps } from './CoinName/CoinName';

interface CoinInfoProps {
    isLoading?: boolean;
    className?: string;
    rank?: number;
    image?: string;
    name?: string;
    symbol?: string;
    price?: number;
    change1h?: number;
    change24h?: number;
    change7d?: number;
    marketCap?: number;
    volume?: number;
    circulatingSupply?: number;
    holdings?: [number, number];
    avgPrice?: number;
    profitLoss?: [number, number];
    id?: string;
    portfolioName?: string;
    onClick?: () => void;
}

export const CoinCard = (props: CoinInfoProps) => {
    const {
        isLoading,
        className,
        rank,
        name,
        image,
        symbol,
        id,
        price,
        change1h,
        change24h,
        change7d,
        marketCap,
        volume,
        circulatingSupply,
        holdings,
        avgPrice,
        profitLoss,
        portfolioName,
    } = props;

    const passedPropsInfo = {
        price: 'price' in props,
        change1h: 'change1h' in props,
        change24h: 'change24h' in props,
        change7d: 'change7d' in props,
        marketCap: 'marketCap' in props,
        volume: 'volume' in props,
        circulatingSupply: 'circulatingSupply' in props,
        holdings: 'holdings' in props,
        avgPrice: 'avgPrice' in props,
        symbol: 'symbol' in props,
        profitLoss: 'profitLoss' in props,
    };

    const passedPropsName = {
        portfolioName: 'portfolioName' in props,
        rank: 'rank' in props,
        name: 'name' in props,
        image: 'image' in props,
        symbol: 'symbol' in props,
        id: 'id' in props,
    };

    const propsName: CoinNameProps = {
        portfolioName: passedPropsName.portfolioName ? portfolioName || '0' : undefined,
        rank: passedPropsName.rank ? rank || 0 : undefined,
        name: passedPropsName.name ? name || '0' : undefined,
        image: passedPropsName.image ? image || '0' : undefined,
        symbol: passedPropsName.symbol ? symbol || '0' : undefined,
        id: passedPropsName.id ? id || '0' : undefined,
    };

    const propsInfo: CoinInfoProps = {
        price: passedPropsInfo.price ? price || 0 : undefined,
        change1h: passedPropsInfo.change1h ? change1h || 0 : undefined,
        change24h: passedPropsInfo.change24h ? change24h || 0 : undefined,
        change7d: passedPropsInfo.change7d ? change7d || 0 : undefined,
        marketCap: passedPropsInfo.marketCap ? marketCap || 0 : undefined,
        volume: passedPropsInfo.volume ? volume || 0 : undefined,
        circulatingSupply: passedPropsInfo.circulatingSupply ? circulatingSupply || 0 : undefined,
        holdings: passedPropsInfo.holdings ? holdings || [0, 0] : undefined,
        avgPrice: passedPropsInfo.avgPrice ? avgPrice || 0 : undefined,
        profitLoss: passedPropsInfo.profitLoss ? profitLoss || [0, 0] : undefined,
        symbol: passedPropsInfo.symbol ? symbol || '0' : undefined,
    };

    if (isLoading) {
        return (
            <tr className={className}>
                <CoinName {...propsName} isLoading={true} />
                <CoinInfo {...propsInfo} isLoading={true} />
                <CoinActions isLoading={true} />
            </tr>
        );
    }

    return (
        <tr className={className}>
            <CoinName {...propsName} />
            <CoinInfo {...propsInfo} />
            <CoinActions portfolio={Boolean(avgPrice)} coinInfo={{ name, symbol, image, current_price: price, id }} />
        </tr>
    );
};
