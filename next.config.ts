import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['coin-images.coingecko.com'], // Разрешаем загрузку с CoinGecko
    },
};

export default nextConfig;
