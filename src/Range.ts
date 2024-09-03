export interface Range<T> {
    min: T;
    max: T;
}

export const rangeLength = (range: Range<number>): number => {
    return range.max - range.min;
};

export const rangeToString = (range: Range<number>, dp = 1): string => {
    if (isNaN(range.max)) return `${range.min.toFixed(dp)}+`;
    if (isNaN(range.min)) return `< ${range.max.toFixed(dp)}`;
    return `${range.min.toFixed(dp)}-${range.max.toFixed(dp)}`;
};

export const toRange = (min: number | undefined, max: number | undefined) => {
    return { min: min ?? NaN, max: max ?? NaN };
};
