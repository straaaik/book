'use client';

import React from 'react';
import Image from 'next/image';
import cls from './coin.module.scss';
import { useParams } from 'next/navigation';
import image from '@/../public/ImageHolder.png';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { Text } from '@/shared/ui/animation/text/Text';
import { InfoBox } from '@/shared/ui/infoBox/infoBox';
import { coinApi } from '@/entities/Coin';

export default function Coin() {
    const route = useParams();
    const id = route.id;
    const { data, error, isLoading } = coinApi.useGetCoinQuery(id);

    if (error) throw new Error();
    if (isLoading || !data) return <LoadingSpinner />;

    const marketCap = data.market_data.market_cap.usd;
    const fullyDilutedValuation = data.market_data?.fully_diluted_valuation.usd;
    const circulatingSupply = data.market_data?.circulating_supply;
    const totalSupply = data.market_data?.total_supply;
    const maxSupply = data.market_data?.max_supply;

    return (
        <div className={cls.aboutCoin}>
            <div className={cls.coin}>
                <Image alt={data.name || 'image'} src={data.image?.large || image} width={96} height={96} />
                <div className={cls.name}>{data.name}</div>
                <div className={cls.symbol}>{data.symbol}</div>
            </div>
            <Text className={cls.price} text={data.market_data?.current_price.usd} currency />

            <div className={cls.statistics_container}>
                <div className={cls.statistics}>
                    <InfoBox data={['Marker Cap', marketCap]} />
                    <InfoBox data={['Fully Diluted Valuation', fullyDilutedValuation]} />
                    <InfoBox data={['Circulating Supply', circulatingSupply]} />
                </div>
                <div className={cls.supply}>
                    <InfoBox data={['Total Supply', totalSupply]} secondData={['Max Supply', maxSupply]} />
                </div>
            </div>
        </div>
    );
}
