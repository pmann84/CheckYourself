export interface Range<T> {
    min: T;
    max: T;
}

export const rangeLength = (range: Range<number>): number => {
    return range.max - range.min;
};

export const rangeToString = (range: Range<number>): string => {
    if (isNaN(range.max)) return `${range.min}+`;
    if (isNaN(range.min)) return `${range.max} or less`;
    return `${range.min}-${range.max}`;
};

export const toRange = (min: number | undefined, max: number | undefined) => {
    return { min: min ?? NaN, max: max ?? NaN };
};
