import { Control, Controller } from 'react-hook-form';
import { IForm } from '../../../../module/types';
import { Select } from '@/shared/ui/Select/Select';
import { portfolioApi } from '@/entities/Portfolio';

interface SelectPortfolioProps {
    control: Control<IForm>;
}

export const SelectPortfolio = ({ control }: SelectPortfolioProps) => {
    const { data } = portfolioApi.useGetPortfolioNamesQuery();
    const options = data!.map((item) => {
        return { description: item.id, value: item.id };
    });

    return (
        <Controller
            name="portfolio_name"
            control={control}
            rules={{
                validate: {
                    checkNames: (value) => {
                        if (value == 'Choose portfolio') return 'Choose portfolio.';
                    },
                },
            }}
            render={({ field, fieldState }) => (
                <Select title="Portfolio" error={fieldState.error?.message} initialValue={field.value} options={options} onChange={field.onChange} />
            )}
        />
    );
};
