import { classNames } from '@/shared/lib/ClassNames/ClassNames';
import cls from './ModalCreatePortfolio.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { portfolioApi } from '@/entities/Portfolio';
import { PortfolioCard } from '../../../PortfolioCard/PortfolioCard';
import { SelectIcon } from '../SelectIcon/SelectIcon';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Icons } from '@/shared/assets/icon/PortfolioIcons';

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
    const [createPortfolio] = portfolioApi.useCreateNewPortfolioMutation();
    const { data } = portfolioApi.useGetPortfolioNamesQuery();

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<IForm>({
        defaultValues: {
            value: '',
            icon: null,
        },
    });

    const [value, icon] = watch(['value', 'icon']);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        reset();
        onClose();
        createPortfolio({ id: data.value, icon: data.icon?.name });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} header="Create portfolio">
            <form className={classNames(cls.ModalCreatePortfolio, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
                <PortfolioCard name={value} Icon={icon?.icon} />
                <Controller
                    name="value"
                    control={control}
                    rules={{
                        required: 'A portfolio cannot be without a name.',
                        validate: {
                            checkNames: (value) => {
                                if (data?.some((item) => item.id == value)) return 'Such a portfolio already exists.';
                            },
                        },
                    }}
                    render={({ field }) => <Input focus placeholder="Enter portfolio name" value={field.value} onChange={field.onChange} />}
                />
                <Controller name="icon" control={control} render={({ field }) => <SelectIcon active={field.value?.name} onClick={field.onChange} />} />
                {errors.value && <div className={cls.error}>{errors.value?.message}</div>}
                <Button type="submit" theme={ButtonTheme.DANGER}>
                    Create
                </Button>
            </form>
        </Modal>
    );
};
