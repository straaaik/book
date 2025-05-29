import { Dispatch, SetStateAction } from 'react';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

interface PaginationMainPageProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export const PaginationMainPage = ({ page, setPage }: PaginationMainPageProps) => {
    return (
        <div>
            <Pagination onClick={setPage} value={page} />
        </div>
    );
};
