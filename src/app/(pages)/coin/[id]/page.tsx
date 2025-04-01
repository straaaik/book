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

export default function Coin() {
    const route = useParams();
    const id = route.id;
    const { data, error, isLoading } = useSWR<Coin>(`https://api.coingecko.com/api/v3/coins/${id}`, fetcher);

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
            <div className={cls.price}>${data.market_data?.current_price.usd}</div>
            <div className={cls.statistics}>
                <div>
                    <span>Marker Cap</span> ${marketCap?.toLocaleString('en-EN')}
                </div>
                <div>
                    <span>FDV</span> ${fullyDilutedValuation?.toLocaleString('en-EN')}
                </div>
                <div>
                    <span>Circulating Supply</span> ${circulatingSupply?.toLocaleString('en-EN')}
                </div>
                <div>
                    <span>Total Supply</span> ${totalSupply?.toLocaleString('en-EN')}
                </div>
                <div>
                    <span>Max Supply</span> ${maxSupply?.toLocaleString('en-EN') || '∞'}
                </div>
            </div>
        </div>
    );
}
