import { useAppDispatch } from '@/app/config/store/hooks';
import { Portfolio, portfolioActions } from '@/entities/Portfolio';
import { Sorted } from '@/features/Sorted/Sorted';
import cls from './PortfolioSorted.module.scss';

export const PortfolioSorted = () => {
    const dispatch = useAppDispatch();

    return (
        <Sorted<Portfolio>
            className={cls.wrapper}
            params={[
                {
                    sortKey: 'name',
                    text: 'Name',
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
            sortedFunction={(payload) => dispatch(portfolioActions.sortedPortfolio(payload))}
        />
    );
};
