import { Portfolio } from '@/entities/Portfolio/types/types';
import { Sorted } from '@/features/Sorted';
import { Dispatch, SetStateAction } from 'react';

export const PortfolioSorted = ({ setSortedData }: { setSortedData: Dispatch<SetStateAction<Portfolio[]>> }) => {
    return (
        <Sorted<Portfolio>
            setSortingData={setSortedData}
            params={[
                {
                    sortKey: 'name',
                    text: 'Name',
                },
                {
                    sortKey: 'portfolioId',
                    text: 'Portfolio',
                },
                {
                    sortKey: 'current_price',
                    text: 'Price',
                },
                {
                    sortKey: 'price_change_percentage_1h_in_currency',
                    text: '1h %',
                },
                {
                    sortKey: 'price_change_percentage_24h_in_currency',
                    text: '24h %',
                },
                {
                    sortKey: 'price_change_percentage_7d_in_currency',
                    text: '7d %',
                },
                {
                    sortKey: 'holdings_coin',
                    text: 'Holdings',
                },
                {
                    sortKey: 'avgPrice',
                    text: 'Avg. Price',
                },
                {
                    sortKey: 'profit_loss',
                    text: 'Profit / Loss',
                },
            ]}
        />
    );
};
