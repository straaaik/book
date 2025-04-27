export const sortingData = <T>(data: T[], status: 'ascending' | 'descending', item: keyof T) => {
    if (status == 'ascending') {
        if (item == 'name') {
            return [...data].sort((a, b) => {
                if (a[item].toUpperCase() > b[item].toUpperCase()) return 1;
                if (a[item].toUpperCase() < b[item].toUpperCase()) return -1;
                return 0;
            });
        } else {
            return [...data].sort((a, b) => Number(b[item]) - Number(a[item]));
        }
    }
    if (status == 'descending') {
        if (item == 'name') {
            return [...data].sort((a, b) => {
                if (a[item].toUpperCase() < b[item].toUpperCase()) return 1;
                if (a[item].toUpperCase() > b[item].toUpperCase()) return -1;
                return 0;
            });
        } else {
            return [...data].sort((a, b) => Number(a[item]) - Number(b[item]));
        }
    } else {
        return [...data];
    }
};
