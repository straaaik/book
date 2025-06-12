'use client';

import React from 'react';
import Image from 'next/image';
import cls from './CoinDetailsPage.module.scss';
import { useParams } from 'next/navigation';
import image from '@/../public/ImageHolder.png';
import { coinApi } from '@/entities/Coin';
import { TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner/LoadingSpinner';

export function CoinDetailsPage() {
    const route = useParams();
    const id = route?.id;
    const { data, error, isLoading } = coinApi.useGetCoinQuery(id);

    if (error) throw new Error();
    if (isLoading || !data) return <LoadingSpinner />;

    // const marketCap = data.market_data.market_cap.usd;
    // const fullyDilutedValuation = data.market_data?.fully_diluted_valuation.usd;
    // const circulatingSupply = data.market_data?.circulating_supply;
    // const totalSupply = data.market_data?.total_supply;
    // const maxSupply = data.market_data?.max_supply;

    return (
        <div className={cls.aboutCoin}>
            <div className={cls.coin}>
                <Image alt={data.name || 'image'} src={data.image?.large || image} width={96} height={96} />
                <div className={cls.name}>{data.name}</div>
                <div className={cls.symbol}>{data.symbol}</div>
            </div>
            <TextNumber className={cls.price} text={data.market_data?.current_price.usd} format="currency" />

            <div className={cls.statistics_container}>
                <div className={cls.statistics}></div>
                <div className={cls.supply}></div>
            </div>
        </div>
    );
}
