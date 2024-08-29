export interface Range<T> {
    min: T;
    max: T;
}

export const rangeToString = (range: Range<number>): string => {
    if (isNaN(range.max)) return `${range.min}+`;
    if (isNaN(range.min)) return `${range.max} or less`;
    return `${range.min}-${range.max}`;
};
