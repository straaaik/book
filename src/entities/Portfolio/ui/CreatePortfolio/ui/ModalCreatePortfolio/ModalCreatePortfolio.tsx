import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalCreatePortfolio.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useCreateNewPortfolioMutation } from '../../../../model/endpoints/updatePortfolio/createNewPortfolio';
import { PortfolioCard } from '../../../PortfoliosInfo/ui/PortfolioCard/PortfolioCard';
import { SelectIcon } from '../SelectIcon/SelectIcon';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Icons } from '@/shared/assets/icon/PortfolioIcons';
import { useGetPortfoliosWithTransactionsQuery } from '../../../../model/endpoints/getPortfolios';

interface ModalCreatePortfolioProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    value: string;
    icon: Icons | null;
}

export const ModalCreatePortfolio = ({ className, isOpen, onClose }: ModalCreatePortfolioProps) => {
    const [createPortfolio] = useCreateNewPortfolioMutation();
    const { data } = useGetPortfoliosWithTransactionsQuery();

    const { handleSubmit, control, watch, reset } = useForm<IForm>({
        defaultValues: {
            value: '',
            icon: null,
        },
    });

    const [value, icon] = watch(['value', 'icon']);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        reset();
        onClose();
        console.log(data.icon);
        createPortfolio({ id: data.value, icon: data.icon?.name });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} header="Create portfolio">
            <form className={classNames(cls.ModalCreatePortfolio, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
                <PortfolioCard
                    className={cls.example}
                    portfolio={{ id: value, cost: 19821, initialCost: 1000, profit_loss_percentage: 19821 / 100 }}
                    Icon={icon?.icon}
                />
                <Controller
                    name="value"
                    control={control}
                    rules={{
                        required: 'A portfolio cannot be without a name.',
                        validate: {
                            checkNames: (value) => {
                                if (data?.some((item) => item.id == value || value == 'Overview')) return 'Such a portfolio already exists.';
                            },
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <Input error={fieldState.error?.message} focus placeholder="Enter name..." value={field.value} onChange={field.onChange} />
                    )}
                />
                <Controller name="icon" control={control} render={({ field }) => <SelectIcon active={field.value?.name} onClick={field.onChange} />} />
                <Button type="submit" theme={ButtonTheme.DANGER}>
                    Create
                </Button>
            </form>
        </Modal>
    );
};
