import { LANG } from '@/shared/constant/constant';
import { FormatNumber } from '../TextNumber';

export const NumberFormatter = (value: number, format?: FormatNumber) => {
    switch (format) {
        case 'currency':
            return Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'USD',
                roundingPriority: 'morePrecision',
            }).format(value);
        case 'percentages':
            return Intl.NumberFormat('ru-RU', { style: 'percent', maximumFractionDigits: 3, minimumFractionDigits: 0 }).format(value / 100);
        case 'big':
            return Intl.NumberFormat(LANG, { notation: 'compact', minimumFractionDigits: 0 }).format(value);
        case 'currencyRounded':
            return Intl.NumberFormat('ru-RU', {
                style: 'currency',
                notation: 'standard',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 3,
            }).format(value);
        default:
            return Intl.NumberFormat('ru-RU').format(value);
    }
};
