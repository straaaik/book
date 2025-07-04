import { memo } from 'react';
import { Skeleton } from '../../Skeleton/Skeleton';

interface RenderCellProps {
    className?: string;
    value?: number | string;
    isLoading?: boolean;
    content: React.ReactNode;
}

export const RenderCell = memo(({ value, isLoading, content }: RenderCellProps) => {
    return <td>{value == undefined || isLoading ? <Skeleton width={150} /> : content}</td>;
});
