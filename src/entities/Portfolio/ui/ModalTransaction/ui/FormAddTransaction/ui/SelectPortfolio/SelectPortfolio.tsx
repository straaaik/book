import { Control, Controller } from 'react-hook-form';
import { IForm } from '../../../../module/types';
import { Select } from '@/shared/ui/Select/Select';
import { useGetPortfolioQuery } from '../../../../../../model/endpoints/getPortfolios';

interface SelectPortfolioProps {
    control: Control<IForm>;
}

export const SelectPortfolio = ({ control }: SelectPortfolioProps) => {
    const { data } = useGetPortfolioQuery();
    const options = data?.map((item) => {
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
                <Select
                    title="Portfolio"
                    error={fieldState.error?.message}
                    selectedValue={field.value}
                    options={options?.length ? options : [{ description: 'Choose portfolio', value: 'Choose portfolio' }]}
                    onChange={(option) => field.onChange(option.value)}
                />
            )}
        />
    );
};
