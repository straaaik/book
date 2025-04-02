'use client';

import React from 'react';
import Image from 'next/image';
import cls from './coin.module.scss';
import { useParams } from 'next/navigation';
import type { Coin } from '@/shared/types/types';
import image from '@/../public/ImageHolder.png';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { MyError } from '../../_error/MyError';
import { fetcher } from '@/shared/api/request';
import useSWR from 'swr';
import { Text } from '@/shared/ui/animation/text/Text';
import { InfoBox } from '@/shared/ui/infoBox/infoBox';
import { RELOAD_TIME } from '@/shared/constant/constant';

export default function Coin() {
    const route = useParams();
    const id = route.id;
    const { data, error, isLoading } = useSWR<Coin>(`coins/${id}`, fetcher, {
        refreshInterval: RELOAD_TIME,
    });

    if (isLoading || !data) return <LoadingSpinner />;
    if (error) return <MyError error={error} />;

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
            <Text className={cls.price} text={data.market_data?.current_price.usd} />
            <div className={cls.statistics_container}>
                <div className={cls.statistics}>
                    <InfoBox data={['Marker Cap', marketCap?.toLocaleString('en-EN')]} />
                    <InfoBox data={['Fully Diluted Valuation', fullyDilutedValuation?.toLocaleString('en-EN')]} />
                    <InfoBox data={['Circulating Supply', circulatingSupply?.toLocaleString('en-EN')]} />
                </div>
                <div className={cls.supply}>
                    <InfoBox
                        data={['Total Supply', totalSupply?.toLocaleString('en-EN')]}
                        secondData={['Max Supply', maxSupply?.toLocaleString('en-EN') || '∞']}
                    />
                </div>
            </div>
        </div>
    );
}
