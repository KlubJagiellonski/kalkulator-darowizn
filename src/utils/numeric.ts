/**
 * Rounds with decimal places
 * @param value Float value to round
 * @param decimals Number of decimal places in the result rounded value
 * @returns float number to set decimal places
 */
export function roundNumber(value: number, decimals: number = 2): number {
    var scale = Math.pow(10, decimals);
    var rounded = Math.round((value + Number.EPSILON) * scale) / scale;
    return rounded;
}
