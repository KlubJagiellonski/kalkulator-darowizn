import { roundNumber } from '../utils/numeric';
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
            this.value = isValidNumber(formattedValue) ? roundNumber(parseFloat(formattedValue)) : undefined;
        } else if (value) {
            this.text = value.toFixed(2);
            this.value = roundNumber(value);
        }
    }

    public static fromString(text?: string) {
        return new IncomeValue(text);
    }

    public static fromNumber(value?: number) {
        return !!value ? new IncomeValue(undefined, value) : new IncomeValue();
    }
}
