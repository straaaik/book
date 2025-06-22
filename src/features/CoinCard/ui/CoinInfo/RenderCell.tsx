import { memo } from 'react';
import { FormatNumber, TextNumber } from '@/shared/ui/TextNumber/TextNumber';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface RenderCellProps {
    className?: string;
    value?: number;
    format: FormatNumber;
    highlight?: boolean;
    isLoading?: boolean;
}

export const RenderCell = memo(({ value, format, highlight, isLoading }: RenderCellProps) => {
    return value !== undefined && <td>{isLoading ? <Skeleton width={150} /> : <TextNumber text={value} format={format} highlight={highlight} />}</td>;
});
