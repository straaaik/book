'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cls from './coin.module.scss';
import { useParams } from 'next/navigation';
import type { Coin } from '@/shared/types/types';
import image from '@/../public/ImageHolder.png';
import { useFetching } from '@/shared/hooks/useFetching';
import { LoadingSpinner } from '@/app/(pages)/_loading/loading';
import { MyError } from '../../_error/MyError';
import { getCoinById } from '@/shared/api/request';

export default function Coin() {
    const [coin, setCoin] = useState<Partial<Coin>>({});
    const route = useParams();
    const id = route.id;
    const [data, isLoading, error] = useFetching<Partial<Coin>>(() => getCoinById(id));
    useEffect(() => {
        if (!isLoading && data) {
            setCoin(data);
        }
    }, [isLoading, data]);
    const marketCap = coin.market_data?.market_cap.usd;
    const fullyDilutedValuation = coin.market_data?.fully_diluted_valuation.usd;
    const circulatingSupply = coin.market_data?.circulating_supply;
    const totalSupply = coin.market_data?.total_supply;
    const maxSupply = coin.market_data?.max_supply;
    if (isLoading) return <LoadingSpinner />;
    if (error) return <MyError error={error} />;
    return (
        <div className={cls.aboutCoin}>
            <div className={cls.coin}>
                <Image alt={coin.name || 'image'} src={coin.image?.large || image} width={96} height={96} />
                <div className={cls.name}>{coin.name}</div>
                <div className={cls.symbol}>{coin.symbol}</div>
            </div>
            <div className={cls.price}>${coin.market_data?.current_price.usd}</div>
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
