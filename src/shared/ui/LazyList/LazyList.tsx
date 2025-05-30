import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface LazyListProps {
    itemCount: number;
    Row: React.FC<ListChildComponentProps>;
}

export const LazyList = ({ itemCount, Row }: LazyListProps) => {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <List height={height} itemCount={itemCount} itemSize={50} width={width}>
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
};
