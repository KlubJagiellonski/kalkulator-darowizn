import { isValidNumber } from './form-validation';

export class IncomeValue {
    public readonly text?: string;
    public readonly value?: number;

    protected constructor(text?: string, value?: number) {
        if (!text && !value) {
            this.text = undefined;
            this.value = undefined;
        } else if (text) {
            this.text = text;
            const formattedValue = text.replaceAll(' ', '').replace(',', '.').replace(/\.$/, '.0');
            this.value = isValidNumber(formattedValue)
                ? IncomeValue.roundNumber(parseFloat(formattedValue), 2)
                : undefined;
        } else if (value) {
            this.text = value.toFixed(2);
            this.value = IncomeValue.roundNumber(value, 2);
        }
    }

    protected static roundNumber(value: number, decimals: number) {
        var scale = Math.pow(10, decimals);
        var rounded = Math.round((value + Number.EPSILON) * scale) / scale;
        return rounded;
    }

    public static fromString(text?: string) {
        return new IncomeValue(text);
    }

    public static fromNumber(value?: number) {
        return !!value ? new IncomeValue(undefined, value) : new IncomeValue();
    }
}
