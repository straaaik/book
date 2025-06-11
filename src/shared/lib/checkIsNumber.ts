export const checkIsNumber = (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim() !== '';
};
