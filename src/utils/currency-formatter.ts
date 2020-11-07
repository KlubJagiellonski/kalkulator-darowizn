export class CurrencyFormatter {
    private formatter: Intl.NumberFormat;

    constructor(currencyCode: string, locale: string) {
        this.formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    }

    public format = (value: number): string => this.formatter.format(value);
}
