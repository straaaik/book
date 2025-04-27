'use client';

import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './portfolio.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { LoadingSpinner } from '../_loading/loading';
import { Coin, portfolioApi } from '@/entities/Portfolio';
import { CoinCard, NewTransaction } from '@/features';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { Sorted } from '@/features/Sorted/Sorted';
import { useEffect, useState } from 'react';

interface portfolioProps {
    className?: string;
}

const Portfolio = ({ className }: portfolioProps) => {
    const [portfolio, setPortfolio] = useState<Coin[]>([]);
    const { data: dataPortfolio, error: dataPortfolioError, isLoading: dataPortfolioIsLoading } = portfolioApi.useGetPortfolioQuery();

    useEffect(() => {
        if (dataPortfolio) setPortfolio(dataPortfolio);
    }, [dataPortfolio]);

    if (dataPortfolioError) return new Error();

    return (
        <div className={classNames(cls.Portfolio, {}, [className])}>
            <div className={cls.info_Portfolio}>
                <div className={cls.name_Portfolio}>Main</div>
                <div className={cls.price_Portfolio}>
                    <TextNumber text={123123} currency />
                </div>
                <div className={cls.price_change_Portfolio}>-256</div>
            </div>
            <div className={cls.chart}>
                ТЕСТОВАЯ ТАБЛИЦА
                <div>
                    <Button>History</Button>
                </div>
                {/* <Line data={data} /> */}
            </div>
            <div className={cls.holdings}>
                <NewTransaction />
                <Sorted name price holdings avgPrice change1h change24h change7d data={portfolio} setData={setPortfolio} />
                {dataPortfolioIsLoading ? (
                    <LoadingSpinner />
                ) : true ? (
                    portfolio?.map((item) => (
                        <CoinCard
                            key={item.id}
                            name={item.name}
                            symbol={item.symbol}
                            price={item.current_price}
                            image={item.image}
                            holdings={[item.holdings * item.current_price, item.holdings]}
                            avgPrice={item.avgPrice}
                            change1h={item.price_change_percentage_1h_in_currency}
                            change24h={item.price_change_percentage_24h_in_currency}
                            change7d={item.price_change_percentage_7d_in_currency}
                        />
                    ))
                ) : (
                    <div className={cls.empty}>Your portfolio is empty</div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
